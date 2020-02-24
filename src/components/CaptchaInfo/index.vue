<template>
  <v-row justify="end">
    <v-overlay :value="dialog" />
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{on}">
        <v-btn text v-on="on">收不到验证码?</v-btn>
      </template>
      <v-card>
        <v-card-title primary-title class="headline grey lighten-2 font-weight-bold">收不到验证码</v-card-title>
        <div class="p-4">
          <p>1.请查看短信是否被安全软件拦截,若是双卡双待手机,请检查副卡短信情况.</p>
          <p>2.由于运营商网络原因,可能存在短信延迟,请耐心等待或稍后再试.</p>
        </div>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary darken-1" text @click="dialog = false">知道了</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'CaptchaInfo'
})
export default class CaptchaInfo extends Vue {
  private dialog = false
}
</script>

<style scoped>

</style>
