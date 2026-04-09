import type {UserDocument} from '../server/models/userSchema'

export interface UserInfo{
    isLogin: boolean,
    data: UserDocument | null,
}
