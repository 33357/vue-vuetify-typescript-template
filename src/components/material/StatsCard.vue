<template>
  <material-card
    class="v-card--material-stats"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <v-card
      slot="offset"
      :class="`elevation-${elevation}`"
      :color="color"
      class="pa-4"
      dark
    >
      <v-icon size="40">
        {{ icon }}
      </v-icon>
    </v-card>

    <div class="text-right">
      <p
        class="body-2 grey--text font-weight-light mb-0"
        v-text="title"
      />
      <h3 class="headline font-weight-light text--primary">
        {{ value }} <small>{{ smallValue }}</small>
      </h3>
    </div>

    <v-divider />

    <template slot="actions">
      <v-icon
        :color="subIconColor"
        size="20"
        class="mx-2"
      >
        {{ subIcon }}
      </v-icon>

      <span
        :class="subTextColor"
        class="caption font-weight-light"
        v-text="subText"
      />
    </template>
  </material-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Card from './Card.vue'

@Component({
  name: 'MaterialStatsCard'
})
export default class MaterialStatsCard extends Vue {
  @Prop(Card.prototype.$props)

  @Prop({ required: true }) icon!: string

  @Prop({ default: undefined }) subIcon!: string
  @Prop({ default: undefined }) subIconColor!: string
  @Prop({ default: undefined }) subTextColor!: string
  @Prop({ default: undefined }) subText!: string
  @Prop({ default: undefined }) title!: string
  @Prop({ default: undefined }) value!: string
  @Prop({ default: undefined }) smallValue!: string

  private inheritAttrs = false
}
</script>

<style lang="scss">
  .v-card--material-stats {
    display: flex;
    flex-wrap: wrap;
    position: relative;

    .v-offset {
      display: inline-block;
      flex: 0 1;
      margin-top: 0;
      margin-left: 0;
      margin-right: auto;
      margin-bottom: 0 !important;
      max-width: auto;
      padding: 0 16px 0;
    }

    .v-card {
      border-radius: 4px;
      flex: 0 1 auto;
    }

    .v-card__text {
      display: inline-block;
      flex: 1 0 calc(100% - 120px);
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
    }

    .v-card__actions {
      flex: 1 0 100%;
    }
  }
</style>
