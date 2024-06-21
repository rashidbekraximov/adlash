<template>
  <div class="card mb-25 border-0 rounded-0 bg-white">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <div
        class="mb-15 mb-md-30 d-sm-flex align-items-center justify-content-between"
      >
        <h6 class="card-title fw-bold mb-0">Texnikalar</h6>
        <div
          class="card-select mt-10 mt-sm-0 mb-10 mb-sm-0 d-flex align-items-center ps-10 pe-10 pt-5 pb-5"
        >
          <span class="fw-medium text-muted me-8">Holati</span>
          <select class="form-select shadow-none text-black border-0 ps-0 pt-0 pb-0 pe-20 fs-14 fw-medium">
            <option selected class="fw-medium">Show All</option>
            <option value="1" class="fw-medium">In Stock</option>
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
                ID
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                TEXNIKA TURI
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                GAS
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                BALLON
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
              >
                MOY
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 pe-0"
              >
                AMORTIZATSIYA
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 pe-0"
              >
                ISH HAQI
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 pe-0"
              >
                UMUMIY XARAJAT
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 pe-0"
              >
                DAROMAD
              </th>
              <th
                scope="col"
                class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 pe-0"
              >
                FOYDA
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(stock,index)  in datasets" :key="stock.id" :id="index">
              <th class="shadow-none lh-1 fw-bold ps-0">
                <router-link
                  to="/product-details"
                  class="text-decoration-none text-black-emphasis"
                >
                  {{index+1}}
                </router-link>
              </th>
              <td class="shadow-none lh-1 fw-semibold text-black-emphasis">
                {{ stock.technique }}
              </td>
              <td class="shadow-none lh-1 fw-bold pe-0" v-for="(d,index) in stock.dashboardLogistics" :id="index" v-bind:key="index">
                {{d.amount}}
                <span class="fw-medium text-body-tertiary">so'm</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

export default{
  name: "StockReport",
  props: {
    datasets: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data() {
    return {
      // stocks: stockReport,
    };
  },
};
</script>