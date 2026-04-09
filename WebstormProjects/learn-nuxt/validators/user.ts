import {z} from "zod";

export const loginSchema = z.object({
    email: z.string().email().nonempty('邮箱为必填项'),
    name: z.string().nonempty('名称为必填项'),
    password: z.string().min(8).nonempty('密码为必填项')
})
export type LoginData=z.infer<typeof loginSchema>
export const signUpSchema = z.object({
    email: z.string().email().nonempty('邮箱为必填项'),
    name: z.string().nonempty('名称为必填项'),
    password: z.string().min(8).nonempty('密码为必填项'),
    confirmPassword: z.string().min(8).nonempty('密码为必填项'),
}).refine((data)=>data.password === data.confirmPassword,{
    message:'两次密码必须一致',
    path:['confirmPassword']//错误提示要加在哪个字段下面
})
export const userCreateSchema = z.object({
    username:z.string().min(3),
    nickName:z.string().optional(),
    type:z.enum([ 'email','cellphone','oauth']),
    phoneNumber:z.string().refine((value)=>  /^1[3-9]\d{9}$/.test(value),'手机号码格式错误').optional(),email:z.string().email().optional(),
    password:z.string().min(6).optional(),
    provider:z.enum(['gitee','github']).optional(),
    oauthID:z.string().optional(),
    role:z.enum(['normal','admin']).optional(),
    disabled:z.boolean().optional()})
export const userUpdateSchema = userCreateSchema.omit({username:true,})
export type SignUpData=z.infer<typeof signUpSchema>
