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
            data-bs-target="#createMixerModal"
        >
          Mikser qo'shish
          <i class="flaticon-plus position-relative ms-5 fs-12"></i>
        </button>
      </div>
      <div class="d-flex align-items-center">

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
              AUTO RAQAMI
            </th>
            <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
            >
              1 KM XARAJATI
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
                <div
                    class="d-flex align-items-center ms-5 fs-md-15 fs-lg-16"
                >
                  {{ index + 1 }}
                </div>
              </div>
            </th>
            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
              {{ t.auto }}
            </td>
            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
              {{$formatNumber( t.perKmCostAmount )}} SO'M
            </td>
            <td class="shadow-none lh-1 fw-medium">
              <span v-if="t.status === 'ACTIVE'" class="badge text-outline-success">Active</span>
              <span v-else class="badge text-outline-danger">Passive</span>
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
                        class="dropdown-item d-flex align-items-center cursor-pointer" @click="edit(t.id)"   data-bs-toggle="modal"
                        data-bs-target="#createMixerModal"
                    ><i
                        class="flaticon-pen lh-1 me-8 position-relative top-1"
                    ></i>
                      Edit</a
                    >
                  </li>
                  <li>
                    <a
                        class="dropdown-item d-flex align-items-center cursor-pointer" @click="deleteRow(t.id)"
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
  <CreateMixerModal :editId="editId"/>
</template>

<script>
import CreateMixerModal from "./modal/CreateMixerModal";
import PaginationCustom from "@/pages/PaginationCustom";
import Swal from "sweetalert2";
import axios from "@/axios/axios";
import {notification} from "ant-design-vue";
import {checkPermission} from "@/message/message";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Mixer",
  components: {PaginationCustom,CreateMixerModal},
  data() {
    return {
      techniques:[],
      editId: 0,
      currentPage: 1,
      pageSize: 10,
    }
  },
  methods :{
    getTechnicians() {
      this.$http.get("mixers" + localStorage.getItem("lang")).then(res => {
        this.techniques = res.data
      }).catch((reason) => {
        checkPermission(reason)
      })
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
          axios.get("mixer/delete/" + id).then(res => {
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
      return Math.ceil(this.techniques.length / this.pageSize);
    },
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.techniques.slice(startIndex, endIndex);
    }
  },
  created() {
    this.getTechnicians()
  }
};
</script>

<style scoped>

</style>