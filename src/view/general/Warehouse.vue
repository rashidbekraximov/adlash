<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
        class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-sm-flex align-items-center">
        <select class="project-select form-select shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
                v-model="filter.mchj" @change="getWarehouse()">
          <option selected disabled value="null">Tanlang</option>
          <option value="CHSM">CHSM</option>
          <option value="LEADER_BETON_1">LB 1</option>
          <option value="LEADER_BETON_2">LB 2</option>
        </select>
        <select class="project-select form-select shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
                v-model="filter.item" @change="checkGroup(filter.item)" >
          <option selected disabled value="null">Tanlang...</option>
          <option value="SPARE_PART">Ehtiyot qism</option>
          <option value="FUEL">Yoqilg'i</option>
        </select>
        <select class="project-select form-select shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
                v-model="filter.fuelType" v-if="isFuel" @change="getWarehouse()">
          <option selected disabled value="0">Tanlang...</option>
          <option v-for="(u,index) in fuelTypes" v-bind:key="index" :value="index">{{ u }}</option>
        </select>
        <select class="project-select form-select shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
                v-model="filter.fuelType" v-if="isSpare" @change="getWarehouse()">
          <option selected disabled value="0">Tanlang...</option>
          <option v-for="(u,index) in spareTypes" v-bind:key="index" :value="index">{{ u }}</option>
        </select>
      </div>
      <div class="d-sm-flex align-items-center mt-10 mt-lg-0">
        <input
            type="text"
            class="form-control shadow-none text-black fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
            placeholder="kg/litr/dona"
            v-model="calcValue"
            readonly
        />
      </div>
    </div>
    <div class="card-body p-15 p-sm-20 p-md-25">
      <div class="table-responsive">
        <table class="table text-nowrap align-middle mb-0">
          <thead>
          <tr>
            <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0">
              ID
            </th>
            <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
              MAHSULOT NOMI
            </th>
            <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
              NARXI
            </th>
            <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
              MIQDOR
            </th>
            <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
              SUMMA
            </th>
            <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
              KORXONA
            </th>
            <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(t,index) in warehouses" :id="index" v-bind:key="index">
            <th class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0">
              <div class="d-flex align-items-center">
                <div class="d-flex align-items-center ms-5 fs-md-15 fs-lg-16">
                  {{ index + 1 }}
                </div>
              </div>
            </th>
            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
              {{ t.item === 'FUEL' ? t.fuelType.name.uz_lat : t.sparePartType.name.uz_lat }}
            </td>
            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
              {{$formatNumber( $formatNumberForAmount(t.price)) }} SO'M
            </td>
            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
              {{$formatNumberForAmount(t.qty) }}
            </td>
            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
              {{$formatNumber( t.value) }} SO'M
            </td>
            <td class="shadow-none lh-1 fw-medium">
              <span class="badge text-outline-success">{{t.mchj}}</span>
            </td>
            <td
                class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0"
            >
              <div class="dropdown">
                <button
                    class="dropdown-toggle lh-1 bg-transparent border-0 shadow-none p-0 transition"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                  <i class="flaticon-dots"></i>
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <a
                        class="dropdown-item d-flex align-items-center" @click="deleteRow(t.id)"
                    ><i
                        class="flaticon-delete lh-1 me-8 position-relative top-1"
                    ></i>
                      Delete</a
                    >
                  </li>
                </ul>
              </div>
            </td>
          </tr>

          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios/axios.js";
import Swal from "sweetalert2";
import {notification} from "ant-design-vue";
import {checkPermission} from "@/message/message";

export default{
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Warehouse",
  data() {
    return {
      warehouses:[],
      filter: {
        item: null,
        mchj: null,
        fuelType: 0,
      },
      isFuel: false,
      isSpare: false,
      fuelTypes: [],
      spareTypes: [],
      totalValue: 0,
      calcValue: "",
    }
  },
  async mounted() {
    this.fuelTypes = await this.$api.getDataList("references/def/fuel_type" + localStorage.getItem('lang'));
    this.spareTypes = await this.$api.getDataList("references/def/spare_types" + localStorage.getItem('lang'));
  },
  methods :{
    getWarehouse() {
      if (!(this.filter.item == null && this.filter.mchj != null)) {
        axios.post("warehouse", this.filter).then(res => {
          this.warehouses = res.data
          this.totalValue = 0;
          if (this.filter.item != null && this.filter.mchj != null){
            for (let i = 0; i < this.warehouses.length; i++) {
              this.totalValue += this.warehouses[i].qty;
            }
          }
          this.calcValue = this.$formatNumber(this.totalValue);
        }).catch((reason) => {
          checkPermission(reason)
        })
      }
    },
    checkGroup(type){
      if (type === "FUEL"){
        this.isFuel = true;
        this.isSpare = false;
      }else{
        this.isFuel = false;
        this.isSpare = true;
      }
    },
    deleteRow(id) {
      Swal.fire({
        title: 'Ishonchingiz komilmi?',
        text: "Iltimos, teshkiring va tasdiqlang",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Bekor qilish',
        confirmButtonText: 'Ha, o\'chirish!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete("warehouse/delete/" + id).then(res => {
            if (res.status === 200){
              notification.success({
                message: `Muvaffaqiyatli o'chirildi !`,
                duration: 2
              });
              setTimeout(() => {
                location.reload()
              }, 3000);
            }else{
              notification.error({
                message: `Xatolik yuzaga keldi !`,
                duration: 2
              });
              setTimeout(() => {
                location.reload()
              }, 3000);
            }
          })
        }
      })
    }
  },
  created() {
    this.getWarehouse()
  }
};
</script>

<style scoped>

</style>