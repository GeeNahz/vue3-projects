// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt'
  ],
  components: {
    global: true,
    dirs: ['~/components']
  },
  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=500, initial-scale=1',
      title: 'ProGrest',
      meta: [
        { name: 'description', content: 'Make progress and enjoy your rest with ProGrest where your project is managed the way you want.'}
      ]
    }
  },
  meta: {
    link: [
      {
        rel: 'stylesheet',
        href: "https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.5.0/semantic.min.css",
        integrity: "sha512-KXol4x3sVoO+8ZsWPFI/r5KBVB/ssCGB5tsv2nVOKwLg33wTFP3fmnXa47FdSVIshVTgsYk/1734xSk9aFIa4A==",
        crossorigin: "anonymous",
        referrerpolicy: "no-referrer"
      },
      {
        href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/fontawesome.min.css',
        crossorigin: 'anonymous'
        // src: 'https://kit.fontawesome.com/50ff9a1cc4.js',
      }
    ],
    script: [
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.5.0/semantic.min.js',
        integrity: "sha512-Xo0Jh8MsOn72LGV8kU5LsclG7SUzJsWGhXbWcYs2MAmChkQzwiW/yTQwdJ8w6UA9C6EVG18GHb/TrYpYCjyAQw==",
        crossorigin: "anonymous",
        referrerpolicy:"no-referrer"
      }
    ]
  },
  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
      },
      {
        rel:"stylesheet",
        href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/font-awesome.min.css"
      }
    ],
    script: []
  },
  runtimeConfig: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID
  }
})
