import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";


const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const isLoggedIn = () => {
        const token = localStorage.getItem("accessToken");
        if (token !== null && token !== "undefined") return true;
        return false;
    }

    useEffect(() => {
        setIsAuthenticated(isLoggedIn());
    }, [])

    const login = async (email, password) => {
        // const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
        const res = await axiosInstance.post("/login", { email, password });
        // localStorage.setItem("token", res.data.token);
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        console.log("accessToken: ", res.data.accessToken);
        console.log("refreshToken: ", res.data.refreshToken);
        setIsAuthenticated(true);
        console.log(res);
        // alert("Login Successful!!!");
    }
    const logout = async () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setIsAuthenticated(false);
    }
    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
export default AuthProvider;