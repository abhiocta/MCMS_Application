import * as React from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';
import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Navbar from './navbar';
import Header from './header';
import { alignProperty } from '@mui/material/styles/cssUtils';



export default function EMPHome() {
    let cards = [
        {
            title: "Edit Detail",
            description: "Update Details By Clicking Here",
            image: "./emp/edit.png",
            link: '/editDetail',
            id: 1
        },
        {
            title: "Medical Benfits",
            description: "Visit Medical Benefits",
            image: "./emp/medical.png",
            link: '/medicalBenefits',
            id: 2
        }
    ]

    // let [gridCards, setCards] = useState(card)

    return (
        <React.Fragment><Navbar></Navbar>
            {/* <Header> HOME PAGE</Header> */}
            <div>
            <Container component="main"  sx={{ py: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }} maxWidth="xl">
                <Box sx={{marginTop:4,marginLeft:11}}>
                {/* End hero unit */}
                <Grid container spacing={1} >
                    {cards.map((card) => (
                        <Grid item key={card.id} xs={12} sm={12} md={7} p={7} lg={6}>
                            <CardActionArea component="a" href={card.link} >
                                <Card 
                                    sx={{ weight:'100%' ,height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <ImageList sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
                                        <ImageListItem >
                                            <img style={{alignContent:'center'}} src={card.image} alt={card.title} />
                                        </ImageListItem>
                                    </ImageList>

                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography style={{textAlign:'center'}} gutterBottom variant="h5" component="h2">
                                            {card.title}
                                        </Typography>
                                        <Typography style={{textAlign:'center'}}>
                                            {card.description}
                                        </Typography>
                                    </CardContent>

                                </Card>
                            </CardActionArea>
                        </Grid>
                    ))}
                </Grid>
                </Box>
            </Container>
            </div>
        </React.Fragment>

    );

}


