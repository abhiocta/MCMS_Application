import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, styled } from '@mui/material';
import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useStyles = styled((theme) => ({
  // ... Existing styles ...
}));

export default function PersonalPlan() {
  const classes = useStyles();
  const [selectedCardId, setSelectedCardId] = useState();
  const [selectedYear, setSelectedYear] = useState('1');
  const [cards, setCards] = useState([]);
  
  const navigate = useNavigate();
  // const occupation = sessionStorage.getItem('occupation');
  const userDetailsString = sessionStorage.getItem('userDetails');
  const userDetails = JSON.parse(userDetailsString);
  const occupation=userDetails.occupation;
  const count=sessionStorage.getItem('count');

  useEffect(() => {
    // Fetch policies and filter visible ones
    axios.get('http://localhost:9091/get')
      .then(response => {
        const allPolicies = response.data;
        const visiblePolicies = allPolicies.filter(policy => policy.visible === true);
        setCards(visiblePolicies);
      })
      .catch(error => {
        console.error('Error fetching policies:', error);
      });
  }, []);

  const buyHandler = () => {
    sessionStorage.setItem('policyId',cards.find((card) => card._id === selectedCardId)?._id);
    sessionStorage.setItem('year',selectedYear);
    navigate('/policyRegistration');
  };

  const handleCard = (cardId) => {
    setSelectedCardId(cardId);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const isEligibleForPolicy = (policy) => {
    return policy.visible && policy.eligibleRoles.includes(occupation);
  };

  return (
    <React.Fragment>
      <Navbar />
      <Container component="main" sx={{ py: 2 }} maxWidth="lg">
        {/* ... Existing JSX ... */}
      </Container>
      <h1 style={{ color: 'darkblue' }}>Your Personalized Plan</h1>
      <div style={{ backgroundColor: 'lightskyblue' }}>
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label" style={{color:'darkblue'}}>Select Tenure</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={selectedYear}
            onChange={handleYearChange}
          >
            <FormControlLabel value="1" control={<Radio />} label="1 Year" />
            <FormControlLabel value="2" control={<Radio />} label="2 Year" />
            <FormControlLabel value="3" control={<Radio />} label="3 Year" />
          </RadioGroup>
        </FormControl>
      </div>
      <Container component="main" sx={{ py: 8 }} maxWidth="lg">
        <Box sx={{ marginTop: 1 }}>
          <Grid container spacing={1}>
            {cards
              .filter((card) => isEligibleForPolicy(card))
              .map((card) => (
                <Grid item key={card._id} xs={12} sm={6} md={4} p={3} lg={4}>
                  <CardActionArea component="a" href={card.link}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: selectedCardId === card._id ? 'lightblue' : 'initial',
                      }}
                      onClick={() => handleCard(card._id)}
                    >
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography style={{ textAlign: 'center', color: 'darkblue' }} gutterBottom variant="h5" component="h2">
                          {card.name}
                        </Typography>
                        <Typography style={{ textAlign: 'center' }} gutterBottom variant="h6" component="h2">
                          {selectedYear} Year
                        </Typography>
                        <hr />
                        <Typography style={{ textAlign: 'center' }} variant="subtitle1">
                          {card.coverageExclusion}
                        </Typography>
                        <Typography style={{ textAlign: 'center' }} variant="h3">
                          {(parseFloat(count)*parseFloat(card.maxCoverageLimit) * parseFloat(selectedYear)).toLocaleString()}
                        </Typography>
                        <Typography style={{ textAlign: 'center' }} variant="h7">
                          {card.coverageDetails}
                        </Typography>
                      </CardContent>
                    </Card>
                  </CardActionArea>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Container>
      <div style={{ float: 'right', marginBottom: '20px', marginLeft: '20px' }}>
        <Button variant="contained" onClick={buyHandler} size="large" disabled={!selectedCardId}>
          <b> Buy Now</b>
          </Button>
          </div>
</React.Fragment>
  );
}
