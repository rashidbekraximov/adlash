<template>
  <div class="card mb-25 border-0 rounded-0 bg-white">
    <div class="card-body p-15 p-sm-20 p-sm-25 p-lg-30 letter-spacing">
      <div class="d-sm-flex align-items-center justify-content-between">
        <h5 class="card-title fw-bold mb-0">Sotuv</h5>
      </div>
      <div id="taskOverviewChart" class="chart">
        <apexchart
          type="bar"
          height="370"
          :options="taskOverviewChart"
          :series="task"
        ></apexchart>

      </div>
      <div class="col-lg-6 col-sm-6">
        <OnHoldTicket />
      </div>
    </div>
  </div>
</template>

<script>
import OnHoldTicket from "@/components/Dashboard/SupportDesk/TicketsChart/OnHoldTicket";

export default {
  name: "TaskOverview",
  components: OnHoldTicket,
  data() {
    return {
      task: [
        {
          name: "Sotuv",
          data: [],
        },
      ],
      taskOverviewChart: {
        chart: {
          type: "bar",
          height: 370,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            columnWidth: "24%",
          },
        },
        dataLabels: {
          enabled: false,
        },
        colors: ["#6560F0"],
        stroke: {
          show: false,
        },
        xaxis: {
          categories: [
            "Jan","Feb","Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
          ],
          labels: {
            show: true,
            style: {
              fontFamily: "Red Hat Display, sans-serif",
              colors: "#9C9AB6",
              fontSize: "14px",
              fontWeight: 500,
            },
          },
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
        },
        yaxis: {
          show: true,
          tickAmount: 6,
          labels: {
            show: true,
            style: {
              fontFamily: "Red Hat Display, sans-serif",
              colors: ["#9C9AB6"],
              fontSize: "14px",
              fontWeight: 500,
            },
          },
          axisBorder: {
            show: true,
            color: "#eee",
          },
        },
        fill: {
          opacity: 1,
          type: 'gradient',
          gradient: {
              opacityTo: 1,
              opacityFrom: .01,
              type: "vertical",
              stops: [0, 60, 100]
          }
        },
        tooltip: {
          style: {
            fontSize: "14px",
            fontFamily: "Red Hat Display, sans-serif",
          },
        },
        grid: {
          show: true,
          strokeDashArray: 5,
          borderColor: "#d9e9ef",
        },
      },
    };
  },
  methods: {
    getBarCharts(){
      this.$http.get("purchased/bar").then(res => {
        this.task[0].data = res.data
      })
    },
  },
  created() {
    this.getBarCharts();
  }
};
</script>