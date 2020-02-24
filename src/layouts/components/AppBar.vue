<template>
  <v-app-bar
    id="core-app-bar"
    fixed
    app
    color="#fdfdfd"
    flat
    height="88"
  >
    <v-toolbar-title class="tertiary--text font-weight-light align-self-center">
      <v-btn
        v-if="responsive"
        icon
        @click.stop="onClick"
      >
        <v-icon>view_list</v-icon>
      </v-btn>
      {{ title }}
    </v-toolbar-title>

    <v-spacer />

    <v-toolbar-items>
      <v-row align="center" class="mx-0">
        <v-text-field
          class="mr-4 purple-input"
          color="purple"
          label="Search..."
          hide-details
        />

        <v-btn icon to="/">
          <v-icon color="tertiary">
            dashboard
          </v-icon>
        </v-btn>

        <v-menu
          bottom
          left
          offset-y
          transition="slide-y-transition"
        >
          <template v-slot:activator="{attrs, on}">
            <v-btn
              class="toolbar-items"
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-badge color="error" overlap>
                <template slot="badge">
                  {{ notifications.length }}
                </template>
                <v-icon color="tertiary">
                  notifications
                </v-icon>
              </v-badge>
            </v-btn>
          </template>

          <v-card>
            <v-list dense>
              <v-list-item @click="logout">
                <v-list-item-title>退出登录</v-list-item-title>
              </v-list-item>
              <v-list-item
                v-for="notification in notifications"
                :key="notification"
              >
                <v-list-item-title v-text="notification" />
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </v-row>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'
import to from 'await-to-js'

@Component({
  name: 'AppBar'
})
export default class AppBar extends Vue {
  private notifications: string[] = [
    'Mike, John responded to your email',
    'You have 5 new tasks',
    'You\'re now a friend with Andrew',
    'Another Notification',
    'Another One'
  ]

  private responsive = true

  get title() {
    return this.$route.meta.title || ''
  }

  @State(state => state.app.drawer) readonly drawer!: boolean

  @Action('app/setDrawer') private setDrawer!: (isDrawer: boolean) => void

  @Action('user/userLogout')
  private userLogout!: () => Promise<void>

  private onClick() {
    this.setDrawer(!this.drawer)
  }

  private logout() {
    this.$confirm(
      '确认退出登录?',
      '提示',
      {
        type: 'warning'
      }
    ).then(async({ result }) => {
      if (result) {
        const [err, data] = await to(this.userLogout())
        if (err || !data) {
          return
        }
        this.$router.push(`/account/login?redirect=${this.$route.fullPath}`)
      }
    })
  }
}
</script>

<style scoped>
  /* Fix coming in v2.0.8 */
  #core-app-bar {
    width: auto;
  }

  #core-app-bar a {
    text-decoration: none;
  }
</style>
