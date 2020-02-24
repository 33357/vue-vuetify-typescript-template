<template>
  <v-slide-y-reverse-transition group style="z-index: 1000">
    <div v-for="item in messages" :key="item.id" class="toast__current">
      <v-snackbar
        v-model="item.open"
        :bottom="item.position.includes('bottom')"
        :color="item.color"
        :left="item.position.includes('start')"
        :multi-line="item.mode === 'multi-line'"
        :right="item.position.includes('end')"
        :timeout="item.time"
        :top="item.position.includes('top')"
        :vertical="item.mode === 'vertical'"
      >
        <v-icon v-if="!!item.icon" style="color: white;">{{ item.icon }}</v-icon>
        {{ item.message }}
        <v-btn
          v-if="item.close"
          text
          :icon="!item.closeText"
          color="white"
          @click="close(item.id)"
        >
          <template>
            <v-icon v-if="!item.closeText">{{ item.closeIcon }}</v-icon>
            <span v-else>{{ item.closeText }}</span>
          </template>
        </v-btn>
      </v-snackbar>
    </div>
  </v-slide-y-reverse-transition>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ToastOptions } from '@/plugins/Toast/types'

@Component
export default class Snackbar extends Vue {
  private messages: any[] = []
  private index = 20191213

  private message(options: ToastOptions) {
    const id = 'toast_id_' + this.index++
    this.messages.push({
      ...options,
      id,
      open: true
    })
    return id
  }

  private close(id: string) {
    if (!id) return
    const item = this.messages.filter((item) => item.id === id)[0]
    if (!item) return
    item.open = false

    setTimeout(() => {
      if (!this.messages) return
      const messageIndex = this.messages.indexOf(item)
      if (messageIndex === -1) return
      this.messages.splice(messageIndex, 1)
    }, 500)
  }
}
</script>

