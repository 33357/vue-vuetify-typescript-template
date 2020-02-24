<template>
  <v-footer
    id="core-footer"
    app
    fixed
    height="82"
  >
    <div class="footer-items">
      <span
        v-for="link in links"
        :key="link.name"
      >
        <a
          :href="link.Link"
          class="tertiary--text footer-links"
        >{{ link.name }}</a>
      </span>
    </div>
    <v-spacer />
    <span class="font-weight-light copyright">
      &copy;
      {{ (new Date()).getFullYear() }}
      <a
        href="#"
        target="_blank"
      >beetledata</a>, made with
      <v-icon
        color="tertiary"
        size="17"
      >mdi-heart</v-icon>
      for a better web
    </span>
  </v-footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'AppFooter'
})
export default class AppFooter extends Vue {
  private links = [
    { name: 'Home', Link: '/#' },
    { name: 'Creative Tim', Link: 'https://www.creative-tim.com' },
    { name: 'About Us', Link: 'https://creative-tim.com/presentation' },
    { name: 'Blog', Link: 'https://blog.creative-tim.com' }
  ]
}
</script>

<style scoped>
  #core-footer {
    z-index: 0;
  }
  #core-footer > .footer-items a {
    font-weight: 500;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 12px;
    padding: 15px;
    line-height: 1.8;
    cursor: pointer;
  }
</style>
