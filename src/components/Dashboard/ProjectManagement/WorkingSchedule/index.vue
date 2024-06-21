<template>
  <div class="card mb-25 border-0 rounded-0 bg-white working-schedule-box">
    <div class="card-body p-15 p-sm-20 p-sm-25 p-lg-30 letter-spacing">
      <div class="mb-15 d-sm-flex align-items-center justify-content-between">
        <h5 class="card-title fw-bold mb-0">So'ngi sotuvlar</h5>
      </div>
      <div class="schedule-list mt-15 mt-md-20">
        <div
          v-for="schedule in datasets"
          :key="schedule.id"
          :class="[
            'list-item pt-15 pb-15 pt-md-20 pb-md-20 ps-20 pe-15 position-relative d-sm-flex justify-content-between align-items-center bg-f2f1f9',
          ]"
        >
          <div class="content">
            <div class="d-flex align-items-center mb-5">
              <h6 class="fw-medium mb-0">
                {{ schedule.date }}
              </h6>
              <div
                :class="[
                  'ms-10 icon rounded-circle text-center position-relative bg-primary text-white'
                ]"
              >
                <i class="flaticon-bell-2"></i>
              </div>
            </div>
            <span class="d-block text-black fw-semibold fs-md-15 mb-1">
              Xaridor: {{ schedule.client === undefined ? schedule.customer : schedule.client}}
            </span>
            <span class="d-block text-muted fs-12 fw-medium">
              Hudud:
              <span :class="schedule.class">{{schedule.location}}, {{schedule.km}} km</span>
            </span>
          </div>
<!--          <router-link-->
<!--            to="/project-details"-->
<!--            class="card-btn bg-white d-inline-block fw-medium text-decoration-none transition ps-15 pe-15 pt-7 pb-7 border-0 mt-12 mt-sm-0"-->
<!--          >-->
<!--            View Details-->
<!--          </router-link>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import workingSchedule from "./workingSchedule.json";

export default defineComponent({
  name: "WorkingSchedule",
  props: {
    title: {
      type: String,
      default: "So'ngi sotuvlar",
    },
    link: {
      type: String,
      default: "/dashboard-list",
    },
    datasets: {
      type: Array,
      default: () => [],
      required:true
    },
  },
  data() {
    return {
      schedules: workingSchedule,
    };
  },
});
</script>