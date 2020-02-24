<template>
  <div class="international">
    <v-menu offset-y>
      <template v-slot:activator="{on}">
        <v-btn
          text
          icon
          color="primary"
          dark
          v-on="on"
        >
          <v-icon>language</v-icon>
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item-group :value="language" color="primary">
          <v-list-item :disabled="language==='zh'" @click="handleSetLanguage('zh')">
            <v-list-item-title>中文</v-list-item-title>
          </v-list-item>
          <v-list-item :disabled="language==='en'" @click="handleSetLanguage('en')">
            <v-list-item-title>English</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
    <v-snackbar v-model="showSnackbar" :timeout="2000" color="success" bottom>
      Switch Language Success
      <v-btn color="pink" text @click="showSnackbar = false">关闭</v-btn>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'

@Component({
  name: 'LangSelect'
})
export default class LangSelect extends Vue {
  private showSnackbar = false
  @State(state => state.app.language) readonly language!: string

  @Action('app/SetLanguage') private SetLanguage!: (lang: string) => void

  private handleSetLanguage(lang: string) {
    this.$i18n.locale = lang
    this.SetLanguage(lang)
    this.showSnackbar = true
  }
}
</script>
