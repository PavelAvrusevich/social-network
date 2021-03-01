import { instance, GetItemsType } from './api';

export const userAPI = {
    getUsers(pageSize = 10, currentPage = 1) {
        return instance
            .get<GetItemsType>(`users?count=${pageSize}&page=${currentPage}`)
            .then((responce) => responce.data);
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`);
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`);
    },
};
