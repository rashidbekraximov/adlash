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
                  @input="getBarCharts"
              />
            </li>
            <li class="cursor-pointer">
              <input
                  type="date"
                  class="form-control shadow-none fs-md-15 text-black"
                  v-model="endDate"
                  @input="getBarCharts"
              />
            </li>
            <li class="cursor-pointer">
              <select class="form-select shadow-none text-black fw-medium" v-model="company" @change="getBarCharts()">
                <option value="LEADER_BETON_1" class="fw-medium" selected>1 - LEADER BETON</option>
                <option value="LEADER_BETON_2" class="fw-medium">2 - LEADER BETON</option>
              </select>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6" v-for="(d,i) in mainDatasets" :key="i">
        <NewUsers :number-prop="d.amount" :string-prop="d.name" color-prop="#318CE7" :amount-prop="d.num"/>
      </div>
    </div>
    <div class="col-xxl-12">
      <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
        <div class="card-body p-10">
          <h4 class="card-title text-center fw-bold mb-0">Sotilgan markalar</h4>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6" v-for="(d,i) in datasets" :key="i">
        <NewUsers :number-prop="d.amount" :string-prop="d.mark" color-prop="#318CE7" :amount-prop="d.num"/>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-xxl-7 col-xxxl-8">
      <LBBar />
    </div>

    <div class="col-xxl-5 col-xxxl-4">
      <WorkingSchedule  :datasets="lineData"/>
    </div>
  </div>
</template>

<script >

import LBBar from "@/component/LBBar";
import WorkingSchedule from "../../components/Dashboard/ProjectManagement/WorkingSchedule/index.vue";
import NewUsers from "@/components/Dashboard/CRMSystem/NewUsers.vue";

export default {
  name: "LeaderBetonDashboard",
  components: {
    // StatsItem,
    LBBar,
    NewUsers,
    WorkingSchedule,
  },
  data(){
    return {
      lineData: [],
      datasets: [],
      mainDatasets: [],
      beginDate: '',
      endDate: '',
      company: 'LEADER_BETON_1'
    }
  },
  methods: {
    getBarCharts(){
      this.getMainBarCharts();
      this.$http.get("lb-purchased/bar-last/" + this.company + "/" + this.beginDate + "/" + this.endDate).then(res => {
        this.datasets = res.data;
      })
    },
    getMainBarCharts(){
      this.$http.get("lb-purchased/total-bar/" + this.company + "/"  + this.beginDate + "/" + this.endDate).then(res => {
        this.mainDatasets = res.data;
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
    getLineOrders() {
      this.$http.get("lb-purchased/last-line").then(res => {
        this.lineData = res.data;
      })
    },
  },
  created() {
    this.currentDate()
    this.getLineOrders()
    this.getBarCharts()
  }
};
</script>