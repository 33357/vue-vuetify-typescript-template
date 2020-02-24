<template>
  <keep-alive :include="cachedViews">
    <router-view :key="key" />
  </keep-alive>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'AppPageView'
})
export default class AppPageView extends Vue {
  get cachedViews() {
    return this.$store.state.tagsView.cachedViews
  }

  get key() {
    return this.$route.path
  }
}
</script>
