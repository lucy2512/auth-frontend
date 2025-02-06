import { Container, TextField, Typography, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            await axios.post("http://localhost:5000/api/auth/register", { email, password });
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
        </Container>
    )
}

export default Register;