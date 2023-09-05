import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Stack, styled, TextField } from '@mui/material';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function AddPolicy() {
  const [selectedMembers, setSelectedMembers] = React.useState({
    self: false,
    father: false,
    mother: false,
    son: false,
    daughter: false,
    spouse: false,
  });
  const [focusedField, setFocusedField] = React.useState('');


  const navigate = useNavigate();


  const handleMemberSelection = (event) => {
    setSelectedMembers({
      ...selectedMembers,
      [event.target.name]: event.target.checked,
    });
  };

  const handleReset = () => {
    setSelectedMembers({
      self: false,
      father: false,
      mother: false,
      son: false,
      daughter: false,
      spouse: false,
    });
  };

  const [relativeNames, setRelativeNames] = React.useState({
    self: '',
    father: '',
    mother: '',
    son: '',
    daughter: '',
    spouse: '',
  });
  const handleNameChange = (event) => {
    const { name, value } = event.target;
    setFocusedField(name);
    setRelativeNames({
      ...relativeNames,
      [name]: value,
    });
  };
  

  const handleGetPlan = () => {
    const selectedNames = Object.entries(selectedMembers)
      .filter(([name, isSelected]) => isSelected && relativeNames[name] !== '')
      .map(([name, isSelected]) => ({
        relation: name,
        name: relativeNames[name],
      }));
      console.log(selectedNames);
    sessionStorage.setItem('selectedNames', JSON.stringify(selectedNames)); // Store in session storage
    console.log(`Number of selected boxes with names: ${selectedNames.length}`);
    sessionStorage.setItem('count',selectedNames.length);
    selectedNames.forEach(({ relation, name }) => {
      console.log(`${relation}: ${name}`);
    });
    navigate('/personalplan');
  };
  

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  // Check if any checkbox is selected
  const isAnyCheckboxSelected = Object.values(selectedMembers).some((isSelected) => isSelected);

  return (
    <div>
      <React.Fragment>
        <Navbar></Navbar>
        <Container component="main" maxWidth="xl">
          <Box sx={{ marginTop: 4 }}>
            <Grid container>
              <CssBaseline />
              <Grid
                item
                xs={4}
                sm={4}
                md={6}
                sx={{
                  backgroundImage: 'url(./addpolicy/policy.png)',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                  backgroundSize: 'fit',
                  backgroundPosition: 'center',
                }}
              />
              <Grid
                sx={{
                  backgroundColor: '#f5f5f5',
                }}
                item
                xs={12}
                sm={12}
                md={6}
                component={Paper}
                elevation={6}
                square
              >
                <Box
                  sx={{
                    //backgroundColor:'#f5f5f5',
                    my: 10,
                    mx: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography component="h1" variant="h5">
                    Who Would You Like To Insure?
                  </Typography>

                  <Box
          padding="10px"
          sx={{ display:'flex',
          flexDirection:'row',
          justifyContent:'center',
          alignContent:'space-evenly',
          flexWrap:'wrap',
          alignItems:'flex-end',
          marginLeft:'10px'
        }}
        >
          {Object.keys(selectedMembers).map((relative) => (
  <Item
    key={relative}
    style={{ backgroundColor: '#f5f5f5' }}
    sx={{ textAlign: 'center',margin:'20px' }}
  >
    <FormControlLabel
      control={
        <Checkbox
          checked={selectedMembers[relative]}
          onChange={handleMemberSelection}
          name={relative}
        />
      }
      label={
        <>
          <img
            src={`./addpolicy/${relative}.png`}
            width="100px"
            height="100px"
            alt={relative}
          /> <hr/>
          <TextField
            variant="outlined"
            placeholder={`Enter ${relative}'s name`}
            value={relativeNames[relative]}
            onChange={handleNameChange}
            name={relative}
            disabled={!selectedMembers[relative]} // Disable only when checkbox is not selected
            sx={{
              width: '150px', // Adjust the width as needed
              borderColor: relative === focusedField ? 'blue' : 'initial', // Highlight the focused field
            }}
            inputRef={(input) => {
              if (input && relative === focusedField) {
                input.focus(); // Set focus when the field is focused
              }
            }}
          />
        </>
      }
    />
  </Item>
))}
            </Box>
                  <Box sx={{ display: 'flex',padding:'20px', justifyContent: 'space-between', mt: 3 }}>
                    <Button type="reset" variant="outlined" onClick={handleReset} sx={{ mr: 2 }}>
                      Reset
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={handleGetPlan}
                      disabled={!isAnyCheckboxSelected}
                      sx={{ ml: 2 }}
                    >
                      Get Plan
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </React.Fragment>
    </div>
  );
}
