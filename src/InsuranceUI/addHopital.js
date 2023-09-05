import * as React from 'react';
import { Button, TextField, Grid, Box, Typography, Container, Snackbar, Alert, MenuItem, Select } from '@mui/material';
import Stack from '@mui/material/Stack';
import Navbar from './navbar';
import axios from 'axios';

const addname=(hospital)=>{
     return axios.post("http://localhost:9090/add-hospital",hospital,{headers:{"Content-Type":"application/json","Accept":"application/json",}}).
     then((response)=>response.data).catch((error)=>{
      console.log(error);
      throw error;
     })
}

export default function AddHospital() {
  // const [specialty, setspecialty] = React.useState('');
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [data, setData] = React.useState({
    name: '',
    city: '',
    specialty:'',
    contactInfo:''
  });
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const { name, hospitalId, city, specialty ,contactInfo } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };


  const resetForm = () => {
    setData({
      name: '',
      hospitalId:'',
      city: '',
      specialty:'',
      contactInfo:''
    });
    // setspecialty('');
  };

  // const finalDetails={name:'',city:'',specialty:''}

  React.useEffect(() => {
    setIsFormValid(name !== '' && hospitalId !=='' && city !== '' && contactInfo !=='' && specialty !== '');
  }, [name, hospitalId,city, specialty,contactInfo]);

  const handleSubmit = (e) => {
    
    if (isFormValid) {
     // console.log(data);
     // console.log(specialty);
      // axios.post("http://localhost:9090/add-hospital",{headers:{"Content-Type":"application/json","Accept":"application/json"}}).
      // then((response)=>response.data)
      const hospital={name:name,hospitalId:hospitalId,city:city,specialty:specialty,contactInfo:contactInfo}
      addname(hospital).then((resp)=>{
        console.log(resp);
      }).catch((error)=>{
        console.log(error);
      })
      setAlertMessage(`${name} added successfully`);
      setOpenSnackbar(true);
      resetForm();
    } else {
      return;
    }
  };
  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <React.Fragment>
  <Navbar></Navbar>
    <Container component="main" maxWidth="md">
      
      <Box
        boxShadow={'5px 5px 10px grey'}
        sx={{
          margin: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" mt={3}>
          Add New Hospital
        </Typography>
        <Box component="form" sx={{ m: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                name="name"
                required
                fullWidth
                id="name"
                label="Hospital Name"
                autoFocus
                onChange={handleChange}
                value={name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="hospitalId"
                id="hospitalId"
                label="Hospital Id"
                onChange={handleChange}
                value={hospitalId}
              />
              </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="city"
                id="city"
                label="City,State"
                onChange={handleChange}
                value={city}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                name="specialty"
                id="specialty"
                label="Specialty in"
                onChange={handleChange}
                value={specialty}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                name="contactInfo"
                id="contactInfo"
                label="Contact Details"
                onChange={handleChange}
                value={contactInfo}
              />
            </Grid>
            
          </Grid>
          <Stack padding={'10px'} spacing={2} direction="row" justifyContent="center" alignItems="center">
            <Button
            style={{color:'orange',borderColor:'orange'}}
              type="reset"
              variant="outlined"
              sx={{ mt: 2, mb: 2, mr: 4 }}
              onClick={resetForm}
            >
              Reset
            </Button>
            <Button
              style={{backgroundColor:'orange'}}
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, ml: 4 }}
              onClick={handleSubmit}
            >
              Add Hospital
            </Button>
          </Stack>
        </Box>
      </Box>
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success">
        {alertMessage}
        </Alert>
      </Snackbar>
    </Container>
    </React.Fragment>
  );
}
