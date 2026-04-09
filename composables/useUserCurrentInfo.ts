import type {UserInfo} from "~/types/user";
export const useUserCurrentInfo = () => {
    return useState<UserInfo>('currentUser',()=>({isLogin:false,data:null}));
}
