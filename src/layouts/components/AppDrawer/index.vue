<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    :src="image"
    app
    color="grey darken-2"
    dark
    floating
    mobile-break-point="991"
    persistent
    width="260"
  >
    <template v-slot:img="attrs">
      <v-img
        v-bind="attrs"
        gradient="to top, rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)"
      />
    </template>

    <v-list nav>
      <v-list-item two-line>
        <v-list-item-avatar color="white">
          <v-img
            :src="logoImage"
            height="34"
            contain
          />
        </v-list-item-avatar>

        <v-list-item-title class="title">
          URI_CHEN
        </v-list-item-title>
      </v-list-item>

      <v-divider class="mx-3 mb-3" />

      <drawer-item
        v-for="route in sideBarRoutes"
        :key="route.path"
        :item="route"
        :color="color"
        :base-path="route.path"
      />
    </v-list>

    <template v-slot:append>
      <v-list nav>
        <v-list-item
          to="/upgrade"
        >
          <v-list-item-action>
            <v-icon>mdi-package-up</v-icon>
          </v-list-item-action>

          <v-list-item-title class="font-weight-bold">
            固定底部
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import DrawerItem from './DrawerItem.vue'
import logoImage from '@/assets/common/logo.png'

@Component({
  name: 'AppDrawer',
  components: { DrawerItem }
})
export default class AppDrawer extends Vue {
  private logoImage = logoImage

  @State(state => state.app.image) readonly image!: string
  @State(state => state.app.color) readonly color!: string
  @State(state => state.permission.routes) readonly permission_routes!: any[]
  @State(state => state.settings.showSidebarLogo) readonly showSidebarLogo!: boolean
  @State(state => state.app.drawer) readonly drawer!: boolean

  @Action('app/setDrawer')
  private setDrawer!: (isDrawer: boolean) => void

  get sideBarRoutes() {
    return this.permission_routes.filter(route => !route.meta?.hidden)
  }

  get inputValue() {
    return this.drawer
  }

  set inputValue(val) {
    this.setDrawer(val)
  }
}
</script>
