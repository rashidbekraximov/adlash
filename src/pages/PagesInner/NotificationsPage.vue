<template>
  <BreadCrumb PageTitle="Bildirishnomalar"/>
  <div class="card mb-25 border-0 rounded-0 bg-white">
    <div class="card-body p-15 p-sm-20 p-sm-25 p-lg-30 letter-spacing">
      <div
          class="mb-20 d-sm-flex align-items-center justify-content-between letter-spacing"
      >
        <h5 class="card-title fw-bold mb-0">Bildirishnomalar</h5>
        <div
            class="card-select mt-10 mt-sm-0 d-inline-block d-sm-flex align-items-center ps-10 pe-10 pt-5 pb-5"
        >
          <span class="fw-medium text-muted me-8">Last</span>
          <select
              class="form-select shadow-none text-black border-0 ps-0 pt-0 pb-0 pe-20 fs-14 fw-medium"
          >
            <option value="1" class="fw-medium" selected>1 Week</option>
            <option value="2" class="fw-medium">2 Week</option>
            <option value="3" class="fw-medium">3 Week</option>
          </select>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table text-nowrap align-middle mb-0">
          <thead>
          <tr>
            <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0"
            >
              Ma'lumot
            </th>
            <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
            >
              Kun
            </th>
            <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0"
            ></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(d,index) in debts" :id="index" v-bind:key="index">
            <td class="shadow-none lh-1 fw-medium text-black-emphasis ps-0">
              <a
                  class="text-decoration-none text-black"
              >
                  <span class="d-block text-black-emphasis">
                    <span class="fw-semibold">Xaridor: <i class="flaticon-user-1 mx-2"></i>{{d.client}}</span>
                    , Hudud: <i class="flaticon-gps mx-1"></i>
                    {{d.location}}
                  </span>
              </a>
            </td>
            <td class="shadow-none lh-1 fw-medium text-muted">{{d.days}}  kun</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "@/components/Common/BreadCrumb.vue";

export default {
  name: "NotificationsPage",
  components: {
    BreadCrumb
  },
  data(){
    return {
      debts: []
    }
  },
  methods: {
    getDebtList() {
      this.$http.get("purchase/debt").then(res => {
        this.debts = res.data.slice(0,3);
      })
    },
  },
  created() {
    this.getDebtList()
  }
};
</script>