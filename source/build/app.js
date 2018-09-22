import Vue from 'vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import meta from './meta'
import layout from 'LAYOUT'

export default (context = {}) =>
    new Vue({
        name: 'application',
        router,
        store,
        i18n,
        render(h) {
            return h(layout)
        },
        metaInfo: {
            titleTemplate: '%s - App'
        }
    })