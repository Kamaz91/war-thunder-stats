import { createApp } from 'vue'
import { createPinia } from 'pinia'

import "@/src/style.css"
import App from '@/src/App.vue'

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);

app.mount('#app').$nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*')
});