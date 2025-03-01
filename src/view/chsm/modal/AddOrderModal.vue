<template>
  <div
      class="modal fade createNewModal"
      id="createOrderModal"
      tabindex="-1"
      aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
          <h5 class="modal-title fw-bold text-black">Buyurtma qo'shish</h5>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
          <form>
            <div class="row">
              <div class="col-lg-6 col-md-6 d-none">
                <div class="form-group mb-15 mb-md-25">
                  <input
                      type="number"
                      v-model="order.id"
                  />
                </div>
              </div>
              <div class="col-lg-4 col-md-12">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    F.I.SH
                  </label>
                  <input
                      type="text"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="e.g. Sadriddin"
                      v-model="order.client"
                      not_empty='true'
                  />
                </div>
              </div>
              <div class="col-lg-4 col-md-12">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Telefon raqami
                  </label>
                  <input
                      type="number"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="e.g. +998991234567"
                      v-model="order.phoneNumber"
                      not_empty='true'
                  />
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Sana
                  </label>
                  <input
                      type="date"
                      class="form-control shadow-none rounded-0 text-black"
                      v-model="order.date"
                      not_empty='true'
                  />
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
                      MAHSULOT
                    </th>
                    <th
                        scope="col"
                        class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                    >
                      HAJMI
                    </th>
                    <th
                        scope="col"
                        class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                    >
                      NARXI
                    </th>
                    <th
                        scope="col"
                        class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                    >
                      SUMMA
                    </th>
                    <th
                        scope="col"
                        class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 pe-0"
                    >
                      <img src="@/assets/images/img/add.png" style="width: 25px; height: 25px" alt="Add" @click="addRow">
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(tableData,index) in order.purchasedProductList" :id="index" v-bind:key="index">
                    <th class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0">
                      <select class="form-select fs-md-15 text-black shadow-none"  @change="getProductPrice(index,tableData.productTypeId)" v-model="tableData.productTypeId">
                        <option selected disabled value="0">Tanlang...</option>
                        <option v-for="(u,index) in productTypes" v-bind:key="index" :value="index">{{ u }}</option>
                      </select>
                    </th>
                    <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                      <input
                          type="number"
                          class="form-control shadow-none rounded-0 text-black"
                          placeholder="e.g. 100"
                          not_empty='true'
                          v-model="tableData.weight"
                          @input="addValue(index,tableData.price,tableData.weight)"
                      />
                    </td>
                    <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                      <input
                          type="number"
                          class="form-control shadow-none rounded-0 text-black"
                          placeholder="e.g. 100"
                          not_empty='true'
                          v-model="tableData.price"
                          @input="addValue(index,tableData.price,tableData.weight)"
                      />
                    </td>
                    <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                      <input
                          type="number"
                          class="form-control shadow-none rounded-0 text-black"
                          placeholder="e.g. 100"
                          v-model="tableData.value"
                          readonly
                      />
                    </td>
                    <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                      <img src="@/assets/images/img/delete1.png" style="width: 35px; height: 35px" alt="Add" @click="removeRow(index)">
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-lg-4 col-md-12">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Yo'l haqi
                  </label>
                  <input
                      type="number"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="e.g. 100"
                      @input="calcTotalValue()"
                      v-model="order.fare"
                      not_empty='true'
                  />
                </div>
              </div>
              <div class="col-lg-4 col-md-12">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Umumiy summa
                  </label>
                  <input
                      type="number"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="e.g. 100"
                      v-model="order.totalValue"
                      not_empty='true'
                      readonly
                  />
                </div>
              </div>
              <div class="col-lg-4 col-md-12">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Km
                  </label>
                  <input
                      type="number"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="e.g. 100"
                      v-model="order.km"
                      not_empty='true'
                  />
                </div>
              </div>
              <div class="col-lg-4 col-md-12">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Manzil
                  </label>
                  <input
                      type="text"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="e.g. G'azalkent"
                      v-model="order.location"
                      not_empty='true'
                  />
                </div>
              </div>
            </div>
            <button
                class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16"
                type="button"
                @click="save"
            >
              Saqlash
            </button>
          </form>
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
import axios from "@/axios/axios.js";
import message, {checkPermissionSave} from "@/message/message.js";
import router from "@/router";
import validator from "@/validation/validator";

export default {
  name: "AddOrderModal",
  props: {
    editId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      order: {
        totalValue: 0,
        fare: 0,
        km: 0,
        purchasedProductList: [{
          productTypeId: 0,
          weight: 0,
          price: 0,
          value: 0
        }],
      },
      productTypes: [],
    }
  },
  methods: {
    calcTotalValue() {
      let tableValue = 0;
      for (let i = 0; i < this.order.purchasedProductList.length; i++) {
        tableValue = tableValue + this.order.purchasedProductList[i].value;
      }
      this.order.totalValue = tableValue + this.order.fare;
      // this.calcRemainder()
    },

    addValue(index, price, weight) {
      this.order.purchasedProductList[index].value = price * weight;
      this.calcTotalValue()
    },
    addRow() {
      this.order.purchasedProductList.push({productTypeId: 0, weight: 0, price: 0, value: 0})
      message('error', "Yangi qator qo'shildi !");
    },
    removeRow(index) {
      this.order.purchasedProductList.splice(index, 1);
      message('error', index + 1 + `-qator o'chirildi !`);
    },
    save() {
      let valid = validator();
      if (valid) {
        axios.post("order/save" + localStorage.getItem("lang"), this.order).then(res => {
          if (res.status === 201) {
            message('success',res.data.message);
            setTimeout(() => {
              location.reload();
            },3000)
          } else {
            message('error',"Xato yuzaga keldi !");
          }
        }).catch((reason) => {
          checkPermissionSave(reason)
        })
      }else{
        message('warn',"Ma'lumotlar to'liq kiritilmagan !");
      }
    },
    getProductTypes() {
      axios.get("references/def/product_type" + localStorage.getItem('lang')).then(res => {
        this.productTypes = res.data
      })
    },
    getProductPrice(index, id) {
      axios.get("price-input/" + id + localStorage.getItem('lang')).then(res => {
        this.order.purchasedProductList[index].price = res.data
      })
      this.addValue(index, this.order.purchasedProductList[index].price, 0)
    },
    getById(id) {
      if (!isNaN(parseInt(id)) && id !== 0) {
        axios.get("order/" + parseInt(id)).then(res => {
          this.order = res.data
          for (let i = 0; i < this.order.purchasedProductList.length; i++) {
            this.order.purchasedProductList[i].productTypeId = this.order.purchasedProductList[i].productType.id;
          }
        })
      }
    },
    cancel() {
      router.go(-1);
    }
  },
  watch: {
    editId(newId) {
      this.getById(newId);
    }
  },
  mounted() {
    this.getById(this.editId);
  },
  created() {
    this.getProductTypes()
  }
};
</script>

<style scoped>

</style>