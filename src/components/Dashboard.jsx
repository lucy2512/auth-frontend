import { Container, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";


const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/auth/dashboard", { withCredentials: true });
                console.log(res);
                setUser(res.data.user);
                console.log(user);
            } catch (error) {
                console.error("(React)Unauthorized!!!!", error);
            }
        }
        fetchUser();
    }, []);

    return (
        <Container>
            <Typography variant="h4">Dashboard</Typography>
            {user ? (
                <Typography variant="h6">Welcome, {user.email}</Typography>
            ) : (<Typography variant="h6">Please login first!!!</Typography>)
            }
        </Container>
    )
}

export default Dashboard