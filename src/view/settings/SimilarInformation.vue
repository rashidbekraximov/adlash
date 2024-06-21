<template>
  <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
    <div class="card-body p-15 p-sm-20 p-md-25">
      <div class="row mb-3">
        <div class="col-md-6">
          <div class="form-group mb-15 mb-md-25">
            <label class="d-block text-black fw-semibold mb-10">
              O'xshash ma'lumotlar
            </label>
            <select class="form-select fs-md-15 text-black shadow-none" @change="getSimilarTableById(reference.referenceId)" not_empty='true' v-model="reference.referenceId">
              <option selected disabled value="0">Tanlang...</option>
              <option v-for="(u,index) in similarData" v-bind:key="index" :value="index">{{ u }}</option>
            </select>
          </div>
        </div>
      </div>
      <br>
      <div class="row mb-6">
        <div class="col-md-12">
          <div class="table-responsive">
            <table class="table text-nowrap align-middle mb-0">
              <thead>
              <tr>
                <th
                    scope="col"
                    class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0"
                >
                  NOMI
                </th>
                <th
                    scope="col"
                    class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                >
                  HOLATI
                </th>
                <th
                    scope="col"
                    class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 pe-0"
                >
                  <img src="@/assets/images/img/add.png" style="width: 25px; height: 25px" alt="Add" @click="addRow">
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(tableData,index) in reference.items" :id="index" v-bind:key="index">
                <td class="shadow-none lh-2 fw-medium text-black-emphasis">
                  <input
                      type="text"
                      class="form-control shadow-none rounded-0 text-black"
                      placeholder="e.g. absd"
                      v-model="tableData.uzLat"
                  />
                </td>
                <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                  <select class="form-select fs-md-15 text-black shadow-none" v-model="tableData.status">
                    <option value="ACTIVE" selected>Faol</option>
                    <option value="PASSIVE">Passiv</option>
                  </select>
                </td>
                <td class="shadow-none lh-4 fw-medium text-black-emphasis">
                  <img src="@/assets/images/img/delete1.png" style="width: 35px; height: 35px" alt="Add" @click="removeRow(index)">
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-8"></div>
        <div class="col-md-4">
          <button class="btn btn-primary d-block w-100" @click="save" type="button">Saqlash</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {notification} from "ant-design-vue";
import {checkPermission, checkPermissionSave} from "@/message/message";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "SimilarInformation",
  data() {
    return {
      similarData: [],
      reference: {
        referenceId: 0,
        items: [{ru: '', uzLat: '', uzCl: '', status: 'ACTIVE'}]
      },
    }
  },
  methods: {
    getSimilarList() {
      this.$http.get("references/def/reference_list" + localStorage.getItem("lang")).then(res => {
        this.similarData = res.data
      }).catch((reason) => {
        checkPermission(reason)
      })
    },
    save() {
      this.$http.post("references/def_references" + localStorage.getItem("lang"), this.reference).then(res => {
        if (res.status === 201) {
          notification.success({
            message: "Muvaffaqiyatli saqlandi",
            duration: 2
          });
          setTimeout(() => {
            location.reload();
          }, 3000)
        } else {
          notification.error({
            message: `Xato yuzaga keldi !`,
            duration: 1
          });
        }
      }).catch((reason) => {
        checkPermissionSave(reason)
      })
    },
    getSimilarTableById(id) {
      this.$http.get("references/def_references/" + id).then(res => {
        this.reference.items = res.data
      })
    },
    addRow() {
      this.reference.items.push({ru: '', uzlat: '', uzCl: '', status: 'ACTIVE'})
      notification.success({
        message: `Yangi qator qo'shildi !`,
        duration: 1
      });
    },
    removeRow(index) {
      this.reference.items.splice(index, 1);
      notification.warn({
        message: index + 1 + `-qator o'chirildi !`,
        duration: 1
      });
    }
  },
  created() {
    this.getSimilarList();
  }
};
</script>

<style scoped>

</style>