<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div
        class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
    >
      <div class="d-sm-flex align-items-center">
        <router-link
            class="default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16 d-inline-block me-10 mb-10 mb-lg-0 text-decoration-none"
            to="/profile-settings"
        >
          Foydalanuvchi qo'shish
          <i class="flaticon-plus position-relative ms-5 fs-12"></i>
        </router-link>
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
              F.I.SH
            </th>
            <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
            >
              PHONE
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
                  {{t.firstName}} {{ t.lastName}}
                </div>
              </div>
            </th>
            <td class="shadow-none lh-1 fw-medium text-black-emphasis">
              {{t.login}}
            </td>
            <td class="shadow-none lh-1 fw-medium">
              <span v-if="t.enabled === true" class="badge text-outline-success">Active</span>
              <span v-else class="badge text-outline-success">Passive</span>
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
                        class="dropdown-item d-flex align-items-center cursor-pointer" @click="goToDetails(t.id)"
                    >
                      <i
                          class="flaticon-pen lh-1 me-8 position-relative top-1"
                      ></i>
                      Edit
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item d-flex align-items-center cursor-pointer" @click="handleDelete(t.id)">
                      <i
                          class="flaticon-delete lh-1 me-8 position-relative top-1"
                      ></i>
                      Delete
                    </a>
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
  <CreateNewUserModal />
</template>

<script>

import CreateNewUserModal from "@/components/Users/UsersList/CreateNewUserModal";
import PaginationCustom from "@/pages/PaginationCustom";
import router from "@/router";
import {checkPermission} from "@/message/message";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Users",
  components: {
    CreateNewUserModal,
    PaginationCustom
  },
  data() {
    return {
      users: [],
      currentPage: 1,
      pageSize: 10,
    };
  },
  methods: {
    goToDetails(id) {
      router.push({ name: 'ProfileSettings', params: { id } });
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
    async handleDelete(id) {
      await this.$delet.deleteRow("/user/" + id, this.getUserList);
    },
    getUserList() {
      this.$http.get("users").then(res => {
        this.users = res.data
      }).catch((reason) => {
        checkPermission(reason)
      })
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.users.length / this.pageSize);
    },
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.users.slice(startIndex, endIndex);
    }
  },
  created() {
    this.getUserList();
  },
};
</script>