import colors from "vuetify/es5/util/colors";

export default {
    server: {
        port: 3000, // default: 3000
        host: "0.0.0.0", // default: localhost,
        timing: false,
    },
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: "%s - অনলাইনে টিকিট কিনুন/বিক্রয় করুন",
        title: "টিকিট মাষ্টার",
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            {
                hid: "description",
                name: "description",
                content: "Online marketplace to BUY/SELL tickets of concerts, matchday etc.",
            },
            { name: "format-detection", content: "telephone=no" },
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/vuetify
        "@nuxtjs/vuetify",
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        "@nuxtjs/axios",
        // https://go.nuxtjs.dev/pwa
        "@nuxtjs/pwa",
        "@nuxtjs/auth-next",
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
        baseURL: "https://ticketing-app.xyz/api/",
        credentials: false,
        proxyHeaders: true,
    },

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: "en",
        },
    },

    // auth: {
    //     strategies: {
    //         local: {
    //             endpoints: {
    //                 login: {
    //                     url: "/users/signin",
    //                     method: "post",
    //                     propertyName: "token",
    //                 },
    //                 register: {
    //                     url: "/users/signup",
    //                     method: "post",
    //                 },
    //                 currentUser: {
    //                     url: "/users/currentuser",
    //                     method: "get",
    //                     propertyName: "currentUser",
    //                 },
    //             },
    //             tokenType: "bearer",
    //         },
    //     },
    // },

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ["~/assets/variables.scss"],
        theme: {
            dark: false,
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3,
                },
            },
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},
};