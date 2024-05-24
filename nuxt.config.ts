// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: [
    '@nuxt/ui-pro'
  ],
  modules: [
    '@nuxt/ui',
    '@formkit/auto-animate/nuxt',
    '@nuxt/image',
    '@nuxtjs/seo',
    '@nuxtjs/plausible',
    'nuxt-delay-hydration',
    'nuxt-typed-router',
    '@nuxtjs/eslint-module'
  ],
  delayHydration: {
    debug: process.env.NODE_ENV === 'development'
  },
  runtimeConfig: {
    facebookAccessToken: '',
    facebookPageId: '',
  },
  plausible: {
    apiHost: 'https://analytics.vinumweb.com'
  },
  seo: {
    redirectToCanonicalSiteUrl: true
  },
  ui: {
    icons: ['tabler', 'simple-icons', 'logos']
  },
})
