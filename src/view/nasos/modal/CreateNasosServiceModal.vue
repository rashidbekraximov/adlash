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
          <h5 class="modal-title fw-bold text-black">Xizmat ko'rsatish</h5>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
          <form>
            <div class="row">
              <div class="col-lg-6 col-md-6 d-none">
                <div class="form-group mb-15 mb-md-25">
                  <input
                      type="number"
                      v-model="nasos.id"
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
                      v-model="nasos.date"
                      not_empty='true'
                  />
                </div>
              </div>
              <div class="col-lg-6 col-md-12">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Mijoz
                  </label>
                  <input
                      type="text"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="e.g. 100"
                      v-model="nasos.client"
                      not_empty='true'
                  />
                </div>
              </div>
              <div class="col-lg-6 col-md-12">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Ishlagan soati
                  </label>
                  <input
                      type="number"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="e.g. 100"
                      v-model="nasos.workHour"
                      not_empty='true'
                  />
                </div>
              </div>
              <div class="col-lg-6 col-md-12">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Minimal summa
                  </label>
                  <input
                      type="number"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="e.g. 100"
                      v-model="nasos.minPrice"
                      not_empty='true'
                  />
                </div>
              </div>
              <div class="col-lg-6 col-md-12">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Qo'shimcha summa
                  </label>
                  <input
                      type="number"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="e.g. 100"
                      v-model="nasos.additionalPrice"
                      not_empty='true'
                  />
                </div>
              </div>
              <div class="col-lg-6 col-md-12">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Umumiy summa
                  </label>
                  <input
                      type="number"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="e.g. 100"
                      v-model="nasos.totalSumm"
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
                    v-model="nasos.description"
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
  name: "CreateNasosServiceModal",
  props: {
    editId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      nasos: {
        id:0,
        date:'',
        client:'',
        workHour: 0,
        minPrice: 0,
        additionalPrice: 0,
        totalSumm: 0,
        description: ""
      },
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
        this.$http.post("nasos-service/save" + localStorage.getItem("lang"), this.nasos).then(res => {
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
    getById(num) {
      if (!isNaN(parseInt(num)) && num !== 0) {
        this.$http.get("nasos-service/" + parseInt(num)).then(res => {
          this.nasos = res.data
        })
      }
    },
  },
  mounted() {
    this.getById(this.editId);
  },
};
</script>

<style scoped>

</style>