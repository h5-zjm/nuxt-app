import protectedRoute from "#server/protectedRoute";
import jwt from "jsonwebtoken";
export default defineEventHandler(async (event)=>{
    // /api/users/*下的都需要验证
    const regex = /^\/api\/users\/(?!login$|signup$).*/
    if (!regex.test(event.path)) {
        return
    }
    const config=useRuntimeConfig()
    const token=getCookie(event,'token')
    if(!token){
        throw createError({
            statusCode:401,
            statusMessage:'没有cookie'
        })
    }
    try {
        const userData=jwt.verify(token,config.jwt.secret)
        event.context.user=userData;
    }catch(err){
        deleteCookie(event,'token')
        throw createError({
            statusCode:401,
            statusMessage:'cookie已过期'
        })
    }
})
