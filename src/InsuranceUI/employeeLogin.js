import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the hook


const defaultTheme = createTheme();

export default function ILoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginResult, setLoginResult] = useState('');
  const navigate = useNavigate(); // Get the navigation function

  const userData={
    "fullName" : "Abhishek",
    "correctPassword" :"123456"
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if the entered username and password are correct
    if (username === userData.fullName && password === userData.correctPassword) {
      // Login successful
      console.log('Login successful');
      setLoginResult('Login successful');
      const userDetailsString = JSON.stringify({
        "fullName" : "Abhishek S",
        "occupation" :"Insurance Agent"
      });
      sessionStorage.setItem('userDetails', userDetailsString);
      // Navigate to the employee home page or any other page you want
      navigate('/ihome'); // Use the navigate function with the path to the desired page
    } else {
      // Login failed
      console.log('Incorrect username/password');
      setLoginResult('Incorrect username/password');
    }
  };


  return (
    <div>
      <Container component="main" maxWidth="lg">
      <Box 
          sx={{ marginTop:8}} >
      <Grid container >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(loginagent.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
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
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Username"
                name="email"
                autoComplete="email"
                autoFocus
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
              
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
                onChange={(e)=>setPassword(e.target.value)}
              
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              {loginResult && (
            <Typography color={loginResult === 'Login successful' ? 'success' : 'error'}>
              {loginResult}
            </Typography>
          )}
            </Box>
          </Box>
        </Grid>
        </Grid>
        </Box>
    </Container>
    </div>
  );
}