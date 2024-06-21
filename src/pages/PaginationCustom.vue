<template>
  <div class="pagination-area d-md-flex mt-15 mt-sm-20 mt-md-25 justify-content-between align-items-center">
    <p class="mb-0 text-paragraph">
      Showing <span class="fw-bold">15</span> out of
      <span class="fw-bold">{{totalPages*15}}</span> results
    </p>
    <nav class="mt-15 mt-md-0">
      <ul class="pagination mb-0">
        <li class="page-item">
          <bu class="page-link" @click="prevPage" :disabled="currentPage === 1" aria-label="Previous">
            <i class="flaticon-chevron-1"></i>
          </bu>
        </li>
        <li class="page-item"
            v-for="page in pages"
            :key="page"
            @click="changePage(page)"
            :class="{ active: currentPage === page }"
        >
          <a class="page-link" href="#">{{page}}</a>
        </li>
        <li class="page-item">
          <a class="page-link"  @click="nextPage" :disabled="currentPage === totalPages" aria-label="Next">
            <i class="flaticon-chevron"></i>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "PaginationCustom",
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  computed: {
    pages() {
      const totalButtons = Math.min(this.totalPages, 15); // Limit to 15 buttons
      const middleButton = Math.ceil(totalButtons / 2);
      let startPage = Math.max(1, this.currentPage - middleButton + 1);
      let endPage = Math.min(this.totalPages, startPage + totalButtons - 1);

      if (endPage - startPage + 1 < totalButtons) {
        startPage = Math.max(1, endPage - totalButtons + 1);
      }

      return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
    }
  },
  methods: {
    changePage(page) {
      this.$emit('page-changed', page);
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.changePage(this.currentPage - 1);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.changePage(this.currentPage + 1);
      }
    }
  }
}
</script>

<style scoped>

</style>