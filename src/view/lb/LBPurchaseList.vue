<template>
    <div class="row">
      <div class="col-lg-3">
        <div
            class="card mb-25 border-0 rounded-0 bg-white letter-spacing contact-information-card"
        >
          <div class="card-head">
            <h5 class="card-title lh-1 fw-semibold mb-0 text-muted">Filters</h5>
          </div>
          <div class="card-body">
            <form>
              <div class="form-group mb-15 mb-md-20 cursor-pointer" @click="getList()">
                <a class=" default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16 d-inline-block me-10 mt-10 mt-md-0 text-decoration-none">
                  <i class="flaticon-list position-relative ms-5 m-6 fs-12"></i>
                  Filterlash
                </a>
              </div>
              <div class="form-group mb-15 mb-md-20 cursor-pointer" @click="clear()">
                <a class=" default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-danger fs-md-15 fs-lg-16 d-inline-block me-10 mt-10 mt-md-0 text-decoration-none">
                  <i class="flaticon-delete position-relative ms-5 m-2 fs-12"></i>
                  Tozalash
                </a>
              </div>
              <div class="form-group mb-15 mb-md-20">
                <label class="d-block text-black fw-semibold mb-10">
                  Mijoz
                </label>
                <input
                    type="text"
                    class="form-control shadow-none rounded-0 text-black"
                    placeholder="e.g, Sadriddin"
                    v-model="filter.client"
                />
              </div>
              <div class="form-group mb-15 mb-md-20">
                <label class="d-block text-black fw-semibold mb-10">Marka</label>
                <select class="form-select shadow-none fw-semibold rounded-0" v-model="filter.mark">
                  <option selected disabled value="0">Tanlang...</option>
                  <option v-for="(u,index) in marks" v-bind:key="index" :value="index">{{ u }}</option>
                </select>
              </div>
              <div class="form-group mb-15 mb-md-20">
                <label class="d-block text-black fw-semibold mb-10">Miqdor</label>
                <select class="form-select shadow-none fw-semibold rounded-0" v-model="filter.amount">
                  <option selected disabled value="0">Tanlang...</option>
                  <option v-for="(u,index) in amounts" v-bind:key="index" :value="index">{{ u }}</option>
                </select>
              </div>
              <div class="form-group mb-15 mb-md-20">
                <div class="col-12">
                  <div class="form-check">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="invalidCheck"
                        v-model="filter.isDebt"
                    />
                    <label class="form-check-label fw-medium position-relative top-1" for="invalidCheck">
                      Qarzdorlik
                    </label>
                  </div>
                </div>
              </div>
              <div class="form-group mb-15 mb-md-20">
                <label class="d-block text-black fw-semibold mb-10">
                  Boshlanish sana
                </label>
                <input
                    type="date"
                    class="form-control shadow-none rounded-0 text-black"
                    placeholder="e.g. 023"
                    v-model="filter.beginDate"
                />
              </div>
              <div class="form-group mb-15 mb-md-20">
                <label class="d-block text-black fw-semibold mb-10">
                  Tugash sana
                </label>
                <input
                    type="date"
                    class="form-control shadow-none rounded-0 text-black"
                    placeholder="e.g. 100"
                    v-model="filter.endDate"
                />
              </div>
              <div class="form-group mb-15 mb-md-20">
                <label class="d-block text-black fw-semibold mb-10">Korxona</label>
                <select class="form-select shadow-none fw-semibold rounded-0" v-model="filter.mchj">
                  <option value="LEADER_BETON_1">1 - Leader Beton</option>
                  <option value="LEADER_BETON_2">2 - Leader Beton</option>
                </select>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-lg-9">
        <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
          <div class="card-head box-shadow bg-white d-md-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25">
            <form class="search-box position-relative">
              <input
                  type="text"
                  class="form-control shadow-none text-black rounded-0 border-0"
                  placeholder="Search ticket"
              />
              <button
                  type="submit"
                  class="bg-transparent text-primary transition p-0 border-0"
              >
                <i class="flaticon-search-interface-symbol"></i>
              </button>
            </form>
            <div class="d-sm-flex align-items-center">
              <button
                  class=" m-2 default-outline-btn position-relative transition fw-medium text-black pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-transparent fs-md-15 fs-lg-16 d-inline-block mt-10 mt-md-0"
                  type="button" @click="downloadKassa"
              >
                SOTISH
                <i class="flaticon-file-1 position-relative ms-5 top-2 fs-15"></i>
              </button>
              <button
                  class="m-2 default-outline-btn position-relative transition fw-medium text-black pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-transparent fs-md-15 fs-lg-16 d-inline-block mt-10 mt-md-0"
                  type="button" @click="download"
              >
                ISHLAB CHIQARISH
                <i class="flaticon-file-1 position-relative ms-5 top-2 fs-15"></i>
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
                    BUYUYRTMACHI
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
                    HUDUD
                  </th>
                  <th
                      scope="col"
                      class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                  >
                    MARKA
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
                    SUMMA
                  </th>
                  <th
                      scope="col"
                      class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                  >
                    KORXONA
                  </th>
                  <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(t,index) in paginatedData" :id="index" v-bind:key="index">
                  <th
                      class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0"
                  >
                    <div class="d-flex align-items-center">
                      <div class="d-flex align-items-center ms-5 fs-md-15 fs-lg-16">
                        {{t.id}}.  {{t.customer}}
                      </div>
                    </div>
                  </th>
                  <td class="shadow-none lh-1 fw-medium">
                    <span class="badge text-outline-success"><i class="flaticon-date position-relative ms-5 fs-12"></i> {{ t.date }}</span>
                  </td>
                  <td class="shadow-none lh-1 fw-medium">
                    <span class="badge text-outline-success">{{ t.location }}</span>
                  </td>
                  <td class="shadow-none lh-1 fw-medium text-danger text-uppercase">
                    <span class="badge text-outline-success">{{ t.mark }}</span>
                  </td>
                  <td class="shadow-none lh-1 fw-medium text-body-tertiary ">
                    {{ t.amount }}
                  </td>
                  <td class="shadow-none lh-1 fw-medium text-body-tertiary">
                    {{ t.value }} SO'M
                  </td>
                  <td class="shadow-none lh-1 fw-medium text-body-tertiary">
                    <span v-if="t.mchj === 'LEADER_BETON_1'" class="badge text-outline-info">LB1</span>
                    <span v-if="t.mchj === 'LEADER_BETON_2'" class="badge text-outline-info">LB2</span>
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
                        <li @click="deleteRow(t.id)" class="cursor-pointer">
                          <a
                              class="dropdown-item d-flex align-items-center"
                          ><i
                              class="flaticon-delete lh-1 me-8 position-relative top-1"
                          ></i>
                            O'chirmoq</a
                          >
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
      </div>
    </div>
</template>

<script>
import axios from "@/axios/axios.js";
import router from "@/router";
import Swal from "sweetalert2";
import {checkPermission, message} from "@/message/message";
import PaginationCustom from "@/pages/PaginationCustom";

export default {
  name: "LBPurchaseList",
  components:{PaginationCustom},
  data() {
    return {
      filter:{
        client: '',
        mark:0,
        amount:0,
        beginDate:null,
        endDate:null,
        mchj:null,
        isDebt: false,
      },
      allTableData: [],
      marks: [],
      amounts: [],
      showMenuBell: false,
      currentPage: 1,
      pageSize: 10,
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.allTableData.length / this.pageSize);
    },
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.allTableData.slice(startIndex, endIndex);
    }
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page;
    },
    getList() {
      axios.post("lb-purchase/filter" + localStorage.getItem("lang"),this.filter).then(res => {
        console.log(res.data)
        this.allTableData = res.data
      }).catch((reason) => {
        checkPermission(reason)
      })
    },
    deleteRow(id) {
      Swal.fire({
        title: 'Ishonchingiz komilmi?',
        text: "Siz sotuvni qayta tiklay olmaysiz!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'O\'chirish'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.get("lb-purchase/delete/" + id).then(res => {
            if (res.status === 200){
              message('success', res.data.message);
              setTimeout(() => {
                location.reload()
              }, 3000);
            }else{
              message('success', res.data.message);
              setTimeout(() => {
                location.reload()
              }, 3000);
            }
          }).catch((reason) => {
            checkPermission(reason)
          })
        }
      })
    },
    download() {
      axios.post('/report/lb-produce' + localStorage.getItem("lang"),this.filter, {
        'Content-Type': 'blob',
        responseType: "arraybuffer",
      }).then((response) => {
        const url = URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute(
            'download',
            `Ishlab chiqarish LB.xlsx`
        )
        document.body.appendChild(link)
        link.click()
      })
    },
    downloadKassa() {
      axios.post('/report/lb-purchase' + localStorage.getItem("lang"),this.filter, {
        'Content-Type': 'blob',
        responseType: "arraybuffer",
      }).then((response) => {
        const url = URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute(
            'download',
            `Sotish LB.xlsx`
        )
        document.body.appendChild(link)
        link.click()
      })
    },
    getMarks() {
      axios.get("ingredient/marks" + localStorage.getItem('lang')).then(res => {
        this.marks = res.data
      })
    },
    getAmount() {
      axios.get("ingredient/amounts" + localStorage.getItem('lang')).then(res => {
        this.amounts = res.data
      })
    },
    cancel(){
      router.go(-1)
    },
    clear(){
      this.filter.client = '';
      this.filter.mark = 0;
      this.filter.amount = 0;
      this.filter.isDebt = false;
      this.filter.beginDate = null;
      this.filter.endDate = null;
      this.getList();
    }
  },
  created() {
    this.getList();
    this.getMarks();
    this.getAmount();
  }
}
</script>

<style scoped>

</style>