import { defineStore } from 'pinia'

interface UserInfoState {
    userInfo: {
        username: string,
        avatar: string,
        token: string,
    }
}
/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfo = defineStore('userInfo', {
    state: (): UserInfoState => ({
        userInfo: {
            username: '',
            avatar: '',
            token: ''
        }
    }),
    actions: {
        async setUserInfos(userInfo: UserInfoState) {
            this.userInfo = userInfo.userInfo
        }
    },
});
