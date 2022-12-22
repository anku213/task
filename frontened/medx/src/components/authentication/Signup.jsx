import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';


const theme = createTheme();

export default function SignUp() {

  const [d_id, setD_ID] = useState("");
  const [d_name, setD_name] = useState("");
  const [experience, setExperience] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [specilization, setSpecilization] = useState("");



  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      password: data.get('password')
    });
  };


  function addUser() {
    let userinfo = {
      d_id: d_id,
      d_name: d_name,
      experience: experience,
      password: password,
      contact: contact,
      specilization: specilization,
    }
    let reqData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userinfo)
    }
    fetch("http://localhost:8000/docter", reqData)
      .then(response => console.log(`Data Submitted${response.status}`))
    console.log("Data Submitted successfully");
    alert('sign up successfully');
    navigate('/signin')
  }

  return (
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="docter-id"
                  name="Docter Id"
                  required
                  fullWidth
                  id="docter_id"
                  label="Docter Id"
                  autoFocus
                  value={d_id}
                  onChange={(e)=>setD_ID(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="doctername"
                  label="Docter Name"
                  name="doctername"
                  autoComplete="docter-name"
                  value={d_name}
                  onChange={(e)=>setD_name(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="experience"
                  label="Experience"
                  name="experience"
                  autoComplete="experience"
                  value={experience}
                  onChange={(e)=>setExperience(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  autoComplete="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="contact"
                  label="Contact"
                  name="contact"
                  autoComplete="contact"
                  value={contact}
                  onChange={(e)=>setContact(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="specilization"
                  label="specilization"
                  name="specilization"
                  autoComplete="specilization"
                  value={specilization}
                  onChange={(e)=>setSpecilization(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=>addUser()}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}