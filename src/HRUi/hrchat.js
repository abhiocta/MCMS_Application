import React from "react";
import ChatRoom from "../components/ChatRoom";
import Navbar from "./navbar";
import { Box, Container } from "@mui/material";

export default function HRChat() {
    return (
        <React.Fragment><Navbar></Navbar>
            {/* <Header> HOME PAGE</Header> */}
            <div>
            <Container component="main"  sx={{ py: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }} maxWidth="xl">
                <Box width={'300rem'} sx={{marginTop:4}}>
                    <ChatRoom/>
                    </Box>
                    </Container>
                    </div>
                    </React.Fragment>
    )
}