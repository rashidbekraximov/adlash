<template>
  <div class="card mb-25 border-0 rounded-0 bg-white profile-settings-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
        <div class="row">
          <div class="col-md-6">
            <div class="col-md-4 d-none">
              <input
                  class="form-control"
                  type="number"
                  v-model="activeUser.id"
              />
            </div>
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Ism
              </label>
              <input
                  type="text"
                  class="form-control shadow-none rounded-0 text-black"
                  placeholder="e.g. Adam"
                  v-model="activeUser.firstName"
                  not_empty='true'
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Familya
              </label>
              <input
                  type="text"
                  class="form-control shadow-none rounded-0 text-black"
                  placeholder="e.g. Smith"
                  v-model="activeUser.lastName"
                  not_empty='true'
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Telefon raqami
              </label>
              <input
                  type="text"
                  class="form-control shadow-none rounded-0 text-black"
                  placeholder="e.g. +001 321 4567"
                  v-model="activeUser.login"
                  not_empty='true'
                  autocomplete="off"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Parol
              </label>
              <input
                  type="password"
                  class="form-control shadow-none rounded-0 text-black"
                  placeholder="e.g. **************"
                  v-model="activeUser.password"
                  autocomplete="off"
                  not_empty='true'
                  aria-required="true"
                  aria-label="Password"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Tizimdagi lavozimi
              </label>
              <select
                  class="form-select shadow-none fw-semibold rounded-0"
                  v-model="activeUser.systemRoleName"
                  :disabled="activeUser.systemRoleName !== 'SYSTEM_ROLE_SUPER_ADMIN'"
              >
                <option selected disabled>Tanlang...</option>
                <option value="SYSTEM_ROLE_SUPER_ADMIN">Super Admin</option>
                <option value="SYSTEM_ROLE_ADMIN">Role Admin</option>
                <option value="PURCHASE_ADMIN">Sotuv Admin</option>
                <option value="LOGISTIC_ADMIN">Logistik Admin</option>
                <option value="PRODUCE_ADMIN">Ishlab chiqarish Admin</option>
                <option value="LEADER_BETON_ADMIN">LB Admin</option>
                <option value="WAREHOUSE_ADMIN">Ombor xodimi</option>
                <option value="SALARY_ADMIN">Ish haqi Admin</option>
                <option value="SETTINGS_ADMIN">Sozlamalar Admin</option>
              </select>
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Holati
              </label>
              <select class="form-select shadow-none fw-semibold rounded-0" v-model="activeUser.enabled">
                <option value="true">Faol</option>
                <option value="false">Passiv</option>
              </select>
            </div>
          </div>
          <div class="col-md-12">
            <div class="d-flex align-items-center justify-content-between">
              <button
                  class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-success"
                  @click="save">
                Saqlash
              </button>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script >
import axios from "@/axios/axios.js";
import validator from "@/validation/validator";
import message from "@/message/message";
import router from "@/router";

export default{
  name: "ProfileSettings",
  components: {
    // ImageUpload,
  },
  data() {
    return {
      activeUser: {
        id: 0,
        firstName: '',
        lastName: '',
        systemRoleName: '',
        login: '',
        password: '',
        enabled: true
      }
    }
  },
  methods: {
    getUserById(id) {
      this.$http.get("user/" + id).then(res => {
        this.activeUser = res.data
      })
    },
    save() {
      let valid = validator();
      if (valid) {
        axios.post("user/save" + localStorage.getItem("lang"),  this.activeUser).then(res => {
          if (res.status === 201){
            message('success', res.data.message);
            this.activeUser.id = res.data.object.id;
          }
        }).catch((reason) => {
          message('error', reason.response.data.message);
        })
      }else{
        message('warn',"Ma'lumotlar to'liq kiritilmagan !");
      }
    },
  },
  created() {
    const id = router.currentRoute._rawValue.params.id;
    if (id !== undefined){
      this.getUserById(id);
    }else{
      this.activeUser.systemRoleName = 'SYSTEM_ROLE_SUPER_ADMIN';
    }
  }
};
</script>