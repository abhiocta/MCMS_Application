import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import { Container, Typography, Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Button } from '@mui/material';
import axios from 'axios';

const SetPolicy = () => {
  const [policiesData, setPoliciesData] = useState([]);
  const rolesData = [
    { id: 1, name: 'Software Engineer' },
    { id: 2, name: 'CEO' },
    { id: 3, name: 'Manager' },
    { id: 4, name: 'Accountant' },
    { id: 5, name: 'Sales Executive' },
    { id: 6, name: 'HR Manager' },
    // Add more roles...
  ];

  const [selectedPolicies, setSelectedPolicies] = useState([]);
  const [eligibility, setEligibility] = useState({});

  // Inside SetPolicy component
  useEffect(() => {
    // Fetch policies from the backend using Axios
    axios.get('http://localhost:9091/get')
      .then(response => {
        setPoliciesData(response.data);
        
        // Pre-check visible policies
        const visiblePolicies = response.data.filter(policy => policy.visible === true);
        const visiblePolicyIds = visiblePolicies.map(policy => policy._id);
        setSelectedPolicies(visiblePolicyIds);
  
        // Pre-check eligible roles
        const initialEligibility = {};
        response.data.forEach(policy => {
          if (policy.eligibleRoles) {
            const eligibleRoleNames = policy.eligibleRoles.split(',');
            const eligibleRoleIds = rolesData
              .filter(role => eligibleRoleNames.includes(role.name))
              .map(role => role.id);
            initialEligibility[policy._id] = {};
            eligibleRoleIds.forEach(roleId => {
              initialEligibility[policy._id][roleId] = true;
            });
          }
        });
        setEligibility(initialEligibility);
      })
      .catch(error => {
        console.error('Error fetching policies:', error);
      });
  }, []);
  

  const handlePolicySelect = (policyId) => {
    setSelectedPolicies((prevSelected) =>
      prevSelected.includes(policyId) ? prevSelected.filter((id) => id !== policyId) : [...prevSelected, policyId]
    );

    setEligibility((prevEligibility) => {
      const updatedEligibility = { ...prevEligibility };
      delete updatedEligibility[policyId];
      return updatedEligibility;
    });
  };

  const handleEligibilityChange = (roleId, policyId, allowed) => {
    setEligibility((prevEligibility) => ({
      ...prevEligibility,
      [policyId]: { ...(prevEligibility[policyId] || {}), [roleId]: allowed },
    }));
  };

  const handleSubmit = async () => {
    const updateRequests = policiesData.map(policy => ({
      id: policy._id,
      visible: selectedPolicies.includes(policy._id),
      eligibleRoles: rolesData
        .filter(role => eligibility[policy._id]?.[role.id])
        .map(role => role.name)
        .join(',') // Convert eligible roles to comma-separated string
    }));

    try {
      await axios.put('http://localhost:9091/visibility', updateRequests);
      console.log('Policies updated successfully');
      console.log(updateRequests);
    } catch (error) {
      console.error('Error updating policies:', error);
    }
  };

  return (
    <React.Fragment>
      <Navbar />
      <Container component="main" maxWidth="lg">
        <Box mt={3} boxShadow={2} p={4}>
          <Typography variant="h4" align="center">
            Happy Service-Insurance Policies
          </Typography>
          <Grid container spacing={2} mt={4}>
            <Grid item xs={12}>
              <Typography variant="h5">Select Policies:</Typography>
              <Grid container spacing={2}>
                {policiesData.map((policy) => (
                  <Grid item key={policy._id}>
                    <Paper sx={{ p: 2 }}>
                      <Checkbox
                        color="primary"
                        checked={selectedPolicies.includes(policy._id)}
                        onChange={() => handlePolicySelect(policy._id)}
                      />
                      <Typography>{policy.name} - {policy.policyType}</Typography>
                      <ul>
                      <li><Typography variant="body2">{policy.coverageDetails}</Typography></li>
                      <li><Typography variant='body2'>{policy.coverageExclusion}</Typography></li>
                      </ul>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <hr />
              <Typography variant="h5">Set Role Eligibility:</Typography>
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Role</TableCell>
                      {selectedPolicies.map((policyId) => (
                        <TableCell key={policyId}>{policiesData.find((policy) => policy._id === policyId)?.name}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rolesData.map((role) => (
                      <TableRow key={role.id}>
                        <TableCell>{role.name}</TableCell>
                        {selectedPolicies.map((policyId) => (
                          <TableCell key={policyId}>
                            <Checkbox
                              color="primary"
                              checked={(eligibility[policyId]?.[role.id] || false)}
                              onChange={(e) => handleEligibilityChange(role.id, policyId, e.target.checked)}
                            />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12} mt={3}>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default SetPolicy;
