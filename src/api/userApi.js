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
    async getUserInfo() {
        const url = '/users/get-my-info';
        return await axiosClient.get(url);
    },
};

export default userApi;
