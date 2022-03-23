<script>
export default {
  methods: {
    goBack: function () {
      return this.$router.go(-1);
    },
  },
};
</script>

<template>
  <span class="go-back">
    <a @click="goBack()" class="btn btn-xs btn-primary pill go-back-button">
      <span class="fas fa-chevron-left mr-10"></span>
      <span>Back</span>
    </a>
    <!-- <button @click="goBack()">Back</button> -->
  </span>
</template>
