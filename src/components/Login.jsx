import { Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Login = () => {
    // console.log(AuthProvider)
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        await login(email, password);
        navigate("/dashboard", { replace: true });
    }
    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Login</Typography>
            <TextField label="Email" fullWidth margin="normal" onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Password" type="password" fullWidth margin="normal" onChange={(e) => setPassword(e.target.value)} />
            <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>Login</Button>
            <Typography variant="body2" sx={{ mt: 2, fontSize: '1.2rem' }}>
                New user? Please{" "}
                <Link to="/register" style={{ color: "blue", textDecoration: "none" }}>register</Link>
                {" "}first.
            </Typography>
        </Container>
    )
}

export default Login