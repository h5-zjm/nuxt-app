import {User} from "#server/models/userSchema";
import {runValidate} from "#server/utils/runValidate";
import {userUpdateSchema} from "~/validators/user";

export default defineEventHandler(async(event)=>{
    const id=getRouterParam(event,'id')
    const query=getQuery(event)
    let payload={}
    if(query.mode==='updateUser'){
        const result=await runValidate(userUpdateSchema,event)
        payload=result.data
    }else{
        payload=await readBody(event)
    }
    const newUser=await User.findByIdAndUpdate(id,payload,{new:true})
    return newUser
})
