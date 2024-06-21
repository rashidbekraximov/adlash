<template>
  <div
      class="modal fade createNewModal"
      id="createProduceCostModal"
      tabindex="-1"
      aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
          <h5 class="modal-title fw-bold text-black">Xarajat qo'shish</h5>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
          <form>
            <div class="row">
              <div class="col-lg-6 col-md-6 d-none">
                <div class="form-group mb-15 mb-md-25">
                  <input
                      type="number"
                      v-model="cost.id"
                  />
                </div>
              </div>
              <div class="col-lg-6 col-md-12">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Sana
                  </label>
                  <input
                      type="date"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="e.g. 04/10/2002"
                      v-model="cost.date"
                      not_empty='true'
                  />
                </div>
              </div>
              <div class="col-lg-6 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Xarajat guruhi
                  </label>
                  <select class="form-select fs-md-15 text-black shadow-none" not_empty='true' v-model="cost.costTypeId">
                    <option selected disabled value="0">Tanlang...</option>
                    <option v-for="(u,index) in costTypes" v-bind:key="index" :value="index">{{ u }}</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6 col-md-12">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Summa
                  </label>
                  <input
                      type="number"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="e.g. 100"
                      v-model="cost.amount"
                      not_empty='true'
                  />
                </div>
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
                    v-model="cost.description"
                ></textarea>
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

import validator from "../../../validation/validator";
import message, {checkPermissionSave} from "../../../message/message";

export default {
  name: "CreateNasosCostModal",
  props: {
    editId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      cost: {
        id:0,
        date:'',
        costTypeId: 0,
        amount: 0,
        description: ""
      },
      costTypes: []
    }
  },
  watch: {
    editId(newId) {
      this.getById(newId);
    }
  },
  methods: {
    save() {
      let valid = validator();
      if (valid) {
        this.$http.post("nasos-cost/save" + localStorage.getItem("lang"), this.cost).then(res => {
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
    getCostTypes() {
      this.$http.get("references/def/nasos_cost_type" + localStorage.getItem('lang')).then(res => {
        this.costTypes = res.data
      })
    },
    getById(num) {
      if (!isNaN(parseInt(num)) && num !== 0) {
        this.$http.get("nasos-cost/" + parseInt(num)).then(res => {
          this.cost = res.data
          this.cost.costTypeId = this.cost.costType.id;
        })
      }
    },
  },

  mounted() {
    this.getById(this.editId);
  },
  created() {
    this.getCostTypes()
  }
};
</script>

<style scoped>

</style>