<template>
  <div class="card mb-25 border-0 rounded-0 bg-white">
    <div class="card-body p-15 p-sm-20 p-sm-25 p-lg-30 letter-spacing">
      <div
        class="mb-20 d-sm-flex align-items-center justify-content-between letter-spacing"
      >
      </div>
      <div class="table-responsive">
        <table class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0"
              >
                Xaridor
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0"
              >
                Joylashuv
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                Kun
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(d,index) in debts" :id="index" v-bind:key="index">
              <td class="shadow-none lh-1 fw-medium text-black-emphasis ps-0">
                <a
                  class="text-decoration-none text-black"
                >
                  <span class="d-block text-black-emphasis">
                    <i class="flaticon-user-1"></i>
                    <span class="mx-2 fw-semibold">{{d.client}}</span>
                  </span>
                </a>
              </td>
              <td class="shadow-none lh-1 fw-medium text-black-emphasis ps-0">
                <a class="text-decoration-none text-black">
                    <i class="flaticon-gps mx-1"></i>
                    <span class="mx-2 fw-semibold"> {{ d.location }}</span>
                </a>
              </td>
              <td class="shadow-none lh-1 fw-medium text-muted">
                <span v-if="d.days < 0">{{ Math.abs(d.days) }}  kun</span>
                <span v-if="d.days === 0">Bugun</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "NotificationsContent",
  components: {
  },
  data(){
    return {
      debts: []
    }
  },
  methods: {
    getDebtList(num) {
      this.$http.get("purchase/debt/" + num).then(res => {
        this.debts = res.data;
        console.log(res.data)
      })
    },
  },
  created() {
    this.getDebtList(1000 )
  }
};
</script>