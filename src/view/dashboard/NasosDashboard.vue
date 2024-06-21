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
          </ul>
        </div>
      </div>
    </div>
    <div class="col-xxl-12">
      <div class="row">
        <div class="col-lg-6" v-for="(d,i) in datasets" :key="i">
          <NewUsers :number-prop="d.amount" :string-prop="d.name" color-prop="#318CE7" amount-prop=""/>
        </div>
      </div>
    </div>
  </div>
</template>

<script >

import NewUsers from "@/components/Dashboard/CRMSystem/NewUsers.vue";

export default {
  name: "ProduceDashboard",
  components: {
    // StatsItem,
    NewUsers,
  },
  data(){
    return {
      datasets: [],
      beginDate: '',
      endDate: ''
    }
  },
  methods: {
    currentDate(){
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const dd = String(today.getDate()).padStart(2, '0');

      this.beginDate = `${yyyy}-${mm}-${dd}`;
      this.endDate = `${yyyy}-${mm}-${dd}`;
    },
    getBarCharts(){
      this.$http.get("nasos-bar/" + this.beginDate + "/" + this.endDate).then(res => {
        this.datasets = res.data;
      })
    }
  },
  created() {
    this.currentDate();
    this.getBarCharts()
  }
};
</script>