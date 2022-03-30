<template>
  <Form :btnTask="btnTask" @LoginUser="userLogin">
    <template #errors>
      <li v-for="(err, i) in fetchErrors" :key="i">{{ err.message }}</li>
    </template>
  </Form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    btnTask: "Login",
  }),
  computed: {
    ...mapGetters({
      fetchErrors: "userAuth/getErrors",
      isLoggedIn: "userAuth/isLoggedIn",
    }),
  },
  mounted() {
    console.log(this.isLoggedIn);
  },
  methods: {
    ...mapActions({
      login: "userAuth/login",
    }),
    userLogin(value) {
      const val = this.login(value);
      console.log(val);
      if (this.isLoggedIn) {
        this.$router.push("/home");
      } else {
        this.$router.push("/auth/login-page");
      }
    },
  },
};
</script>
