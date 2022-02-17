<template>
<div class="d-flex justify-center mt-16">
    <v-card width="40rem">
      <v-card-title rimary-title class="justify-center"> {{btnTask}} </v-card-title>
      <v-card-text>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="user.email"
      :rules="emailRules"
      label="Email"
      required
    ></v-text-field>
    <v-text-field
      v-model="user.password"
      :rules="passwordRules"
      label="Password"
      type="password"
      required
    ></v-text-field>
    <v-btn
      :disabled="!valid"
      color="primary"
      class="mr-4 mt-4"
      @click="validate"
      >Submit</v-btn
    >
  </v-form>
    </v-card-text>
    </v-card>
  </div>
</template>
</template>

<script>
export default {
  props: ["btnTask"],
  data: () => ({
    valid: true,
    user: {
      email: "",
      password: "",
    },

    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail must be valid",
    ],
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => v.length >= 6 || "Password Length must be at least 6 characters",
    ],
  }),
  methods: {
    validate(event) {
      if (this.$refs.form.validate()) {
        this.$emit(`${this.btnTask}User`, this.user);
      }
    },
  },
};
</script>
