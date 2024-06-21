<template>
  <div
      class="modal fade createNewModal"
      id="createIngredientModal"
      tabindex="-1"
      aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
          <h5 class="modal-title fw-bold text-black">Tarkib qo'shish</h5>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
          <form>
            <div class="row">
              <div class="col-lg-6 col-md-6 d-none">
                <div class="form-group mb-15 mb-md-25">
                  <input
                      type="number"
                      v-model="ingredient.id"
                  />
                </div>
              </div>
              <div class="col-lg-6 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Marka
                  </label>
                  <input
                      type="number"
                      class="form-control shadow-none rounded-0 text-black"
                      v-model="ingredient.mark"
                      not_empty='true'
                  />
                </div>
              </div>

              <div class="col-lg-6 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Miqdor
                  </label>
                  <input
                      type="number"
                      class="form-control shadow-none rounded-0 text-black"
                      v-model="ingredient.amount"
                      not_empty='true'
                  />
                </div>
              </div>

              <div class="col-lg-6 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Sement (KUB)
                  </label>
                  <input
                      type="number"
                      class="form-control shadow-none rounded-0 text-black"
                      v-model="ingredient.sement"
                      not_empty='true'
                  />
                </div>
              </div>

              <div class="col-lg-6 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Klines (KUB)
                  </label>
                  <input
                      type="number"
                      class="form-control shadow-none rounded-0 text-black"
                      v-model="ingredient.klines"
                      not_empty='true'
                  />
                </div>
              </div>

              <div class="col-lg-6 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Sheben (KUB)
                  </label>
                  <input
                      type="number"
                      class="form-control shadow-none rounded-0 text-black"
                      v-model="ingredient.sheben"
                      not_empty='true'
                  />
                </div>
              </div>

              <div class="col-lg-6 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Pesok (KUB)
                  </label>
                  <input
                      type="number"
                      class="form-control shadow-none rounded-0 text-black"
                      v-model="ingredient.pesok"
                      not_empty='true'
                  />
                </div>
              </div>

              <div class="col-lg-6 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Dobavka
                  </label>
                  <input
                      type="number"
                      class="form-control shadow-none rounded-0 text-black"
                      v-model="ingredient.dobavka"
                      not_empty='true'
                  />
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
  name: "CreateIngredientModal",
  props: {
    editId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      ingredient:{},
    }
  },
  watch: {
    editId(newId) {
      this.getById(newId);
    }
  },
  methods: {
    save(){
      let valid = validator();
      if (valid) {
        axios.post("ingredient/save" + localStorage.getItem("lang"), this.ingredient).then(res => {
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
      if (!isNaN(parseInt(num)) && num !== 0){
        this.$http.get("ingredient/" + parseInt(num)).then(res => {
          this.ingredient = res.data
        })
      }
    },
    cancel(){
      router.go(-1);
    }
  },
  mounted() {
    this.getById(this.editId);
  },
};
</script>

<style scoped>

</style>