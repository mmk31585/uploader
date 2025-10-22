import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue/client'
import { InferSeoMetaPlugin } from '@unhead/addons'
import PrimeVue from 'primevue/config'
import './assets/css/main.css'
import App from './App.vue'
import router from './router'
import { IndigoPreset, primeLocale } from '@/utils'
import LayoutEmpty from './components/layouts/LayoutEmpty.vue'

const head = createHead({
  plugins: [InferSeoMetaPlugin()],
})

const app = createApp(App)

app
  .use(createPinia())
  .use(router)
  .use(head)
  .use(PrimeVue, {
    ripple: true,
    theme: {
      rtl: true,
      preset: IndigoPreset,
      options: {
        darkModeSelector: '.app-dark',
        cssLayer: {
          name: 'primevue',
          order: 'theme, base, primevue',
        },
      },
      locale: primeLocale,
    },
  })

app.component('layout-empty', LayoutEmpty)

app.mount('#app')
