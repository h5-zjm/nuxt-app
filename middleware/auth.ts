import type {UserInfo} from "../types/user";
import {useUserCurrentInfo} from "~/composables/useUserCurrentInfo";

export default defineNuxtRouteMiddleware(async (to,from) =>{
    if(to.path==='/login'||to.path==='/signup'){
        return
    }
    const currentUser=useUserCurrentInfo()

    const token=useCookie('token')
    const cookie=useRequestHeader('cookie')as string
    if(!token.value){
        navigateTo('/login')
        return
    }
   //token存在 用户没有登录，这里有两个token的原因是，这个ssr渲染的时候，服务端渲染时，useFetch 发请求是从 Nuxt 服务器发往 API 服务器，不会自动携带浏览器的 cookie。所以需要手动从原始请求头中取出 cookie 字符串
    if(token.value&&!currentUser.value.isLogin){
        const {data,error}=await useFetch('/api/users/current',{
            headers:{cookie,accept:'application/json'},
            method:'GET',
        })
        if(!error.value){
            currentUser.value.isLogin=true
            currentUser.value.data=data.value
        }else{
            currentUser.value.isLogin=false
            token.value=null
            navigateTo('/login')
        }
    }
})
