export default defineNitroPlugin((app)=>{
    app.hooks.hook('request',(event)=>{
        // console.log('on request',event.path)
    })
    app.hooks.hook('beforeResponse',(event,{body})=>{
        // console.log('before',event.path,body)
    })
})
