import {H3Event} from "h3";
export default async (event: H3Event) => {
    const user=await Promise.resolve({isLogin:true,username:'xxxx'})
    if(!user.isLogin){
        throw createError({
            statusCode:400,
            message:'请登录'
        })
    }
}
