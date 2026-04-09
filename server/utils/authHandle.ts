import type {EventHandler} from 'h3'
export const defineAuthResponseHandler = (handle:EventHandler)=> {
    return defineEventHandler(async event=>{
        const user=event.context.user
        console.log(user)
        if(!user){
            throw createError({
                statusCode:400,
                message:'请登录'
            })
        }
        const  res=await handle(event)
        return {...res}
    })
}
