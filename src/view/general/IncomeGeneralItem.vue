<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
        class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
            <div class="d-sm-flex align-items-center">
              <button
                  class="default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16 d-inline-block me-10 mb-10 mb-lg-0"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#createIncomeGeneralItemModal"
              >
                KIRIM QILISH
                <i class="flaticon-plus position-relative ms-5 fs-12"></i>
              </button>
            </div>
      <div class="d-sm-flex align-items-center mt-10 mt-lg-0">
        <select class="project-select form-select shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
                v-model="filter.mchj" @change="getIncomeSpareParts()">
          <option selected disabled value="0">Tanlang</option>
          <option value="CHSM">CHSM</option>
          <option value="LEADER_BETON_1">LB 1</option>
          <option value="LEADER_BETON_2">LB 2</option>
        </select>
        <select class="project-select form-select shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
                v-model="filter.item" @change="checkGroup(filter.item)" >
          <option selected disabled value="0">Tanlang...</option>
          <option value="SPARE_PART">Ehtiyot qism</option>
          <option value="FUEL">Yoqilg'i</option>
        </select>
        <select class="project-select form-select shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
                v-model="filter.fuelType" v-if="isFuel" @change="getIncomeSpareParts()">
          <option selected disabled value="0">Tanlang...</option>
          <option v-for="(u,index) in fuelTypes" v-bind:key="index" :value="index">{{ u }}</option>
        </select>
        <select class="project-select form-select shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
                v-model="filter.fuelType" v-if="isSpare" @change="getIncomeSpareParts()">
          <option selected disabled value="0">Tanlang...</option>
          <option v-for="(u,index) in spareTypes" v-bind:key="index" :value="index">{{ u }}</option>
        </select>
        <input
            type="text"
            class="form-control shadow-none text-black fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10 w-25"
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
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0"
            >
              ID
            </th>
            <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
            >
              SANA
            </th>
            <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
            >
              MAHSULOT NOMI
            </th>
            <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
            >
              NARXI
            </th>
            <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
            >
              MIQDOR
            </th>
            <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
            >SUMMA
            </th>
            <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
            >
              KORXONA
            </th>
            <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0"
            ></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(t,index) in paginatedData" :id="index" v-bind:key="index">
            <th
                class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0"
            >
              <div class="d-flex align-items-center">
                <div class="d-flex align-items-center ms-5 fs-md-15 fs-lg-16">
                  {{ index + 1 }}
                </div>
              </div>
            </th>
            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
              {{ t.date }}
            </td>
            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
              {{ t.item === 'FUEL' ? t.fuelType.name.uz_lat : t.sparePartType.name.uz_lat }}
            </td>
            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
              {{$formatNumber( $formatNumberForAmount(t.price)) }} SO'M
            </td>
            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
              {{ $formatNumberForAmount(t.qty) }}
            </td>
            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
              {{$formatNumber( t.value ) }} SO'M
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
                        class="dropdown-item d-flex align-items-center cursor-pointer" @click="edit(t.id)"
                        data-bs-toggle="modal"
                        data-bs-target="#createIncomeGeneralItemModal"
                    ><i
                        class="flaticon-pen lh-1 me-8 position-relative top-1"
                    ></i>
                      Edit</a
                    >
                  </li>
                  <li>
                    <a class="dropdown-item d-flex align-items-center cursor-pointer" @click="handleDeleteIncome(t.id)"><i
                        class="flaticon-delete lh-1 me-8 position-relative top-1"></i>
                      Delete</a>
                  </li>
                </ul>
              </div>
            </td>
          </tr>

          </tbody>
        </table>
      </div>
      <PaginationCustom
          :currentPage="currentPage"
          :totalPages="totalPages"
          @page-changed="handlePageChange"
      />
    </div>
  </div>
  <AddIncomeGeneralItem :editId="editId"/>
</template>

<script>
import axios from "@/axios/axios.js";
import PaginationCustom from "@/pages/PaginationCustom.vue";
import AddIncomeGeneralItem from "@/view/general/modal/AddIncomeGeneralItem.vue";
import {checkPermission} from "@/message/message";

export default {
  name: "IncomeGeneralItem",
  components: {AddIncomeGeneralItem, PaginationCustom},
  data() {
    return {
      incomes: [],
      fuelTypes: [],
      spareTypes: [],
      isFuel: false,
      isSpare: false,
      filter: {
        item: null,
        mchj: null,
        fuelType: 0,
      },
      totalValue: 0,
      calcValue: "",
      sparePart: 0,
      currentPage: 1,
      pageSize: 10,
      editId: 0,
    }
  },
  async mounted() {
      this.fuelTypes = await this.$api.getDataList("references/def/fuel_type" + localStorage.getItem('lang'));
      this.spareTypes = await this.$api.getDataList("references/def/spare_types" + localStorage.getItem('lang'));
  },
  methods: {
    getIncomeSpareParts() {
      if (!(this.filter.item == null && this.filter.mchj != null)){
        axios.post("spare-parts",this.filter).then(res => {
          this.incomes = res.data
          this.totalValue = 0;
          if (this.filter.item != null && this.filter.mchj != null){
            for (let i = 0; i < this.incomes.length; i++) {
              this.totalValue += this.incomes[i].qty;
            }
          }
          this.calcValue = this.$formatNumber(this.totalValue);
        }).catch((reason) => {
          checkPermission(reason)
        })
      }
    },
    edit(objectEdit) {
      this.editId = objectEdit;
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
    handlePageChange(page) {
      this.currentPage = page;
    },
    async handleDeleteIncome(id) {
      await this.$delet.deleteRow("spare-part/delete/" + id, this.getIncomeSpareParts);
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.incomes !== undefined ? this.incomes.length : 0 / this.pageSize);
    },
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.incomes !== undefined ? this.incomes.slice(startIndex, endIndex) : [];
    }
  },
  created() {
    this.getIncomeSpareParts()
  }
};
</script>

<style scoped>

</style>