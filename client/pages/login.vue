<template>
  <Form :btnTask="btnTask" @LoginUser="userLogin" :name="name">
    <template #errors>
      <li v-for="(err, i) in errors" :key="i">{{ err.message }}</li>
    </template>
  </Form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    btnTask: "Login",
    name: "লগইন করুন",
    loginErrors: null,
  }),

  computed: {
    ...mapGetters({
      fetchErrors: "userAuth/getErrors",
      isLoggedIn: "userAuth/isLoggedIn",
    }),
    errors() {
      this.loginErrors = this.fetchErrors;
      return this.fetchErrors;
    },
    isAuthenticated() {
      return this.isLoggedIn;
    },
  },
  mounted() {
    this.loginErrors = null;
  },
  methods: {
    ...mapActions({
      login: "userAuth/login",
    }),
    async userLogin(value) {
      // try {
      //   this.$auth.loginWith("local", {
      //     data: {
      //       email: value.email,
      //       password: value.password,
      //     },
      //   });
      //   // await this.$router.push("/home");
      // } catch (error) {
      //   console.log("caught some errors\n", error.response.data.errors);
      //   // this.$router.push("/login");
      // }
      await this.login(value);

      if (this.isAuthenticated) {
        this.$router.push("/home");
      } else {
        this.$router.push("/login");
      }
      // if (this.$store.state.auth.loggedIn) {
      //   this.$router.push("/home");
      // } else {
      //   this.$router.push("/login");
      // }
    },
  },
};
</script>
