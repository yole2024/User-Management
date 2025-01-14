import React from "react";
import { Box, Button, TextField, Typography, CircularProgress, Alert } from '@mui/material';
import { useLogin } from "../hooks/useLogin";


export const LoginForm: React.FC = () => {
    const{
        username,
        password,
        error,
        setUsername,
        setPassword,
        isLoading,
        handleLogin,
    } = useLogin();

    const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        handleLogin();
      };

    return(
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                minWidth:'100vw',
                backgroundColor: '#ffffff',
                }}
        >
            <Box
                component="form"
                onSubmit={onSubmit}
                sx = {{
                    width: 400,
                    padding: 3,
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: "#eeebeb",
                    textAlign: "center",
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && (
                    <Alert severity="error" sx={{ width: '90%', mt: 2 }}>
                        {error}
                    </Alert> 
                )}
                <Box sx = {{width: '100%', mt: 2 }}>
                    <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} /> : 'Login'}
                    </Button> 
                </Box>
            </Box>
        </Box>
    )
};

export default LoginForm;

