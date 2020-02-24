<template>
  <material-card
    class="v-card--material-chart"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-slot:header>
      <chartist
        :data="data"
        :event-handlers="eventHandlers"
        :options="options"
        :ratio="ratio"
        :responsive-options="responsiveOptions"
        :type="type"
        style="max-height: 150px;"
      />
    </template>

    <slot />

    <slot
      slot="actions"
      name="actions"
    />
  </material-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'MaterialChartCard'
})
export default class MaterialChartCard extends Vue {
  @Prop({ default: {}}) readonly data!: object
  @Prop({ default: [] }) readonly eventHandlers!: []
  @Prop({ default: {}}) readonly options!: object
  @Prop({ default: undefined }) readonly ratio!: string
  @Prop({ default: [] }) readonly responsiveOptions!: []
  @Prop({
    default: 'Bar',
    required: true,
    validator: v => ['Bar', 'Line', 'Pie'].includes(v)
  }) readonly type!: string

  private inheritAttrs = false
}

</script>

<style lang="scss">
  .v-card--material-chart {
    .v-card--material__header {
      .ct-label {
        color: inherit;
        opacity: .7;
        font-size: 0.975rem;
        font-weight: 100;
      }

      .ct-grid {
        stroke: rgba(255, 255, 255, 0.2);
      }

      .ct-series-a .ct-point,
      .ct-series-a .ct-line,
      .ct-series-a .ct-bar,
      .ct-series-a .ct-slice-donut {
        stroke: rgba(255, 255, 255, .8);
      }

      .ct-series-a .ct-slice-pie,
      .ct-series-a .ct-area {
        fill: rgba(255, 255, 255, .4);
      }
    }
  }
</style>
