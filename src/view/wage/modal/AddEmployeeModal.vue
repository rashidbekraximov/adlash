<template>
  <div
      class="modal fade createNewModal"
      id="createWorkerModal"
      tabindex="-1"
      aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
          <h5 class="modal-title fw-bold text-black">Ishchi qo'shish</h5>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
          <form>
            <div class="row">
              <div class="col-lg-6 col-md-6 d-none">
                <div class="form-group mb-15 mb-md-25">
                  <input
                      type="number"
                      v-model="worker.id"
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
                      v-model="worker.name"
                      not_empty='true'
                  />
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Lavozim
                  </label>
                  <select class="form-select fs-md-15 text-black shadow-none" not_empty='true'
                          v-model="worker.positionId">
                    <option selected disabled value="0">Tanlang...</option>
                    <option v-for="(u,index) in positions" v-bind:key="index" :value="index">{{ u }}</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    1 soatlik ish haqi qiymati
                  </label>
                  <input
                      type="number"
                      class="form-control shadow-none rounded-0 text-black"
                      v-model="worker.perHourWageAmount"
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
                      YO'NALISH
                    </th>
                    <th
                        scope="col"
                        class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                    >
                      FOIZ %
                    </th>
                    <th
                        scope="col"
                        class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 pe-0"
                    >
                      <img src="@/assets/images/img/add.png" style="width: 25px; height: 25px" alt="Add"
                           @click="addRow">
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(percentage,index) in worker.percentages" :id="index" v-bind:key="index">
                    <th class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0">
                      <select class="form-select fs-md-15 text-black shadow-none" v-model="percentage.directionId">
                        <option selected disabled value="0">Tanlang...</option>
                        <option v-for="(direction,index) in directions" v-bind:key="index" :value="index">
                          {{ direction }}
                        </option>
                      </select>
                    </th>
                    <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                      <input
                          type="number"
                          class="form-control shadow-none rounded-0 text-black"
                          placeholder="e.g. 100"
                          not_empty='true'
                          v-model="percentage.percentage"
                      />
                    </td>
                    <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                      <img src="@/assets/images/img/delete1.png" style="width: 35px; height: 35px" alt="Add"
                           @click="removeRow(index)">
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="col-lg-12 col-md-6">
              <div class="form-group mb-15 mb-md-25">
                <label class="d-block text-black fw-semibold mb-10">
                  Holati
                </label>
                <select class="form-select fs-md-15 text-black shadow-none" not_empty='true'
                        v-model="worker.status">
                  <option value="ACTIVE" selected>Faol</option>
                  <option value="PASSIVE">Passiv</option>
                </select>
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
import validator from "@/validation/validator";

export default {
  name: "AddEmployeeModal",
  props: {
    editId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      worker: {
        id: 0,
        name: '',
        positionId: 0,
        perHourWageAmount: 0,
        status: 'ACTIVE',
        percentages: []
      },
      positions: [],
      directions: []
    }
  },
  methods: {
    addRow() {
      this.worker.percentages.push({name1: '', name2: '', name3: '', name4: '', name5: '', name6: '', name7: ''})
      message('success', "Yangi qator qo'shildi !");
    },
    removeRow(index) {
      this.worker.percentages.splice(index, 1);
      message('warn', index + 1 + `-qator o'chirildi !`);
    },
    save() {
      let valid = validator();
      if (valid) {
        this.$http.post("worker/save" + localStorage.getItem("lang"), this.worker).then(res => {
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
        message('warn', "Ma'lumotlar to'liq kiritilmagan !");
      }
    },
    getPositions() {
      this.$http.get("references/def/position" + localStorage.getItem('lang')).then(res => {
        this.positions = res.data
      })
    },
    getDirections() {
      this.$http.get("references/def/direction" + localStorage.getItem('lang')).then(res => {
        this.directions = res.data
      })
    },
    getById(num) {
      if (!isNaN(parseInt(num)) && num !== 0) {
        this.$http.get("worker/" + parseInt(num)).then(res => {
          this.worker = res.data
          this.worker.positionId = this.worker.position.id
        })
      }
    },
  },
  created() {
    this.getPositions()
    this.getDirections()
  },
  watch: {
    editId(newId) {
      this.getById(newId);
    }
  },
  mounted() {
    this.getById(this.editId);
  },
};
</script>

<style scoped>

</style>