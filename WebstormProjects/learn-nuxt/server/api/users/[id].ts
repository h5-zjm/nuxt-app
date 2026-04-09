import {defineAuthResponseHandler} from "#server/utils/authHandle";
import {User} from "#server/models/userSchema";

export default defineAuthResponseHandler(async (event)=>{
    const id=getRouterParam(event,'id')
    const user=await User.findOne({_id:id}).exec()
    return user.toJSON()
})
