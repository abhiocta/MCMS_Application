import React, { useState } from 'react';
import { TextField, Button, Snackbar, Select, MenuItem, FormControl, InputLabel, Paper, Typography, OutlinedInput } from '@mui/material';
import { Alert } from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios'; // Import Axios
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const EmployeeForm = () => {
  const [name, setname] = useState('');
  const [nomineeName, setNomineeName] = useState('');
  const [relation, setRelation] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const navigate=useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPdfFile(file);
  };

  const userDetailsString = sessionStorage.getItem('userDetails');
  const userDetails = JSON.parse(userDetailsString);
  const eid=userDetails._id;

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('nomineeName', nomineeName);
    formData.append('nomineeRelationship',relation);
    formData.append('relation', relation);
    formData.append('policyId', sessionStorage.getItem('policyId'));
    formData.append('empId', eid);
    formData.append('status', 'pending');
    formData.append('proof', pdfFile);
    formData.append('registerationDate',new Date().toDateString());

    try {
      await axios.post('http://localhost:9999/add-register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSnackbarOpen(true); // Show success Snackbar
      handleReset(); // Reset form fields
      navigate("/checkstatus");
      sessionStorage.setItem('policyNumber',)
    } catch (error) {
      console.error('Error submitting registration:', error);
    }
  };

  const handleReset = () => {
    setname('');
    setNomineeName('');
    setRelation('');
    setPdfFile(null);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <React.Fragment>
      <Navbar />
      <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', margin: '30px auto' }}>
        <h1 style={{ color: 'darkblue' }}>Your Personalized Plan !!</h1>
        <TextField
          label="Full Name (as per PAN)"
          value={name}
          onChange={(e) => setname(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField label="Registration Date" value={new Date().toDateString()} disabled fullWidth margin="normal" />
        <TextField
          label="Enter Nominee Name"
          value={nomineeName}
          onChange={(e) => setNomineeName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Choose Relation with Nominee</InputLabel>
          <Select
            value={relation}
            onChange={(e) => setRelation(e.target.value)}
            input={<OutlinedInput label="Choose Relation with Nominee" />}
          >
          <MenuItem  value="spouse">Spouse</MenuItem>
          <MenuItem value="child">Child</MenuItem>
          <MenuItem value="parent">Parent</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="h6">Upload Govt. ID Proof</Typography>
        <input type="file" onChange={handleFileChange} />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <p>
          <Button variant="outlined" onClick={handleReset}  >
            Reset
          </Button>
          <Button variant="contained" onClick={handleSubmit} sx={{marginLeft:'50px'}}>
            Submit
          </Button>
          </p>
          <p style={{paddingRight:'50px'}}>
          {pdfFile && (
          <div style={{ Width: '50px', margin: '10px' }}>
            <Document file={pdfFile}>
              <Page pageNumber={1} />
            </Document>
          </div>
        )}</p>
        </div>
        <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity="success">
            Successfully Registered!
          </Alert>
        </Snackbar>
      </Paper>
    </React.Fragment>
  );
};

export default EmployeeForm;
