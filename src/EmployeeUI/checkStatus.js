import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Navbar from './navbar';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the hook
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { Container } from '@mui/material';

export default function CheckStatus() {
  const [status, setstatus] = useState('');
  const [registrationdate, setRegistrationdate] = useState('');
  const [policyNumber, setPolicyNumber] = useState('');
  const navigate=useNavigate();

  useEffect(() => {
    // Get empId from sessionStorage
    const userDetailsString = sessionStorage.getItem('userDetails');
    const userDetails = JSON.parse(userDetailsString);
    const eid=userDetails._id;

    // Fetch employee registration data from the backend using empId
    axios.get(`http://localhost:9999/findregistry/${eid}`)
      .then(response => {
        const registrationData = response.data;

        // Populate fields based on retrieved data
        setstatus(registrationData.status); // Assuming empId is the employee's status
        setRegistrationdate(registrationData.registerationDate); // Assuming registrationDate is the attribute for registration date
        const lastCharacter=(registrationData.empId).slice(-3).toUpperCase();
        const policyNumber = lastCharacter +(registrationData.policyId).slice(-4).toUpperCase();
        setPolicyNumber(policyNumber);

        //session storage for ecard
        sessionStorage.setItem('name',registrationData.name);
        sessionStorage.setItem('policyNumber',policyNumber);
        sessionStorage.setItem('createdOn',registrationData.registerationDate);
        sessionStorage.setItem('enrollId',(registrationData.policyId).slice(5).toUpperCase());
      })
      .catch(error => {
        console.error('Error fetching registration data:', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Generate policy number
    
   // const lastCharacter = eid.slice(-1);
   // const policyNumber = lastCharacter + empId.slice(-4).toUpperCase();

    // Update fields
    // ... (your code to update fields)

    // Navigate logic...
  };

  const eCardButtonHandler = () => {
    
    navigate("/ecard");
    // ...
  };

  return (
    <React.Fragment>
      <Navbar />
      <div>
        <Container component="main" maxWidth="lg">
          <Box sx={{ marginTop: 8 }}>
            <Grid container>
              <div style={{display: 'flex',justifyContent: 'center',alignItems: 'center',height: '300px',width: '100%',padding:'20px',margin:'120px'}}>
                <Grid item xs={12} sm={10} md={10} component={Paper} elevation={6} square>
                  <Box
                    sx={{
                      my: 8,
                      mx: 4,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Avatar sx={{ m: 1,bgcolor:'blue'}}>
                      <CircleNotificationsIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      STATUS
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                      <TextField
                        margin="normal"
                        disabled
                        fullWidth
                        id="status"
                        label="Status"
                        name="status"
                        autoComplete="status"
                        autoFocus
                        value={status}
                        onChange={(e)=>setstatus(e.target.value)}
                      />
                      <TextField
                        margin="normal"
                        disabled
                        fullWidth
                        id="policyNo"
                        label="Policy Number"
                        name="policyNo"
                        autoComplete="policyNo"
                        autoFocus
                        value={policyNumber}
                        onChange={(e)=>setstatus(e.target.value)}
                      />
                      <TextField
                        margin="normal"
                        disabled
                        fullWidth
                        name="registrationdate"
                        label="Registration Date"
                        type="registrationdate"
                        id="registrationdate"
                        autoComplete="current-registrationdate"
                        value={registrationdate}
                        onChange={(e)=>setRegistrationdate(e.target.value)}
                      />
                      <Button
                        type="submit"
                        fullWidth
                        disabled={status !== 'approved'} // Disable if status is not 'approved'
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={eCardButtonHandler}
                      >
                        Generate E-card
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </div>
            </Grid>
          </Box>
        </Container>
      </div>
    </React.Fragment>
  );
}
