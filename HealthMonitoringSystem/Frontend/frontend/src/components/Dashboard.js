import React, { useState, useContext } from 'react';
import { Box, Typography } from '@mui/material';
import Patient from './Patient.js';
import FAQs from './FAQs.js';
import Alerts from './Alerts';
import Context from '../Context.js';
import ProfilePicture from './ProfilePicture';

function Dashboard({user}) {
    const [context, setContext] = useState({user: user, devices: {}});
    return (
        <Context.Provider value={{context, setContext}}>
            <Box
            sx={{
                width: '100%',
                height: '140px',
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
                    gridTemplateAreas: `"header header header header" "main main main sidebar" "footer footer footer sidebar"`
                }}
                >
                    <Box sx={{ gridArea: 'header', bgcolor: 'lightgreen'}}>
                        <Typography variant="h4" sx={{ textAlign: 'center'}}> IoT Remote Health Monitor </Typography>
                    </Box>
                    <Box sx={{ gridArea: 'main', bgcolor: 'lightyellow' }}>
                        <Patient /> 
                    </Box>
                    <Box sx={{ gridArea: 'sidebar', bgcolor: 'lightblue'}}>
                        <Box sx={{display: 'flex', justifyContent: 'center'}}>
                            <ProfilePicture />
                        </Box>
                        <Typography> Notifications </Typography>
                        <Box sx={{gridArea: 'sidebar', justifySelf:'right', allignSelf:'end'}}>
                            <Alerts/>
                        </Box>
                    </Box>
                    <Box sx={{ gridArea: 'footer', bgcolor: 'lightgray'}}>
                        <Typography sx={{ textAlign: 'center'}}>
                            Made with Love :)
                        </Typography>
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