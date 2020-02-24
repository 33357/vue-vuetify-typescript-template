<template>
  <div v-if="!item.meta || !item.meta.hidden">
    <template v-if="showSupItem(item) && onlyOneChild && !onlyOneChild.children">
      <v-list-item
        v-if="onlyOneChild.meta"
        :to="resolvePath(onlyOneChild.path, basePath)"
        :active-class="color"
      >
        <v-list-item-action>
          <v-icon>{{ getChildIcon(item) }}</v-icon>
        </v-list-item-action>
        <v-list-item-title>{{ getChildTitle(item) }}</v-list-item-title>
      </v-list-item>
    </template>
    <v-list-group
      v-else
      :value="isActive"
      :no-action="noAction"
      :sub-group="subGroup"
      :prepend-icon="item.meta ? item.meta.icon : ''"
      class="mt-2 menu-group"
    >
      <template slot="activator">
        <v-list-item-content>
          <v-list-item-title v-if="item.meta">
            {{ generateTitle(item.meta.title) }}
          </v-list-item-title>
        </v-list-item-content>
      </template>
      <template v-if="item.children">
        <drawer-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :color="child.color"
          :base-path="resolvePath(child.path, basePath)"
          :sub-group="true"
          :no-action="true"
        />
      </template>
    </v-list-group>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import path from 'path'
import { isExternal } from '@/utils/validate'
import { generateTitle } from '@/utils/i18n'

@Component({
  // Set 'name' here to prevent uglifyjs from causing recursive component not work
  // See https://medium.com/haiiro-io/element-component-name-with-vue-class-component-f3b435656561 for detail
  name: 'DrawerItem'
})
export default class DrawerItem extends Vue {
  @Prop({ default: null }) readonly item!: any
  @Prop({ default: '' }) readonly basePath!: string
  @Prop({ default: false }) readonly isActive!: boolean
  @Prop({ default: '' }) readonly color!: string
  @Prop({ default: false }) readonly noAction!: boolean
  @Prop({ default: false }) readonly subGroup!: boolean

  private onlyOneChild: any = null
  private generateTitle = generateTitle
  private isExternal = isExternal

  private hasOneShowingChild(children: any[] = [], parent: any): boolean {
    const showingChildren = children.filter(item => {
      if (item.meta?.hidden) {
        return false
      } else {
        // Temp set(will be used if only has one showing child)
        this.onlyOneChild = item
        return true
      }
    })

    // When there is only one child router, the child router is displayed by default
    if (showingChildren.length === 1) {
      return true
    }

    // Show parent if there are no child router to display
    if (showingChildren.length === 0) {
      this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
      return true
    }

    return false
  }

  private resolvePath(routePath: string, basePath: string): string {
    if (this.isExternal(routePath)) {
      return routePath
    }
    if (this.isExternal(basePath)) {
      return basePath
    }
    return path.resolve(basePath, routePath)
  }

  private showSupItem(item: any) {
    return this.hasOneShowingChild(item.children, item) && (!this.onlyOneChild.children || this.onlyOneChild.noShowingChildren) && !item.meta?.alwaysShow
  }

  private getChildIcon(item: any) {
    if (this.onlyOneChild.meta) {
      return this.onlyOneChild.meta.icon
    }
    if (item.meta) {
      return item.meta.icon
    }
    return ''
  }

  private getChildTitle(item: any) {
    if (this.onlyOneChild.meta) {
      return this.generateTitle(this.onlyOneChild.meta.title)
    }
    return ''
  }
}
</script>
<style scoped lang="scss">
  .menu-group{
    ::v-deep .v-list-item {
      margin-top: 8px;
    }
    ::v-deep .v-list-group__header.v-list-item {
      margin: 0;
    }
    ::v-deep .v-list-item__icon {
      margin-top: 12px;
      margin-bottom: 12px;
    }
  }
</style>
