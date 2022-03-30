<template>
  <Form :btnTask="btnTask" @RegisterUser="userRegister">
    <template #errors>
      <li v-for="(err, i) in fetchErrors" :key="i">{{ err.message }}</li>
    </template>
  </Form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({
    btnTask: "Register",
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
      register: "userAuth/register",
    }),

    userRegister(value) {
      console.log(this.isLoggedIn);
      this.register(value);
    },
  },
};
</script>
