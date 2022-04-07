import React, { useState, useContext } from 'react';
import { Box, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Patient from './Patient.js';
import FAQs from './FAQs.js';
import Alerts from './Alerts';
import LineChart from './LineChart.js';
import Context from '../Context.js';
import ProfilePicture from './ProfilePicture';

function Dashboard({user}) {
    const [context, setContext] = useState({user: user, devices: {}, selectedDevice: ''});

    return (
        <Context.Provider value={{context, setContext}}>
            <Box
            sx={{
                width: '100%',
                minHeight: '100vh',
                '& > .MuiBox-root > .MuiBox-root': {
                p: 1,
                borderRadius: 2,
                margin: 1,
                fontWeight: '700'
                },
            }}
            >
                <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gridTemplateRows: '10vh 80vh 10vh',
                    gridTemplateAreas: `"header header header header" "main main analytics sidebar" "footer footer footer sidebar"`
                }}
                >
                    <Box sx={{ gridArea: 'header', bgcolor: 'lightgreen'}}>
                        <Typography variant="h4" sx={{ textAlign: 'center'}}>
                            IoT Remote Health Monitor
                        </Typography>
                    </Box>
                    <Box sx={{ gridArea: 'main', bgcolor: 'lightyellow', padding: 2 }}>
                        <Patient /> 
                    </Box>
                    <Box sx={{ gridArea: 'analytics', bgcolor: 'lightyellow'}}>
                        <Box sx={{ marginBottom: 7}}>
                            <h1>Analytics</h1>
                        </Box>
                        <LineChart />
                    </Box>
                    <Box
                    sx={{
                        gridArea: 'sidebar',
                        bgcolor: 'lightskyblue',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                    }}
                    >
                        <Box sx={{ alignSelf: 'center' }}>
                            <ProfilePicture default={user.photoURL}/>
                        </Box>
                        <Box sx={{ padding: 1 }}>
                            <Typography variant='h5' sx={{ paddingBottom: 2}}> 
                                Notifications
                            </Typography>
                            <Alerts/>
                        </Box>
                    </Box>
                    <Box sx={{ gridArea: 'footer', bgcolor: 'lightgray', display: 'flex',justifyContent: 'center', alignItems: 'center'}}>
                        <Typography variant='h6' component='h2' sx={{ paddingRight: 1 }}>
                            Made with
                        </Typography>
                        <FavoriteIcon />
                    </Box>
                    <Box sx={{ gridArea: 'sidebar', justifySelf: 'end', alignSelf: 'end'}}>
                        <FAQs/> 
                    </Box>
                </Box>
            </Box>
        </Context.Provider>
        
    )
}

export default Dashboard