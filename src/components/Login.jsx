import { Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await axios.post("http://localhost:5000/api/auth/login", { email, password }, { withCredentials: true });
            navigate("/dashboard");
        } catch (error) {
            console.error("Login failed!!", error);
        }
    }
    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Login</Typography>
            <TextField label="Email" fullWidth margin="normal" onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Password" type="password" fullWidth margin="normal" onChange={(e) => setPassword(e.target.value)} />
            <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleRegister}>Login</Button>
            <Typography variant="body2" sx={{ mt: 2, fontSize: '1.2rem' }}>
                New user? Please{" "}
                <Link to="/register" style={{ color: "blue", textDecoration: "none" }}>register</Link>
                {" "}first.
            </Typography>
        </Container>
    )
}

export default Login