import { createApp, h } from 'vue'
import Demo from './Demo.vue'

const app = createApp({
  render: () => h(Demo)
})

app.mount('#app')
