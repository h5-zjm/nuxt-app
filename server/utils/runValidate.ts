import type {ZodType} from "zod";
import type {H3Event} from "h3";
export const runValidate = async <T>(schema: ZodType<T>,event:H3Event) => {
    const result=await readValidatedBody(event,body=>{
        return schema.safeParse(body)
    })
    if(!result.success){
        throw createError({
            statusCode: 403,
            statusMessage: '验证失败',
            data:result.error.format()
        })
    }
    return result
}
