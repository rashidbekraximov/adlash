<template>
  <div
      class="modal fade createNewModal"
      id="createIncomeGeneralItemModal"
      tabindex="-1"
      aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
          <h5 class="modal-title fw-bold text-black">Kirim</h5>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
          <form>
            <div class="row">
              <div class="col-lg-6 col-md-6 d-none">
                <div class="form-group mb-15 mb-md-25">
                  <input
                      type="number"
                      v-model="sparePart.id"
                  />
                </div>
              </div>
              <div class="col-lg-6 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Sana
                  </label>
                  <input
                      type="date"
                      class="form-control shadow-none rounded-0 text-black"
                      v-model="sparePart.date"
                      not_empty='true'
                  />
                </div>
              </div>
              <div class="col-lg-6 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Tovar guruhi
                  </label>
                  <select class="form-select fs-md-15 text-black shadow-none" @change="checkGroup(sparePart.item)" not_empty='true' v-model="sparePart.item">
                    <option selected disabled value="">Tanlang...</option>
                    <option value="SPARE_PART">Ehtiyot qism</option>
                    <option value="FUEL">Yoqilg'i</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6 col-md-6" v-if="isSpare">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Ehtiyot qism turi
                  </label>
                  <select class="form-select fs-md-15 text-black shadow-none" not_empty='true' v-model="sparePart.sparePartTypeId">
                    <option selected disabled value="0">Tanlang...</option>
                    <option v-for="(u,index) in spareTypes" v-bind:key="index" :value="index">{{ u }}</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-6 col-md-6" v-if="isFuel">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Yoqilg'i turi
                  </label>
                  <select class="form-select fs-md-15 text-black shadow-none" not_empty='true' v-model="sparePart.fuelTypeId">
                    <option selected disabled value="0">Tanlang...</option>
                    <option v-for="(u,index) in fuelTypes" v-bind:key="index" :value="index">{{ u }}</option>
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
                      v-model="sparePart.qty"
                      not_empty='true'
                      @input="calcRemainder"
                  />
                </div>
              </div>
              <div class="col-lg-6 col-md-12">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Narxi
                  </label>
                  <input
                      type="number"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="e.g. 100"
                      v-model="sparePart.price"
                      not_empty='true'
                      @input="calcRemainder"
                  />
                </div>
              </div>
              <div class="col-lg-6 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Summa
                  </label>
                  <input
                      type="number"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="e.g. 100"
                      v-model="sparePart.value"
                      readonly
                  />
                </div>
              </div>
              <div class="col-lg-6 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Korxona
                  </label>
                  <select class="form-select fs-md-15 text-black shadow-none"
                          v-model="sparePart.mchj">
                    <option value="CHSM">CHSM</option>
                    <option value="LEADER_BETON_1">LB 1</option>
                    <option value="LEADER_BETON_2">LB 2</option>
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
import axios from "@/axios/axios.js";
import message, {checkPermissionSave} from "@/message/message.js";
import router from "@/router";
import validator from "@/validation/validator";

export default {
  name: "AddIncomeGeneralItem",
  props: {
    editId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      sparePart: {
        id:0,
        date:'',
        sparePartTypeId: 0,
        item: '',
        fuelTypeId: 0,
        qty: 0,
        price: 0,
        value: 0,
        mchj: 'CHSM'
      },
      isFuel: false,
      isSpare: false,
      spareTypes: [],
      fuelTypes: [],
    }
  },
  methods: {
    calcRemainder() {
      this.sparePart.value = this.sparePart.qty * this.sparePart.price;
    },
    save() {
      let valid = validator();
      if (valid) {
        if (this.sparePart.item === "FUEL"){
          this.sparePart.sparePartTypeId = 0;
        }else{
          this.sparePart.fuelTypeId = 0;
        }
        axios.post("spare-part/save" + localStorage.getItem("lang"), this.sparePart).then(res => {
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
    checkGroup(type){
      if (type === "FUEL"){
        this.isFuel = true;
        this.isSpare = false;
      }else{
        this.isFuel = false;
        this.isSpare = true;
      }
    },
    getSpareTypes() {
      axios.get("references/def/spare_types" + localStorage.getItem('lang')).then(res => {
        this.spareTypes = res.data
      })
    },
    getFuelTypes() {
      axios.get("references/def/fuel_type" + localStorage.getItem('lang')).then(res => {
        this.fuelTypes = res.data
      })
    },
    getById(id) {
      if (!isNaN(parseInt(id)) && id !== 0) {
        axios.get("spare-part/" + parseInt(id)).then(res => {
          this.sparePart = res.data
          if (res.data.fuelType === undefined){
            this.isFuel = false;
            this.isSpare = true;
            this.sparePart.sparePartTypeId = res.data.sparePartType.id
          }else{
            this.isFuel = true;
            this.isSpare = false;
            this.sparePart.fuelTypeId = res.data.fuelType.id
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
    this.getSpareTypes()
    this.getFuelTypes()
  }
};
</script>

<style scoped>

</style>