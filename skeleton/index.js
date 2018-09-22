const server = require('express')()
const { createBundleRenderer } = require('vue-server-renderer')
const path = require('path')
const renderer = createBundleRenderer(
    path.join(__dirname, './dist/vue-ssr-server-bundle.json'),
    // {
    //     runInNewContext: false, // recommended
    //     // template, // (optional) page template
    //     // clientManifest // (optional) client build manifest
    // }
)

server.get('*', (req, res) => {
    const context = { url: req.url }
    renderer.renderToString(context, (err, html) => {
        const meta = context.meta.inject()
        res.end(`<!doctype html><html data-vue-meta-server-rendered ${meta.htmlAttrs.text()}><head>${meta.meta.text()}${meta.title.text()}${meta.link.text()}${meta.style.text()}${meta.script.text()}${meta.noscript.text()}</head><body ${meta.bodyAttrs.text()}>${html}${meta.script.text({body: true})}</body></html>`)
    })
})
  
server.listen(8080)