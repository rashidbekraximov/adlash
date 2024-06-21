<template>
  <div
      class="modal fade createNewModal"
      id="createDrobilkaModal"
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
                      v-model="drobilka.id"
                  />
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Drobilka turi
                  </label>
                  <select class="form-select fs-md-15 text-black shadow-none" v-model="drobilka.drobilkaTypeId">
                    <option selected disabled value="0">Tanlang...</option>
                    <option v-for="(u,index) in drobilkaTypes" v-bind:key="index" :value="index">{{ u }}</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Mahsulot
                  </label>
                  <select class="form-select fs-md-15 text-black shadow-none" v-model="drobilka.productTypeId">
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
                  <select class="form-select fs-md-15 text-black shadow-none" v-model="drobilka.unitId">
                    <option selected disabled value="0">Tanlang...</option>
                    <option v-for="(u,index) in units" v-bind:key="index" :value="index">{{ u }}</option>
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
                      v-model="drobilka.amount"
                  />
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
                      v-model="drobilka.value"
                  />
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
                      v-model="drobilka.description"
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

<script>
import axios from "@/axios/axios.js";
import message, {checkPermissionSave} from "@/message/message.js";

export default {
  name: "CreateDrobilkaModal",
  props: {
    editId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      drobilka: {
        id: 0,
        drobilkaTypeId: 0,
        productTypeId: 0,
        unitId: 0,
        amount: 0,
        value: 0,
        description: ""
      },
      units: [],
      drobilkaTypes: [],
      productTypes: []
    }
  },
  watch: {
    editId(newId) {
      this.getById(newId);
    }
  },
  methods: {
    save() {
      axios.post("drobilka/save" + localStorage.getItem("lang"), this.drobilka).then(res => {
        if (res.status === 201) {
          message('success', res.data.message);
          setTimeout(() => {
            location.reload();
          }, 3000)
        } else {
          message('error', "Xato yuzaga keldi !");
        }
      }).catch((reason) => {
        checkPermissionSave(reason)
      })
    },
    getUnits() {
      axios.get("references/def/unit" + localStorage.getItem('lang')).then(res => {
        this.units = res.data
      })
    },
    getProductTypes() {
      axios.get("references/def/product_type" + localStorage.getItem('lang')).then(res => {
        this.productTypes = res.data
      })
    },
    getDrobilkaTypes() {
      axios.get("references/def/drobilka_type" + localStorage.getItem('lang')).then(res => {
        this.drobilkaTypes = res.data
      })
    },
    getById(id) {
      if (!isNaN(parseInt(id)) && id !== 0){
        axios.get("drobilka/" + parseInt(id)).then(res => {
          this.drobilka = res.data
          this.drobilka.productTypeId = this.drobilka.productType.id;
          this.drobilka.drobilkaTypeId = this.drobilka.drobilkaType.id;
          this.drobilka.unitId = this.drobilka.unit.id;
        })
      }
    },
  },
  mounted() {
    this.getById(this.editId);
  },
  created() {
    this.getUnits()
    this.getProductTypes()
    this.getDrobilkaTypes()
  }
};
</script>

<style scoped>

</style>