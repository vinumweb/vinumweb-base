// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: [
    '@nuxt/ui-pro'
  ],
  modules: [
    '@nuxt/ui',
    '@formkit/auto-animate/nuxt',
    '@nuxt/image'
  ],
  runtimeConfig: {
    facebookAccessToken: '',
    facebookPageId: '',
  },
  ui: {
    icons: ['tabler', 'simple-icons', 'logos']
  },
})
