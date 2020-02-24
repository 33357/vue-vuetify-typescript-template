<template>
  <div class="message-box-plugin">
    <v-overlay :value="open" />
    <v-dialog
      v-model="open"
      persistent
      :width="width"
      :max-width="maxWidth"
      :content-class="className"
    >
      <v-card>
        <v-card-title primary-title class="headline grey lighten-2 font-weight-bold">{{ title }}</v-card-title>
        <div class="message-box__content">
          <v-card-text>
            <v-icon v-if="icon" :color="type" :size="iconSize">{{ icon }}</v-icon>
            <span>{{ content }}</span>
          </v-card-text>
          <v-text-field
            v-if="mode === 'prompt'"
            autofocus
            :type="inputType"
            :placeholder="inputPlaceholder"
            :value="value"
            :error="!!errorText"
            :error-messages="errorText"
            class="px-6 py-0"
            @input="(val) => value = val"
            @keydown.enter="handleClose(true)"
          />
        </div>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn v-if="mode !== 'alert'" color="black darken-1" text @click="handleClose(false)">{{ cancelLabel }}</v-btn>
          <v-btn color="primary darken-1" text @click="handleClose(true)">{{ okLabel }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Modal extends Vue {
  @Prop({ default: '提示' }) readonly title!: string
  @Prop({ default: '' }) readonly icon!: string
  @Prop({ default: 24 }) readonly iconSize!: number
  @Prop({
    default: 'alert',
    validator(value: any): boolean {
      return ['alert', 'confirm', 'prompt'].includes(value)
    }
  }) readonly mode!: string

  @Prop({
    default: '',
    validator(value: any): boolean {
      return ['', 'success', 'info', 'warning', 'error'].includes(value)
    }
  }) readonly type!: string

  @Prop({ default: '' }) readonly content!: string
  @Prop({ default: 350 }) readonly width!: string | number
  @Prop({ default: 350 }) readonly maxWidth!: string | number
  @Prop({ default: '' }) readonly className!: string
  @Prop({ default: '' }) readonly transition!: string
  @Prop({
    default: () => {
    }
  }) readonly beforeClose!: Function

  @Prop({ default: '确定' }) readonly okLabel!: string
  @Prop({ default: '取消' }) readonly cancelLabel!: string
  @Prop({ default: 'text' }) readonly inputType!: string
  @Prop({ default: '' }) readonly inputPlaceholder!: string
  @Prop({ default: '' }) readonly inputValue!: string | number
  @Prop({ default: null }) readonly validator?: Function

  private open = false
  private value = this.inputValue
  private errorText = ''

  private handleClose(result: boolean) {
    if (this.beforeClose) {
      return this.beforeClose(result, this, () => this.close(result))
    }
    return this.close(result)
  }

  private close(isOk: boolean) {
    if (isOk && this.mode === 'prompt' && this.validator) {
      const result = this.validator(this.value)
      if (!result.valid) {
        this.errorText = result.message
        return
      }
      this.errorText = ''
    }
    this.open = false
    this.$emit('close', isOk, this.value)
    return isOk
  }
}
</script>
