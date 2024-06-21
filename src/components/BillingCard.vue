<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30">
      <h5 class="card-title fw-bold mb-15 mb-lg-20">Kassa</h5>
      <div class="border p-2 p-lg-4 border-dark border-opacity-10">
        <ul class="list-group">
          <li v-for="({id, date, income, spending,status }, index) of bills" :key="index"
              class=" list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg animate__animated animate__zoomIn">
            <div class="d-flex flex-column">
              <h6 class="mb-3 text-md font-weight-bold"><i class="ni ni-cart text-info text-gradient me-2"></i>
                Umumiy sotuv</h6>
              <span class="mb-2 text-xs">
              Qolgan mablag':
              <span class="text-dark font-weight-bold ms-sm-2">
                <Vue3autocounter ref='counter' :startAmount='0' :endAmount='income - spending' :duration='1' prefix=''
                                 separator=',' decimalSeparator='.' :decimals='1' :autoinit='true'/>
              so'm</span>
            </span>
              <span class="mb-2 text-xs">
              Kirim:
              <span class="text-dark ms-sm-2 font-weight-bold">
                <Vue3autocounter ref='counter' :startAmount='0' :endAmount='income' :duration='1' prefix=''
                                 separator=',' decimalSeparator='.' :decimals='1' :autoinit='true'/>
                so'm</span>
            </span>
              <span class="mb-2 text-xs">
              Chiqim:
              <span class="text-dark ms-sm-2 font-weight-bold">
                <Vue3autocounter ref='counter' :startAmount='0' :endAmount='spending' :duration='1' prefix=''
                                 separator=',' decimalSeparator='.' :decimals='1' :autoinit='true'/>
              so'm</span>
            </span>
              <span class="mb-2 text-xs">
              Sana:
              <span class="text-dark ms-sm-2 font-weight-bold"><i
                  class="ni ni-calendar-grid-58 text-info text-gradient me-1"></i> {{ date }}</span>
            </span>
            </div>
            <div class="ms-auto text-end">
              <a class="btn btn-link text-success text-gradient text-md px-3 mb-0 cursor-pointer"
                 @click="confirm(id,status)"
                 href="javascript:;">
                <i class="far fa-check-circle me-2" aria-hidden="true"></i>Tasdiqlash
              </a>
              <a class="btn btn-link text-info px-3 mb-0 cursor-pointer" @click="getSpendingsByDate(date)"
                 href="javascript:;">
                <i class="fas fa-eye text-info me-2" aria-hidden="true"></i
                >Xarajat
              </a>
              <a class="btn btn-link text-info px-3 mb-0 cursor-pointer" @click="getByDate(date)" href="javascript:;">
                <i class="fas fa-eye text-info me-2" aria-hidden="true"></i
                >Kirim
              </a>
              <soft-badge v-if="date === new Date()" color="error" variant="gradient" size="sm">New</soft-badge>
              <a-modal v-model:visible="visible" wrap-class-name="full-modal-to-xxl" width="800px">
                <div>
                  <h4>Sotuvlar ro'yxati</h4>
                </div>
                <div class="mt-4">
                  <a-table :columns="columns" :data-source="dataset">
                    <template #bodyCell="{ column, text }">
                      <template v-if="column.dataIndex === 'name'">
                        <a>{{ text }}</a>
                      </template>
                    </template>
                  </a-table>
                </div>
              </a-modal>

              <a-modal v-model:visible="visibleSpending" wrap-class-name="full-modal-to-xxl" width="800px">
                <div>
                  <h4>Xarajatlar ro'yxati</h4>
                </div>
                <div class="mt-4">
                  <a-table :columns="columnSpendings" :data-source="spendings">
                    <template #bodyCell="{ column, text }">
                      <template v-if="column.dataIndex === 'name'">
                        <a>{{ text }}</a>
                      </template>
                    </template>
                  </a-table>
                </div>
              </a-modal>
              <div class="row h-50">
              </div>
              <div class="row" v-if="status === 'PASSIVE'">
                <h6 class="text-sm"><img src="@/assets/images/icon/verify.png" width="15" height="15" class="me-1">Tasdiqlangan
                </h6>
              </div>
              <div class="row" v-else>
                <h6 class="text-sm">Tasdiqlanmagan</h6>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>


import Swal from "sweetalert2";
import {notification} from "ant-design-vue";
import {ref, defineComponent} from 'vue';
import Vue3autocounter from 'vue3-autocounter';
import {checkPermission} from "@/message/message";

export default defineComponent({
  name: "BillingCard",
  components: {
    Vue3autocounter,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    bills: {
      type: Array,
      date: String,
      remainder: Number,
      income: Number,
      spending: Number,
      default: () => [],
    },
  },
  data() {
    return {
      dataset: [],
      spendings: [],
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
          title: 'Umumiy summa',
          dataIndex: 'totalValue',
        },
        {
          title: 'To\'langan summa',
          dataIndex: 'paidTotalValue',
        },
        {
          title: 'To\'lov turi',
          dataIndex: 'paymentType',
        },
        {
          title: 'Hudud',
          dataIndex: 'location',
        }
      ],
      columnSpendings: [
        {
          title: 'Id',
          dataIndex: 'id',
        },
        {
          title: 'Sana',
          dataIndex: 'date',
        },
        {
          title: 'Xarajat nomi',
          dataIndex: 'costName',
        },
        {
          title: 'Summa',
          dataIndex: 'amount',
        }
      ],
      row: []
    }
  },
  methods: {
    getByDate(date) {
      this.$http.get("daily-confirm/" + date).then(res => {
        // this.dataset = res.data
        this.dataset = [];
        for (let i = 0; i < res.data.length; i++) {
          this.dataset.push({
            id: res.data[i].id,
            date: res.data[i].date,
            client: res.data[i].client,
            totalValue: res.data[i].totalValue,
            paidTotalValue: res.data[i].paidTotalValue,
            paymentType: res.data[i].paymentType.name.activeLanguage,
            location: res.data[i].location
          })
        }
        this.showModal();
      })
    },
    getSpendingsByDate(date) {
      this.$http.get("checkout-costs/daily/" + date).then(res => {
        this.spendings = res.data;
        this.showModalSpending();
      })
    },
    confirm(id, status) {
      if (status === 'ACTIVE') {
        Swal.fire({
          title: 'Tasdiqlaysizmi?',
          text: "Iltimos, teshkiring va tasdiqlang",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Bekor qilish',
          confirmButtonText: 'Ha, tasdiqlayman!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.$http.get("confirm/" + id).then(res => {
              if (res.data.success) {
                notification.success({
                  message: `Tasdiqlandi !`,
                  duration: 2
                });
                setTimeout(() => {
                  location.reload();
                }, 3000)
              } else {
                notification.error({
                  message: `Tasdiqlanmadi !`,
                  duration: 2
                });
                setTimeout(() => {
                  location.reload();
                }, 3000)
              }
            }).catch((reason) => {
              checkPermission(reason.response.status)
            })
          }
        })
      } else {
        notification.warn({
          message: `Tasdiqlangan !`,
          duration: 2
        });
      }
    },
  },
  setup() {
    const visible = ref(false);
    const visibleSpending = ref(false);

    const showModal = () => {
      visible.value = true;
    };
    const showModalSpending = () => {
      visibleSpending.value = true;
    };
    return {visible, visibleSpending, showModalSpending, showModal};

  }
});
</script>
