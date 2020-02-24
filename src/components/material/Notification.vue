<template>
  <v-alert
    v-bind="$attrs"
    :elevation="elevation"
    :value="value"
    :dark="dark"
    v-on="$listeners"
  >
    <slot />
  </v-alert>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'MaterialNotification'
})
export default class MaterialNotification extends Vue {
  @Prop({ default: true }) readonly dark!: boolean
  @Prop({ default: 6 }) readonly elevation!: number
  @Prop({ default: true }) readonly value!: boolean

  private inheritAttrs = false
}
</script>
