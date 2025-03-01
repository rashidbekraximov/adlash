<template>
  <div
    :class="[
      'sidebar-area position-fixed start-0 top-0 bg-black h-100vh transition',
      { active: stateStoreInstance.open },
    ]"
    id="sidebar-area"
  >
    <div class="logo position-absolute start-0 end-0 top-0 bg-black">
      <router-link
        to="/"
        class="d-flex align-items-center text-white text-decoration-none"
      >
        <img src="@/assets/images/favicon.png" alt="logo-icon" />
        <span class="fw-bold ms-10">Stark</span>
      </router-link>
      <div class="border-bottom"></div>
      <button
        class="sidebar-burger-menu position-absolute lh-1 bg-transparent p-0 border-0"
        @click="stateStoreInstance.onChange"
      >
        <i class="ph-duotone ph-caret-double-right"></i>
      </button>
    </div>
    <div class="sidebar-menu">
      <ul
        class="sidebar-navbar-nav ps-0 list-unstyled accordion"
        id="sidebarNavAccordion"
      >
        <li class="sub-title sidebar-nav-item" v-if="seenDashboard">
          <span class="d-block text-uppercase fw-medium">Dashboard</span>
        </li>
<!--        <li class="sidebar-nav-item accordion-item bg-transparent border-0 rounded-0" v-if="isAdmin">-->
<!--          <a-->
<!--            class="accordion-button rounded-0 shadow-none bg-transparent d-block"-->
<!--            data-bs-toggle="collapse"-->
<!--            data-bs-target="#sidebarCollapseOne"-->
<!--            aria-expanded="true"-->
<!--            aria-controls="sidebarCollapseOne"-->
<!--          >-->
<!--            <i class="flaticon-more-1"></i>-->
<!--            <span class="title">Dashboard</span>-->
<!--          </a>-->
<!--          <div-->
<!--            id="sidebarCollapseOne"-->
<!--            class="accordion-collapse collapse"-->
<!--            data-bs-parent="#sidebarNavAccordion"-->
<!--          >-->
<!--            <div class="accordion-body">-->
<!--              <ul class="sidebar-sub-menu ps-0 mb-0 list-unstyled">-->
<!--                <li class="sidebar-sub-menu-item">-->
<!--                  <router-link to="/purchase-dashboard" class="sidebar-sub-menu-link">-->
<!--                    Sotuv dashboard-->
<!--                  </router-link>-->
<!--                </li>-->
<!--                <li class="sidebar-sub-menu-item">-->
<!--                  <router-link-->
<!--                    to="/lb-dashboard"-->
<!--                    class="sidebar-sub-menu-link"-->
<!--                  >-->
<!--                    Leader Beton Dashboard-->
<!--                  </router-link>-->
<!--                </li>-->
<!--                <li class="sidebar-sub-menu-item">-->
<!--                  <router-link to="/logistic-dashboard" class="sidebar-sub-menu-link">-->
<!--                    Logistika Dashboard-->
<!--                    <span class="new-badge fw-medium d-inline-block">Hot</span>-->
<!--                  </router-link>-->
<!--                </li>-->
<!--                <li class="sidebar-sub-menu-item">-->
<!--                  <router-link to="/produce-dashboard" class="sidebar-sub-menu-link">-->
<!--                    Ishlab chiqarish-->
<!--                  </router-link>-->
<!--                </li>-->
<!--                <li class="sidebar-sub-menu-item">-->
<!--                  <router-link to="/crm-system" class="sidebar-sub-menu-link">-->
<!--                    CRM System-->
<!--                    <span class="new-badge fw-medium d-inline-block">Hot</span>-->
<!--                  </router-link>-->
<!--                </li>-->
<!--              </ul>-->
<!--            </div>-->
<!--          </div>-->
<!--        </li>-->
        <li class="sidebar-nav-item" v-if="seenDashboard">
          <router-link to="/purchase-dashboard" class="sidebar-nav-link d-block">
            <i class="flaticon-more-1"></i>
            <span class="title">Sotuv </span>
          </router-link>
        </li>
        <li class="sidebar-nav-item" v-if="seenDashboard">
          <router-link to="/lb-dashboard" class="sidebar-nav-link d-block">
            <i class="flaticon-pie-chart"></i>
            <span class="title">LB </span>
          </router-link>
        </li>
        <li class="sidebar-nav-item" v-if="seenDashboard">
          <router-link to="/logistic-dashboard" class="sidebar-nav-link d-block">
            <i class="flaticon-bar-chart"></i>
            <span class="title">Logistika </span>
          </router-link>
        </li>
        <li class="sidebar-nav-item" v-if="seenDashboard">
          <router-link to="/produce-dashboard" class="sidebar-nav-link d-block">
            <i class="fa-solid fa-trowel-bricks"></i>
            <span class="title">Ishlab chiqarish</span>
          </router-link>
        </li>
        <li class="sidebar-nav-item" v-if="seenDashboard">
          <router-link to="/nasos-dashboard" class="sidebar-nav-link d-block">
            <i class="fa-solid fa-truck"></i>
            <span class="title">Nasos</span>
          </router-link>
        </li>
        <li class="sidebar-nav-item" v-if="seenDashboard">
          <router-link to="/warehouse-dashboard" class="sidebar-nav-link d-block">
            <i class="flaticon-pie-chart-5"></i>
            <span class="title">Omborxona</span>
          </router-link>
        </li>

        <li class="sub-title sidebar-nav-item" v-if="seenDashboard">
          <span class="d-block text-uppercase fw-medium">Kassa</span>
        </li>
        <li class="sidebar-nav-item" v-if="seenDashboard">
          <router-link to="/kassa" class="sidebar-nav-link d-block">
            <i class="fa-solid fa-sack-dollar"></i>
            <span class="title">Kassa</span>
          </router-link>
        </li>

        <li class="sub-title sidebar-nav-item" v-if="seenPurchase">
          <span class="d-block text-uppercase fw-medium">CHSM</span>
        </li>

        <li class="sidebar-nav-item" v-if="seenPurchase">
          <router-link to="/chsm-purchase-save" class="sidebar-nav-link d-block"  @keydown.ctrl.b="onCtrlB">
            <i class="flaticon-trolley-cart"></i>
            <span class="title">Sotuv</span>
          </router-link>
        </li>
        <li class="sidebar-nav-item" v-if="seenPurchase">
          <router-link to="/chsm-estinguish" class="sidebar-nav-link d-block">
            <i class="flaticon-price-tag-2"></i>
            <span class="title">Qarzdorlikni so'ndirish</span>
          </router-link>
        </li>
        <li class="sidebar-nav-item" v-if="seenPurchase">
          <router-link to="/chsm-purchase" class="sidebar-nav-link d-block">
            <i class="flaticon-bar-chart-1"></i>
            <span class="title">Sotuvlar ro'yxati</span>
          </router-link>
        </li>
        <li class="sidebar-nav-item" v-if="seenPurchase">
          <router-link to="/order" class="sidebar-nav-link d-block">
            <i class="flaticon-layer-2"></i>
            <span class="title">Buyurtmalar ro'yxati</span>
          </router-link>
        </li>
        <li class="sidebar-nav-item" v-if="seenPurchase">
          <router-link to="/price" class="sidebar-nav-link d-block">
            <i class="flaticon-credit-card"></i>
            <span class="title">Mahsulot narxlari</span>
          </router-link>
        </li>
        <li class="sidebar-nav-item" v-if="seenPurchase">
          <router-link to="/remainder" class="sidebar-nav-link d-block">
            <i class="flaticon-cubes"></i>
            <span class="title">Mahsulot qoldig'i</span>
          </router-link>
        </li>
        <li class="sidebar-nav-item" v-if="seenPurchase">
          <router-link to="/daily-cost" class="sidebar-nav-link d-block">
            <i class="flaticon-date-1"></i>
            <span class="title">Kunlik xarajat</span>
          </router-link>
        </li>

        <li class="sub-title sidebar-nav-item" v-if="seenLogistic">
          <span class="d-block text-uppercase fw-medium">Logistika</span>
        </li>

        <li class="sidebar-nav-item" v-if="seenLogistic">
          <router-link to="/technique" class="sidebar-nav-link d-block">
            <i class="flaticon-express-delivery"></i>
            <span class="title">Texnikalar ro'yxati</span>
          </router-link>
        </li>

        <li class="sidebar-nav-item" v-if="seenLogistic">
          <router-link to="/drobilka" class="sidebar-nav-link d-block">
            <i class="flaticon-industry"></i>
            <span class="title">Drobilka va zavod</span>
          </router-link>
        </li>

        <li class="sidebar-nav-item" v-if="seenLogistic">
          <router-link to="/recieve-income-product" class="sidebar-nav-link d-block">
            <i class="flaticon-checkout"></i>
            <span class="title">Mahsulot kirimi</span>
          </router-link>
        </li>

        <li class="sub-title sidebar-nav-item" v-if="seenProduce">
          <span class="d-block text-uppercase fw-medium">Ishlab chiqarish</span>
        </li>

        <li class="sidebar-nav-item"  v-if="seenProduce">
          <router-link to="/ready-product" class="sidebar-nav-link d-block">
            <i class="flaticon-date"></i>
            <span class="title">Tayyor mahsulot</span>
          </router-link>
        </li>

        <li class="sidebar-nav-item"  v-if="seenProduce">
          <router-link to="/produce-cost" class="sidebar-nav-link d-block">
            <i class="flaticon-form"></i>
            <span class="title">Xarajatlar</span>
          </router-link>
        </li>

        <li class="sidebar-nav-item"  v-if="seenProduce">
          <router-link to="/produce-remainder" class="sidebar-nav-link d-block">
            <i class="ph ph-warehouse"></i>
            <span class="title">Ishlab chiqarish qoldig'i</span>
          </router-link>
        </li>

        <li class="sub-title sidebar-nav-item" v-if="seenLB">
          <span class="d-block text-uppercase fw-medium">Leader Beton</span>
        </li>

        <li class="sidebar-nav-item" v-if="seenLB">
          <router-link to="/lb-purchase" class="sidebar-nav-link d-block">
            <i class="ph ph-shopping-cart"></i>
            <span class="title">Sotuv</span>
          </router-link>
        </li>

        <li class="sidebar-nav-item" v-if="seenLB">
          <router-link to="/mixer" class="sidebar-nav-link d-block">
            <i class="ph ph-truck"></i>
            <span class="title">Mikserlar ro'yxati</span>
          </router-link>
        </li>

        <li class="sidebar-nav-item" v-if="seenLB">
          <router-link to="/ingredient" class="sidebar-nav-link d-block">
            <i class="flaticon-folder"></i>
            <span class="title">Beton tarkibi</span>
          </router-link>
        </li>

        <li class="sidebar-nav-item" v-if="seenLB">
          <router-link to="/lb-purchase-list" class="sidebar-nav-link d-block">
            <i class="ph ph-clipboard-text"></i>
            <span class="title">Sotuvlar ro'yxati</span>
          </router-link>
        </li>

        <li class="sidebar-nav-item" v-if="seenLB">
          <router-link to="/lb-remainder" class="sidebar-nav-link d-block">
            <i class="ph ph-lighthouse"></i>
            <span class="title">Tarkib qoldig'i</span>
          </router-link>
        </li>

        <li class="sidebar-nav-item" v-if="seenLB">
          <router-link to="/lb-price" class="sidebar-nav-link d-block">
            <i class="flaticon-project"></i>
            <span class="title">Mahsulot narxlari</span>
          </router-link>
        </li>

        <li class="sub-title sidebar-nav-item" v-if="seenNasos">
          <span class="d-block text-uppercase fw-medium">Nasos</span>
        </li>

        <li class="sidebar-nav-item" v-if="seenNasos">
          <router-link to="/nasos-service" class="sidebar-nav-link d-block">
            <i class="flaticon-rocket"></i>
            <span class="title">Xizmat ko'rsatish</span>
          </router-link>
        </li>
        <li class="sidebar-nav-item" v-if="seenNasos">
          <router-link to="/nasos-cost" class="sidebar-nav-link d-block">
            <i class="flaticon-shapes"></i>
            <span class="title">Nasos xarajatlari</span>
          </router-link>
        </li>

        <li class="sub-title sidebar-nav-item" v-if="seenWage">
          <span class="d-block text-uppercase fw-medium">Ish haqi</span>
        </li>

        <li class="sidebar-nav-item" v-if="seenWage">
          <router-link to="/tabel" class="sidebar-nav-link d-block">
            <i class="ph ph-sticker"></i>
            <span class="title">Tabel</span>
          </router-link>
        </li>

        <li class="sidebar-nav-item" v-if="seenWage">
          <router-link to="/dismissal" class="sidebar-nav-link d-block">
            <i class="ph ph-x-square"></i>
            <span class="title">Yo'qlama</span>
          </router-link>
        </li>

        <li class="sidebar-nav-item" v-if="seenWage">
          <router-link to="/employee" class="sidebar-nav-link d-block">
            <i class="ph ph-users"></i>
            <span class="title">Ishchilar ro'yxati</span>
          </router-link>
        </li>


        <li class="sub-title sidebar-nav-item" v-if="seenWarehouse">
          <span class="d-block text-uppercase fw-medium">Omborxona</span>
        </li>

        <li class="sidebar-nav-item" v-if="seenWarehouse">
          <router-link to="/warehouse" class="sidebar-nav-link d-block">
            <i class="ph ph-archive"></i>
            <span class="title">Ehtiyot qism va yoqilg'i ombori</span>
          </router-link>
        </li>

        <li class="sidebar-nav-item" v-if="seenWarehouse">
          <router-link to="/income-warehouse" class="sidebar-nav-link d-block">
            <i class="ph ph-arrow-circle-up-right"></i>
            <span class="title">Omborga kirim</span>
          </router-link>
        </li>

        <li class="sidebar-nav-item" v-if="seenWarehouse">
          <router-link to="/spend-warehouse" class="sidebar-nav-link d-block">
            <i class="ph ph-arrow-circle-up-left"></i>
            <span class="title">Ehtiyot qism va yoqilg'i sarfi</span>
          </router-link>
        </li>

        <li class="sub-title sidebar-nav-item"  v-if="seenSettingSimilar">
          <span class="d-block text-uppercase fw-medium">Sozlamalar</span>
        </li>

        <li class="sidebar-nav-item" v-if="seenSettingSimilar">
          <router-link to="/similar-information" class="sidebar-nav-link d-block">
            <i class="flaticon-folder"></i>
            <span class="title">O'xshash ma'lumotlar</span>
          </router-link>
        </li>

        <li class="sidebar-nav-item" v-if="seenSetting">
          <router-link to="/users" class="sidebar-nav-link d-block">
            <i class="flaticon-user-3"></i>
            <span class="title">Foydalanuvchilar</span>
          </router-link>
        </li>

        <li class="sidebar-nav-item" v-if="seenSetting">
          <router-link to="/permission" class="sidebar-nav-link d-block">
            <i class="flaticon-secure-shield"></i>
            <span class="title">Ruxsatnomalar</span>
          </router-link>
        </li>

        <li class="sub-title sidebar-nav-item" >
          <span class="d-block text-uppercase fw-medium">Chiqish</span>
        </li>

        <li class="sidebar-nav-item" @click="logout">
          <router-link to="/login" class="sidebar-nav-link d-block">
            <i class="flaticon-logout"></i>
            <span class="title">Chiqish</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import stateStore from "../../utils/store";
import router from "@/router";
import {ch} from "@fullcalendar/core/internal-common";

export default defineComponent({
  name: "MainSidebar",
  setup() {
    const stateStoreInstance = stateStore;
    return {
      stateStoreInstance,
    };
  },
  data(){
    return {
      seenDashboard: false,
      seenPurchase: false,
      seenLogistic: false,
      seenProduce: false,
      seenNasos: false,
      seenWage: false,
      seenLB: false,
      seenWarehouse: false,
      seenSetting: false,
      seenSettingSimilar: false,
      isAdmin: false,
    }
  },
  methods: {
    checkRole(){
      let check = localStorage.getItem("role");
      switch (check){
        case 'SYSTEM_ROLE_SUPER_ADMIN':
          this.seenDashboard = true;
          this.seenPurchase = true;
          this.seenLogistic = true;
          this.seenProduce = true;
          this.seenNasos = true;
          this.seenWage = true;
          this.seenLB = true;
          this.seenWarehouse = true;
          this.seenSettingSimilar = true;
          this.seenSetting = true;
          this.isAdmin = true;
          break;
        case 'SYSTEM_ROLE_ADMIN':
          this.seenDashboard = true;
          this.seenPurchase = true;
          this.seenLogistic = true;
          this.seenProduce = true;
          this.seenNasos = true;
          this.seenWage = true;
          this.seenLB = true;
          this.seenWarehouse = true;
          this.seenSettingSimilar = true;
          break;
        case 'LOGISTIC_ADMIN':
          this.seenLogistic = true;
          break;
        case 'PURCHASE_ADMIN':
          this.seenPurchase = true;
          break;
        case 'WAREHOUSE_ADMIN':
          this.seenWarehouse = true;
          break;
        case 'PRODUCE_ADMIN':
          this.seenProduce = true;
          break;
        case 'LEADER_BETON_ADMIN':
          this.seenLB = true;
          break;
      }
    },
    logout(){
      localStorage.clear();
      sessionStorage.clear();
      router.push("/login")
    },
    onCtrlB(event){
      event.preventDefault();
      router.push("/chsm-purchase-save")
    },
    onKeyDown(event) {
      // Check if Ctrl key and B key are pressed together
      if (event.ctrlKey && event.key === 'b') {
        event.preventDefault(); // Prevent default browser behavior
        this.navigateToAnotherPage(); // Navigate to the desired page
      }
    },
    navigateToAnotherPage() {
      router.push("/chsm-purchase-save")
    }
  },
  created() {
    this.checkRole();
  },
  mounted() {
    // Add event listener for keydown events
    window.addEventListener('keydown', this.onKeyDown);
  },
  beforeUnmount() {
    // Remove event listener when the component is destroyed
    window.removeEventListener('keydown', this.onKeyDown);
  },
});
</script>