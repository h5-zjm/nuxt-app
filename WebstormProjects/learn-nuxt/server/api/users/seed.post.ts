// server/api/users/seed.post.ts
import { User } from '#server/models/userSchema'

export default defineEventHandler(async () => {
    const users = await User.insertMany([
        { username: 'zhangsan', password: '123456', nickName: '张三' },
        { username: 'lisi', password: '123456', nickName: '李四' },
        { username: 'wangwu', password: '123456', nickName: '王五' },
    ])
    return users
})
