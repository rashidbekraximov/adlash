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
            data-bs-target="#createSpendGeneralItemModal"
        >
          SARFLASH
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
        <select class="project-select form-select shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10" @change="getIncomeSpareParts" v-model="technicianId">
          <option selected value="0">Tanlang</option>
          <option v-for="(u,index) in technicians" v-bind:key="index" :value="index">{{u}}</option>
        </select>
        <input
            class="project-select form-control shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
            type="date" v-model="beginDate" @change="getIncomeSpareParts">
        <input
            class="project-select form-control shadow-none fw-semibold rounded-1 mt-10 mt-sm-0 ms-sm-10"
            type="date" v-model="endDate" @change="getIncomeSpareParts">
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
              TEXNIKA
            </th>
            <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
            >
              AUTO RAQAMI
            </th>
            <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
            >
              MAHSULOT TURI
            </th>
            <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
            >
              NARXI
            </th>
            <th
                scope="col"
                class="tex  t-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
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
              STATUS
            </th>
            <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0"
            ></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(t,index) in spendings" :id="index" v-bind:key="index">
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
              {{t.technician.techniqueType.name.activeLanguage }}
            </td>
            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
              {{ t.technician.autoNumber}}
            </td>

            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
              {{ t.item === 'FUEL' ? t.fuelType.name.activeLanguage : t.sparePartType.name.activeLanguage }}
            </td>
            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
              {{ t.price }} SO'M
            </td>
            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
              {{ t.qty }}
            </td>
            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
              {{ t.value }} SO'M
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
                        class="dropdown-item d-flex align-items-center"
                    ><i
                        class="flaticon-pen lh-1 me-8 position-relative top-1"
                    ></i>
                      Edit</a
                    >
                  </li>
                  <li>
                    <a
                        class="dropdown-item d-flex align-items-center cursor-pointer" @click="deleteRowSpending(t.id)"
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
      <PaginationCustom
          :currentPage="currentPage"
          :totalPages="totalPages"
          @page-changed="handlePageChange"
      />
    </div>
  </div>
  <AddSpendGeneralItem />
</template>

<script>
import axios from "@/axios/axios.js";
import PaginationCustom from "@/pages/PaginationCustom.vue";
import AddSpendGeneralItem from "@/view/general/modal/AddSpendGeneralItem.vue";
import {notification} from "ant-design-vue";
import Swal from "sweetalert2";
import {checkPermission} from "@/message/message";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "SpendGeneralItem",
  components: {AddSpendGeneralItem, PaginationCustom},
  data() {
    return {
      spendings:[],
      technicians:[],
      technicianId: 0,
      beginDate: null,
      endDate: null,
      currentPage: 1,
      pageSize: 10,
    }
  },
  methods :{
    getIncomeSpareParts() {
      axios.get("spending-spare-parts/" + this.technicianId + "/" + this.beginDate + "/" + this.endDate + localStorage.getItem("lang")).then(res => {
        this.spendings = res.data
      }).catch((reason) => {
        checkPermission(reason)
      })
    },
    async downloadExcel() {
      try {
        const response = await this.$http.get("spending-spare-parts/report/"  + this.technicianId + "/" + this.beginDate + "/" + this.endDate, {
          responseType: 'blob' // Important
        });

        // Create a URL for the blob
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Create a link element
        const link = document.createElement('a');
        link.href = url;

        // Set the download attribute with a filename
        link.setAttribute('download', 'Texnika Xarajati.xlsx');

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
    getTechnicians() {
      axios.get("technician/select" + localStorage.getItem('lang')).then(res => {
        this.technicians = res.data
      })
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
    deleteRowSpending(id) {
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
          axios.delete("/spending-spare-part/delete/" + id).then(res => {
            console.log(res.status)
            if (res.status === 200){
              notification.success({
                message: `Muvaffaqiyatli o'chirildi !`,
                duration: 2
              });
              setTimeout(() => {
                location.reload();
              },3000)
            }else{
              notification.error({
                message: `Xatolik yuzaga keldi !`,
                duration: 2
              });
              setTimeout(() => {
                location.reload();
              },3000)
            }
          })
        }
      })
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.spendings.length / this.pageSize);
    },
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.spendings.slice(startIndex, endIndex);
    }
  },
  created() {
    this.getIncomeSpareParts()
    this.getTechnicians()
  }
};
</script>

<style scoped>

</style>