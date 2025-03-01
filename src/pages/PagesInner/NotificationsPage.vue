<template>
  <BreadCrumb PageTitle="Bildirishnomalar"/>
  <NotificationsContent />
</template>

<script>
import BreadCrumb from "@/components/Common/BreadCrumb.vue";
import NotificationsContent from "@/components/PagesInner/Notifications/NotificationsContent";

export default {
  name: "NotificationsPage",
  components: {
    NotificationsContent,
    BreadCrumb
  },
};
</script>