<template>
  <header
      :class="[
      'header-area bg-white text-center text-md-start pt-15 pb-15 ps-15 pe-15 ps-md-20 pe-md-20 pe-lg-30 transition mb-25 position-fixed',
      { sticky: isSticky },
    ]"
      id="header"
  >
    <div class="row align-items-center">
      <div class="col-xl-4 col-lg-5 col-md-6">
        <div
            class="header-left-side justify-content-center justify-content-md-start d-flex align-items-center"
        >
          <button
              class="header-burger-menu transition position-relative lh-1 bg-transparent p-0 border-0"
              id="header-burger-menu"
              @click="stateStoreInstance.onChange"
          >
            <i class="flaticon-menu-3"></i>
          </button>
          <form class="search-box">
            <div class="input-group">
              <input
                  type="text"
                  class="form-control shadow-none rounded-0 border-0"
                  placeholder="CTRL + M"
                  ref="searchInput"
                  v-model="searchQuery"
                  @input="onInput"
              />
              <button
                  class="default-btn position-relative transition border-0 fw-medium text-white pt-8 pb-8 ps-15 pe-15 pt-md-12 pb-md-12 ps-md-20 pe-md-20"
                  type="button"
              >

              </button>

            </div>
            <div class="dropdown-menu show rounded-0 bg-white border-0 start-auto end-0" v-if="showOptions">
              <ul class="ps-0 mb-0 list-unstyled dropdown-body">
                <li v-for="item in filteredOptions" :key="item.route"
                    class="text-body-secondary fw-bolder fs-7 transition position-relative cursor-pointer m-2 p-2 bg-light">
                  <router-link v-if="!item.type" :to="item.route" class="text-dark text-decoration-none">
                    <i :class="item.icon"></i>
                    {{ item.title }}
                  </router-link>
                </li>
              </ul>
            </div>
          </form>
        </div>
      </div>
      <div class="col-xl-8 col-lg-7 col-md-6">
        <div class="header-right-side d-flex align-items-center justify-content-center justify-content-md-end">
          <LightDarkSwtichBtn/>
          <div class="dropdown notification-dropdown">
            <button
                class="dropdown-toggle p-0 position-relative bg-transparent border-0 transition lh-1"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
              <i class="flaticon-bell-2"></i>
              <span
                  class="dot-badge position-absolute fw-bold rounded-circle text-white bg-primary d-inline-block"
              >
                {{debts.length}}
              </span>
            </button>
            <div
                class="dropdown-menu rounded-0 bg-white border-0 start-auto end-0"
            >
              <div
                  class="title d-flex align-items-center justify-content-between"
              >
                <span class="text-black fw-bold"
                >Bildirishnomalar <span class="text-muted"></span></span
                >
              </div>
              <ul class="ps-0 mb-0 list-unstyled dropdown-body">
                <li class="text-muted position-relative" v-for="(d,index) in debts" :id="index" v-bind:key="index">
                  <div
                      class="icon rounded-circle position-absolute text-center text-danger"
                  >
                    <i class="ph-bold ph-chat-centered-dots"></i>
                  </div>
                  <span class="d-block text-black-emphasis"
                  ><i class="flaticon-user-1"></i><span class="mx-2 fw-semibold">{{ d.client }}</span>,<i
                      class="flaticon-gps mx-1"></i>{{ d.location }}
                  </span>
                  <span v-if="d.days < 0">{{ Math.abs(d.days) }} kun o'tdi</span>
                  <span v-if="d.days === 0">Bugun</span>
                  <router-link
                      to="/notifications"
                      class="d-block position-absolute start-0 top-0 end-0 bottom-0 text-decoration-none"
                  ></router-link>
                  <span
                      class="unread d-inline-block rounded-circle bg-primary position-absolute w-10 h-10"
                  ></span>
                </li>
              </ul>
              <div class="text-center dropdown-footer">
                <router-link
                    to="/notifications"
                    class="link-btn text-decoration-none text-primary position-relative d-inline-block transition fw-medium fw-medium"
                >
                  Bildirishnomalarni ko'rish
                </router-link>
              </div>
            </div>
          </div>
          <div class="dropdown profile-dropdown">
            <button
                class="dropdown-toggle text-start fs-14 text-black-emphasis d-flex align-items-center p-0 position-relative bg-transparent border-0 transition lh-1"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
              <img
                  src="@/assets/images/profil.png"
                  class="rounded"
                  width="44"
                  height="44"
                  alt="admin"
              />
              <span class="title d-none d-lg-block ms-10 ms-lg-15">
                <span class="d-block fw-bold mb-5 mb-md-8">{{ activeUser.firstName + " " + activeUser.lastName }}</span>
                <span class="text-body-emphasis fw-semibold fs-13"
                      v-if="activeUser.systemRoleName === 'SYSTEM_ROLE_SUPER_ADMIN'">Super Admin</span>
                <span class="text-body-emphasis fw-semibold fs-13"
                      v-if="activeUser.systemRoleName === 'SYSTEM_ROLE_ADMIN'">Role Admin</span>
                <span class="text-body-emphasis fw-semibold fs-13"
                      v-if="activeUser.systemRoleName === 'PURCHASE_ADMIN'">Sotuv Admin</span>
                <span class="text-body-emphasis fw-semibold fs-13"
                      v-if="activeUser.systemRoleName === 'LOGISTIC_ADMIN'">Logistika Admin</span>
                <span class="text-body-emphasis fw-semibold fs-13" v-if="activeUser.systemRoleName === 'PRODUCE_ADMIN'">Ishlab chiqarish Admin</span>
                <span class="text-body-emphasis fw-semibold fs-13"
                      v-if="activeUser.systemRoleName === 'LEADER_BETON_ADMIN'">Leader Beton Admin</span>
                <!--                <span class="text-body-emphasis fw-semibold fs-13" v-if="activeUser.role === 'SYSTEM_ROLE_SUPER_ADMIN'">Ish haqi Admin</span>-->
                <span class="text-body-emphasis fw-semibold fs-13"
                      v-if="activeUser.systemRoleName === 'WAREHOUSE_ADMIN'">Ombor Xodimi</span>
              </span>
            </button>
            <div
                class="dropdown-menu rounded-0 bg-white border-0 start-auto end-0"
            >
              <ul class="ps-0 mb-0 list-unstyled dropdown-body">
                <li
                    class="text-body-secondary fw-semibold transition position-relative cursor-pointer"
                    @click="routeMyPage()"
                >
                  <i class="flaticon-user-2"></i>
                  Profil
                </li>
                <li
                    class="text-body-secondary fw-semibold transition position-relative cursor-pointer" @click="logout"
                >
                  <i class="flaticon-logout"></i>
                  Chiqish
                  <a href="/login"
                     class="d-block position-absolute start-0 top-0 end-0 bottom-0 text-decoration-none"
                  >
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import {ref, onMounted} from "vue";
import LightDarkSwtichBtn from "./LightDarkSwtichBtn.vue";
import stateStore from "../../utils/store";
import router from "@/router";
import menuData from "../../forms/form.json"

export default {
  name: "MainHeader",
  components: {
    LightDarkSwtichBtn,
  },
  data() {
    return {
      sidebarNavItems: menuData.sidebarNavItems,
      userId: 0,
      activeUser: {
        id: 0,
        firstName: '',
        lastName: '',
        systemRoleName: '',
        login: '',
        password: '',
        enabled: true
      },
      debts: [],
      fileName: "",
      imageURL: "../../assets/images/user/user1.jpg",
      searchQuery: '',
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      showOptions: false
    }
  },
  onMounted() {
    document.removeEventListener('keydown', this.handleKeydown);
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeydown);
  },
  computed: {
    filteredOptions() {
      return this.sidebarNavItems.filter(option =>
          option.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    onInput() {
      this.showOptions = this.searchQuery.length > 0;
    },
    selectOption(option) {
      this.searchQuery = option;
      this.showOptions = false;
    },
    logout() {
      localStorage.clear();
      sessionStorage.clear();
    },
    routeMyPage() {
      router.push("/profile-settings/" + this.activeUser.id)
    },
    getUserById() {
      this.$http.get("/account").then(res => {
        this.activeUser = res.data
      })
    },
    getDebtList(num) {
      this.$http.get("purchase/debt/" + num).then(res => {
        this.debts = res.data
      })
    },
    handleKeydown(event) {
      if (event.ctrlKey && event.key === 'm') {
        event.preventDefault();
        this.$refs.searchInput.focus();
      }
    }
  },
  created() {
    this.getDebtList(3)
    this.getUserById()
    // this.fetchImage()
  },
  setup() {
    const stateStoreInstance = stateStore;
    const isSticky = ref(false);

    onMounted(() => {
      window.addEventListener("scroll", () => {
        let scrollPos = window.scrollY;
        isSticky.value = scrollPos >= 100;
      });
    });

    return {
      isSticky,
      stateStoreInstance,
    };
  },
};
</script>

<style scoped>

.dropdown-menu {
  width: 100%;
  max-height: 600px;
  overflow-y: auto;
}

/*.dropdown-menu li span{*/
/*  cursor: pointer;*/
/*  font-size: 14px;*/
/*  font-weight: 800;*/
/*  margin: 5px;*/
/*  color: black;*/
/*}*/

/*.dropdown-menu li span:hover {*/
/*  background: #eee;*/
/*}*/
</style>