<template>
  <div
      class="modal fade createNewModal"
      id="createDismissalModal"
      tabindex="-1"
      aria-hidden="true"
  >
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
          <h5 class="modal-title fw-bold text-black">Kunlik yo'qlama</h5>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
          <form>
            <div class="row">
              <div class="col-lg-6 col-md-6 d-none">
                <div class="form-group mb-15 mb-md-25">
                  <input
                      type="number"
                      v-model="salaryDao.id"
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
                      placeholder="e.g. Sadriddin"
                      v-model="salaryDao.date"
                      not_empty='true'
                  />
                </div>
              </div>
              <div class="col-lg-6 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Yo'nalish
                  </label>
                  <select class="form-select fs-md-15 text-black shadow-none" not_empty='true' @change="selectDirection(salaryDao.directionId)"
                          v-model="salaryDao.directionId">
                    <option selected disabled value="0">Tanlang...</option>
                    <option v-for="(u,index) in directions" v-bind:key="index" :value="index">{{ u }}</option>
                  </select>
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
                      ISHCHI
                    </th>
                    <th
                        scope="col"
                        class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                    >
                      LAVOZIM
                    </th>
                    <th
                        scope="col"
                        class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0"
                    >
                      1 SOATLIK ISH HAQI
                    </th>
                    <th
                        scope="col"
                        class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                    >
                      ISHLAGAN SOATI
                    </th>
                    <th
                        scope="col"
                        class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                    >
                      1 KUNLIK ISH HAQI QIYMATI
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(percentage,index) in salaryDao.forms" :id="index" v-bind:key="index">
                    <th class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0">
                      <select class="form-select fs-md-15 text-black shadow-none" v-model="percentage.employeeId">
                        <option v-for="(e,index) in employee" v-bind:key="index" :value="index" disabled>
                          {{ e }}
                        </option>
                      </select>
                    </th>
                    <th class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0">
                      <select class="form-select fs-md-15 text-black shadow-none" v-model="percentage.positionId">
                        <option v-for="(e,index) in positions" v-bind:key="index" :value="index" disabled>
                          {{ e }}
                        </option>
                      </select>
                    </th>
                    <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                      <input
                          type="number"
                          class="form-control shadow-none rounded-0 text-black"
                          placeholder="e.g. 1000 "
                          v-model="percentage.perHourWageAmount"
                          readonly
                      />
                    </td>
                    <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                      <input
                          type="number"
                          class="form-control shadow-none rounded-0 text-black"
                          placeholder="e.g. 1000 "
                          not_empty='true'
                          v-model="percentage.allHour"
                          @input="multiply(index,percentage.perHourWageAmount,percentage.allHour)"
                      />
                    </td>
                    <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                      <input
                          type="number"
                          class="form-control shadow-none rounded-0 text-black"
                          placeholder="e.g. 1000 "
                          v-model="percentage.allAmount"
                          readonly
                      />
                    </td>
                  </tr>
                  </tbody>
                </table>
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

import message, {checkPermissionSave} from "../../../message/message";
import validator from "../../../validation/validator";

export default {
  name: "AddDismissalModal",
  props: {
    editId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      salaryDao:{
        documentId: 0,
        date: '',
        directionId: 0,
        forms:[{employeeId: 0,positionId: 0 , perHourWageAmount: 0,allHour:0,allAmount:0}]
      },
      type: 'add',
      positions:[],
      directions:[],
      employee:[]
    }
  },
  watch: {
    editId(newId) {
      this.getById(newId);
    }
  },
  methods: {
    multiply(index,perHourWageAmount,allHour){
      this.salaryDao.forms[index].allAmount = perHourWageAmount * allHour;
    },
    save(){
      let valid = validator();
      if (valid) {
        this.$http.post("salary/" + this.type + localStorage.getItem("lang"), this.salaryDao).then(res => {
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
    getEmployee() {
      this.$http.get("worker/select" + localStorage.getItem('lang')).then(res => {
        this.employee = res.data
      })
    },
    getDirections() {
      this.$http.get("references/def/direction" + localStorage.getItem('lang')).then(res => {
        this.directions = res.data
      })
    },
    getPositions() {
      this.$http.get("references/def/position" + localStorage.getItem('lang')).then(res => {
        this.positions = res.data
      })
    },
    selectDirection(id){
      this.$http.get("salary/table/" + id + localStorage.getItem('lang')).then(res => {
        this.salaryDao.forms = res.data
      })
    },
    getById(num) {
      if (!isNaN(parseInt(num)) && num !== 0) {
        this.$http.get("salary/" + parseInt(num)).then(res => {
          this.salaryDao = res.data
          this.salaryDao.directionId = this.salaryDao.direction.id
          for (let i = 0; i < this.salaryDao.forms.length; i++) {
            this.salaryDao.forms[i].employeeId = this.salaryDao.forms[i].employee.id;
            this.salaryDao.forms[i].positionId = this.salaryDao.forms[i].position.id;
          }
        })
      }
    }
  },
  mounted() {
    this.getById(this.editId);
  },
  created() {
    this.getDirections();
    this.getPositions();
    this.getEmployee();
  },
};
</script>

<style scoped>

</style>