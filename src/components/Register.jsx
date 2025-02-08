import { Container, TextField, Typography, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await axios.post("http://localhost:5000/api/auth/register", { email, password });
            alert("Registration successful");
            navigate("/login");
        } catch (error) {
            console.error("Regsitration failed!!", error);
        }
    }
    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Register</Typography>
            <TextField label="Email" fullWidth margin="normal" onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Password" type="password" fullWidth margin="normal" onChange={(e) => setPassword(e.target.value)} />
            <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleRegister}>Register</Button>
            <Typography variant="body2" sx={{ mt: 2, fontSize: '1.2rem' }}>
                Existing user? Please{" "}
                <Link to="/login" style={{ color: "blue", textDecoration: "none" }}>login</Link>
                {" "}first.
            </Typography>
        </Container>
    )
}

export default Register;