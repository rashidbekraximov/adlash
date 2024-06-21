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
import {checkPermission} from "@/message/message";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Kassa",
  components: {
    BillingCard
  },
  data(){
    return{
      income: []
    }
  },
  methods:{
    getIncomeList(){
      this.$http.get("daily-income/list").then(res => {
        this.income = res.data
      }).catch((reason) => {
        checkPermission(reason)
      })
    },
  },
  created() {
    this.getIncomeList();
  },
};
</script>
