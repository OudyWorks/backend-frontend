import app from './app'

export default context => {
    const _ = app(context)
    _.$router.push(context.url)
    return new Promise(
        resolve => {
            _.$router.onReady(
                () => {
                    context.meta = _.$meta()
                    resolve(_)
                }
            )
        }
    )
}