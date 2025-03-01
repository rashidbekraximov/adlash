<template>
  <div class="login-container">
    <div class="login-card">
      <div class="card-content">
        <div class="logo-container">
          <img src="@/assets/images/favicon.png" width="70" alt="logo-icon" />
        </div>
        <h4 class="login-title">STARK axborot tizimi</h4>
        <form @submit.prevent="authentication">
          <div class="form-group">
            <label for="login" class="form-label">Telefon raqam</label>
            <div class="input-group">
              <span class="input-group-text">+998</span>
              <input
                  id="login"
                  type="text"
                  name="login"
                  class="form-control"
                  placeholder="e.g. 99 123 45 67"
                  v-mask="'(##)-###-##-##'"
                  v-model="loginVM.login"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="password" class="form-label">Parol</label>
            <input
                id="password"
                type="password"
                name="password"
                class="form-control"
                placeholder="********"
                @input="event => loginVM.password = event.target.value"
            />
          </div>
          <button type="submit" class="btn-submit">Kirish</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {notification} from "ant-design-vue";
import router from "@/router";
import {API_URL} from "@/constant";
import axios from "axios";
import Home from "@/view/Home";

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
      this.loginVM.login = this.loginVM.login.replaceAll('-','').replace('(','').replace(')','')
      if (this.loginVM.username !== "" && this.loginVM.password !== "") {
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
            localStorage.setItem("token", token);
            location.reload()
            setTimeout(() => {
              router.push({name: Home});
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

<style scoped>
.login-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4rem;
  /*background: linear-gradient(135deg, #f9f9f9 30%, #e3f2fd 100%);*/
}

.login-card {
  max-width: 600px;
  width: 100%;
  border: none;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  padding: 50px;
  transition: transform 0.3s ease-in-out;
}

.login-card:hover {
  transform: translateY(-5px);
}

.card-content {
  text-align: center;
}

.logo-container {
  margin-bottom: 1.5rem;
}

.login-title {
  font-size: 1.4rem;
  color: #333;
  margin-bottom: 20px;
  font-weight: bold;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 8px;
  display: block;
  text-align: left  ;
}

.input-group {
  display: flex;
  align-items: center;
}

.input-group-text {
  background-color: #e3f2fd;
  border: none;
  color: #333;
  font-weight: bold;
  font-size: 18px;
  padding: 16px;
}

.form-control {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 17px 19px;
  font-size: 1rem;
  flex: 1;
  transition: border-color 0.2s ease-in-out;
}

.form-control:focus {
  border-color: #42a5f5;
}

.btn-submit {
  background-color: #4caf50;
  border: none;
  padding: 17px 19px;
  font-size: 1.3rem;
  font-weight: 600;
  border-radius: 8px;
  color: white;
  width: 100%;
  transition: background-color 0.2s ease-in-out;
}

.btn-submit:hover {
  background-color: #388e3c;
}
</style>