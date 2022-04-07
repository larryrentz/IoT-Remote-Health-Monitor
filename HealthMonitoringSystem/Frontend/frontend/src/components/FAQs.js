import React from 'react';
import { Fab, Modal, Box, Typography } from '@mui/material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 4,
    p: 4,
};

const FAQs = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            <Fab variant = "extended" color = "primary" onClick={handleOpen} aria-label='Frequently Asked Questions'>
                <QuestionMarkIcon sx = {{ mr: 1 }}/>
                FAQs
            </Fab>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Frequently Asked Questions
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default FAQs;