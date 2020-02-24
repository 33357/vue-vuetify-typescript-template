<template>
  <div class="app-page-layout h-full">
    <app-bar
      v-if="meta.showHeader"
      :show-back="meta.showBack"
      :back-to-route="meta.backToRoute"
    />
    <app-page-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AppBar, AppPageView } from './components'

@Component({
  name: 'PageLayout',
  components: {
    AppBar,
    AppPageView
  }
})
export default class PageLayout extends Vue {
  get meta() {
    return this.$route.meta
  }
}
</script>

