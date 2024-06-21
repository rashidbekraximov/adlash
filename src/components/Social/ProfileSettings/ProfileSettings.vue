<template>
  <div class="card mb-25 border-0 rounded-0 bg-white profile-settings-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <form>
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
                Sharif
              </label>
              <input
                  type="text"
                  class="form-control shadow-none rounded-0 text-black"
                  placeholder="add here"
                  v-model="activeUser.middleName"
                  not_empty='true'
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Email
              </label>
              <input
                  type="email"
                  class="form-control shadow-none rounded-0 text-black"
                  placeholder="e.g. adam127704@gmail.com"
                  v-model="activeUser.email"
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
                  not_empty='true'
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Hujjat seriya raqami
              </label>
              <input
                  type="text"
                  class="form-control shadow-none rounded-0 text-black"
                  placeholder="e.g. AC1234567"
                  v-model="activeUser.documentSerialNumber"
                  not_empty='true'
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Jinsi
              </label>
              <select class="form-select shadow-none fw-semibold rounded-0" v-model="activeUser.gender">
                <option value="MALE" selected>Erkak</option>
                <option value="FEMALE">Ayol</option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Tizimdagi lavozimi
              </label>
              <select class="form-select shadow-none fw-semibold rounded-0" v-model="activeUser.systemRoleName">
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
          <!--          <div class="col-md-12">-->
          <!--            <div class="form-group mb-15 mb-sm-20 mb-md-25">-->
          <!--              <label class="d-block text-black fw-semibold mb-10">-->
          <!--                Who Will Be Able To See Your Profile?-->
          <!--              </label>-->
          <!--              <div-->
          <!--                class="form-check fs-md-15 fs-lg-16 text-black mb-0 d-inline-block me-15 me-md-25"-->
          <!--              >-->
          <!--                <input-->
          <!--                  class="form-check-input shadow-none"-->
          <!--                  type="radio"-->
          <!--                  name="communicationRadio"-->
          <!--                  id="onlyMeRadio"-->
          <!--                  checked-->
          <!--                />-->
          <!--                <label class="form-check-label" for="onlyMeRadio">-->
          <!--                  Only Me-->
          <!--                </label>-->
          <!--              </div>-->
          <!--              <div-->
          <!--                class="form-check fs-md-15 fs-lg-16 text-black mb-0 d-inline-block me-15 me-md-25"-->
          <!--              >-->
          <!--                <input-->
          <!--                  class="form-check-input shadow-none"-->
          <!--                  type="radio"-->
          <!--                  name="communicationRadio"-->
          <!--                  id="onlyFriendsRadio"-->
          <!--                />-->
          <!--                <label class="form-check-label" for="onlyFriendsRadio">-->
          <!--                  Only Friends-->
          <!--                </label>-->
          <!--              </div>-->
          <!--              <div-->
          <!--                class="form-check fs-md-15 fs-lg-16 text-black mb-0 d-inline-block me-15 me-md-25"-->
          <!--              >-->
          <!--                <input-->
          <!--                  class="form-check-input shadow-none"-->
          <!--                  type="radio"-->
          <!--                  name="communicationRadio"-->
          <!--                  id="everyoneRadio"-->
          <!--                />-->
          <!--                <label class="form-check-label" for="everyoneRadio">-->
          <!--                  Everyone-->
          <!--                </label>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->
          <!--          <div class="col-md-12">-->
          <!--            <div class="form-group mb-15 mb-sm-20 mb-md-25">-->
          <!--              <label class="d-block text-black fw-semibold mb-10">-->
          <!--                Upload Your Profile Picture-->
          <!--              </label>-->

          <!--              <ImageUpload />-->
          <!--            </div>-->
          <!--          </div>-->
          <div class="col-md-12">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Upload Cover Photo
              </label>
              <div class="file-upload text-center position-relative">
                <i class="flaticon-gallery-1"></i>
                <span class="d-block text-muted">
                  Drop Files Here Or
                  <span class="text-black fw-medium position-relative">
                    Click To Upload
                  </span>
                </span>
                <input
                  type="file" @change="handleFileUpload"
                  class="d-block shadow-none border-0 position-absolute start-0 end-0 top-0 bottom-0 z-1 opacity-0"
                />
              </div>
<!--              <ImageUpload/>-->
            </div>
          </div>
          <div class="col-md-12">
            <div class="d-flex align-items-center justify-content-between">
              <button
                  class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-success"
                  @click="save"
              >
                Save Profile
              </button>
              <button
                  type="button"
                  class="bg-transparent p-0 border-0 text-danger lh-1 fw-medium"
              >
                <i
                    class="flaticon-delete lh-1 me-1 position-relative top-2"
                ></i>
                <span class="position-relative">Delete Profile</span>
              </button>
            </div>
          </div>
        </div>
      </form>
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
        middleName: '',
        gender: 'MALE',
        documentSerialNumber: '',
        systemRoleName: '',
        login: '',
        email: '',
        password: '',
        enabled: true
      },
      image: null
    }
  },
  methods: {
    handleFileUpload(event) {
      this.image = event.target.files[0];
    },
    getUserById(id) {
      this.$http.get("user/" + id).then(res => {
        this.activeUser = res.data
      })
    },
    save() {
      let valid = validator();
      if (valid) {
        const formData = new FormData();
        formData.append('user', JSON.stringify(this.activeUser));
        formData.append('file', this.image);

        axios.post("user/save" + localStorage.getItem("lang"),  formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }}).then(res => {
            console.log(formData)
          if (res.status === 201) {
            message('success', res.data.message);
            // this.activeUser = res.data
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
    }
  }
};
</script>