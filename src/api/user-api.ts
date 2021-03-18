import { instance, GetItemsType, ResponseType } from './api';

export const userAPI = {
    getUsers(pageSize = 10, currentPage = 1) {
        return instance
            .get<GetItemsType>(`users?count=${pageSize}&page=${currentPage}`)
            .then((response) => response.data);
    },
    follow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`).then((res) => res.data);
    },
    unfollow(userId: number) {
        return instance.delete<ResponseType>(`follow/${userId}`).then((res) => res.data);
    },
};
