<template>
  <div class="container-fluid m-3">
    <div class="row">
      <div class="col-md-12">
        <billing-card
            title="Kunlik kirimlar"
            :bills="income"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BillingCard from "@/components/BillingCard.vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Kassa",
  components: {
    BillingCard
  },
  data() {
    return {
      income: []
    }
  },
  async mounted() {
    this.income = await this.$api.getDataList("daily-income/list");
  }
};
</script>
