export default {
    path: '/',
    component: {
        metaInfo: {
            title: 'Home'
        },
        render(h) {
            return <div>
                <h2>Hello world!</h2>
                <router-link to="/test">test</router-link>
            </div>
        }
    }
}