import React, { useState } from 'react';
import { Button, TextField, Grid, Box, Typography, Container, Stack, Snackbar, Alert } from '@mui/material';
import Navbar from './navbar';
import axios from 'axios';

const initialState = {
  name: '',
  city: '',
  contactInfo: '',
  specialty: '',
};

export default function ModifyHospital() {
  const [hospitalId, setHospitalId] = useState('');
  const [data, setData] = useState(initialState);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [disableField, setDisableField] = useState(true);
  const [error, setError] = useState(false);
  // const [hospitalIdArray, setHospitalIdArray] = useState([]);

  // const regexPattern = /^[A-Z]{2}\d{2}[A-Z]{1,2}\d{4}$/;

  // const fetchHospitalIds = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:9090/allhospitalIds");
  //     setHospitalIdArray(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // // };

  // useEffect(() => {
  //   fetchHospitalIds();
  // }, []);

  const hospitalIdHandleChange = (event) => {
    const { value } = event.target;
    setHospitalId(value);
    // setError(!validateHospitalId(value));
  };

  // const validateHospitalId = (value) => {
  //   return regexPattern.test(value);
  // };

  const { _id,name, contactInfo, city, specialty } = data;

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onClickReset = () => {
    setData(initialState);
    setHospitalId('');
    setDisableField(true);
  };

  const onClickSearch = async () => {
    if (hospitalId !== '') {
      setDisableField(false);
      try {
        const response = await axios.get(`http://localhost:9090/findById/${hospitalId}`);
        setData(response.data);
        setError(false); // Clear the error state
      } catch (error) {
        console.log(error);
        setError(true); // Set the error state if request fails
      }
    } else {
      setDisableField(true);
      setError(true);
    }
  };
  

  const onClickUpdate = () => {
    if (!isFormValid()) {
      return;
    }

    const updateDetails = { _id,hospitalId, name, city, specialty, contactInfo };
    axios.put("http://localhost:9090/update-hospital", updateDetails, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }
    })
      .then((resp) => {
        console.log(resp);
        setAlertMessage(`${name} updated successfully`);
        setOpenSnackbar(true);
        setData(initialState);
        setHospitalId('');
        setDisableField(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onClickDelete = () => {
    if (!isFormValid()) {
      return;
    }

    axios.delete(`http://localhost:9090/delete-hospital/${hospitalId}`)
      .then((resp) => {
        console.log(resp);
        setAlertMessage(`${name} deleted successfully`);
        setOpenSnackbar(true);
        setData(initialState);
        setHospitalId('');
        setDisableField(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const isFormValid = () => {
    return (
      hospitalId !== '' &&
      name !== '' &&
      city !== '' &&
      contactInfo !== '' &&
      specialty !== ''
    );
  };

  return (
    <React.Fragment>
      <Navbar />
      <Container component="main" maxWidth="md">
        <Box boxShadow={'5px 5px 10px grey'} sx={{ margin: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5" mt={3}>Modify Hospital Details</Typography>
          <Box component="form" sx={{ m: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <TextField required fullWidth id="hospitalId" name="hospitalId" label="Hospital ID" autoFocus value={hospitalId} onChange={hospitalIdHandleChange} />
              </Grid>
              <Grid item xs={4}>
                <Button style={{ backgroundColor: 'orange' }} variant="contained" type='button' sx={{ mt: 1, mb: 1, ml: 2 }} onClick={onClickSearch}>Search</Button>
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField required fullWidth id="name" name="name" label="Hospital Name" value={name} onChange={onChange} disabled={disableField} />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField required fullWidth id="city" name="city" label="Location" value={city} onChange={onChange} disabled={disableField} />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField required fullWidth id="contactInfo" name="contactInfo" label="Contact Details" value={contactInfo} onChange={onChange} disabled={disableField} />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField required fullWidth id="specialty" name="specialty" label="Specialty in" value={specialty} onChange={onChange} disabled={disableField} />
              </Grid>
            </Grid>
            <br />
            <Stack spacing={5} direction="row" justifyContent='center' alignItems='center' sx={{ mt: 1, mb: 2, ml: 2 }}>
              <Button style={{ borderColor: 'orange', color: 'orange' }} type="reset" variant="outlined" onClick={onClickReset}>Reset</Button>
              <Button style={{ color: 'white', backgroundColor: 'orange' }} type="button" variant="contained" disabled={!hospitalId || disableField} onClick={onClickUpdate}>Update</Button>
              {/* <Button type="button" variant="contained" disabled={!hospitalId || disableField} onClick={onClickDelete}>Delete</Button> */}
            </Stack>
          </Box>
        </Box>
        <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Alert onClose={handleCloseSnackbar} severity="success">
            {alertMessage}
          </Alert>
        </Snackbar>
      </Container>
    </React.Fragment>
  );
}
