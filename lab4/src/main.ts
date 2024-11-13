import '@/assets/main.scss'

import {createApp} from 'vue'
import {createPinia} from 'pinia'
import directivesPlugin from '@/plugins/directives';
import i18n from '@/plugins/i18n'
import serviceProviderPlugin from '@/plugins/serviceProvider';
import DemoI18n from "@/DemoI18n.vue";
import router from './router'
import App from './App.vue'
import vTooltip from '@/plugins/v-tooltip'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(directivesPlugin);
app.use(i18n, {
    greetings: {
        hi: 'Привіт!'
    }
});
app.use(serviceProviderPlugin);
app.directive('tooltip', vTooltip);

app.mount('#app')
