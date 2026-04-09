import {User} from "#server/models/userSchema";
import type {SortOrder} from 'mongoose'
export default defineEventHandler(async(event)=>{
    const queryObj=getQuery(event)
    const currentPage=Number(queryObj.currentPage)||1
    const pageSize=Number(queryObj.pageSize)||10
    const {orderBy='createdAt',order='desc',keyword=''}=queryObj
    const customSort={
        [orderBy as string]:order as SortOrder,
    }
    const findCondition=keyword?{
        username:{
            $regex:keyword,
        }
    }:{}
    const skip=(currentPage-1)*pageSize
    const users=await User.find(findCondition).select(['username','nickName','type','role','createdAt','updateAt','disabled']).skip(skip).limit(pageSize).sort(customSort).lean()
    const total=await User.find(findCondition).countDocuments()
    return {
        data:users,
        total,
        pageSize,
        currentPage
    }
})
