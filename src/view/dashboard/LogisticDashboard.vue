<template>
  <div class="row">
    <div class="col-xxl-12">
      <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
        <div class="card-body p-10">
          <ul class="settings-tabs ps-0 mb-0 list-unstyled">
            <li class="cursor-pointer">
              <input
                  type="date"
                  class="form-control shadow-none fs-md-15 text-black"
                  v-model="beginDate"
                  @input="getLogisticDashboard"
              />
            </li>
            <li class="cursor-pointer">
              <input
                  type="date"
                  class="form-control shadow-none fs-md-15 text-black"
                  v-model="endDate"
                  @input="getLogisticDashboard"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6" v-for="(a,index) in allData" :id="index" v-bind:key="index">
        <NewUsers :number-prop="a.amount" :string-prop="getName(a.costId)" color-prop="#318CE7"/>
      </div>
    </div>
    <div class="col-xxl-12">
      <StockReport :datasets="allTableData"/>
    </div>
  </div>
</template>

<script>
import StockReport from "../../components/Dashboard/Ecommerce/StockReport/index.vue";

import NewUsers from "@/components/Dashboard/CRMSystem/NewUsers.vue";

export default {
  name: "LogisticDashboard",
  components: {
    NewUsers,
    StockReport
  },
  data() {
    return {
      allData: [],
      allTableData: [],
      beginDate: "",
      endDate: "",
    }
  },
  methods: {
    getLogisticDashboard() {
      this.getLogisticTableDashboard()
      this.$http.get("logistic/all/" + this.beginDate + "/" + this.endDate).then(res => {
        this.allData = res.data
        console.log(this.allData)
      })
    },
    currentDate(){
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const dd = String(today.getDate()).padStart(2, '0');

      this.beginDate = `${yyyy}-${mm}-${dd}`;
      this.endDate = `${yyyy}-${mm}-${dd}`;
    },
    getLogisticTableDashboard() {
      this.$http.get("logistic/table/" + this.beginDate + "/" + this.endDate).then(res => {
        this.allTableData = res.data
      })
    },
    getName(id) {
      if (id === 10) {
        return 'Sof foyda';
      } else if (id === 9) {
        return 'Daromad';
      } else if (id === 8) {
        return 'Umumiy xarajat';
      } else if (id === 7) {
        return 'Umumiy xarajat';
      } else if (id === 5) {
        return 'Oylik';
      } else if (id === 4) {
        return 'Amortizatsiya';
      } else if (id === 3) {
        return 'Moy';
      } else if (id === 2) {
        return 'Ballon';
      } else if (id === 1) {
        return 'Gas';
      } else {
        return 'Nomsiz'
      }
    }
  },
  created() {
    this.currentDate()
    this.getLogisticDashboard();
  }
};
</script>