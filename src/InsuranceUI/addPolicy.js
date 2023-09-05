import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import Navbar from './navbar';
import axios from 'axios';
import { useState } from 'react';

const initialState = {
  name: '',
  coverageDetails: '',
  policyType: '',
  maxLimit: '',
  policyId: '',
  coverageexclusion: '',
};

export default function AddPolicyType() {
  const [data, setData] = React.useState(initialState);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');

  const handleChange = (event) => {
    setData({ ...data, policyType: event.target.value });
  };

  const { name, coverageDetails, policyType, maxLimit, policyId, coverageexclusion } = data;

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmitClickHandler = () => {
    // Validate the required fields
    if (!isFormValid()) {
      return; // Exit the function if any required field is empty
    }

    const policy = {
      name,
      coverageDetails,
      policyType,
      maxCoverageLimit: maxLimit,
      policyId,
      coverageExclusion: coverageexclusion,
    };

    policyDetails(policy)
      .then(() => {
        setAlertMessage(`${name} details added successfully`);
        setOpenSnackbar(true);
        setData(initialState); // Reset the form
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const policyDetails = (policy) => {
    return axios.post("http://localhost:9091/add-policyType", policy, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const isFormValid = () => {
    // Check if all required fields are filled
    return (
      name !== '' &&
      coverageDetails !== '' &&
      policyType !== '' &&
      maxLimit !== '' &&
      policyId !== '' &&
      coverageexclusion !== ''
    );
  };

  return (
    <React.Fragment>
      <Navbar />
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
            Add New Policy
          </Typography>
          <Box component="form" sx={{ m: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="firstName"
                  label="Policy Name"
                  autoFocus
                  onChange={onChange}
                  value={name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="policyId"
                  id="policyId"
                  label="Policy ID"
                  onChange={onChange}
                  value={policyId}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="coverageDetails"
                  id="coverageDetails"
                  label="Coverage Details"
                  onChange={onChange}
                  value={coverageDetails}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  name="policyType"
                  id="policyType"
                  value={policyType}
                  displayEmpty
                  fullWidth
                  onChange={handleChange}
                >
                  <MenuItem value=''>Policy Type</MenuItem>
                  <MenuItem value={'Normal'}>Normal</MenuItem>
                  <MenuItem value={'Moderate'}>Moderate</MenuItem>
                  <MenuItem value={'Premium'}>Premium</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="maxLimit"
                  id="maxLimit"
                  label="Price Per Person"
                  onChange={onChange}
                  value={maxLimit}
                />
              </Grid>
              
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  name="coverageexclusion"
                  id="coverageexclusion"
                  label="Coverage Exclusions"
                  onChange={onChange}
                  value={coverageexclusion}
                  // inputProps={{
                  //   maxLength: 10, // Limit the input to 10 characters
                  // }}
                />
              </Grid>
            </Grid>
            <Stack padding={'10px'} spacing={2} direction="row" justifyContent='center' alignItems='center'>
              <Button
                style={{ borderColor: 'orange', color: 'orange' }}
                type="reset"
                variant='outlined'
                sx={{ mt: 2, mb: 2, mr: 4 }}
                onClick={() => setData(initialState)}
              >
                Reset
              </Button>
              <Button
                style={{ backgroundColor: 'orange' }}
                type="button"
                variant="contained"
                sx={{ mt: 3, mb: 2, ml: 4 }}
                onClick={onSubmitClickHandler}
              >
                Add Policy
              </Button>
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
