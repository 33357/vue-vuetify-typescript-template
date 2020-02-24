<template>
  <v-menu
    :close-on-content-click="false"
    bottom
    left
    min-width="300"
    max-width="300"
    nudge-left="12"
    offset-x
    transition="slide-y-transition"
  >
    <template v-slot:activator="{on}">
      <v-btn
        class="elevation-0"
        color="grey"
        dark
        fab
        fixed
        right
        top
        style="top: 96px;"
        v-on="on"
      >
        <v-icon>settings</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-container grid-list-xl>
        <v-row>
          <v-col cols="12">
            <div class="text-center body-2 text-uppercase sidebar-filter mb-4">
              主题切换
            </div>

            <v-layout justify-center>
              <v-avatar
                v-for="c in colors"
                :key="c"
                :color="c"
                class="theme-avatar"
                :class="c === color ? 'color-active color-' + c : 'color-' + c"
                size="23"
                @click="setTheme(c)"
              />
            </v-layout>
            <v-divider class="mt-3" />
          </v-col>

          <v-col cols="12">
            <div class="text-center body-2 text-uppercase sidebar-filter">
              菜单背景图片
            </div>
          </v-col>

          <v-col
            v-for="img in images"
            :key="img"
            cols="3"
          >
            <v-img
              :class="[image === img ? 'image-active' : '']"
              :src="img"
              height="120"
              @click.native="setImage(img)"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'

@Component({
  name: 'AppFilter'
})
export default class AppFilter extends Vue {
  private colors: string[] = [
    'primary',
    'info',
    'success',
    'warning',
    'accent'
  ]

  private images: string[] = [
    'https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-1.23832d31.jpg',
    'https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-2.32103624.jpg',
    'https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-3.3a54f533.jpg',
    'https://demos.creative-tim.com/vue-material-dashboard/img/sidebar-4.3b7e38ed.jpg'
  ]

  @State(state => state.app.image) readonly image!: string
  @State(state => state.app.color) readonly color!: string

  @Action('app/setImage') private setImage!: (imageUrl: string) => void
  @Action('app/setColor') private setColor!: (color: string) => void

  private setTheme(color: string) {
    const theme: {[index: string]: string} = {
      primary: '#4caf50',
      secondary: '#4caf50',
      tertiary: '#495057',
      accent: '#82B1FF',
      error: '#f55a4e',
      info: '#00d3ee',
      success: '#5cb860',
      warning: '#ffa21a'
    }

    const primary = theme[color]

    this.setColor(color)
    this.$vuetify.theme.themes.light.primary = primary
  }
}
</script>

<style lang="scss" scoped>
  .theme-avatar.v-avatar {
    cursor: pointer;
    border: 3px solid transparent;
    transition: all .34s;

    &:not(last-child) {
      margin-right: 5px;
    }

    &.color-active {
      border-color: #e0e0e0 !important;
    }
  }

  .v-responsive {
    cursor: pointer;
  }
</style>
