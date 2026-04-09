
import {extname} from 'path'
import {nanoid} from 'nanoid'
export default defineEventHandler(async (event)=>{
    // const formData=await readMultipartFormData(event)
    // const app=useNitroApp()
    // console.log('the body',formData)
    // if(formData&&formData.length>0){
    //     const uploadData=formData[0]
    //     if(uploadData){
    //         //随机数.png
    //         const extension=extname(uploadData.filename as string)
    //         const filename=nanoid(6)
    //         const {url}=await app.aliOSS.put(`${filename}${extension}`,uploadData.data)
    //         return {url}
    //     }
    // }else{
    //     throw createError('文件错误')
    // }
})
