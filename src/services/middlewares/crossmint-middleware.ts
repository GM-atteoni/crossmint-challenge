import { Axios } from "axios"

export const CANDIDATE_ID = 'c36b3ec7-007b-4cc3-abf1-c084fe283ae6';

export const applyInterceptor = (axios: Axios) => {
    axios.interceptors.request.use(
    (config) => {
        config.headers['Content-Type'] = 'application/json'
        config.data = {...config.data, candidateId: CANDIDATE_ID}
        return config;
    }, (error) => {
        return Promise.reject(error)
    }
)
}
