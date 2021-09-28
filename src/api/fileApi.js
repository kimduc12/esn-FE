import axiosClient from './axiosClient';

const fileApi = {
    async upload(data) {
        const url = '/uploads';
        return await axiosClient.post(url, data);
    },
};

export default fileApi;
