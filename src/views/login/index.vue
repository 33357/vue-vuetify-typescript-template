<template>
  <div class="login-container h-full container p-6 flex flex-col justify-between">
    <v-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

      <div class="title-container flex justify-center">
        <img class="max-w-xs w-1/2" src="@/assets/login-images/logo.png" alt="云盘登录">
      </div>
      <v-text-field
        v-model="loginForm.username"
        :autofocus="!loginForm.username"
        single-line
        dense
        :label="$t('login.username')"
      />
      <v-text-field
        v-model="loginForm.password"
        :autofocus="loginForm.username && !loginForm.password"
        single-line
        dense
        :label="$t('login.password')"
        :append-icon="capsTooltip ? 'visibility' : 'visibility_off'"
        :type="capsTooltip ? 'text' : 'password'"
        @click:append="toggleVisibility"
      />
      <div class="server-container flex justify-between">
        <v-btn type="primary" text to="/account/forget">忘记密码?</v-btn>
        <v-btn type="primary" text to="/account/register">注册</v-btn>
      </div>
      <v-btn
        :loading="submitting"
        color="orange darken-1"
        class="mt-8"
        elevation="0"
        rounded
        block
        :disabled="!loginForm.username || !loginForm.password"
        @click.prevent="handleLogin"
      >
        <span class="text-white">{{ $t('login.logIn') }}</span>
      </v-btn>

    </v-form>
    <div class="wechat-login flex flex-col justify-end items-center">
      <v-btn icon>
        <svg-icon name="wechat" class="text-4xl text-green-500" />
      </v-btn>
      <p class="mt-4">微信</p>
      <p class="text-xs">点击登录即表示同意 <a href="#">《xx隐私及许可服务协议》</a></p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import { Dictionary } from 'vue-router/types/router'
import { Action } from 'vuex-class'
import { Route } from 'vue-router'
import to from 'await-to-js'

@Component
export default class Login extends Vue {
  private loginForm = {
    username: 'admin',
    password: 'p1ssWo3d'
  }

  private loginRules = {}
  private capsTooltip = false
  private submitting = false
  private redirect?: string
  private otherQuery: Dictionary<string> = {}

  /**
   * 从url上获取query参数,分离出redirect字段,用于登录成功后跳转
   * @param route
   */
  @Watch('$route', { immediate: true })
  private onRouteChange(route: Route) {
    // TODO: remove the "as Dictionary<string>" hack after v4 release for vue-router
    // See https://github.com/vuejs/vue-router/pull/2050 for details
    const query = route.query as Dictionary<string>
    if (query) {
      this.redirect = query.redirect
      this.otherQuery = this.getOtherQuery(query)
    }
  }

  @Action('user/userLogin')
  private userLogin!: (userInfo: { username: string, password: string }) => Promise<void>

  private toggleVisibility() {
    this.capsTooltip = !this.capsTooltip
  }

  private async handleLogin() {
    this.submitting = true
    const [err, data] = await to(this.userLogin(this.loginForm))
    this.submitting = false
    if (err || !data) {
      console.log(err, data)
      return
    }
    this.$router.push({ path: this.redirect || '/home', query: this.otherQuery })
  }

  /**
   * 获取url query参数
   * @param query
   * @return {...query}
   */
  private getOtherQuery(query: Dictionary<string>) {
    return Object.keys(query).reduce((acc, cur) => {
      if (cur !== 'redirect') {
        acc[cur] = query[cur]
      }
      return acc
    }, {} as Dictionary<string>)
  }
}
</script>
<style scoped>
  .login-container {
    background: #fdfdfd;
  }
</style>
