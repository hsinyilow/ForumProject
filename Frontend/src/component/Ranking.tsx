//import { useState } from 'react'
import {
    Drawer, Toolbar,
    Card, CardContent,
    Typography
} from '@mui/material';

//import axios from 'axios';
//import * as MUIcon from '@mui/icons-material';

function Ranking(){
    return(
        <>
            <Drawer
                variant="permanent" anchor="right" sx={{width: '15%',flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: '15%', boxSizing: 'border-box', top: '10%', borderLeft: 'none' }
                }}
            >
                <Toolbar/>
                <Card variant='outlined' sx={{ display: 'flex', marginRight: '15px'}}>
                    <CardContent >
                        <Typography variant="h5">
                            Popular
                        </Typography>

                        <ol>
                        <li></li>
                        <li></li>
                        <li></li>
                        </ol>
                    
                    </CardContent>

                </Card>
            </Drawer>
        </>
    );
}

export default Ranking;