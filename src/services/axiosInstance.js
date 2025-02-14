import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api/auth",
    headers: { "Content-Type": "application/json" }
})

axiosInstance.interceptors.request.use(
    (config) => {
        console.log(config);
        const token = localStorage.getItem("accessToken");

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        //If AccessToken expires then refreshing the token


        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                console.warn("Access Token expired. Trying to refresh token........");
                const frontendRefreshToken = localStorage.getItem("refreshToken");
                // console.log(frontendToken);
                if (!frontendRefreshToken) {
                    console.error("NO refersh token found.......");
                    localStorage.clear();
                    return Promise.reject(error);
                }

                const { data } = await axiosInstance.post("/refresh-token", {
                    refreshToken: localStorage.getItem("refreshToken"),
                });
                console.log("HERE");
                console.log(data);
                localStorage.clear()
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("refreshToken", data.refreshToken);

                return axiosInstance(originalRequest);
            } catch (err) {
                console.error("Refresh token invalid.", err);
                localStorage.clear();
                window.href.location = '/login'
            }
        }


        // If user is unauthorized

        if (error.response && error.response.status === 403) {
            console.error("(React) Unauthorized! Redirecting to login");
            localStorage.clear();
            // window.location.href = "/login";
        }

        if (error.response && error.response.status === 500) {
            console.error("Something went wrong", error);
            // slocalStorage.clear();
            // window.location.href = "/login";
        }
    }
)

export default axiosInstance;