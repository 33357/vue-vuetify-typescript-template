<template>
  <div class="app-main-layout h-full">
    <app-filter />
    <app-bar />
    <app-drawer />
    <app-main-view />
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { AppBar, AppDrawer, AppFilter, AppMainView } from './components'
import ResizeMixin from './mixin/resize'

@Component({
  name: 'MainLayout',
  components: {
    AppBar,
    AppDrawer,
    AppFilter,
    AppMainView
  }
})
export default class MainLayout extends mixins(ResizeMixin) {
}
</script>

