import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = require.context('components', true, /([a-zA-Z0-9]+)[\\\/](tasks[\\\/]([a-zA-Z0-9]+)[\\\/])?route.js$/);

export default new Router({
    mode: 'history',
    routes: routes.keys().map(module => {
        const route = routes(module).default,
            [, component, task] = module.match(/([a-zA-Z0-9]+)[\\\/](tasks[\\\/]([a-zA-Z0-9]+)[\\\/])?route.js$/),
            name = [component, task].filter(p => p).join('.')
        route.name = route.name || name
        Object.assign(
            route.component,
            {
                name: name.replace(/\./g, '-'),
                component,
                task
            }
        )
        return route
    })
})