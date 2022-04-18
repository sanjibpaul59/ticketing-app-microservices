<template>
  <div class="d-flex justify-center mt-16">
    <v-card width="40rem">
      <v-card-title rimary-title class="justify-center">
        {{ name }}
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-if="btnTask === 'Register'"
            v-model="user.username"
            label="নাম দেও একটা"
            required
          ></v-text-field>

          <v-text-field
            v-model="user.email"
            :rules="emailRules"
            label="ইমেইলটাও দেও"
            required
          ></v-text-field>

          <v-text-field
            v-model="user.password"
            :rules="passwordRules"
            label="একটা মজবুত পাসওয়ার্ড দেও"
            type="password"
            required
          ></v-text-field>

          <slot name="errors" />
          <v-btn
            :disabled="!valid"
            color="primary"
            class="mr-4 mt-4"
            @click="validate"
            >জমা দেও এইবার</v-btn
          >
        </v-form>
        <div class="mt-2">
          <p v-if="btnTask === 'Login'">
            একাউন্ট নাই?
            <nuxt-link to="/register">খুলো একটা</nuxt-link>
          </p>
          <p v-else>
            একাউন্ট আছেই?
            <nuxt-link class="mr-3" to="/login">লগইন কইরা ঢুকো তাইলে</nuxt-link>
          </p>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ["btnTask", "name"],
  data: () => ({
    valid: true,
    user: {
      username: "tester - " + Math.floor(Math.random() * 100) + 1,
      email: "test2@yahoo.com",
      password: "test2",
    },

    emailRules: [
      (v) => !!v || "ইমেইল না দিলে তো হইব না কাকা",
      (v) =>
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "ইমেইল ভুল হইছে, ঠিকঠাক ইমেইল দেও",
    ],
    passwordRules: [
      (v) => !!v || "পাসওয়ার্ড ও লাগবো যে!",
      (v) => v.length >= 4 || "কমছে কম ৪ অক্ষরের লাগবো",
    ],
    // usernameRules: [
    //   (v) => !!v || "Username is required",
    //   (v) => v.length >= 4 || "Username Length must be at least 4 characters",
    // ],
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
