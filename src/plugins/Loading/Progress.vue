<template>
  <div class="loading-plugin">
    <v-overlay :color="overlayColor" :value="show" />
    <v-dialog
      v-model="show"
      persistent
      :overlay-color="overlayColor"
      :width="width"
    >
      <v-card
        :color="color"
      >
        <v-card-text>
          <div class="text-white text-center h-6">
            {{ text }}
          </div>
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class Progress extends Vue {
  @Prop({ default: 'hsla(0,0%,100%,.9)' }) readonly overlayColor!: string
  @Prop({ default: 'primary' }) readonly color!: string
  @Prop({ default: '' }) readonly text!: string
  @Prop({ default: 300 }) readonly width!: number

  private show = false
}
</script>

