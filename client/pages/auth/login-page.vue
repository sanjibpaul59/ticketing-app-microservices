<template>
  <Form :btnTask="btnTask" @LoginUser="userLogin" />
</template>

<script>
export default {
  data: () => ({
    btnTask: "Login",
  }),
  methods: {
    userLogin(value) {
      console.log(value);
    },
  },
};
</script>
