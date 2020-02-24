import { VNode, PluginFunction } from 'vue'

export type ToastPosition = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'
export type ToastAction = { action: string | VNode, click: (id: string) => any }

export interface ToastOptions {
  [index: string]: any
  message?: string
  time?: number
  position?: ToastPosition
  close?: boolean
  icon?: string
  actions?: Array<ToastAction>
  color?: string
  textColor?: string
  closeIcon?: string
  closeText?: string
  successIcon?: string
  infoIcon?: string
  warningIcon?: string
  errorIcon?: string
  mode?: string
}

export interface Toast {
  install: PluginFunction<ToastOptions>

  config(options: ToastOptions): ToastOptions

  message(options: ToastOptions): string

  success(message: string): string

  success(options: ToastOptions): string

  info(message: string): string

  info(options: ToastOptions): string

  warning(message: string): string

  warning(options: ToastOptions): string

  error(message: string): string

  error(options: ToastOptions): string

  close(id: string): void
}

// eslint-disable-next-line no-undef
export default Toast

declare module 'vue/types/vue' {
  interface Vue {
    $toast: Toast
  }
}

