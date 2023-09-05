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
import Navbar from './navbar';


const defaultTheme = createTheme();

export default function RenewPolicy() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <React.Fragment><Navbar></Navbar>
    <div>
      <Container component="main" maxWidth="xl">
      <Box
          sx={{ marginTop:8}}>
            <Typography style={{color:'darkblue'}} variant='h4'>Great to Have You Back</Typography>
      <Grid container >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(./addpolicy/renew.png)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid sx={{
                    backgroundColor:'#f5f5f5'}} item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            
            <Typography component="h1" variant="h5">
              Renew Medical Insurance
            </Typography>
            <Avatar src='renew.png' />
            <Typography variant='subtitle1'>Let's renew your health insurance !...</Typography>
             <div><hr></hr></div>
             <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="policyNumber"
                label="Policy Number"
                name="Policy Number"
                autoComplete="email"
                autoFocus
              />
              
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Renew 
              </Button>
              
            </Box>
          </Box>
        </Grid>
      </Grid>
      </Box>
      </Container>
    </div>
    </React.Fragment>
  );
}