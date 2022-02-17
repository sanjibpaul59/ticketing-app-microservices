<template>
  <Form :btnTask="btnTask" @RegisterUser="userRegister" />
</template>

<script>
export default {
  data: () => ({
    btnTask: "Register",
  }),
  methods: {
    userRegister(value) {
      console.log(value);
    },
  },
};
</script>
