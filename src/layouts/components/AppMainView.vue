<template>
  <v-slide-x-transition mode="out-in">
    <keep-alive :include="cachedViews">
      <router-view :key="key" />
    </keep-alive>
  </v-slide-x-transition>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'AppMainView'
})
export default class AppMainView extends Vue {
  get cachedViews() {
    return this.$store.state.tagsView.cachedViews
  }

  get key() {
    return this.$route.path
  }
}
</script>
