<template>
  <div class="row w-100 d-flex align-items-center justify-content-center mt-4 ">
    <div class="col-md-6">
      <div class="card border-0 rounded-0 bg-white authentication-card">
        <div class="card-body letter-spacing">
          <div class="d-flex justify-content-center mb-lg-4">
            <img src="@/assets/images/favicon.png" width="70" alt="logo-icon" />
          </div>
          <h4 class="text-black fw-bold mb-0 text-center">
            STARK axborot tizimi
          </h4>
          <form @submit.prevent="authentication">
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Telefon raqam
              </label>
              <input
                  id="login"
                  type="text"
                  name="login"
                  class="form-control shadow-none rounded-0 text-black"
                  placeholder="e.g. +998991234567"
                  @input="event => loginVM.login = event.target.value"

              />
            </div>
            <div class="form-group mb-15 mb-sm-20 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10">
                Parol
              </label>
              <input
                  id="password"
                  type="password"
                  name="password"
                  class="form-control shadow-none rounded-0 text-black"
                  placeholder="**************"
                  @input="event => loginVM.password = event.target.value"
              />
            </div>
            <div class="d-flex align-items-center justify-content-between mb-15 mb-md-20">
              <div class="form-check form-check-primary mb-0 fs-md-15 fs-lg-16 text-muted lh-1">
                <input
                    class="form-check-input shadow-none"
                    type="checkbox"
                    v-model="rememberMe"
                    id="remember-me"
                />
                <label class="form-check-label" for="remember-me">
                  Eslab qolish
                </label>
              </div>
              <router-link
                  to="/forgot-password"
                  class="forgot-password-btn fs-md-15 fs-lg-16 text-decoration-none position-relative text-primary"
              >
                Forgot Password?
              </router-link>
            </div>
            <button
                class="default-btn transition border-0 fw-medium text-white rounded-1 fs-md-15 fs-lg-16 bg-success d-block w-100"
                type="submit"
            >
              Kirish
            </button>
<!--            <span-->
<!--                class="d-block text-muted text-center mt-15 mt-md-30 mb-12 mb-md-20 fs-md-15 fs-lg-16"-->
<!--            >-->
<!--              Don’t have an account?-->
<!--            </span>-->
<!--            <router-link-->
<!--                to="/register"-->
<!--                class="default-btn with-border transition fw-medium rounded-1 fs-md-15 fs-lg-16 d-block w-100 text-decoration-none text-center"-->
<!--            >-->
<!--              Create Account-->
<!--            </router-link>-->
<!--            <span-->
<!--                class="d-block or text-muted text-center mt-15 mb-15 mt-md-20 mb-md-20 fs-md-15 fs-lg-16 position-relative z-1 lh-1"-->
<!--            >-->
<!--              <span class="d-inline-block bg-white">Or</span>-->
<!--            </span>-->
<!--            <ul class="socials ps-0 mb-0 list-unstyled text-center">-->
<!--              <li class="d-inline-block">-->
<!--                <button-->
<!--                    type="button"-->
<!--                    class="d-block rounded-circle text-center position-relative facebook border-0 p-0"-->
<!--                >-->
<!--                  <i class="ph-fill ph-facebook-logo"></i>-->
<!--                </button>-->
<!--              </li>-->
<!--              <li class="d-inline-block">-->
<!--                <button-->
<!--                    type="button"-->
<!--                    class="d-block rounded-circle text-center position-relative google border-0 p-0"-->
<!--                >-->
<!--                  <i class="ph-bold ph-google-logo"></i>-->
<!--                </button>-->
<!--              </li>-->
<!--              <li class="d-inline-block">-->
<!--                <button-->
<!--                    type="button"-->
<!--                    class="d-block rounded-circle text-center position-relative twitter border-0 p-0"-->
<!--                >-->
<!--                  <i class="ph-fill ph-twitter-logo"></i>-->
<!--                </button>-->
<!--              </li>-->
<!--              <li class="d-inline-block">-->
<!--                <button-->
<!--                    type="button"-->
<!--                    class="d-block rounded-circle text-center position-relative linkedin border-0 p-0"-->
<!--                >-->
<!--                  <i class="ph-fill ph-linkedin-logo"></i>-->
<!--                </button>-->
<!--              </li>-->
<!--            </ul>-->
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {notification} from "ant-design-vue";
import router from "@/router";
import {API_URL} from "@/constant";
import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      loginVM : {
        login: '',
        password: ''
      },
      rememberMe: true
    }
  },
  methods: {
    authentication() {
      if (this.loginVM.username !== "" && this.loginVM.password !== "") {
        console.log(this.loginVM.login);
        axios.post(API_URL + 'auth/login', this.loginVM, {
          headers: {
            'Content-type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            accept: "*/*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Credentials": true,
            expires: "0",
            "cache-control": "no-cache,no-store,max-age=0,must-revalidate",
            pragma: "no-cache",
          }
        }).then((res) => {
          console.log(res)
          if (res.data.success) {
            // store.commit("authenticated", res.data.data.user);
            localStorage.clear();
            localStorage.setItem("lang","?lang=uz_lat")
            localStorage.setItem("role",res.data.data.user.systemRoleName)
            localStorage.setItem("userId",res.data.data.user.id)
            notification.success({
              message: 'Siz tizimga muvaffaqiyatli kirdingiz !',
              duration: 2
            });
            const token = res.data.data.accessToken;
            localStorage.setItem("expiry", res.data.data.accessTokenExpiry);
            if (this.rememberMe) {
              localStorage.setItem("token", token);
            } else {
              sessionStorage.setItem("expiry", res.data.data.accessTokenExpiry);
            }
            // switch (res.data.data.user.systemRoleName){
            //   case 'SYSTEM_ROLE_SUPER_ADMIN':
            //     // router.push("/home");
            //     break;
            //   case 'LOGISTIC_ADMIN':
            //     router.push("/references/techniques");
            //     break;
            //   case 'PURCHASE_ADMIN':
            //     router.push("/purchase/add");
            //     break;
            //   case 'NASOS_ADMIN':
            //     router.push("/nasos/list");
            //     break;
            //   case 'PRODUCE_ADMIN':
            //     router.push("/produce/ready-products");
            //     break;
            // }
            location.reload()
            setTimeout(() => {
              router.push({ name: 'Home' });
            },3000)
          } else {
            this.addClassForInput();
            notification.error({
              message: 'Login yoki parol xato !',
              duration: 1
            });
          }
        });
      }
    },

    addClassForInput() {
      let element = document.getElementsByClassName("form-control");
      element[0].className += " is-invalid";
      element[1].className += " is-invalid";
    }
  }
};
</script>