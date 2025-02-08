import { Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                console.log(token);
                const res = await axios.get("http://localhost:5000/api/auth/dashboard", { headers: { "Authorization": `Bearer ${token}` } });
                console.log(token);
                setUser(res.data.user);
                // console.log(user);
            } catch (error) {
                console.error("(React)Unauthorized!!!!", error);
            }
        }
        fetchUser();
    }, []);

    const handleLogout = async (e) => {
        try {
            e.preventDefault();
            logout();
            navigate("/login");
        } catch (error) {
            console.error("Logout failed!!", error);
        }
    }

    return (
        <Container>
            <Typography variant="h4">Dashboard</Typography>
            {user ? (
                <>
                    <Typography variant="body1">Welcome, {user.email}!</Typography>
                    <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mt: 2 }}>
                        Logout
                    </Button>
                </>
            ) : (<Typography variant="h6">Please login first!!!</Typography>)
            }
        </Container>
    )
}

export default Dashboard