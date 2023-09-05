import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Navbar from './navbar';
import axios from 'axios';

export default function HospitalTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [hospitals, setHospitals] = useState([]);

  const filteredHospitals = hospitals.filter(
    (hospital) =>
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    // Fetch hospital data from your backend API using Axios
    axios.get("http://localhost:9090/get")
      .then((response) => {
        setHospitals(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <React.Fragment>
      <Navbar />
      <Container component="main" maxWidth="lg">
        <Box sx={{ marginTop: 8 }}>
          <Typography style={{ color: 'darkblue' }} variant='h4'>Explore Hospitals Near You.</Typography>
          <Typography variant='subtitle1'>Get the best Health service at your network hospitals.</Typography>
          <TextField
            label="Search Hospitals"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ margin: '16px' }}
          />

          <TableContainer component={Paper} elevation={3}>
            <Table size="small" aria-label="Hospital Table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>City</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Specialty</TableCell>
                  <TableCell style={{ fontWeight: 'bold' }}>Contact Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredHospitals.map((hospital) => (
                  <TableRow key={hospital.id}>
                    <TableCell>{hospital.name}</TableCell>
                    <TableCell>{hospital.city}</TableCell>
                    <TableCell>{hospital.specialty}</TableCell>
                    <TableCell>{hospital.contactInfo}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </React.Fragment>
  );
}
