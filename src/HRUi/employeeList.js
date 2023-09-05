import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Stack, Table, Container, Typography, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import Navbar from './navbar';

const EmpList = () => {
  const [employeeDetails, setEmployeeDetails] = useState([]);
  //const [policyTypeMap, setPolicyTypeMap] = useState({});
  const [registers, setRegisters] = useState([]);

  useEffect(() => {
    fetchEmployeeDetails();
   // fetchPolicyTypes();
    fetchRegisters();
  }, []);

  const fetchEmployeeDetails = async () => {
    try {
      const response = await axios.get('http://localhost:9099/get');
      setEmployeeDetails(response.data);
    } catch (error) {
      console.error('Error fetching employee details:', error);
    }
  };
  const fetchRegisters = async () => {
    try {
      const response = await axios.get('http://localhost:9999/get');
      setRegisters(response.data);

      // const policy=await axios.get(`http://localhost:9091/finById/${policyId}`);
      
    } catch (error) {
      console.error('Error fetching registers:', error);
    }
  };

  const getPolicyNumber=(ename)=>{
    const status=getStatus(ename);

    if(status=='rejected'||status=='pending'||status=='Not Applied') return 'Not Generated';
    else if(status=='approved'){
    const register = registers.find(reg => reg.name === ename);
    return register ? (register.empId).slice(-3).toUpperCase()+(register.policyId).slice(-4).toUpperCase() :'Not Applied' ;
  }
}

  const getStatus = (fullName) => {
    const register = registers.find(reg => reg.name === fullName);
    console.log(register);
    return register ? register.status : 'Not Applied';
  };

  const getStatusStyle = (status) => {
    let backgroundColor = '';
  
    switch (status) {
      case 'PENDING':
        backgroundColor = 'yellow';
        break;
      case 'NOT APPLIED':
        backgroundColor = 'gray';
        break;
      case 'APPROVED':
        backgroundColor = 'green';
        break;
      case 'REJECTED':
        backgroundColor = 'red';
        break;
      default:
        break;
    }
  
    return {
      padding: '10px',
      backgroundColor,
      borderColor: 'goldenrod',
      borderRadius: '5px'
    };
  };

  return (
    <React.Fragment>
      <Navbar />
      <Container component="main" maxWidth="md">
        <Typography component="h2" variant="h5" mt={6} mb={3} align='center'>
          Happy Service Employee Insurance Status
        </Typography>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bolder' }}>Employee Name</TableCell>
                <TableCell style={{ fontWeight: 'bolder' }}>Job</TableCell>
                <TableCell style={{ fontWeight: 'bolder' }}>Policy Number</TableCell>
                <TableCell style={{ fontWeight: 'bolder' }} align='center'>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employeeDetails.map((employee) => (
                <TableRow key={employee._Id}>
                  <TableCell>{employee.fullName}</TableCell>
                  <TableCell>{employee.occupation}</TableCell>
                  <TableCell>{getPolicyNumber(employee.fullName)}</TableCell>
                  <TableCell >
                    <Stack spacing={2} direction="row" justifyContent='center' alignItems='center'>
                      <Typography style={{ ...getStatusStyle(getStatus(employee.fullName).toUpperCase()),color:'white' }} variant="contained" color="success">
                        {getStatus(employee.fullName).toUpperCase()}
                      </Typography>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default EmpList;
