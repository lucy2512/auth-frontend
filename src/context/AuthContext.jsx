import { createContext, useContext } from "react";
import axios from "axios";


const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const login = async (email, password) => {
        const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
        localStorage.setItem("token", res.data.token);
        // alert("Login Successful!!!");
    }
    const logout = async () => {
        localStorage.removeItem("token");
    }
    return (
        <AuthContext.Provider value={{ login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
export default AuthProvider;