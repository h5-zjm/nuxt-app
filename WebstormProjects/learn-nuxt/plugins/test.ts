export default defineNuxtPlugin((app)=>{
    const user={
        name:'test',
    }
    app.provide('user',user)
})
