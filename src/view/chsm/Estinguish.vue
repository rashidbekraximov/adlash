<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30">
      <h5 class="card-title fw-bold mb-15 mb-lg-20">Qarzdorlikni so'ndirish</h5>
      <div class="row m-3">
        <div class="col-md-2"></div>
        <div class="col-md-8">
          <button
              class="default-btn transition w-100 border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16"
              type="button"
              @click="showModal"
          >
            Qarzdorliklarni ko'rish <i class="fas fa-eye text-sm ms-1"
                                       aria-hidden="true"></i>
          </button>

          <a-modal v-model:visible="visible" wrap-class-name="full-modal-to-xxl" width="800px" @ok="getSelectedRows">
            <div>
              <h4>Qarzdorliklar ro'yxati</h4>
              <div class="input-group">
                <span class="input-group-text text-body" @click="searchList(search)"><i class="fas fa-search"
                                                                                        aria-hidden="true"></i></span>
                <input
                    type="text"
                    v-model="search"
                    class="form-control"
                    @keyup.enter="searchList(search)"
                />
              </div>
            </div>
            <div class="mt-4">
              <a-table :row-selection="row" :columns="columns" :data-source="data">
                <template #bodyCell="{ column, text }">
                  <template v-if="column.dataIndex === 'name'">
                    <a>{{ text }}</a>
                  </template>
                </template>
              </a-table>
            </div>
          </a-modal>
        </div>
        <div class="col-md-2">
        </div>
      </div>
      <div class="table-responsive p-0 mb-3">
        <table class="table align-items-center justify-content-center mb-3">
          <thead>
          <tr>
            <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder  text-center opacity-20"
            >
              ID
            </th>
            <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-20 ps-2"
            >
              SANA
            </th>
            <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-20 ps-2"
            >
              MIJOZ
            </th>
            <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-20 ps-2"
            >
              UMUMIY QIYMATI
            </th>
            <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-20 ps-2"
            >
              QARZ QIYMATI
            </th>
            <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-20 ps-2"
            >
              KORXONA
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(t,index) in rows" :id="index" v-bind:key="index">
            <td>
              <p class="text-sm text-center  font-weight-bold mb-0">{{ t.id }} </p>
            </td>
            <td>
              <p class="text-sm text-center  font-weight-bold mb-0">{{ t.date }} </p>
            </td>
            <td>
              <p class="text-sm text-center  font-weight-bold mb-0">{{ t.client }} </p>
            </td>
            <td>
              <p class="text-sm text-center  font-weight-bold mb-0">{{ t.client }} </p>
            </td>
            <td>
              <p class="text-sm text-center  font-weight-bold mb-0">{{ t.totalValue }} </p>
            </td>
            <td>
              <p class="text-sm text-center  font-weight-bold mb-0">{{ t.debtTotalValue }} </p>
            </td>
            <td>
              <p class="text-sm text-center  font-weight-bold mb-0">{{ t.mchj }} </p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="row mb-3">
        <div class="col-md-4 mb-3">
          <label>Sana</label>
          <input
              id="date"
              class="form-control"
              type="date"
              not_empty='true'
              v-model="estinguish.date"
              required
          />
        </div>
        <div class="col-md-4 mb-3">
          <label>Umumiy qarz qiymati</label>
          <input
              class="form-control"
              type="number"
              placeholder="Kiriting"
              v-model="estinguish.debtTotalValue"
              readonly
          />
        </div>
        <div class="col-md-4 mb-3">
          <label>Bermoqchi summa</label>
          <input
              class="form-control"
              type="number"
              @input="calcDebtValue"
              not_empty='true'
              v-model="estinguish.paidValue"
              placeholder="Kiriting"
              required
          />
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-4 mb-3">
          <label>Qoldiq qarz qiymati</label>
          <input
              class="form-control"
              type="number"
              placeholder="Kiriting"
              v-model="estinguish.remainderDebtValue"
              readonly
          />
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
            Saqlash
          </button>
        </div>
        <div class="col-md-3">
          <button
              class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16"
              type="button"
          >
            Bekor qilish
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {ref, defineComponent} from 'vue';
import {checkPermissionSave, message} from "@/message/message";
import validator from "@/validation/validator";

const selects = [];
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    selects.push(selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User',
    name: record.name,
  }),
};


export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Estinguish",
  data() {
    return {
      search: '',
      estinguish: {
        debtTotalValue: 0,
        date: '',
        allDebts: [],
        paidValue: 0,
        remainderDebtValue: 0
      },
      products: [],
      rows: selects,
      rowObject: {},
      productType: [],
      status: [],
      data: [],
      columns: [
        {
          title: 'Id',
          dataIndex: 'id',
        },
        {
          title: 'Sana',
          dataIndex: 'date',
        },
        {
          title: 'Mijoz',
          dataIndex: 'client',
        },
        {
          title: 'Mahsulotlar',
          dataIndex: 'productsText',
        },
        {
          title: 'Umumiy qiymati',
          dataIndex: 'totalValue',
        },
        {
          title: 'Qarz qiymati',
          dataIndex: 'debtTotalValue',
        },
        {
          title: 'To\'lov turi',
          dataIndex: 'paymentType',
        },
        {
          title: 'Korxona',
          dataIndex: 'mchj',
        },
      ],
      row: rowSelection
    };
  },
  methods: {
    save() {
      let valid = validator();
      if (valid) {
        this.estinguish.allDebts = this.rows;
        this.$http.post("estinguish/save" + localStorage.getItem("lang"), this.estinguish).then(res => {
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
    getList() {
      this.rows = [];
      this.$http.get("purchase/debts" + localStorage.getItem("lang")).then(res => {
        this.data = res.data
      })
    },
    searchList(client) {
      this.$http.get("purchase/debts/searched?client=" + client).then(res => {
        this.data = res.data
      })
    },
    calcDebtValue() {
      this.estinguish.remainderDebtValue = this.estinguish.debtTotalValue - this.estinguish.paidValue;
    },
    getSelectedRows() {
      let value = 0;
      for (let i = 0; i < selects[selects.length - 1].length; i++) {
        this.rows[i] = selects[selects.length - 1][i];
        value += this.rows[i].debtTotalValue
      }
      this.estinguish.debtTotalValue = value;
      this.visible = false;
      this.calcDebtValue();
    }
  },
  created() {
    this.getList();
  },
  setup() {
    const visible = ref(false);

    const showModal = () => {
      visible.value = true;
    };
    return {visible, showModal};

  }
});

</script>

<style scoped>

</style>
