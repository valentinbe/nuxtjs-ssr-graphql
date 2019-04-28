import NuxtConfiguration from "@nuxt/config";
// import { oc } from "ts-optchain";

const config: NuxtConfiguration = {
  /*
   ** Headers of the page
   */
  head: {
    title: "client",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Nuxt.js project" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [{ src: "https://js.stripe.com/v3", type: "" }]
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: "#3B8070" },
  /*
   ** Build configuration
   */
  build: {},
  modules: ["bootstrap-vue/nuxt", "@nuxtjs/axios"],
  axios: {}
};

export default config;
