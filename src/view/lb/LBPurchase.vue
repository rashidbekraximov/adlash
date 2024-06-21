<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30">
      <h5 class="card-title fw-bold mb-15 mb-lg-20">Sotuv (Leader Beton)</h5>
      <div class="border p-2 p-lg-4 border-dark border-opacity-10">
        <form class="row g-3 needs-validation" novalidate>
          <div class="col-md-4 d-none">
            <input
                type="number"
                v-model="purchase.id"
            />
            <div class="valid-feedback">Looks good!</div>
          </div>
          <div class="col-md-4">
            <label for="validationCustom01" class="form-label fw-medium">Buyurtmachi</label>
            <input
                type="text"
                class="form-control shadow-none fs-md-15 text-black"
                id="validationCustom01"
                v-model="purchase.customer"
                not_empty='true'
                required
            />
            <div class="valid-feedback">Looks good!</div>
          </div>

          <div class="col-md-4">
            <label for="validationCustom02" class="form-label fw-medium">Hudud</label>
            <input
                type="text"
                class="form-control shadow-none fs-md-15 text-black"
                id="validationCustom02"
                v-model="purchase.location"
                not_empty='true'
                required
            />
            <div class="valid-feedback">Looks good!</div>
          </div>

          <div class="col-md-4">
            <label for="validationCustom03" class="form-label fw-medium">Sana</label>
            <input
                type="date"
                class="form-control shadow-none fs-md-15 text-black"
                id="validationCustom03"
                v-model="purchase.date"
                not_empty='true'
                required
            />
            <div class="valid-feedback">Looks good!</div>
          </div>
          <div class="col-md-4">
            <div class="form-group mb-15 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Korxona
              </label>
              <select class="form-select fs-md-15 text-black shadow-none" v-model="purchase.mchj">
                <option value="LEADER_BETON_1" selected>1 - Leader Beton</option>
                <option value="LEADER_BETON_2">2 - Leader Beton</option>
              </select>
            </div>
          </div>
          <div class="col-md-4">
            <label class="form-label fw-medium">Marka</label>
            <select class="form-select fs-md-15 text-black shadow-none" not_empty='true' v-model="purchase.mark"
                    @change="getSelect">
              <option selected disabled value="0">Tanlang...</option>
              <option v-for="(u,index) in marks" v-bind:key="index" :value="u">{{ u }}</option>
            </select>
            <div class="valid-feedback">Looks good!</div>
          </div>

          <div class="col-md-4">
            <label class="form-label fw-medium">Miqdor</label>
            <select class="form-select fs-md-15 text-black shadow-none" not_empty='true' v-model="purchase.amount"
                    @change="getSelect">
              <option selected disabled value="0">Tanlang...</option>
              <option v-for="(u,index) in amounts" v-bind:key="index" :value="u">{{ u }}</option>
            </select>
            <div class="valid-feedback">Looks good!</div>
          </div>

          <div class="col-md-4">
            <label class="form-label fw-medium">Sement (kub)</label>
            <input
                type="number"
                class="form-control shadow-none fs-md-15 text-black"
                v-model="purchase.sement"
                not_empty='true'
                required
            />
            <div class="valid-feedback">Looks good!</div>
          </div>
          <div class="col-md-4">
            <label class="form-label fw-medium">Klines (kub)</label>
            <input
                type="number"
                class="form-control shadow-none fs-md-15 text-black"
                v-model="purchase.klines"
                not_empty='true'
                required
            />
            <div class="valid-feedback">Looks good!</div>
          </div>
          <div class="col-md-4">
            <label class="form-label fw-medium">Sheben (kub)</label>
            <input
                type="number"
                class="form-control shadow-none fs-md-15 text-black"
                v-model="purchase.sheben"
                not_empty='true'
                required
            />
            <div class="valid-feedback">Looks good!</div>
          </div>
          <div class="col-md-4">
            <label class="form-label fw-medium">Pesok (kub)</label>
            <input
                type="number"
                class="form-control shadow-none fs-md-15 text-black"
                v-model="purchase.pesok"
                not_empty='true'
                required
            />
            <div class="valid-feedback">Looks good!</div>
          </div>
          <div class="col-md-4">
            <label class="form-label fw-medium">Dobavka </label>
            <input
                type="number"
                class="form-control shadow-none fs-md-15 text-black"
                v-model="purchase.dobavka"
                not_empty='true'
                required
            />
            <div class="valid-feedback">Looks good!</div>
          </div>

          <div class="col-md-4">
            <label class="form-label fw-medium">Antimaroz </label>
            <input
                type="number"
                class="form-control shadow-none fs-md-15 text-black"
                v-model="purchase.antimaroz"
                not_empty='true'
                required
            />
            <div class="valid-feedback">Looks good!</div>
          </div>

          <div class="col-md-4">
            <label class="form-label fw-medium">Beton narxi </label>
            <input
                type="number"
                class="form-control shadow-none fs-md-15 text-black"
                v-model="purchase.value"
                not_empty='true'
                @input="calcTotalValue"
                required
            />
            <div class="valid-feedback">Looks good!</div>
          </div>

          <div class="col-md-4">
            <label class="form-label fw-medium">Nasos </label>
            <input
                type="number"
                class="form-control shadow-none fs-md-15 text-black"
                v-model="purchase.nasos"
                not_empty='true'
                @input="calcTotalValue"
                required
            />
            <div class="valid-feedback">Looks good!</div>
          </div>

          <div class="col-md-4">
            <label class="form-label fw-medium">Prostoy </label>
            <input
                type="number"
                class="form-control shadow-none fs-md-15 text-black"
                v-model="purchase.prostoy"
                not_empty='true'
                @input="calcTotalValue"
                required
            />
            <div class="valid-feedback">Looks good!</div>
          </div>

          <div class="col-md-4">
            <label class="form-label fw-medium">Umumiy summa</label>
            <input
                type="number"
                class="form-control shadow-none fs-md-15 text-black"
                v-model="purchase.totalValue"
                readonly
            />
            <div class="valid-feedback">Looks good!</div>
          </div>

          <div class="col-md-4">
            <label class="form-label fw-medium">Bergan summa </label>
            <input
                type="number"
                class="form-control shadow-none fs-md-15 text-black"
                v-model="purchase.givenValue"
                not_empty='true'
                @input="calcDebt"
                required
            />
            <div class="valid-feedback">Looks good!</div>
          </div>

          <div class="col-md-4">
            <label class="form-label fw-medium">Qarzdorlik </label>
            <input
                type="number"
                class="form-control shadow-none fs-md-15 text-black"
                v-model="purchase.debtTotalValue"
                readonly
            />
            <div class="valid-feedback">Looks good!</div>
          </div>
          <div class="col-md-4">
            <label class="form-label fw-medium">Km </label>
            <input
                type="number"
                class="form-control shadow-none fs-md-15 text-black"
                v-model="purchase.km"
                not_empty='true'
                required
            />
            <div class="valid-feedback">Looks good!</div>
          </div>
          <div class="col-md-12">
            <div class="table-responsive">
              <table class="table text-nowrap align-middle mb-0">
                <thead>
                <tr>
                  <th
                      scope="col"
                      class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0"
                  >
                    AUTO
                  </th>
                  <th
                      scope="col"
                      class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                  >
                    XODKA
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
                <tr v-for="(use,index) in purchase.mixerUses" :id="index" v-bind:key="index">
                  <th class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0">
                    <select class="form-select fs-md-15 text-black shadow-none" not_empty='true' v-model="use.mixerId">
                      <option selected disabled value="0">Tanlang...</option>
                      <option v-for="(u,index) in auto" v-bind:key="index" :value="index">{{ u }}</option>
                    </select>
                  </th>
                  <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                    <input
                        type="number"
                        class="form-control shadow-none rounded-0 text-black"
                        placeholder="e.g. 100"
                        v-model="use.xodka"
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

<!--          <div class="col-md-4">-->
<!--            <label class="form-label fw-medium">Auto</label>-->
<!--            <select class="form-select fs-md-15 text-black shadow-none" not_empty='true' v-model="purchase.mixerId"-->
<!--                    @change="getSelect">-->
<!--              <option selected disabled value="0">Tanlang...</option>-->
<!--              <option v-for="(u,index) in auto" v-bind:key="index" :value="index">{{ u }}</option>-->
<!--            </select>-->
<!--            <div class="valid-feedback">Looks good!</div>-->
<!--          </div>-->

<!--          <div class="col-md-4">-->
<!--            <label class="form-label fw-medium">Xodka </label>-->
<!--            <input-->
<!--                type="number"-->
<!--                class="form-control shadow-none fs-md-15 text-black"-->
<!--                v-model="purchase.xodka"-->
<!--                not_empty='true'-->
<!--                required-->
<!--            />-->
<!--            <div class="valid-feedback">Looks good!</div>-->
<!--          </div>-->

          <div class="col-md-12">
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
                  v-model="purchase.description"
              ></textarea>
            </div>
          </div>
<!--          <div class="col-12">-->
<!--            <div class="form-check">-->
<!--              <input-->
<!--                  class="form-check-input"-->
<!--                  type="checkbox"-->
<!--                  value=""-->
<!--                  id="invalidCheck"-->
<!--                  required-->
<!--              />-->
<!--              <label-->
<!--                  class="form-check-label fw-medium position-relative top-1"-->
<!--                  for="invalidCheck"-->
<!--              >-->
<!--                Agree to terms and conditions-->
<!--              </label>-->
<!--              <div class="invalid-feedback">-->
<!--                You must agree before submitting.-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
          <div class="col-12">
            <button class="btn btn-primary" type="button" @click="save">Saqlash</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {notification} from "ant-design-vue";
import router from "@/router";
import message, {checkPermissionSave} from "@/message/message";
import validator from "@/validation/validator";

export default defineComponent({
  name: "LBPurchase",
  data() {
    return {
      marks: [],
      amounts: [],
      auto: [],
      ingredient: {},
      purchase: {
        id: 0,
        date: '',
        customer: '',
        location: '',
        mark: 0,
        amount: 0,
        sement: 0,
        prostoy: 0,
        sheben: 0,
        klines: 0,
        pesok: 0,
        dobavka: 0,
        antimaroz: 0,
        mixerId: 0,
        nasos: 0,
        xodka: 0,
        value: 0,
        totalValue: 0,
        givenValue: 0,
        debtTotalValue: 0,
        km: 0,
        status: 'ACTIVE',
        description: '',
        mchj: 'LEADER_BETON_1',
        mixerUses: []
      }
    }
  },
  methods: {
    addRow() {
      this.purchase.mixerUses.push({name1: '', name2: ''})
      message('success', "Yangi qator qo'shildi !");
    },
    removeRow(index) {
      this.purchase.mixerUses.splice(index, 1);
      message('warn', index + 1 + `- qator o'chirildi !`);
    },
    calcTotalValue() {
      this.purchase.totalValue = this.purchase.nasos + this.purchase.value + this.purchase.prostoy;
      this.calcDebt();
    },
    calcDebt() {
      this.purchase.debtTotalValue = this.purchase.totalValue - this.purchase.givenValue;
    },
    currentDate() {
      const current = new Date();
      if ((current.getMonth() + 1).toString().length === 1) {
        this.purchase.date = `${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate()}`;
      } else {
        this.purchase.date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
      }
    },
    save() {
      let valid = validator();
      if (valid) {
        this.$http.post("lb-purchase/save" + localStorage.getItem("lang"), this.purchase).then(res => {
          if (res.status === 201) {
            message('success', res.data.message);
            router.go(-1);
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
    getMarks() {
      this.$http.get("ingredient/marks" + localStorage.getItem('lang')).then(res => {
        this.marks = res.data
      })
      this.calcTotalValue();
    },
    getAmount() {
      this.$http.get("ingredient/amounts" + localStorage.getItem('lang')).then(res => {
        this.amounts = res.data
      })
      this.calcTotalValue();
    },
    getAutoList() {
      this.$http.get("mixer/select" + localStorage.getItem('lang')).then(res => {
        this.auto = res.data
      })
    },
    getSelect() {
      if (this.purchase.mark !== 0 && this.purchase.amount !== 0) {
        this.testRemainder()
        this.$http.get("ingredient/select/" + this.purchase.mark + "/" + this.purchase.amount).then(res => {
          this.ingredient = res.data
          this.purchase.sement = this.ingredient.sement
          this.purchase.sheben = this.ingredient.sheben
          this.purchase.klines = this.ingredient.klines
          this.purchase.pesok = this.ingredient.pesok
          this.purchase.dobavka = this.ingredient.dobavka
          this.purchase.antimaroz = this.ingredient.antimaroz
          this.purchase.value = this.ingredient.value
        })
      }
    },
    testRemainder() {
      if (this.purchase.mark !== 0 && this.purchase.amount !== 0) {
        this.$http.get("lb-purchase/test/" + this.purchase.mark + "/" + this.purchase.amount  + "/" + this.purchase.mchj + localStorage.getItem('lang')).then(res => {
          if (res.data.success) {
            notification.success({
              message: res.data.message,
              duration: 3
            });
          } else {
            notification.error({
              message: res.data.message,
              duration: 3
            });
          }
        })
      }
    },
    cancel() {
      router.go(-1);
    }
  },
  created() {
    this.getMarks()
    this.getAmount()
    this.getAutoList()
    this.currentDate()
  }

});
</script>

<style scoped>

</style>