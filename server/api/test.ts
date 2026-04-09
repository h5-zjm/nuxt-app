export default defineEventHandler((event)=>{
    const {apiKey} = useRuntimeConfig();
    console.log('apiKey',apiKey)
    return {
        name:'test'
    }
})
