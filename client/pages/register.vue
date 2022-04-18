<template>
  <Form :btnTask="btnTask" @RegisterUser="userRegister" :name="name">
    <template #errors>
      <li v-for="(err, i) in errors" :key="i">{{ err.message }}</li>
    </template>
  </Form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    btnTask: "Register",
    name: "রেজিস্টার করুন",
    fetchedErrs: null,
  }),
  computed: {
    ...mapGetters({
      fetchErrors: "userAuth/getErrors",
      isLoggedIn: "userAuth/isLoggedIn",
    }),
    errors() {
      this.fetchedErrs = this.fetchErrors;
      return this.fetchedErrs;
    },
  },
  methods: {
    ...mapActions({
      register: "userAuth/register",
    }),

    userRegister(value) {
      try {
        this.register(value);
        this.$router.push("/login");
      } catch (error) {
        this.$router.push("/register");
      }
    },
  },
};
</script>
