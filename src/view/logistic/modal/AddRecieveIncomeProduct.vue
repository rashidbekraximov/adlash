<template>
  <div
      class="modal fade createNewModal"
      id="createRecieveIncomeModal"
      tabindex="-1"
      aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
          <h5 class="modal-title fw-bold text-black">Mahsulot kirim</h5>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
          <form>
            <div class="row">
              <div class="col-lg-6 col-md-6 d-none">
                <div class="form-group mb-15 mb-md-25">
                  <input
                      type="number"
                      v-model="bringDrobilkaProduct.id"
                  />
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Drobilka turi
                  </label>
                  <select class="form-select fs-md-15 text-black shadow-none" not_empty='true' v-model="bringDrobilkaProduct.drobilkaTypeId">
                    <option selected disabled value="0">Tanlang...</option>
                    <option v-for="(u,index) in drobilkaTypes" v-bind:key="index" :value="index">{{ u }}</option>
                  </select>
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
                      v-model="bringDrobilkaProduct.date"
                      not_empty='true'
                  />
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Mahsulot
                  </label>
                  <select class="form-select fs-md-15 text-black shadow-none" not_empty='true'  v-model="bringDrobilkaProduct.productTypeId">
                    <option selected disabled value="0">Tanlang...</option>
                    <option v-for="(u,index) in productTypes" v-bind:key="index" :value="index">{{ u }}</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    O'lchov birlik
                  </label>
                  <select class="form-select fs-md-15 text-black shadow-none" not_empty='true'  v-model="bringDrobilkaProduct.unitId">
                    <option selected disabled value="0">Tanlang...</option>
                    <option v-for="(u,index) in units" v-bind:key="index" :value="index">{{ u }}</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-4 col-md-12">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Kirim miqdori
                  </label>
                  <input
                      type="number"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="e.g. 100"
                      not_empty='true'
                      v-model="bringDrobilkaProduct.amount"
                  />
                </div>
              </div>
              <div class="col-lg-4 col-md-12">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Drobilka miqdori
                  </label>
                  <input
                      type="number"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="e.g. 100"
                      not_empty='true'
                      v-model="bringDrobilkaProduct.drobilkaAmount"
                      @input="add"
                  />
                </div>
              </div>
              <div class="col-lg-4 col-md-12">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Narxi
                  </label>
                  <input
                      type="number"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="e.g. 100"
                      v-model="bringDrobilkaProduct.price"
                      @input="add"
                      not_empty='true'
                  />
                </div>
              </div>
              <div class="col-lg-4 col-md-12">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Summa
                  </label>
                  <input
                      type="number"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="e.g. 100"
                      v-model="bringDrobilkaProduct.value"
                      not_empty='true'
                  />
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Texnika turi
                  </label>
                  <select class="form-select fs-md-15 text-black shadow-none" not_empty='true'  v-model="bringDrobilkaProduct.technicianId">
                    <option selected disabled value="0">Tanlang...</option>
                    <option v-for="(u,index) in technicians" v-bind:key="index" :value="index">{{ u }}</option>
                  </select>
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
                      v-model="bringDrobilkaProduct.km"
                      not_empty='true'
                  />
                </div>
              </div>
              <div class="col-lg-4 col-md-12">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Daromad
                  </label>
                  <input
                      type="number"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="e.g. 100"
                      v-model="bringDrobilkaProduct.income"
                      not_empty='true'
                  />
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Korxona
                  </label>
                  <select class="form-select fs-md-15 text-black shadow-none" not_empty='true'  v-model="bringDrobilkaProduct.mchj">
                    <option value="CHSM" selected>CHSM</option>
                    <option value="LEADER_BETON_1">1 - Leader Beton</option>
                    <option value="LEADER_BETON_2">2 - Leader Beton</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-12 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label
                      for="basicFormControlTextarea1"
                      class="form-label fw-medium text-black"
                  >
                    Izoh
                  </label>
                  <textarea
                      class="form-control shadow-none fs-md-15 text-black"
                      id="basicFormControlTextarea1"
                      rows="3"
                      v-model="bringDrobilkaProduct.description"
                  ></textarea>
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

<script lang="ts">
import {defineComponent} from "vue";
import axios from "@/axios/axios.js";
import message, {checkPermissionSave} from "@/message/message.js";
import validator from "@/validation/validator.js";
import router from "@/router";

export default defineComponent({
  name: "AddRecieveIncomeProduct",
  data() {
    return {
      bringDrobilkaProduct:{
        unitId: 0,
        technicianId: 0,
        drobilkaTypeId: 0,
        productTypeId: 0,
        income: 0,
        drobilkaAmount: 0,
        price: 0,
        amount: 0,
        value: 0,
        km:30,
        mchj: "CHSM",
        description: ""
      },
      units:[],
      productTypes:[],
      drobilkaTypes:[],
      technicians:[],
    }
  },
  methods: {
    add(){
      this.bringDrobilkaProduct.value = this.bringDrobilkaProduct.price * this.bringDrobilkaProduct.drobilkaAmount;
    },
    save(){
      let valid = validator();
      if (valid) {
        axios.post("bring-drobilka-product/save", this.bringDrobilkaProduct).then(res => {
          if (res.status === 201) {
            message('success', res.data.message);
            setTimeout(() => {
              location.reload();
            },3000)
          } else {
            message('error', "Xato yuzaga keldi !");
          }
        }).catch((reason) => {
          checkPermissionSave(reason)
        })
      }else{
        message('warn',"Ma'lumotlar to'liq kiritilmagan !");
      }
    },
    getUnits() {
      axios.get("references/def/unit" + localStorage.getItem('lang')).then(res => {
        this.units = res.data
      })
    },
    getTechnicians() {
      axios.get("technician/select" + localStorage.getItem('lang')).then(res => {
        this.technicians = res.data
      })
    },
    getDrobilkaTypes() {
      axios.get("references/def/drobilka_type" + localStorage.getItem('lang')).then(res => {
        this.drobilkaTypes = res.data
      })
    },
    getProductTypes() {
      axios.get("references/def/product_type" + localStorage.getItem('lang')).then(res => {
        this.productTypes = res.data
      })
    },
    getDrobilkaAmount(drobilka,product) {
      if (drobilka !== 0 && product !== 0){
        axios.get("drobilka/" + drobilka + "/" + product).then(res => {
          console.log(res.data)
          this.bringDrobilkaProduct.drobilkaAmount = res.data.amount
        })
      }
    },
    cancel(){
      router.go(-1);
    }
  },
  created() {
    this.getUnits()
    this.getProductTypes()
    this.getDrobilkaTypes()
    this.getTechnicians()
  }
});
</script>

<style scoped>

</style>