import request from "@/utils/request";


export function useLoginApi() {
    return {
        signIn: (data: object) => {
            return request({
                url: '/login',
                method: 'post',
                data,
            });
        },
        signOut: (data: object) => {
            return request({
                url: '/api/user/signOut',
                method: 'post',
                data,
            });
        },
        register: (data: object) => {
            return request({
                url: '/api/register',
                method: 'post',
                data,
            });
        },
    };
}
