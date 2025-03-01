import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVueNext from "bootstrap-vue-next";
import VueApexCharts from "vue3-apexcharts";
import { QuillEditor } from '@vueup/vue-quill'
import Vue3Prism from 'vue3-prism/lib/Vue3Prism.common.js'

import VueTheMask from 'vue-the-mask';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "swiper/css";
import "swiper/css/bundle";
import 'flatpickr/dist/flatpickr.css';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import "vue3-prism/lib/Vue3Prism.css"
import axiosHttp from "./axios/axios"
import "./assets/custom.scss";
// import VueTheMask from 'vue-the-mask'
import Antd from 'ant-design-vue';
// import store from "./store';

import { formatNumber,formatNumberForAmount,convertNumericFieldsToNumbers } from './utils/formatter';
import { calculator} from './utils/calculator';

import apiPlugin from '@/plugins/apiPlugin';

const app = createApp(App).use(router);
app.config.globalProperties.$http = axiosHttp;
app.config.globalProperties.$formatNumber = formatNumber;
app.config.globalProperties.$convertNumericFieldsToNumbers = convertNumericFieldsToNumbers;
app.config.globalProperties.$formatNumberForAmount = formatNumberForAmount;

// Register global methods
app.config.globalProperties.$calculator = calculator;

app.use(VueApexCharts);
app.use(BootstrapVueNext);
app.use(Antd);
app.use(VueTheMask);
// import { numberFormatter } from './directivesd';

// Vue.directive('number-formatter', numberFormatter);


app.directive('format-number', {
    beforeMount(el, binding) {
        const formatNumber = (value) => {
            if (!value) return '';
            value = value.toString().replace(/\D/g, '');
            return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        };

        el.addEventListener('input', (e) => {
            const formattedValue = formatNumber(e.target.value);
            e.target.value = formattedValue;
            el.dispatchEvent(new Event('input')); // Ensure v-model updates
        });
    },
});

app.config.globalProperties.$formatNumber = function (value) {
    if (!value) return '';

    // Convert value to a string and handle floating-point numbers
    value = value.toString();

    // Separate the integer and decimal parts (if any)
    const parts = value.split('.');

    // Format the integer part with thousand separators
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Rejoin integer and decimal parts
    return parts.join('.');
};
app.use(apiPlugin);
// app.use(store);
// app.use(VueTheMask);
app.component('QuillEditor', QuillEditor)
.use(Vue3Prism)
app.mount("#app");
