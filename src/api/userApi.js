import axiosClient from './axiosClient';

const userApi = {
    async login(data) {
        const url = '/login';
        return await axiosClient.post(url, data);
    },
    async register(data) {
        const url = '/register';
        return await axiosClient.post(url, data);
    },
    async forgetPassword(data) {
        const url = '/forget-password';
        return await axiosClient.post(url, data);
    },
    async resetPassword(data) {
        const url = '/reset-password';
        return await axiosClient.post(url, data);
    },
    async getUserInfo() {
        const url = '/users/get-my-info';
        return await axiosClient.get(url);
    },
    async getList(params) {
        const url = '/users';
        return await axiosClient.get(url, {
            params: params
        });
    },
    async delete(ids) {
        const url = '/users';
        return await axiosClient.delete(url, {
            data: {
                ids: ids
            }
        });
    },
};

export default userApi;
