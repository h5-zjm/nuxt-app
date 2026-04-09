import {User} from "#server/models/userSchema";

export default defineEventHandler(async (event)=>{
    let user=await User.findOne({email:event.context.user.email}).exec()
    return user.toJSON()
})
