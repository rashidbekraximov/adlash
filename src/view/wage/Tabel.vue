<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
        class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-sm-flex align-items-center">
        <h5 class="card-title fw-bold mb-15 mb-lg-20">Tabel</h5>
      </div>
      <div class="d-flex align-items-center">
        <button
            class="default-outline-btn position-relative transition fw-medium text-black pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-transparent fs-md-15 fs-lg-16 d-inline-block mb-10 mb-lg-0"
            type="button"
            @click="download()"
        >
          Export
          <i class="flaticon-file-1 position-relative ms-5 top-2 fs-15"></i>
        </button>
      </div>
    </div>
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30">
      <div class="border p-2 p-lg-4 border-dark border-opacity-10">
        <form class="row g-3 needs-validation" novalidate>
          <div class="col-md-4 d-none">
            <input
                type="number"
                v-model="tabel.id"
            />
            <div class="valid-feedback">Looks good!</div>
          </div>
          <div class="col-md-4">
            <label for="validationCustom01" class="form-label fw-medium">Boshlanish sana</label>
            <input
                type="date"
                class="form-control shadow-none fs-md-15 text-black"
                id="validationCustom01"
                v-model="tabel.beginDate"
                not_empty='true'
                @input="getHeaderList(tabel.beginDate,tabel.endDate,tabel.directionId)"
                required
            />
            <div class="valid-feedback">Looks good!</div>
          </div>

          <div class="col-md-4">
            <label for="validationCustom02" class="form-label fw-medium">Tugash sana</label>
            <input
                type="date"
                class="form-control shadow-none fs-md-15 text-black"
                id="validationCustom02"
                v-model="tabel.endDate"
                not_empty='true'
                @input="getHeaderList(tabel.beginDate,tabel.endDate,tabel.directionId)"
                required
            />
            <div class="valid-feedback">Looks good!</div>
          </div>

          <div class="col-md-4 mb-5">
            <label class="form-label fw-medium">Yo'nalish</label>
            <select class="form-select fs-md-15 text-black shadow-none" not_empty='true' @change="getHeaderList(tabel.beginDate,tabel.endDate,tabel.directionId)" v-model="tabel.directionId">
              <option selected disabled value="0">Tanlang...</option>
              <option v-for="(u,index) in directions" v-bind:key="index" :value="index">{{ u }}</option>
            </select>
            <div class="valid-feedback">Looks good!</div>
          </div>

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
                  ISM VA FAMILIYA
                </th>
                <th
                    scope="col"
                    class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                  LAVOZIMI
                </th>
                <th scope="col"
                    class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                    v-for="(h,index) in headers" :id="index" v-bind:key="index">
                  {{ h }}
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(t,index) in employee" :id="index" v-bind:key="index">
                <th
                    class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0"
                >
                  <div class="d-flex align-items-center">
                    <div
                        class="d-flex align-items-center ms-5 fs-md-15 fs-lg-16"
                    >
                      {{ index + 1 }}
                    </div>
                  </div>
                </th>
                <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                  {{ t.name }}
                </td>
                <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                  {{ t.position.name.activeLanguage }}
                </td>
                <td class="shadow-none lh-1 fw-medium text-black-emphasis" v-for="(hour,index) in t.hourDays"
                    :id="index" v-bind:key="index">
                  {{ hour }}
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import {checkPermission} from "@/message/message";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Tabel",
  data() {
    return {
      loading: false,
      tabel: {
        beginDate: '',
        endDate: '',
        directionId: 0
      },
      employee: [],
      dayHours: [],
      headers: [],
      directions: [],
    }
  },
  methods: {
    getSalary(beginDate, endDate, id) {
      this.$http.get("salary/tabel/" + beginDate + "/" + endDate + "/" + id + localStorage.getItem("lang")).then(res => {
        this.employee = res.data
      }).catch((reason) => {
        checkPermission(reason)
      })
    },

    getHeaderList(beginDate, endDate, id) {
      if (beginDate !== '' && endDate !== '' && id !== 0) {
        this.getSalary(beginDate, endDate, id);
        this.$http.get("salary/header/" + beginDate + "/" + endDate + "/" + id + localStorage.getItem("lang")).then(res => {
          this.headers = res.data
        }).catch((reason) => {
          checkPermission(reason)
        })
      }
    },
    getDirections() {
      this.$http.get("references/def/direction" + localStorage.getItem('lang')).then(res => {
        this.directions = res.data
      })
    },
    download() {
      this.loading = true;
      this.$http.get('/report/tabel/' + this.tabel.beginDate + "/" + this.tabel.endDate + "/" + this.tabel.directionId + localStorage.getItem("lang"), {
        'Content-Type': 'blob',
        responseType: "arraybuffer",
      }).then((response) => {
        const url = URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute(
            'download',
            `Tabel.xlsx`
        )
        document.body.appendChild(link)
        link.click()
        this.loading = false;
      })
    },
  },
  created() {
    this.getDirections();
  }
};
</script>

<style scoped>

</style>