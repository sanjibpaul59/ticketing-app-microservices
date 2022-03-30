<template>
  <div>
    <h1>টিকিট কিনুন সহজে!</h1>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$store.state.userAuth.isLoggedIn);
  },
};
</script>
