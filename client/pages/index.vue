<template>
  <div>
    <h1>টিকিট কিনুন সহজে!</h1>
    <h2 v-if="isLoggedIn">You are signed In!</h2>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      isLoggedIn: "userAuth/isLoggedIn",
    }),
  },
};
</script>
