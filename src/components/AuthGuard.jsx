import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";


// eslint-disable-next-line react/prop-types
const AuthGuard = ({ children }) => {
    const { isLoggedIn, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Status checking!!");
        console.log("isAuthentic", isAuthenticated);
        console.log("isLoggedIn", isLoggedIn());
        if (!isLoggedIn()) {
            console.warn("Access Denied!! redirecting to Login page.");

            navigate("/login", { replace: true });
        } else {
            setLoading(false);
        }
    }, [isLoggedIn, navigate, isAuthenticated]);

    if (loading) return null;

    return children;
}

export default AuthGuard