import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";


// eslint-disable-next-line react/prop-types
const PublicRoute = ({ children }) => {
    const { isLoggedIn, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("(Public)Status checking!!");
        console.log("(Public)isAuthentic", isAuthenticated);
        console.log("(Public)isLoggedIn", isLoggedIn());
        if (isLoggedIn()) {
            console.warn("Already logged in!! Redirecting to dashboard.");

            navigate("/dashboard", { replace: true });
        } else {
            setLoading(false);
        }
    }, [isLoggedIn, navigate, isAuthenticated]);

    if (loading) return null;

    return children;
}

export default PublicRoute;