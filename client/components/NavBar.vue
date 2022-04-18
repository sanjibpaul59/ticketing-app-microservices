<template>
  <v-app-bar :clipped-left="clipped" fixed app>
    <v-toolbar-title>
      <nuxt-link class="display-1" to="/">{{ title }}</nuxt-link>
    </v-toolbar-title>
    <v-spacer />
    <div v-if="isLoggedIn" class="d-flex">
      <h5>{{ currentuser.username }}</h5>
      <v-btn class="logoutBtn" text @click="userLogout">লগ আউট</v-btn>
    </div>
    <div v-else>
      <nuxt-link class="mr-3" to="/login">লগইন</nuxt-link>
      <nuxt-link to="/register">রেজিস্টার</nuxt-link>
    </div>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      clipped: false,
      fixed: false,
      title: "টিকিট মাষ্টার",
      decoration: "none",
    };
  },
  computed: {
    ...mapGetters({
      loggedIn: "userAuth/isLoggedIn",
      currentUser: "userAuth/currentUser",
    }),
    isLoggedIn() {
      return this.loggedIn;
    },
    currentuser() {
      return this.currentUser;
    },
  },
  methods: {
    ...mapActions({
      logOut: "userAuth/logOut",
    }),
    userLogout() {
      this.logOut();
      this.$router.push("/login");
    },
  },
};
</script>

<style>
/* home route and active route will show in bold as it matches / and /about */
a.nuxt-link-active {
  font-weight: bold;
}
/* exact link will show the primary color for only the exact matching link */
a.nuxt-link-exact-active {
  color: #00c58e;
}
.logoutBtn {
  font-weight: bold;
  color: #00c58e;
}
.logoutBtn:hover {
  text-decoration: none;
  color: #006064;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji,
    Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  margin: 0;
}

main {
  margin: 0 auto;
  padding: 0 1rem;
  margin-top: 100px;
  max-width: 1280px;
  text-align: center;
}
img {
  margin-bottom: 1rem;
}

ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
li {
  margin: 0 0.5rem;
  padding: 0.25rem;
  font-size: 1.2rem;
}

nav {
  padding: 0 1rem;
}

a,
a:visited {
  text-decoration: none;
  color: #006064;
}

a:hover {
  color: #00c58e;
}
</style>
