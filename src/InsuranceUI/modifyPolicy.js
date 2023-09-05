import * as React from 'react';
import { Select, MenuItem, Button, TextField, Grid, Box, Typography, Container, Stack, Snackbar, Alert } from '@mui/material';
import Navbar from './navbar';
import axios from 'axios';

const initialState = {
  _id:'',
  name: '',
  coverageDetails: '',
  policyType: '',
  maxCoverageLimit: '',
  policyDuration: '',
  coverageExclusion: ''
};

export default function ModifyPolicy() {
  const [policyId, setpolicyId] = React.useState('');
  const [data, setData] = React.useState(initialState);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [disableField, setDisableField] = React.useState(true);
  const [error, setError] = React.useState(false);

  // const regexPattern = /^[A-Z]{2}\d{2}[A-Z]{1,2}\d{4}$/;

  const policyIdHandleChange = (event) => {
    const { value } = event.target;
    setpolicyId(value);
    // setError(!validatepolicyId(value));
  };

  // const validatepolicyId = (value) => {
  //   return regexPattern.test(value);
  // };

  const { _id,name, policyType, coverageDetails, maxCoverageLimit, coverageExclusion } = data;

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const onSelectChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  


  const onClickReset = () => {
    setData(initialState);
    setpolicyId('');
    setDisableField(true);
  };

  const onClickSearch = () => {
    // Validate the policy ID format
    if (policyId ==='') {
      return;
    }

    axios.get(`http://localhost:9091/findPolicyById/${policyId}`)
      .then((response) => {
        const responseData = response.data;
        setData({
          name: responseData.name,
          coverageDetails: responseData.coverageDetails,
          policyType: responseData.policyType,
          maxCoverageLimit: responseData.maxCoverageLimit,
          _id:responseData._id,
          // policyDuration: responseData.policyDuration,
          coverageExclusion: responseData.coverageExclusion,
        });
        setDisableField(false);
      })
      .catch(() => {
        setDisableField(true);
        setAlertMessage('Incorrect Policy ID');
        setOpenSnackbar(true);
      });
  };

  const onClickUpdate = () => {
    // Validate the required fields
    if (!isFormValid()) {
      return;
    }

    const updateDetails = {
      policyId,
      name,
      policyType,
      coverageDetails,
      maxCoverageLimit,
      _id,
      // policyDuration,
      coverageExclusion,
    };

    axios.put("http://localhost:9091/update-policyType", updateDetails, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    })
      .then(() => {
        setAlertMessage(`${name} updated successfully`);
        setOpenSnackbar(true);
        setData(initialState); // Reset the form
        setpolicyId('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onClickDelete = () => {
    // Validate the required fields
    if (!isFormValid()) {
      return;
    }


    axios.delete(`http://localhost:9091/delete-policyType/${policyId}`)
      .then(() => {
        setAlertMessage(`${name} deleted successfully`);
        setOpenSnackbar(true);
        setData(initialState); // Reset the form
        setpolicyId('');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const isFormValid = () => {
    // Check if all required fields are filled
    return (
      policyId !== '' &&
      name !== '' &&
      coverageDetails !== '' &&
      policyType !== '' &&
      maxCoverageLimit !== '' &&
      // policyDuration !== '' &&
      coverageExclusion !== ''
    );
  };

  return (
    <React.Fragment>
      <Navbar />
      <Container component="main" maxWidth="md">
        <Box boxShadow={'5px 5px 10px grey'} sx={{ margin: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5" mt={3}>Modify Policy Details</Typography>
          <Box component="form" sx={{ m: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <TextField required fullWidth id="policyId" name="policyId" label="Policy ID" autoFocus value={policyId} onChange={policyIdHandleChange} error={error}
                  helperText={error ? 'AB12AB1234' : ''} />
              </Grid>
              <Grid item xs={4}>
                <Button style={{backgroundColor:'orange'}} variant="contained" type='button' sx={{ mt: 1, mb: 1, ml: 2 }} onClick={onClickSearch}>Search</Button>
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField required fullWidth id="name" name="name" label="Policy Name" value={name} onChange={onChange} disabled={disableField} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField required fullWidth id="coverageDetails" name="coverageDetails" label="Coverage Details" value={coverageDetails} onChange={onChange} disabled={disableField} />
              </Grid>

              <Grid item xs={12} sm={6}>
              <Select
               disabled={disableField}
               name="policyType"
               id="policyType"
               value={policyType}
               fullWidth
               onChange={onSelectChange} // Updated line
               >
                  <MenuItem value=''>Policy Type</MenuItem>
                  <MenuItem value={'Normal'}>Normal</MenuItem>
                  <MenuItem value={'Moderate'}>Moderate</MenuItem>
                  <MenuItem value={'Premium'}>Premium</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField required fullWidth id="maxCoverageLimit" name="maxCoverageLimit" label="Maximum Coverage Limit" value={maxCoverageLimit} onChange={onChange} disabled={disableField} />
              </Grid>
{/* 
              <Grid item xs={12} sm={6}>
                <TextField required fullWidth id="policyDuration" name="policyDuration" label="Policy Duration" value={policyDuration} onChange={onChange} disabled={disableField} />
              </Grid> */}

              <Grid item xs={12} sm={12}>
                <TextField required fullWidth id="coverageExclusion" name="coverageExclusion" label="Coverage Exclusion" value={coverageExclusion} onChange={onChange} disabled={disableField} />
              </Grid>
            </Grid>
            <br />
            <Stack spacing={5} direction="row" justifyContent='center' alignItems='center' sx={{ mt: 1, mb: 2, ml: 2 }}>
              <Button style={{borderColor:'orange',color:'orange'}} type="reset" variant="outlined" onClick={onClickReset}>Reset</Button>
              <Button style={{backgroundColor:'orange',color:'white'}} type="button" variant="contained" disabled={!isFormValid()} onClick={onClickUpdate}>Update</Button>
              {/* <Button type="button" variant="contained" disabled={!isFormValid()} onClick={onClickDelete}>Delete</Button> */}
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
