import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom'



const theme = createTheme();

export default function SignIn() {

    const navigate = useNavigate();

    let [d_id, setD_id] = useState("");
    let [password, setPassword] = useState("");

    async function submitData() {
        let userData = {
            d_id: d_id,
            password: password,
        };

        let reqData = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        };

        const api = await fetch(
            "http://localhost:8000/docterlogin",
            reqData
        );

        console.log("api", api);
        const data = await api.json();

        console.log("data", data);
        if (data.status === 400) {
            navigate("/signin");
            alert(data.response);
        }
        if (data > 0) {
            navigate("/signin");
            alert("Oops error login");
        }
        if (data.status === 200) {
            localStorage.setItem("token", data.token);
            console.log(data.token);
            navigate("/");
            alert("Successfully Logged in");
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            d_id: data.get('d_id'),
            password: data.get('password'),
        });
    };

    return (
        < >
            <div className='container-fluid' style={{ display: "flex", justifyContent:"center" }} >
                <div className='col' >
                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Sign in
                                </Typography>
                                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="d_id"
                                        label="Docter Id"
                                        name="d_id"
                                        autoComplete="d_id"
                                        autoFocus
                                        value={d_id}
                                        onChange={(e) => setD_id(e.target.value)}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="Remember me"
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={submitData}
                                    >
                                        Sign In
                                    </Button>
                                    <Grid container>
                                        <Grid item xs>
                                            <Link href="#" variant="body2">
                                                Forgot password?
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link to='/signup'>
                                                {"Don't have an account? Sign Up"}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>

                        </Container>
                    </ThemeProvider>
                </div>
            </div>
        </>
    );
}