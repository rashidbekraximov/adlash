<template>
  <div class="row">
    <div class="col-xxl-12">
      <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
        <div class="card-body p-10">
          <ul class="settings-tabs ps-0 mb-0 list-unstyled">
            <li class="cursor-pointer" @click="getBarCharts('SPARE_PART',this.mchj)">
              <a class="fs-md-15 fs-lg-16 fw-medium text-decoration-none d-block w-100 rounded-1 text-center transition">
                Ehtiyot qism
              </a>
            </li>
            <li class="cursor-pointer" @click="getBarCharts('FUEL',this.mchj)">
              <a class="fs-md-15 fs-lg-16 fw-medium text-decoration-none d-block w-100 rounded-1 text-center transition">
                Yoqilg'i
              </a>
            </li>
          </ul>
          <ul class="settings-tabs ps-0 mb-0 mt-3 list-unstyled">
            <li class="cursor-pointer">
              <select class="form-select shadow-none text-black fw-medium"
                      v-model="mchj" @change="getBarCharts(this.item,this.mchj)">
                <option value="CHSM" selected>CHSM</option>
                <option value="LEADER_BETON_1">LB 1</option>
                <option value="LEADER_BETON_2">LB 2</option>
              </select>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-xxl-12">
      <div class="row">
        <div class="col-lg-6" v-for="(d,i) in datasets" :key="i">
          <NewItem :number-prop="d.qty" :string-prop="d.item === 'FUEL' ? d.fuelType.name.uz_lat : d.sparePartType.name.uz_lat" color-prop="#20B2AA" :price-prop="d.price"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script >

import NewItem from "@/component/NewItem";

export default {
  name: "WarehouseDashboard",
  components: {
    // StatsItem,
    NewItem,
  },
  data(){
    return {
      lineData: [],
      datasets: [],
      time: 'DAILY',
      sex: 'SEX1',
      mchj: "CHSM",
      item: "FUEL"
    }
  },
  methods: {
    getBarCharts(val){
      if (val !== ""){
        this.item = val;
      }
      this.$http.get("warehouse/dashboard/" + this.item + "/" + this.mchj).then(res => {
        this.datasets = res.data;
      })
    }
  },
  created() {
    this.getBarCharts("SPARE_PART")
  }
};
</script>