import request from "@/utils/request";

export function useStudentApi() {
    return {
        list: (data: object) => {
            return request({
                url: '/student',
                method: 'get',
                params: data,
            });
        },
    };
}
