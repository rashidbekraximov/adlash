<template>
  <div
      class="modal fade createNewModal"
      id="createPurchaseListModal"
      tabindex="-1"
      aria-hidden="true"
  >
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
          <h5 class="modal-title fw-bold text-black">Sotuvlar ro'yxati</h5>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
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
                    class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0"
                >
                  MIJOZ
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
                  CHEK
                </th>
                <th
                    scope="col"
                    class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                  UMUMIY QIYMATI
                </th>
                <th
                    scope="col"
                    class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                  QARZ QIYMATI
                </th>
                <th
                    scope="col"
                    class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 "
                >
                  MUDDATI
                </th>
                <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                  TO'LOV TURI
                </th>
                <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                  YARATILGAN SANA
                </th>
                <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(t,index) in purchases" :id="index" v-bind:key="index">
                <th class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0">
                    <div class="text-md-start ms-5 fs-md-15 fs-lg-16">
                      {{ t.id }}
                    </div>
                </th>
                <th class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0"
                >
                  <div class="d-flex align-items-center">
                    <div class="d-flex align-items-center ms-5 fs-md-15 fs-lg-16">
                      {{ t.client }}
                    </div>
                  </div>
                </th>
                <td class="shadow-none lh-1 fw-medium">
                  <span class="badge text-outline-success"><i
                      class="flaticon-date position-relative ms-5 fs-12"></i> {{ t.date }}</span>
                </td>
                <td class="shadow-none lh-1 fw-medium">
                  <span class="badge text-outline-success">{{ t.checkNumber }}</span>
                </td>
                <td class="shadow-none lh-1 fw-medium text-danger text-uppercase">
                  <span class="badge text-outline-success">{{ $formatNumber(t.totalValue) }} SO'M</span>
                </td>
                <td class="shadow-none lh-1 fw-medium text-body-tertiary ">
                  {{ t.debtTotalValue === 0 ? 0 : $formatNumber(t.debtTotalValue) }} SO'M
                </td>
                <td class="shadow-none lh-1 fw-medium text-body-tertiary">
                  {{ t.expiryDate }}
                </td>
                <td class="shadow-none lh-1 fw-medium text-body-tertiary">
                  {{ t.paymentType.name.activeLanguage }}
                </td>
                <td class="shadow-none lh-1 fw-medium text-body-tertiary">
                  {{ t.createdOnString }}
                </td>
                <td class="shadow-none lh-1 fw-medium text-body-tertiary">
                  <button type="button" class="custom-button" @click="childNoDebt(t.id)">
                    <i class="fa-regular fa-circle-xmark"></i>
                  </button>
                  <button type="button" class="custom-button" @click="childDownloadNakladnoy(t.id)">
                    <i class="fa-solid fa-file-arrow-down"></i>
                  </button>
                  <button type="button" class="custom-button" @click="childDeleteByPurchaseId(t.id)">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                  <button type="button" class="custom-button">
                    <i class="flat"></i>
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <button
            type="button"
            class="btn-close shadow-none"
            data-bs-dismiss="modal"
            aria-label="Close"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "PurchaseInDetails",
  props: {
    purchases: {
      type: Array,
      required: true
    },
    deleteByPurchaseId: {
      type: Function,
      required: true
    },
    downloadNakladnoy: {
      type: Function,
      required: true
    },
    noDebt: {
      type: Function,
      required: true
    },
  },
  data() {
    return {
    }
  },
  methods: {
    childNoDebt(id) {
      this.noDebt(id); // Call the method with a parameter
    },
    childDownloadNakladnoy(id) {
      this.downloadNakladnoy(id); // Call the method with a parameter
    },
    childDeleteByPurchaseId(id) {
      this.deleteByPurchaseId(id); // Call the method with a parameter
    },
  }
};
</script>

<style scoped>
.custom-button {
  display: inline-block;
  color: white;
  background-color: #164ebe; /* gray-500 */
  border-radius: 0.45rem; /* rounded */
  padding:0.58rem 0.625rem; /* px-2.5 py-1.5 */
  font-size: 0.875rem; /* text-sm */
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 3px;
}

.custom-button:hover {
  background-color: #0d6df3; /* hover:bg-gray-600 */
}

.custom-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(209, 213, 219, 0.5); /* focus:ring-gray-200 */
}

.fa-solid, .fa-regular {
  font-size:  15px;
}
</style>