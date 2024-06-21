<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
<!--      <div class="d-sm-flex align-items-center">-->
<!--        <button-->
<!--            class="default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16 d-inline-block me-10 mb-10 mb-lg-0"-->
<!--            type="button"-->
<!--            data-bs-toggle="modal"-->
<!--            data-bs-target="#createRemainderModal"-->
<!--        >-->
<!--          MAHSULOT QO'SHISH-->
<!--          <i class="flaticon-plus position-relative ms-5 fs-12"></i>-->
<!--        </button>-->

<!--        <button-->
<!--            class="default-outline-btn position-relative transition fw-medium text-black pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-transparent fs-md-15 fs-lg-16 d-inline-block mb-10 mb-lg-0"-->
<!--            type="button"-->
<!--        >-->
<!--          Export-->
<!--          <i class="flaticon-file-1 position-relative ms-5 top-2 fs-15"></i>-->
<!--        </button>-->
<!--      </div>-->
      <div class="d-flex align-items-center">
        <form class="search-box position-relative me-15">
          <input
              type="text"
              class="form-control shadow-none text-black rounded-0 border-0"
              placeholder="Search customer"
          />
          <button
              type="submit"
              class="bg-transparent text-primary transition p-0 border-0"
          >
            <i class="flaticon-search-interface-symbol"></i>
          </button>
        </form>
        <button
            class="dot-btn lh-1 position-relative top-3 bg-transparent border-0 shadow-none p-0 transition d-inline-block"
            type="button"
        >
          <i class="flaticon-dots"></i>
        </button>
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
              MAHSULOT
            </th>
            <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
            >
              O'LCHOV BIRLIK
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
            >
              KORXONA
            </th>
            <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
            >
              STATUS
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
                  {{ t.id }}
                </div>
              </div>
            </th>
            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
              {{t.productType.name.activeLanguage}}
            </td>
            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
              {{ t.unit.name.activeLanguage }}
            </td>
            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
              {{ t.amount }}
            </td>
            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
              <span v-if="t.mchj === 'LEADER_BETON_1'" class="badge text-outline-info">1 - Leader Beton</span>
              <span v-if="t.mchj === 'LEADER_BETON_2'" class="badge text-outline-info">2 - Leader Beton</span>
              <span v-if="t.mchj === 'CHSM'" class="badge text-outline-info">CHSM</span>
            </td>
            <td class="shadow-none lh-1 fw-medium">
              <span class="badge text-outline-success">Active</span>
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
</template>

<script>
import PaginationCustom from "@/pages/PaginationCustom.vue";
import {checkPermission} from "@/message/message";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "LBRemainder",
  components:{PaginationCustom},
  data() {
    return {
      remainders: [],
      currentPage: 1,
      pageSize: 10
    }
  },
  methods: {
    getRemainders() {
      this.$http.get("remainders/LEADER_BETON_1" + localStorage.getItem("lang")).then(res => {
        this.remainders = res.data
      }).catch((reason) => {
        checkPermission(reason)
      })
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.remainders.length / this.pageSize);
    },
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.remainders.slice(startIndex, endIndex);
    }
  },
  created() {
    this.getRemainders()
  }
};
</script>

<style scoped>

</style>