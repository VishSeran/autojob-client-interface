import axios, { AxiosError } from "axios"

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    withCredentials:true,
    headers: {
        "Content-Type":"application/json"
    }
})

let refreshPromise: Promise<void> | null = null;

api.interceptors.response.use(
    (response) =>  response,

    async(error: AxiosError) => {
        
        const originalRequest = 
    }
)

export default api