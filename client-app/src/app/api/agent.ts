import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { Telefoni } from "../models/telefoni";
import { Laptopi } from "../models/laptopi";
import { Ora } from "../models/ora";
import { store } from "../stores/store";
import { User, UserFormValues } from "../models/user";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
})

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
},(error: AxiosError) =>{
    const {data, status, config} = error.response!;
    switch (status){
        case 400:
            if(typeof data === 'string'){
                toast.error(data);
            }
            if(config.method === 'get' && data.errors.hasOwnProperty('id')){
                history.push('/not-found');
            }
            if(data.errors){
                const modalStateErrors = [];
                for (const key in data.errors){
                    if(data.errors[key]){
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            }
            break;
        case 401:
            toast.error('unauthorised');
            break;
        case 404:
            history.push('/not-found')
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Telefonat = {
    list: () => requests.get<Telefoni[]>('/telefonat'),
    details: (id: string) => requests.get<Telefoni>(`/telefonat/${id}`),
    create: (telefoni: Telefoni) => axios.post<void>('/telefonat', telefoni),
    update: (telefoni: Telefoni) => axios.put<void>(`/telefonat/${telefoni.id}`, telefoni),
    delete: (id: string) => axios.delete<void>(`/telefonat/${id}`)
}

const Laptopat = {
    list: () => requests.get<Laptopi[]>('/laptopat'),
    details: (id: string) => requests.get<Laptopi>(`/laptopat/${id}`),
    create: (laptopi: Laptopi) => axios.post<void>('/laptopat', laptopi),
    update: (laptopi: Laptopi) => axios.put<void>(`/laptopat/${laptopi.id}`, laptopi),
    delete: (id: string) => axios.delete<void>(`/laptopat/${id}`)
}

const Orat = {
    list: () => requests.get<Ora[]>('/orat'),
    details: (id: string) => requests.get<Ora>(`/orat/${id}`),
    create: (ora: Ora) => axios.post<void>('/orat', ora),
    update: (ora: Ora) => axios.put<void>(`/orat/${ora.id}`, ora),
    delete: (id: string) => axios.delete<void>(`/orat/${id}`)
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user),
}

const agent = {
    Telefonat, Laptopat, Orat, Account
}

export default agent;