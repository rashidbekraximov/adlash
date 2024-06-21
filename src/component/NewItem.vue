<template>
  <div class="card mb-25 border-0 rounded-0 bg-white crm-stats-box">
    <div class="card-body letter-spacing">
      <div class="row justify-content-between justify-content-end">
        <div class="col-xxxl-6 col-lg-6 col-md-6">
          <div
              class="icon mb-8 d-flex align-items-center text-uppercase text-dark-emphasis fw-medium"
          >
            <i class="flaticon-sterile-box text-primary me-6"></i> {{stringProp}}
          </div>
          <h3 class="fw-black mb-15 lh-1">
            <Vue3autocounter ref='counter' :startAmount='0' :endAmount='numberProp' :duration='1' prefix='' separator=',' decimalSeparator='.' :decimals='1' :autoinit='true'/>
          </h3>
          <span class="fw-bold text-info text-badge d-inline-block">
            <i
                class="flaticon-price-tag-2 fs-11 lh-1 position-relative top-1 mx-2"
            ></i>
            <Vue3autocounter ref='counter' :startAmount='0' :endAmount='priceProp' :duration='1' prefix='' separator=',' decimalSeparator='.' :decimals='1' :autoinit='true'/>
            SO'M
          </span>
<!--          <span class="d-block text-muted mt-8">Than last week</span>-->
        </div>
        <div class="col-xxxl-6 col-lg-6 col-md-6">
          <div class="chart">
            <apexchart
                type="area"
                height="135"
                id="newUsersChart"
                :options="newUsersChart"
                :series="users"
            ></apexchart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue3autocounter from 'vue3-autocounter';

export default {
  name: "NewItem",
  components:{
    Vue3autocounter
  },
  props: {
    stringProp: {
      type: String,
      required: true
    },
    numberProp: {
      type: Number,
      required: true
    },
    priceProp: {
      type: Number,
      required: true
    },
    colorProp: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      users: [
        {
          data: [7, 8, 9, 9, 8, 9, 8, 9, 11, 9, 8],
        },
      ],
      newUsersChart: {
        chart: {
          height: 135,
          type: "area",
          toolbar: {
            show: false,
          },
        },
        colors: [this.colorProp],
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        yaxis: {
          show: false,
        },
        grid: {
          show: false,
          strokeDashArray: 5,
          borderColor: "#f0f0f0",
        },
        tooltip: {
          enabled: false,
          style: {
            fontSize: "14px",
            fontFamily: "Red Hat Display, sans-serif",
          },
        },
      },
    };
  },
};
</script>