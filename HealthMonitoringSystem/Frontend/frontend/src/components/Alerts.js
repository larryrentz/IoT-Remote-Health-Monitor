import * as React from 'react';
import { Stack, Alert, AlertTitle } from "@mui/material";
import Collapse from '@mui/material/Collapse';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'

function Alerts () {
    const [openError, setErrorOpen] = React.useState(true);
    const [openWarn, setWarnOpen] = React.useState(true);
    const [openSucess, setSucessOpen] = React.useState(true);

    const heartRate = () => {
        
    }

    return (
        /*
        alerts created for system; Added error and warning for heartrate as well as 
        success for device connection.
        */
        <Stack spacing={2}>
            <Collapse in={openError}>
                <Alert severity="error"
                    action={
                        <IconButton
                            aria-label ="close"
                            color="inherit"
                            size="small"
                            onClick={()=>{
                                setErrorOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit"/>
                        </IconButton>
                    }
                >
                    <AlertTitle>Danger</AlertTitle>
                    Abnormal heart beat detected!
                </Alert>
            </Collapse>

            <Collapse in={openWarn}>
                <Alert severity="warning"
                    action={
                        <IconButton
                            aria-label ="close"
                            color="inherit"
                            size="small"
                            onClick={()=>{
                                setWarnOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit"/>
                        </IconButton>
                    }
                >
                    <AlertTitle>Warning</AlertTitle>
                    Low heart rate detected
                </Alert>
            </Collapse>


            <Collapse in={openSucess}>
                <Alert severity="success"
                    action={
                        <IconButton
                            aria-label ="close"
                            color="inherit"
                            size="small"
                            onClick={()=>{
                                setSucessOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit"/>
                        </IconButton>
                    }
                >
                    <AlertTitle>Success</AlertTitle>
                    Device <strong>"insert device here"</strong> is connected
                </Alert>
            </Collapse>

        </Stack>
    )
}

export default Alerts;