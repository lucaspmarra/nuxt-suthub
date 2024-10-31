// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},
    modules: ['@nuxtjs/tailwindcss', 'nuxt-headlessui', '@nuxtjs/tailwindcss', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt', 'nuxt-svgo'],
    css: ['~/assets/main.scss'],
    pinia: {
        storesDirs: ['./stores/**'],
    },
    app: {
        baseURL: '/nuxt-suthub/',
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
        }
    }
})