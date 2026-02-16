import { createApp } from 'vue'
import App from './App.vue'
import HebrewDatePicker from 'vue-hebrew-date-picker'
import '../../src/style.css'

const app = createApp(App)
app.use(HebrewDatePicker)
app.mount('#app')
