import axiosClient from './axiosClient';

const userApi = {
    async login(data) {
        const url = '/login';
        return await axiosClient.post(url, data);
    },
};

export default userApi;
