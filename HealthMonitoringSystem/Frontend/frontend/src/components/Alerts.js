import * as React from 'react';
import { Stack, Alert, AlertTitle } from "@mui/material";
import Collapse from '@mui/material/Collapse';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'

const Alerts = () => {
    const [open, setOpen] = React.useState(true);

    return (
        <Stack spacing={2}>
            <Collapse in={open}>
                <Alert severity="error"
                    action={
                        <IconButton
                            aria-label ="close"
                            color="inherit"
                            size="small"
                            onClick={()=>{
                               setOpen(false);
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

            <Alert severity="warning">
                <AlertTitle>Warning</AlertTitle>
                Low heart rate detected
            </Alert>
            <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                Device <strong>"insert device here"</strong> is connected
            </Alert>
        </Stack>
    )
}

export default Alerts;