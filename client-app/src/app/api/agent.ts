import axios, { AxiosResponse } from "axios";
import { Produkti } from "../models/produkti";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Produktet = {
    list: () => requests.get<Produkti[]>('/produktet'),
    details: (id: string) => requests.get<Produkti>(`/produktet/${id}`),
    create: (produkti: Produkti) => axios.post<void>('/produktet', produkti),
    update: (produkti: Produkti) => axios.put<void>(`/produktet/${produkti.id}`, produkti),
    delete: (id: string) => axios.delete<void>(`/produktet/${id}`)
}

const agent = {
    Produktet
}

export default agent;