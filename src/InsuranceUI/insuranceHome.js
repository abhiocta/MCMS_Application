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



export default function InsuranceHome() {
    let cards = [
        {
            title: "Add New Policy",
            description: "Update Details By Clicking Here",
            image: "./agent/addploicy.png",
            link: '/addPolicyType',
            id: 1
        },
        {
            title: "Update Policy",
            description: "Update Details By Clicking Here",
            image: "./agent/modifypolicy.png",
            link: '/modifypolicytype',
            id: 2
        },
        {
            title: "Examine Request",
            description: "Update Details By Clicking Here",
            image: "./agent/examine.png",
            link: '/examinelist',
            id: 3
        },
        {
            title: "Add New Hospital",
            description: "Update Details By Clicking Here",
            image: "./agent/addhosp.png",
            link: '/addHospital',
            id: 4
        },
        {
            title: "Update Hospital",
            description: "Update Details By Clicking Here",
            image: "./agent/modifyhosp.png",
            link: '/modifyhospital',
            id: 5
        }
    ]

    // let [gridCards, setCards] = useState(card)

    return (
        <React.Fragment><Navbar></Navbar>
            {/* <Header> HOME PAGE</Header> */}
            <div>
            <Container component="main" sx={{ py: 8 }} maxWidth="lg">
                <Box sx={{marginTop:4,marginLeft:18}}>
                {/* End hero unit */}
                <Grid container spacing={1} >
                    {cards.map((card) => (
                        <Grid item key={card.id} xs={12} sm={6} md={4} p={3} lg={4}>
                            <CardActionArea component="a" href={card.link} >
                                <Card 
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <ImageList sx={{ width: 300, ml: 11 }} >
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


