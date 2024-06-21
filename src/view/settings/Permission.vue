<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30">
      <h5 class="card-title fw-bold mb-15 mb-lg-20"><i class="flaticon-secure-shield mx-2"></i>Ruxsatnomalar</h5>
      <div class="border p-lg-4 border-dark border-opacity-10">
        <div class="row mb-xl-4">
          <input
              class="d-none"
              type="number"
              v-model="roleForm.id"
          />
          <div class="col-md-4">
            <label class="form-label fw-medium">Lavozimlar</label>
            <select class="form-select fs-md-15 text-black shadow-none" @change="getFormListByRole(roleForm.systemRoleName)"
                    v-model="roleForm.systemRoleName">
              <option selected disabled>Tanlang...</option>
              <option value="PURCHASE_ADMIN">Sotuv Admin</option>
              <option value="LOGISTIC_ADMIN">Logistik Admin</option>
              <option value="PRODUCE_ADMIN">Ishlab chiqarish Admin</option>
              <option value="LEADER_BETON_ADMIN">LB Admin</option>
              <option value="WAREHOUSE_ADMIN">Ombor xodimi</option>
              <option value="SALARY_ADMIN">Ish haqi Admin</option>
              <option value="SETTINGS_ADMIN">Sozlamalar Admin</option>

            </select>
            <div class="valid-feedback">Looks good!</div>
          </div>
        </div>
        <div class="row mt-5">
          <div class="table-responsive">
            <table class="table text-nowrap align-middle mb-0">
              <thead>
              <tr>
                <th
                    scope="col"
                    class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0"
                >
                  ID
                </th>
                <th
                    scope="col"
                    class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                  FORM
                </th>
                <th
                    scope="col"
                    class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                  KO'RISH
                </th>
                <th
                    scope="col"
                    class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                  QO'SHISH
                </th>
                <th
                    scope="col"
                    class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                  TAHRIRLASH
                </th>
                <th
                    scope="col"
                    class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                  O'CHIRISH
                </th>
                <th
                    scope="col"
                    class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >SOAT
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(t,index) in roleForm.roleFormPermissions" :id="index" v-bind:key="index">
                <th
                    class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0"
                >
                      {{ t.id.length > 4 ? t.form.id :  t.id }}
                </th>
                <td class="shadow-none lh-1 fw-medium text-primary">
                  {{ t.name === undefined ? t.form.name.activeLanguage : t.name.activeLanguage }}
                  <input
                      class="d-none"
                      type="number"
                      v-model="t.formNumber"
                  />
                </td>
                <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                  <input
                      class="form-check-input shadow-none"
                      type="checkbox"
                      v-model="t.canView"
                  />
                </td>
                <td class="shadow-none lh-1 fw-medium text-muted">
                  <input
                      class="form-check-input shadow-none"
                      type="checkbox"
                      v-model="t.canInsert"
                  />
                </td>
                <td class="shadow-none lh-1 fw-medium text-muted">
                  <input
                      class="form-check-input shadow-none"
                      type="checkbox"
                      v-model="t.canEdit"
                  />
                </td>
                <td class="shadow-none lh-1 fw-medium">
                  <input
                      class="form-check-input shadow-none"
                      type="checkbox"
                      v-model="t.canDelete"
                  />
                </td>

                <td class="shadow-none lh-1 fw-medium">
                  <input
                      type="number"
                      class="form-control shadow-none fs-md-15 text-black"
                      v-model="t.time"
                      placeholder="Soat"
                  />
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="row mt-xl-4">
          <div class="col-md-4">
          </div>
          <div class="col-md-4">
          </div>
          <div class="col-md-4">
            <button class="btn btn-primary w-100" type="button" @click="saveRole">Saqlash</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import message from "@/message/message";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Permission",
  data(){
    return {
      roleForm: {
        id: 0,
        systemRoleName: '',
        roleFormPermissions: [],
      },
    }
  },
  methods: {
    getFormListByRole(role) {
      this.$http.get("role-name/" + role + localStorage.getItem("lang")).then(res => {
        console.log(res.data)
        if (res.status === 201){
          this.roleForm.roleFormPermissions = res.data
          for (let i = 0; i < this.roleForm.roleFormPermissions.length; i++) {
            this.roleForm.roleFormPermissions[i].formNumber = this.roleForm.roleFormPermissions[i].form.id;
          }
        }else{
          this.roleForm = res.data
          for (let i = 0; i < this.roleForm.roleFormPermissions.length; i++) {
            this.roleForm.roleFormPermissions[i].formNumber = this.roleForm.roleFormPermissions[i].form.id;
          }
        }
      })
    },
    saveRole() {
      this.$http.post("role/save" + localStorage.getItem("lang"), this.roleForm).then(res => {
        console.log(res)
        if (res.status === 201) {
          message('success', res.data.message);
        }
      }).catch((reason) => {
        message('error', reason.response.data.message);
      })
    },
  }
}
</script>

<style scoped>

</style>