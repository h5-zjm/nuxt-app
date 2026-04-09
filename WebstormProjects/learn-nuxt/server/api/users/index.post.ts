import { userCreateSchema } from '~/validators/user'
import bcrypt from "bcrypt";
import {User} from "#server/models/userSchema";
export default defineEventHandler(async (event)=>
{
    const result = await runValidate(userCreateSchema, event)
    const payload = result.data
    const config=useRuntimeConfig()
//检查用户是否存在
    const existedUser = await User.findone({
        username: payload.username
    })
    if (existedUser) {
        throw createError({
            statusCode: 409,
            statusMessage: '该用户名已经被注册'
        })
    }
    //给密码加密的过程
    if(payload.password){
        payload.password = await bcrypt.hash(payload.password, config.bcrypt.saltRounds)
    }
    const newUser=await User.create(payload)
    return newUser.toJSON()
})
