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



export default function InsuranceDashboard() {
    let cards = [
        {
            title: "Add New Policy",
            description: "Apply to new Medical Insurance",
            image: "./emp/addplan.png",
            link: '/add',
            id: 1
        },
        {
            title: "Check Status",
            description: "Check Application Status",
            image: "./emp/status.png",
            link: '/checkstatus',
            id: 3
        },
        {
            title: "Hospital Near You",
            description: "Check Application Status",
            image: "./emp/hospital.png",
            link: '/hospitallist',
            id: 3
        }

    ]

    // let [gridCards, setCards] = useState(card)

    return (
        <React.Fragment><Navbar></Navbar>
            {/* <Header> HOME PAGE</Header> */}
            <div>
            <Container component="main" sx={{ py: 8 }} maxWidth="lg">
                <Box sx={{marginTop:4,marginLeft:8}}>
                {/* End hero unit */}
                <Grid container spacing={1} >
                    {cards.map((card) => (
                        <Grid item key={card.id} xs={12} sm={6} md={4} p={4} lg={4}>
                            <CardActionArea component="a" href={card.link}>
                                <Card 
                                    sx={{ height: '280px', display: 'flex', flexDirection: 'column' }}>
                                    <ImageList sx={{ width: 300, ml: 11,alignContent:'center'}} >
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


