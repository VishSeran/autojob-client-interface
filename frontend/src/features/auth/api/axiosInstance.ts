import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios"

const api = axios.create({
    baseURL: "http://127.0.0.1:8000",
    withCredentials:true,
})

let refreshPromise: Promise<void> | null = null;

api.interceptors.response.use(
    (response) =>  response,

    async(error: AxiosError) => {
        
        const originalRequest = error.config as InternalAxiosRequestConfig & {

            _retry? :boolean;
        };

        if (error.response?.status != 401){
            return Promise.reject(error);
        }

        if (originalRequest.url?.includes("/auth/refresh")){
            return Promise.reject(error);
        }

        if (originalRequest._retry){
            return Promise.reject(error);
        }

        originalRequest._retry=true;

        try{

            if(!refreshPromise) {

                refreshPromise = api.post(
                    "/auth/refresh",
                ).then(
                    () =>{
                        console.log("Access token refreshed")
                    } 
                ).finally(
                    () => {
                        refreshPromise = null;
                    }
                )
            }

            await refreshPromise;
            return api(originalRequest)
        }catch(refreshError){

            console.error(
                "Refresh token is invalid or expired",
                refreshError
            );

            window.location.href = "/login";
            return Promise.reject(refreshError);
        }
    }


)

export default api