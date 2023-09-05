import React, { useState, useEffect } from 'react';
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

const initialState = {
  fullName: '',
  mobileNo: '',
  permanentAddress: '',
  pincode: '',
  panCard: '',
  occupation: '',
};

export default function ModifyEmployee() {
  const [gender, setGender] = useState('');
  const [data, setData] = useState(initialState);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [disableField, setDisableField] = useState(false);
  const [empId, setEmpId] = useState('');
  const [username, setUsername] = useState('');
  const [password, SetPassword] = useState('');

  useEffect(() => {
    const userDetailsString = sessionStorage.getItem('userDetails');
    if (userDetailsString) {
      const userDetails = JSON.parse(userDetailsString);
      setEmpId(userDetails._id);
      setUsername(userDetails.username);
      SetPassword(userDetails.password);
      fetchEmployeeDetails(userDetails._id);
    }
  }, []);

  const fetchEmployeeDetails = (empId) => {
    axios.get(`http://localhost:9099/findEmployeeById/${empId}`)
      .then((response) => {
        const employeeData = response.data; // Assuming response data matches the expected structure
        setData(employeeData);
        setGender(employeeData.gender);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const { fullName, mobileNo, permanentAddress, dateofBirth, pincode, occupation, panCard } = data;

  const onChange = (e) => {
    // Handle date of birth changes differently
    if (e.target.name === 'dateofBirth') {
      setData({ ...data, dateofBirth: e.target.value });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };
  

  const isFormValid = () => {
    return (
      fullName !== '' &&
      mobileNo !== '' &&
      permanentAddress !== '' &&
      dateofBirth !== '' &&
      pincode !== '' &&
      occupation !== '' &&
      panCard !== '' &&
      gender !== ''
    );
  };

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };
  

  const updateEmployee = (employee) => {
    return axios.put(`http://localhost:9099/update-employee`, employee, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => response.data);
  };

  const onClickUpdate = () => {
    if (!isFormValid()) {
      return;
    }
    const updateDetails = {
      _id: empId,
      fullName: fullName,
      mobileNo: mobileNo,
      permanentAddress: permanentAddress,
      dateofBirth: dateofBirth,
      pincode: pincode,
      occupation: occupation,
      panCard: panCard,
      gender: gender, // Include the gender field here
      username:username,
      password:password
    };
    updateEmployee(updateDetails)
      .then((resp) => {
        console.log(resp);
        setAlertMessage(`${data.fullName} details updated successfully`);
        setOpenSnackbar(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  const handleReset = () => {
    setData(initialState);
    setGender('');
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
            Modify General Information
          </Typography>
          <Box component="form" sx={{ m: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="fullName"
                  required
                  fullWidth
                  id="fullName"
                  label="Full fullName"
                  autoFocus
                  onChange={onChange}
                  value={fullName}
                />
              </Grid>
              <Grid item xs={12} sm={8}>
              <TextField
              required
              fullWidth
              name="dateofBirth"
              id="dateofBirth"
              helperText="Date of Birth"
              onChange={handleDateChange} // Use handleDateChange function here
              value={dateofBirth}
              />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="mobileNo"
                  id="mobileNo"
                  label="Mobile Number"
                  onChange={onChange}
                  value={mobileNo}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Select
                  name="gender"
                  id="gender"
                  value={gender}
                  displayEmpty
                  fullWidth
                  onChange={handleChange}
                >
                  <MenuItem value="">Gender</MenuItem>
                  <MenuItem value={'Male'}>Male</MenuItem>
                  <MenuItem value={'Female'}>Female</MenuItem>
                  <MenuItem value={'Other'}>Other</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="permanentAddress"
                  id="permanentAddress"
                  label="Permanent Address"
                  onChange={onChange}
                  value={permanentAddress}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="pincode"
                  id="pincode"
                  label="Pincode"
                  onChange={onChange}
                  value={pincode}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="occupation"
                  id="occupation"
                  label="Occupation"
                  disabled={true}
                  onChange={onChange}
                  value={occupation}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="panCard"
                  id="panCard"
                  label="PanCard Number"
                  onChange={onChange}
                  value={panCard}
                  // inputProps={{
                  //   maxLength: 10,
                  // }}
                  // error={panCard !== '' && !regexPattern.test(panCard)}
                  // helperText={panCard !== '' && !regexPattern.test(panCard) ? 'Invalid PanCard Number' : ''}
                />
              </Grid>
            </Grid>

            <Stack spacing={5} direction="row" justifyContent="center" alignItems="center" sx={{ mt: 2, mb: 2, ml: 2 }}>
              {/* <Button type="reset" variant="outlined" onClick={handleReset}>
                Reset
              </Button> */}
              <Button
                type="submit"
                variant="contained"
                disabled={disableField}
                onClick={onClickUpdate}
              >
                Update
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
