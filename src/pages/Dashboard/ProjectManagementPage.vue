<template>
<!--  <StatsItem />-->
  <div class="row">
    <div class="col-xxl-5 col-xxxl-12">
<!--      <StatsBoxes />-->
      <WeeklySales />
    </div>
    <div class="col-xxl-7 col-xxxl-8">

      <TaskOverview />
      <div class="row mb-2">
        <div class="col-md-4"></div>
        <div class="col-md-4">
          <input
              type="date"
              class="form-control shadow-none fs-md-15 text-black"
              v-model="beginDate"
              @input="getBarLast"
          />
        </div>
        <div class="col-md-4">
          <input
              type="date"
              class="form-control shadow-none fs-md-15 text-black"
              v-model="endDate"
              @input="getBarLast"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6">
          <NewUsers :number-prop="datasets[0] === undefined ? 0 : datasets[0].number" string-prop="Sotuv" color-prop="#318CE7" :amount-prop="datasets[0] === undefined ? 0 : datasets[0].amount"/>
        </div>
        <div class="col-lg-6">
          <NewUsers :number-prop="datasets[1] === undefined ? 0 : datasets[1].number" string-prop="Qarz" color-prop="#EB4C42" :amount-prop="datasets[1] === undefined ? 0 : datasets[1].amount"/>
        </div>
      </div>
      <div class="row">
        <NewUsers :number-prop="datasets[2] === undefined ? 0 : datasets[2].number" string-prop="To'lov qilingan" color-prop="#006262" :amount-prop="datasets[2] === undefined ? 0 : datasets[2].amount"/>
      </div>
    </div>

    <div class="col-xxl-5 col-xxxl-4">
      <WorkingSchedule  :datasets="lineData"/>
    </div>
  </div>
</template>

<script >

import WeeklySales from "@/components/Dashboard/Ecommerce/WeeklySales.vue";
// import StatsItem from "../../components/Dashboard/ProjectManagement/StatsItem.vue";
import TaskOverview from "../../components/Dashboard/ProjectManagement/TaskOverview.vue";
import WorkingSchedule from "../../components/Dashboard/ProjectManagement/WorkingSchedule/index.vue";
import NewUsers from "@/components/Dashboard/CRMSystem/NewUsers.vue";

export default{
  name: "ProjectManagementPage",
  components: {
    // StatsItem,
    TaskOverview,
    NewUsers,
    WorkingSchedule,
    WeeklySales,
  },
  data(){
    return {
      lineData: [],
      datasets: [],
      beginDate: '',
      endDate: '',
    }
  },
  methods: {
    getBarLast(){
      this.$http.get("purchased/bar-last/" + this.beginDate + "/" + this.endDate).then(res => {
        this.datasets = res.data;
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
    getLineOrders(){
      this.$http.get("purchased/last-line").then(res => {
        this.lineData = res.data;
      })
    },
  },
  created() {
    this.currentDate()
    this.getBarLast()
    this.getLineOrders();
  }
};
</script>