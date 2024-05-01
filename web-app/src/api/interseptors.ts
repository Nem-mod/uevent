import axios, {CreateAxiosDefaults} from "axios";

const options: CreateAxiosDefaults = {
    baseURL: process.env.NEXT_PUBLIC_API_HOST,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
};

const axiosWithoutAuth = axios.create(options);

const axiosWithAuth = axios.create(options);

axiosWithAuth.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        if (error?.response.status === 401) {
            await axiosWithoutAuth.post('/auth/user/refresh');
        }
    }
);

export {axiosWithoutAuth, axiosWithAuth}