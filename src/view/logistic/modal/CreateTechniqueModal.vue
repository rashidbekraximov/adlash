<template>
  <div
      class="modal fade createNewModal"
      id="createNewTechniqueModal"
      tabindex="-1"
      aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
          <h5 class="modal-title fw-bold text-black">Texnika qo'shish</h5>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
          <form>
            <div class="row">
              <div class="col-lg-6 col-md-6 d-none">
                <div class="form-group mb-15 mb-md-25">
                  <input
                      type="number"
                      v-model="technician.id"
                  />
                </div>
              </div>
              <div class="col-lg-6 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Texninka turi
                  </label>
                  <select class="form-select fs-md-15 text-black shadow-none" v-model="technician.techniqueTypeId">
                    <option selected disabled value="0">Tanlang...</option>
                    <option v-for="(u,index) in techniqueTypes" v-bind:key="index" :value="index">{{ u }}</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Auto raqami
                  </label>
                  <input
                      type="text"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="e.g. 100"
                      v-model="technician.autoNumber"
                  />
                </div>
              </div>
              <div class="col-lg-6 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Gaz narxi
                  </label>
                  <input
                      type="number"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="e.g. 100"
                      v-model="technician.gasPrice"
                      @input="gasCalc()"
                  />
                </div>
              </div>
              <div class="col-lg-6 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    1 km ga gaz xarajati
                  </label>
                  <input
                      type="number"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="e.g. 100"
                      readonly
                      v-model="technician.perKmGasCost"
                  />
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Ballon donasi
                  </label>
                  <input
                      type="number"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="e.g. 100"
                      v-model="technician.ballon"
                      @input="ballonCalc"
                  />
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Ballon narxi
                  </label>
                  <input
                      type="number"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="e.g. 100"
                      v-model="technician.ballonAmount"
                      @input="ballonCalc"
                  />
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    1 km ga ballon xarajati
                  </label>
                  <input
                      type="number"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="e.g. 100"
                      v-model="technician.perKmBallonCost"
                      readonly
                  />
                </div>
              </div>
              <div class="col-lg-6 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Moy narxi
                  </label>
                  <input
                      type="number"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="e.g. 100"
                      v-model="technician.oilPrice"
                      @input="oilCalc"
                  />
                </div>
              </div>
              <div class="col-lg-6 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    1 km ga moy xarajati
                  </label>
                  <input
                      type="number"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="e.g. 100"
                      v-model="technician.perKmOilCost"
                      readonly
                  />
                </div>
              </div>
              <div class="col-lg-6 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Amortizatsiya
                  </label>
                  <input
                      type="number"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="e.g. 100"
                      v-model="technician.amortization"
                      @input="amortizationCalc()"
                  />
                </div>
              </div>
              <div class="col-lg-6 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    1 km ga amortizatsiya
                  </label>
                  <input
                      type="number"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="e.g. 100"
                      v-model="technician.perKmAmortization"
                      readonly
                  />
                </div>
              </div>
              <div class="col-lg-12 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    1 km ga oylik
                  </label>
                  <input
                      type="number"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="e.g. 100"
                      @input="allPerKmAmountCalc()"
                      v-model="technician.perKmSalaryAmount"
                  />
                </div>
              </div>
              <div class="col-lg-12 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Umumiy 1 km ga xarajat
                  </label>
                  <input
                      type="number"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="e.g. 100"
                      v-model="technician.perKmCostAmount"
                  />
                </div>
              </div>
              <div class="col-lg-6 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Yo'nalish
                  </label>
                  <select class="form-select fs-md-15 text-black shadow-none" v-model="technician.directionId">
                    <option selected disabled value="0">Tanlang...</option>
                    <option v-for="(u,index) in directions" v-bind:key="index" :value="index">{{ u }}</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Holati
                  </label>
                  <select class="form-select fs-md-15 text-black shadow-none" v-model="technician.status">
                    <option selected value="ACTIVE">Faol</option>
                    <option value="PASSIVE">Passiv</option>
                  </select>
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
import message, {checkPermissionSave} from "@/message/message";
import axios from "@/axios/axios";
import router from "@/router";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "CreateTechniqueModal",
  props: {
    editId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      technician: {
        id: 0,
        employeeId: 0,
        techniqueTypeId: 0,
        gasPrice: 0,
        perKmGasCost: 0,
        ballon: 0,
        ballonAmount: 0,
        perKmBallonCost: 0,
        oilPrice: 0,
        perKmOilCost: 0,
        amortization: 0,
        perKmAmortization: 0,
        autoNumber: '',
        perKmCostAmount: 0,
        perKmSalaryAmount: 0,
        directionId: 0,
        status: 'ACTIVE'
      },
      positions: [],
      directions: [],
      employee: [],
      techniqueTypes: []
    }
  },
  methods: {
    gasCalc() {
      this.technician.perKmGasCost = this.technician.gasPrice * 0.753;
      this.allPerKmAmountCalc();
    },
    ballonCalc() {
      this.technician.perKmBallonCost = Math.round(this.technician.ballon * this.technician.ballonAmount / 70000 * 100) / 100;
      this.allPerKmAmountCalc();
    },
    oilCalc() {
      this.technician.perKmOilCost = Math.round(this.technician.oilPrice * 40 / 15000 * 100) / 100;
      this.allPerKmAmountCalc();
    },
    amortizationCalc() {
      this.technician.perKmAmortization = Math.round(this.technician.amortization / 330 * 100) / 100;
      this.allPerKmAmountCalc();
    },
    allPerKmAmountCalc() {
      this.technician.perKmCostAmount = Math.round((this.technician.perKmGasCost + this.technician.perKmBallonCost + this.technician.perKmOilCost + this.technician.perKmAmortization + this.technician.perKmSalaryAmount) * 100) / 100;
    },
    save() {
      let valid = this.validation();
      if (valid) {
        axios.post("technician/save" + localStorage.getItem("lang"), this.technician).then(res => {
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
      } else {
        this.message('warn', "Ma'lumotlar to'liq kiritilmagan !");
      }
    },
    getTechniqueTypes() {
      axios.get("references/def/technique_type" + localStorage.getItem('lang')).then(res => {
        this.techniqueTypes = res.data
      })
    },
    getDirections() {
      axios.get("references/def/direction" + localStorage.getItem('lang')).then(res => {
        this.directions = res.data
      })
    },
    getEmployee() {
      axios.get("worker/select" + localStorage.getItem('lang')).then(res => {
        this.employee = res.data
      })
    },
    getById(id) {
      if (!isNaN(parseInt(id)) && id !== 0) {
        axios.get("technician/" + parseInt(id)).then(res => {
          this.technician = res.data
          this.technician.directionId = this.technician.direction.id
          this.technician.techniqueTypeId = this.technician.techniqueType.id
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
    this.getEmployee()
    this.getDirections()
    this.getTechniqueTypes()
    // this.getById()
  }
};
</script>

<style scoped>

</style>