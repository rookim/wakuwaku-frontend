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
    <button @click="goBack()">Back</button>
  </span>
</template>
