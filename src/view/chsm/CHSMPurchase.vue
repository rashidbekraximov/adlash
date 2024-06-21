<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30">
      <h5 class="card-title fw-bold mb-15 mb-lg-20">Sotuv (CHSM)</h5>
      <div class="border p-lg-4 border-dark border-opacity-10">
        <div class="row my-4">
          <div class="col-lg-8 col-md-8 mb-md-0 mb-4">
            <div class="row mb-3 mt-3">
              <div class="col-md-6 d-none">
                <input
                    type="number"
                    v-model="purchase.id"
                />
              </div>
              <div class="col-md-4">
                <label class="form-label fw-medium">Tallon raqami</label>
                <input
                    class="form-control shadow-none fs-md-15 text-black"
                    type="number"
                    placeholder="Kiriting"
                    v-model="tallon"
                    not_empty='true'
                    required
                />
              </div>
              <div class="col-md-4">
                <label class="form-label fw-medium">Yuk xati</label>
                <input
                    class="form-control shadow-none fs-md-15 text-black"
                    type="text"
                    v-model="purchase.documentCode"
                    placeholder="Kiriting"
                    required
                />
              </div>
              <div class="col-md-4">
                <label class="form-label fw-medium">Sana</label>
                <input
                    class="form-control shadow-none fs-md-15 text-black"
                    type="date"
                    v-model="purchase.date"
                    @input="parseDate"
                    not_empty='true'
                    required
                />
              </div>

            </div>
            <div class="row mb-3 mt-3">
              <div class="col-md-6">
                <label class="form-label fw-medium">Mijoz</label>
                <input
                    class="form-control shadow-none fs-md-15 text-black"
                    type="text"
                    placeholder="Kiriting"
                    v-model="purchase.client"
                    not_empty='true'
                    required
                />
              </div>
              <div class="col-md-6">
                <label class="form-label fw-medium">Telefon raqami</label>
                <input
                    class="form-control shadow-none fs-md-15 text-black"
                    type="text"
                    v-mask="'+998 (##) ###-##-##'"
                    placeholder="Kiriting"
                    v-model="purchase.phoneNumber"
                    not_empty='true'
                    required
                />
              </div>
            </div>
            <div class="table-responsive p-0">
              <table class="table align-items-center justify-content-center mb-0">
                <thead>
                <tr>
                  <th
                      class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0"
                  >
                    Mahsulot nomi
                  </th>
                  <th v-if="isProducedProduct"
                      class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0"
                  >
                   Sex
                  </th>
                  <th
                      class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0"
                  >
                    Mahsulot hajmi
                  </th>
                  <th
                      class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0"
                  >
                    Mahsulot narxi
                  </th>
                  <th
                      class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0"
                  >
                    QIYMATI
                  </th>
                  <th
                      class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0 cursor-pointer"
                  >
<!--                    <i class="flaticon-plus bold"></i>-->
                    <img src="@/assets/images/img/add.png" style="width: 20px; height: 20px" alt="Add" @click="addRow">
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(tableData,index) in purchase.purchasedProductList" :id="index" v-bind:key="index">
                  <td class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0">
                    <select class="form-control fs-md-15 text-black shadow-none" not_empty='true' v-model="tableData.productTypeId"
                            @change="getProductPrice(index,tableData.productTypeId)">
                      <option selected disabled value="0">Tanlang...</option>
                      <option v-for="(product,index) in productType" v-bind:key="index" :value="index">{{
                          product
                        }}
                      </option>
                    </select>

                  </td>
                  <td v-if="isProducedProduct">
                    <select class="form-control fs-md-15 text-black shadow-none" v-model="tableData.sexEnum">
                      <option selected value="SEX1">1-Sex</option>
                      <option value="SEX2">2-Sex</option>
                    </select>
                  </td>
                  <td class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0">
                    <input
                        class="form-control shadow-none fs-md-15 text-black"
                        type="number"
                        not_empty='true'
                        v-model="tableData.weight"
                        @input="addValue(index,tableData.price,tableData.weight)"
                        placeholder="Kiriting"
                        required
                    />
                  </td>
                  <td class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0">
                    <input
                        class="form-control shadow-none fs-md-15 text-black"
                        type="number"
                        id="price"
                        not_empty='true'
                        v-model="tableData.price"
                        @input="addValue(index,tableData.price,tableData.weight)"
                    />
                  </td>
                  <td class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0">
                    <input
                        class="form-control shadow-none fs-md-15 text-black"
                        type="number"
                        v-model="tableData.value"
                        readonly
                    />
                  </td>
                  <td class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0 cursor-pointer">
                    <img src="@/assets/images/img/delete1.png" style="width: 25px; height: 25px" alt="Add"
                         @click="removeRow(index)">
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="row mb-3 mt-3">
              <div class="col-md-4">
                <label class="form-label fw-medium">Texnika turi</label>
                <select class="form-select fs-md-15 text-black shadow-none" v-model="purchase.technicianId"
                        @change="makeReadOnly(purchase.technicianId)">
                  <option selected value="0">Tanlang...</option>
                  <option v-for="(s,index) in technicians" v-bind:key="index" :value="index">{{ s }}</option>
                </select>
              </div>
              <div class="col-md-4">
                <label class="form-label fw-medium">Yollanma texnika</label>
                <input
                    class="form-control shadow-none fs-md-15 text-black"
                    type="text"
                    id="hiring"
                    placeholder="Kiriting"
                    v-model="purchase.hiredCar"
                />
              </div>
              <div class="col-md-4">
                <label class="form-label fw-medium">Yo'l haqi</label>
                <input
                    class="form-control shadow-none fs-md-15 text-black"
                    type="number"
                    id="fare"
                    v-model="purchase.fare"
                    @input="calcTotalValue"
                    placeholder="Kiriting"
                />
              </div>
            </div>
            <div class="row mb-3 mt-3">
              <div class="col-md-4">
                <label class="form-label fw-medium">Umumiy qiymati</label>
                <input
                    class="form-control shadow-none fs-md-15 text-black"
                    type="number"
                    v-model="purchase.totalValue"
                    readonly
                />
              </div>
              <div class="col-md-4">
                <label class="form-label fw-medium">Buyurtmalar</label>
                <select class="form-select fs-md-15 text-black shadow-none" v-model="purchase.orderId"
                        @change="getOrder(purchase.orderId)">
                  <option selected disabled value="0">Tanlang...</option>
                  <option v-for="(s,index) in orders" v-bind:key="index" :value="index">{{ s }}</option>
                </select>
              </div>
              <div class="col-md-4">
                <label class="form-label fw-medium">Bergan summa</label>
                <input
                    class="form-control shadow-none fs-md-15 text-black"
                    type="number"
                    v-model="purchase.paidTotalValue"
                    placeholder="Kiriting"
                    @input="calcRemainder"
                    not_empty='true'
                    required
                />
              </div>
            </div>
            <div class="row mb-3 mt-3">
              <div class="col-md-4">
                <label class="form-label fw-medium">Qoldig' qarz summa</label>
                <input
                    class="form-control shadow-none fs-md-15 text-black"
                    type="number"
                    v-model="purchase.debtTotalValue"
                    readonly
                />
              </div>
              <div class="col-md-4">
                <label class="form-label fw-medium">Muddati</label>
                <input
                    class="form-control shadow-none fs-md-15 text-black"
                    type="date"
                    v-model="purchase.expiryDate"
                    placeholder="Kiriting"
                    not_empty='true'
                    required
                />
              </div>
              <div class="col-md-4">
                <label class="form-label fw-medium">Manzil</label>
                <input
                    class="form-control shadow-none fs-md-15 text-black"
                    type="text"
                    id="location"
                    v-model="purchase.location"
                    placeholder="Kiriting"
                    readonly
                />
              </div>
            </div>
            <div class="row mb-3 mt-3">
              <div class="col-md-4">
                <label class="form-label fw-medium">Km</label>
                <input
                    class="form-control shadow-none fs-md-15 text-black"
                    type="number"
                    id="km"
                    v-model="purchase.km"
                    placeholder="Kiriting"
                    readonly
                />
              </div>
              <div class="col-md-4">
                <label class="form-label fw-medium">To'lov turi</label>
                <select class="form-select fs-md-15 text-black shadow-none" not_empty='true'
                        v-model="purchase.paymentTypeId">
                  <option selected disabled value="0">Tanlang...</option>
                  <option v-for="(s,index) in paymentTypes" v-bind:key="index" :value="index">{{ s }}</option>
                </select>
              </div>
            </div>
            <div class="row mb-3 mt-3">
              <div class="col-md-12">
                <label class="form-label fw-medium">Izoh</label>
                <textarea class="form-control shadow-none fs-md-15 text-black" placeholder="Izoh" rows="5"
                          v-model="purchase.description"></textarea>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-6"></div>
              <div class="col-md-3">
                <button
                    class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16"
                    type="button"
                    @click="save"
                >
                  Chop etish
                </button>
              </div>
              <div class="col-md-3">
                <button
                    class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16"
                    type="button"
                >Bekor qilish
                </button>
              </div>
            </div>
          </div>
          <div id="showScroll" class="col-md-4 h-100">
            <div id="receipt">
              <div class="logo">CHORBOG' SAYOHAT MASKANI</div>
              <div class="tripSummary bold mb-1">
                Tallon raqami: <span class="mx-5">{{ purchase.checkNumber }}</span>
              </div>
              <div class="tripSummary bold mb-1">
                Sana: <span class="mx-1"><i class="fa fa-calendar mx-1" aria-hidden="true"></i>{{ dateFormatter }}<i
                  class="fa fa-clock-o mx-2"></i>{{ time }}</span>
              </div>
              <div class="tripSummary bold mb-1">
                To'lov turi: <span class="mx-4" id="payment">{{
                  getActiveText('r_payment_type', purchase.paymentTypeId)
                }}</span>
              </div>
              <div class="tripSummary mb-2">
                <div class="bold">Mahsulotlar:</div>
                <div class="item" v-for="(product,index) in purchase.purchasedProductList" v-bind:key="index">
                  <div :id="'product' + product.productTypeId">{{
                      getActiveText('r_product_type', product.productTypeId)
                    }}:
                  </div>
                  <div>{{ product.weight }}</div>
                </div>
              </div>
              <div class="tripSummary mb-2">
                <div class="bold">
                  Yo'lkira: <span class="mx-4">{{ purchase.fare }} so'm</span>
                </div>
              </div>
              <div class="tripSummary mb-2">
                <div class="bold">Mijoz:</div>
                <div class="item">
                  <div>Ismi:</div>
                  <div>{{ purchase.client }}</div>
                </div>
                <div class="item">
                  <div>Tel:</div>
                  <div>{{ purchase.phoneNumber }}</div>
                </div>
                <div class="item">
                  <div>Manzil:</div>
                  <div>{{ purchase.location }}</div>
                </div>
                <div class="item">
                  <div>Km:</div>
                  <div>{{ purchase.km }}</div>
                </div>
              </div>
              <div class="tripSummary mb-2">
                <div class="bold">Avto:<span class="mx-5"
                                             id="technician">{{
                    getActiveText('technician', purchase.technicianId)
                  }}</span>
                </div>
              </div>
              <div class="mt-3"></div>
              <div class="tripSummary">
                <div class="bold">Imzo:<span class="mx-7">___________</span></div>
              </div>
              <div class="feedback">
                <div class="break mt-2">
                  **************************
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import message, {checkPermissionSave} from "@/message/message";
import validator from "@/validation/validator";

export default {
  name: "CHSMPurchase",
  data() {
    return {
      dateFormatter: '',
      time: '',
      check: {},
      status: [],
      technicians: [],
      orders: [],
      productType: [],
      paymentTypes: [],
      purchasedProduct: {
        productTypeId: 0,
        weight: 0,
        price: 0,
        value: 0
      },
      tallon: 0,
      purchase: {
        id: 0,
        checkNumber: 0,
        documentCode: '',
        date: '',
        client: '',
        phoneNumber: '',
        purchasedProductList: [{
          productTypeId: 0,
          weight: 0,
          price: 0,
          value: 0
        }],
        fare: 0,
        technicianId: 0,
        paymentTypeId: 0,
        orderId: 0,
        expiryDate: '',
        hiredCar: '',
        totalValue: 0,
        paidTotalValue: 0,
        debtTotalValue: 0,
        status: 'ACTIVE',
        location: '',
        km: 0,
        description: ''
      },
      isProducedProduct: false,
    }
  },
  methods: {
    currentDate() {
      const current = new Date();
      if ((current.getMonth() + 1).toString().length === 1) {
        this.purchase.date = `${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate()}`;
        this.purchase.expiryDate = `${current.getFullYear()}-0${current.getMonth() + 1}-${current.getDate()}`;
        this.dateFormatter = `${current.getFullYear()}/0${current.getMonth() + 1}/${current.getDate()}`;
      } else {
        if (current.getDate().toString().length === 1) {
          this.purchase.date = `${current.getFullYear()}-${current.getMonth() + 1}-0${current.getDate()}`;
          this.purchase.expiryDate = `${current.getFullYear()}-${current.getMonth() + 1}-0${current.getDate()}`;
        } else {
          this.purchase.date = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
          this.purchase.expiryDate = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
        }
        this.dateFormatter = `${current.getFullYear()}/${current.getMonth() + 1}/${current.getDate()}`;
      }
      this.time = current.getHours() + ':' + current.getMinutes();
    },
    parseDate() {
      const year = this.purchase.date.substring(0, 4);
      const month = this.purchase.date.substring(5, 7);
      const day = this.purchase.date.substring(8, 10);
      const now = new Date();
      this.time = now.getHours() + ':' + now.getMinutes();
      this.dateFormatter = `${year}/${month}/${day}`;
    },

    calcRemainder() {
      this.purchase.debtTotalValue = this.purchase.totalValue - this.purchase.paidTotalValue;
    },
    calcTotalValue() {
      let tableValue = 0;
      for (let i = 0; i < this.purchase.purchasedProductList.length; i++) {
        tableValue = tableValue + this.purchase.purchasedProductList[i].value;
      }
      this.purchase.totalValue = tableValue + this.purchase.fare;
      this.calcRemainder()
    },
    addValue(index, price, weight) {
      this.purchase.purchasedProductList[index].value = price * weight;
      this.calcTotalValue()
    },
    getProductPrice(index, id) {
      console.log(id)
      if (id === "7"){
        this.isProducedProduct = true;
      }else{
        this.isProducedProduct = false;
      }
      this.$http.get("price-input/" + id + localStorage.getItem('lang')).then(res => {
        this.purchase.purchasedProductList[index].price = res.data
      })
      this.addValue(index, this.purchase.purchasedProductList[index].price, 0)
    },
    checkTallon() {
      this.$http.get("check-tallon").then(res => {
        this.check = res.data;
        let num = 0;
        if (this.check.length > 0) {
          num = parseInt(this.check[0].checkNumber);
          this.tallon = num + 1;
        }
      })
    },
    save() {
      let valid = validator();
      if (valid) {
        this.purchase.checkNumber = this.tallon + '';
        this.$http.post("purchase/add" + localStorage.getItem("lang"), this.purchase).then(res => {
          if (res.status === 201) {
            this.print('receipt')
            message('success', "Muvaffaqiyatli saqlandi !");
          } else {
            message('error', "Xatolik yizaga keldi !");
          }
        }).catch((e) => {
          checkPermissionSave(e)
        })
      } else {
        message('warn', "Ma'lumotlar to'liq kiritilmagan !");
      }
    },
    addRow() {
      this.purchase.purchasedProductList.push({productTypeId: 0, weight: 0, price: 0, value: 0})
      message('success', "Yangi qator qo'shildi !");
    },

    removeRow(index) {
      this.purchase.purchasedProductList.splice(index, 1);
      message('warn', index + 1 + `-qator o'chirildi !`);
    },
    getTechnicians() {
      this.$http.get("technician/select" + localStorage.getItem('lang')).then(res => {
        this.technicians = res.data
      })
    },
    getOrder(id) {
      this.$http.get("order/" + id + localStorage.getItem('lang')).then(res => {
        this.purchase = res.data
        this.purchase.orderId = id;
        this.purchase.id = 0;
        this.purchase.totalValue = res.data.totalValue
        for (let i = 0; i < this.purchase.purchasedProductList.length; i++) {
          this.purchase.purchasedProductList[i].productTypeId = this.purchase.purchasedProductList[i].productType.id;
        }
      })
    },
    makeReadOnly(id) {
      if (parseInt(id) === 0) {
        document.getElementById('fare').readOnly = true;
        document.getElementById('location').readOnly = true;
        document.getElementById('km').readOnly = true;
        document.getElementById('hiring').readOnly = false;
      } else {
        document.getElementById('fare').readOnly = false;
        document.getElementById('location').readOnly = false;
        document.getElementById('km').readOnly = false;
        document.getElementById('hiring').readOnly = true;
      }
    },
    getOrders() {
      this.$http.get("order/select" + localStorage.getItem('lang')).then(res => {
        this.orders = res.data
      })
    },
    getSelect(name) {
      this.$http.get("references/def/" + name + localStorage.getItem("lang")).then(res => {
        if (name === 'payment_type') {
          this.paymentTypes = res.data;
        } else {
          this.productType = res.data;
        }
      })
    },
    getActiveText(name, id) {
      if(id !== undefined){
        this.$http.get("references/def-name/" + name + "/" + id + localStorage.getItem("lang")).then(res => {
          if (name === 'r_product_type') {
            const name = document.getElementById('product' + id);
            name.innerText = res.data;
          } else if (name === 'r_payment_type') {
            const name = document.getElementById('payment');
            name.innerText = res.data;
          } else {
            const name = document.getElementById('technician');
            name.innerText = res.data;
          }
        })
      }
    },
    print(divName) {
      let printContents = document.getElementById(divName).innerHTML;
      let originalContents = document.body.innerHTML;

      document.body.innerHTML = printContents;
      window.print();
      window.addEventListener("afterprint", (event) => {
        console.log("After print", event);
      });
      document.body.innerHTML = originalContents;
      location.reload()

      // printJS({
      //   printable: 'receipt',
      //   type: 'html',
      //   modalMessage: "Retrieving Document...",
      //   style: '.print-area { color: red; width: 10px; } .modal-body { width:100% }'
      // });
      // XP-80
      //   qz.websocket.connect().then(() => {
      //     return qz.printers.find("Microsoft Print to PDF");
      //   }).then((found) => {
      //     alert(found);
      //     let config = qz.configs.create(found);
      //     let data = [{
      //       type: 'pixel',
      //       format: 'html',
      //       flavor: 'plain',
      //       data: 'Shonazar jallimisan',
      //       options: {pageWidth: 2.5}
      //     }];
      //     return qz.print(config, data).catch(function (e) {
      //       console.error(e);
      //     });
      //   })
    }
  },
  created() {
    this.getSelect('product_type');
    this.getSelect('payment_type');
    this.getTechnicians();
    this.currentDate();
    this.getOrders();
    this.checkTallon();
  }
}
</script>

<style scoped>

#receipt {
  font-family: cursive;
  color: #1f1f1f;
}

.bold {
  font-weight: 900;
}

#receipt {
  width: 300px;
  min-height: 100vh;
  height: 100%;
  background: #fff;
  margin: 0 auto;
  box-shadow: 5px 5px 19px #ccc;
}

.logo {
  text-align: center;
  padding: 15px;
  font-size: 20px;
  font-weight: bolder;
}

.tripSummary {
  margin: auto;
  width: 255px;
}

.tripSummary .item {
  display: flex;
  justify-content: space-between;
  margin: auto;
  font-weight: bold;
  width: 220px;
}

.feedback {
  margin: 10px auto;
}

.feedback .break {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
}

</style>
