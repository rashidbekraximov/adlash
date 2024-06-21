<template>
  <div
      class="modal fade createNewModal"
      id="createProduceRemainderModal"
      tabindex="-1"
      aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
          <h5 class="modal-title fw-bold text-black">Mahsulot qo'shish</h5>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
          <form>
            <div class="row">
              <div class="col-lg-6 col-md-6 d-none">
                <div class="form-group mb-15 mb-md-25">
                  <input
                      type="number"
                      v-model="remainder.id"
                  />
                </div>
              </div>
              <div class="col-lg-6 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Mahsulot
                  </label>
                  <select class="form-select fs-md-15 text-black shadow-none" not_empty='true' v-model="remainder.productForProduceId">
                    <option selected disabled value="0">Tanlang...</option>
                    <option v-for="(u,index) in productTypes" v-bind:key="index" :value="index">{{ u }}</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6 col-md-12">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Miqdor
                  </label>
                  <input
                      type="number"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="e.g. 100"
                      v-model="remainder.amount"
                      not_empty='true'
                  />
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Sex
                  </label>
                  <select class="form-select fs-md-15 text-black shadow-none" not_empty='true' v-model="remainder.sexEnum">
                    <option selected value="SEX1">1-Sex</option>
                    <option value="SEX2">2-Sex</option>
                  </select>
                </div>
              </div>
            </div>
            <button
                class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16"
                type="button"
                @click="saveRemainder"
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

import validator from "@/validation/validator";
import message, {checkPermissionSave} from "@/message/message";

export default {
  name: "AddProduceRemainderModal",
  data() {
    return {
      remainder:{
        id:0,
        productForProduceId : 0,
        amount: 0,
      },
      productTypes:[],
      sortedProductTypes:[],
    }
  },
  methods: {
    saveRemainder(){
      let valid = validator()
      if (valid) {
        this.$http.post("produce-remainder/save" + localStorage.getItem("lang"), this.remainder).then(res => {
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
    getProductTypes() {
      this.$http.get("references/def/product_for_produce" + localStorage.getItem('lang')).then(res => {
        this.productTypes = res.data
      })
    },
  },
  created() {
    this.getProductTypes()
  }
};
</script>

<style scoped>

</style>