<template>
  <v-card
    :style="styles"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <helper-offset
      v-if="hasOffset"
      :inline="inline"
      :full-width="fullWidth"
      :offset="offset"
    >
      <v-card
        v-if="!$slots.offset"
        :color="color"
        :elevation="elevation"
        class="v-card--material__header d-flex align-center"
        dark
        min-height="80"
      >
        <slot
          v-if="!title && !text"
          name="header"
        />
        <div
          v-else
          class="px-3"
        >
          <h4
            class="title font-weight-light mb-2"
            v-text="title"
          />
          <p
            class="category font-weight-thin mb-0"
            v-text="text"
          />
        </div>
      </v-card>

      <slot
        v-else
        name="offset"
      />
    </helper-offset>

    <v-card-text>
      <slot />
    </v-card-text>

    <v-divider
      v-if="$slots.actions"
      class="mx-3"
    />

    <v-card-actions v-if="$slots.actions">
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'MaterialCard'
})
export default class MaterialCard extends Vue {
  @Prop({ default: 'secondary' }) readonly color!: string
  @Prop({ default: 10 }) readonly elevation!: number
  @Prop({ default: false }) readonly inline!: boolean
  @Prop({ default: false }) readonly fullWidth!: boolean
  @Prop({ default: 24 }) readonly offset!: number
  @Prop({ default: undefined }) readonly title!: string
  @Prop({ default: undefined }) readonly text!: string

  private inheritAttrs = false

  get hasOffset() {
    return this.$slots.header ||
      this.$slots.offset ||
      this.title ||
      this.text
  }

  get styles() {
    if (!this.hasOffset) return null

    return {
      marginBottom: `${this.offset}px`,
      marginTop: `${this.offset * 2}px`
    }
  }
}
</script>
