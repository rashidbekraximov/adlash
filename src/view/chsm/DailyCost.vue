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
            data-bs-target="#createDailyCostModal"
        >
          XARAJAT QO'SHISH
          <i class="flaticon-plus position-relative ms-5 fs-12"></i>
        </button>

        <button
            class="default-outline-btn position-relative transition fw-medium text-black pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-transparent fs-md-15 fs-lg-16 d-inline-block mb-10 mb-lg-0"
            type="button" @click="downloadExcel"
        >
          Export
          <i class="flaticon-file-1 position-relative ms-5 top-2 fs-15"></i>
        </button>
      </div>
      <div class="d-sm-flex align-items-center mt-10 mt-lg-0">
        <select class="project-select form-select shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
                @change="getCosts" v-model="costTypeId">
          <option selected value="0">Tanlang</option>
          <option v-for="(u,index) in costTypes" v-bind:key="index" :value="index">{{ u }}</option>
        </select>
        <input
            class="project-select form-control shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
            type="date" v-model="beginDate" @change="getCosts">
        <input
            class="project-select form-control shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
            type="date" v-model="endDate" @change="getCosts">
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
              XARAJAT TURI
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
                  {{ index + 1 }}
                </div>
              </div>
            </th>
            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
              {{ t.date }}
            </td>
            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
              {{ t.costType === undefined ? '' : t.costType.name.activeLanguage }}
            </td>
            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
              {{ $formatNumber(t.amount) }} SO'M
            </td>
            <td class="shadow-none lh-1 fw-medium">
              <span class="badge text-outline-success">Active</span>
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
                        data-bs-target="#createDailyCostModal"
                    ><i
                        class="flaticon-pen lh-1 me-8 position-relative top-1"
                    ></i>
                      Edit</a
                    >
                  </li>
                  <li>
                    <a
                        class="dropdown-item d-flex align-items-center cursor-pointer" @click="handleDelete(t.id)"
                    ><i
                        class="flaticon-delete lh-1 me-8 position-relative top-1 cursor-pointer"
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
      <PaginationCustom
          :currentPage="currentPage"
          :totalPages="totalPages"
          @page-changed="handlePageChange"
      />
    </div>
  </div>
  <CreateDailyCostModal :editId="editId"/>
</template>

<script>
import CreateDailyCostModal from "./CreateDailyCostModal.vue";
import PaginationCustom from "@/pages/PaginationCustom";
import {checkPermission} from "@/message/message";

export default {
  name: "DailyCost",
  components: {PaginationCustom, CreateDailyCostModal},
  data() {
    return {
      costs: [],
      costTypes: [],
      beginDate: null,
      endDate: null,
      costTypeId: 0,
      editId: 0,
      currentPage: 1,
      pageSize: 10,
    }
  },
  async mounted() {
    this.costTypes = await this.$api.getDataList("references/def/cost_type");
  },
  methods: {
    getCosts() {
      this.$http.get("checkout-costs/" + this.costTypeId + "/" + this.beginDate + "/" + this.endDate).then(res => {
        this.costs = res.data
      }).catch((reason) => {
        checkPermission(reason)
      })
    },
    async downloadExcel() {
      try {
        const response = await this.$http.get("checkout-cost/report/" + this.costTypeId + "/" + this.beginDate + "/" + this.endDate, {
          responseType: 'blob' // Important
        });

        // Create a URL for the blob
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Create a link element
        const link = document.createElement('a');
        link.href = url;

        // Set the download attribute with a filename
        link.setAttribute('download', 'Kunlik Xarajat.xlsx');

        // Append the link to the body
        document.body.appendChild(link);

        // Trigger the download by simulating click
        link.click();

        // Clean up
        link.remove();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('There was an error downloading the file:', error);
      }
    },
    async handleDelete(id) {
      await this.$delet.deleteRow("/checkout-cost/delete/" + id, this.getCosts());
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
    edit(objectEdit) {
      this.editId = objectEdit;
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.costs.length / this.pageSize);
    },
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.costs.slice(startIndex, endIndex);
    }
  },
  created() {
    this.getCosts()
  }
};
</script>

<style scoped>

</style>