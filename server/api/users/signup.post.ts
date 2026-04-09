import {runValidate} from "#server/utils/runValidate";
import {signUpSchema} from "~/validators/user";
import bcrypt from 'bcrypt'
import {User} from "#server/models/userSchema";
export default defineEventHandler(async (event) => {
    const result=await runValidate(signUpSchema,event)
    const config=useRuntimeConfig()
    const {email,password} = result.data
    const user=await User.findOne({email:email}).lean()
    if(user){
        throw createError({
            statusCode:409,
            statusMessage:'邮箱已注册'
        })
    }
    const hash=await bcrypt.hash(password,config.bcrypt.saltRounds)
    const userCreateData={username:email,password:hash,email}
    const newUser=await User.create(userCreateData)
    return newUser
})
