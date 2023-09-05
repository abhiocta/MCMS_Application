import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Button, Stack, Table, Container, Typography, TableBody, TableCell, TableHead, TableRow, Paper, Snackbar, Alert } from '@mui/material';
import Navbar from './navbar';
import { Link } from 'react-router-dom';

const ClientFormsApproveCancel = () => {
  const [pendingRegistrations, setPendingRegistrations] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [policyType, setPolicyType] = useState('');
  //const[dataURL,setDataURL]=useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  useEffect(() => {
    fetchPendingRegistrations();
  }, []);

  const handleDownload = (fileId,name) => { // Add a nested arrow function
    axios.get(`http://localhost:9999/get/${fileId}`, { responseType: 'blob' })
        .then(response => {
            // Create a blob from the response data
            const blob = new Blob([response.data],{ type: 'application/pdf'});

            // Create a URL for the blob
            const url = window.URL.createObjectURL(blob);

            // Create a temporary anchor element to trigger the download
            const a = document.createElement('a');
            a.href = url;    
            a.download = `data_${name}.pdf`; // Set desired filename
            a.target = '_blank'; // Open in a new tab/window
            document.body.appendChild(a);
            a.click();

            // Clean up
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        })
        .catch(error => {
            console.error(error);
            // Display error message or perform error handling
        });
};


  const fetchPendingRegistrations = async () => {
    try {
      const response = await axios.get('http://localhost:9999/get');
      const pendingRegisteredData = response.data.filter(registration => registration.status === 'pending');
      setPendingRegistrations(pendingRegisteredData);
      // const url = `data:image/jpeg;base64,${btoa(String.fromCharCode(...new Uint8Array(pendingRegistrations.proofData.buffer)))}`;
      // setDataURL(url);
    } catch (error) {
      console.error('Error fetching pending registrations:', error);
    }
  };
  const fetchEmployeeDetails =useMemo(()=> async (empId) => {
    try {
      const response = await axios.get(`http://localhost:9099/findEmployeeById/${empId}`);
      console.log(response.data);
      return response.data; // Assuming the response contains employee details
    } catch (error) {
      console.error('Error fetching employee details:', error);
      return {};
    }
  },[]);

  const handleApproveRegistration = async (registrationId, name) => {
    try {
      // Send request to update registration status to 'approved'
      await axios.put('http://localhost:9999/update-registeration', { _id: registrationId, status: 'approved' });
      // Show snackbar
      setSnackbarMessage(`${name} successfully approved`);
      setSnackbarOpen(true);
      // Fetch updated registrations and update state
      setInterval(() => {
        window.location.reload(true);
      }, 1500);
      //fetchPendingRegistrations();
    } catch (error) {
      console.error('Error approving registration:', error);
    }
  };

  const handleCancelRegistration = async (registrationId, name) => {
    try {
      // Send request to update registration status to 'rejected'
      await axios.put('http://localhost:9999/update-registeration', { _id: registrationId, status: 'rejected' });
      // Show snackbar
      setSnackbarMessage(`${name} successfully rejected`);
      setSnackbarOpen(true);
      setInterval(() => {
        window.location.reload(true);
      }, 1500);
     
    } catch (error) {
      console.error('Error canceling registration:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  //Convert binary data to data URL

  return (
    <React.Fragment>
      <Navbar />
      <Container component="main" maxWidth="xl">
        <Typography component="h2" variant="h5" mt={6} mb={3} align='center'>
          Happy Service Employee Forms Approve/Cancel
        </Typography>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bolder' }}>ID</TableCell>
                <TableCell style={{ fontWeight: 'bolder' }}>Client Name</TableCell>
                <TableCell style={{ fontWeight: 'bolder' }}>Nominee Name</TableCell>
                <TableCell style={{ fontWeight: 'bolder' }}>Policy Number</TableCell>
               <TableCell style={{ fontWeight: 'bolder' }}>Registration Date</TableCell>
                <TableCell style={{ fontWeight: 'bolder' }}>Documents</TableCell>
                <TableCell style={{ fontWeight: 'bolder' }} align='center'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingRegistrations.map((registration) => {
                return (
                  <TableRow style={{ textAlign: 'center' }} key={registration.id}>
                    <TableCell>{(registration._id).slice(-2).toUpperCase()}</TableCell>
                    <TableCell>{registration.name}</TableCell>
                    <TableCell>{registration.nomineeName}</TableCell>
                    <TableCell>{(registration.empId).slice(-3).toUpperCase()+(registration.policyId).slice(-4).toUpperCase()}</TableCell>
                    <TableCell>{registration.registerationDate}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="info" onClick={() => handleDownload(registration.empId,registration.name)}>Download</Button>
                      </TableCell>
                    <TableCell>
                      <Stack spacing={2} direction="row" justifyContent="center" alignItems="center">
                        <Button variant="contained" color="success" onClick={() => handleApproveRegistration(registration._id,registration.name)}>
                          Approve
                        </Button>
                        <Button variant="contained" color="error" onClick={() => handleCancelRegistration(registration._id,registration.name)}>
                          Reject
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </Container>
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" elevation={6} variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default ClientFormsApproveCancel;
