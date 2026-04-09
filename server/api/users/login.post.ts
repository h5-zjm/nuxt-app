import {loginSchema} from '../../../validators/user'
import {runValidate} from "#server/utils/runValidate";
import bcrypt from 'bcrypt'
import {User} from "#server/models/userSchema";
import jwt from 'jsonwebtoken';
export default defineEventHandler(async (event)=>{
    const result=await runValidate(loginSchema,event)
    const config=useRuntimeConfig()
    const {email,password}=result.data
    const user=await User.findOne({email}).exec()
    if(!user){
        throw createError({
            statusCode:401,
            statusMessage:'该用户不存在或者密码错误'
        })
    }else{
        const verifyPwd=await bcrypt.compare(password,user.password)
        if(!verifyPwd){
            throw createError({
                statusCode:401,
                statusMessage:'该用户不存在或者密码错误'
            })
        }
    }
    const userData={username:user.email,_id:user._id}
    const token=jwt.sign(userData,config.jwt.secret,{expiresIn:config.jwt.expiresIn})
    setCookie(event,'token',token,{maxAge:config.jwt.expiresIn})
    // await useStorage('redis').setItem('currentUser',currentUser,{ttl:20})
    return user.toJSON()
})
