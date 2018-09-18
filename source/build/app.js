import Vue from 'vue'
import router from './router'

const app = new Vue({
    name: 'application',
    router,
    render(h) {
        return <router-view></router-view>
    }
}).$mount('#app')

console.log(app)