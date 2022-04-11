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
                style={{ alignItems: "center", justifyContent: "center" }}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                    Frequently Asked Questions
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }} variant="h6">
                    What is IoT?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 0 }}>
                The Internet of Things refers to the network of things (physical objects) that can be connected to the Internet to collect and share data without human-to-human or human-to-computer interaction.
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }} variant="h6">
                    How does IoT affect healthcare industry?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 0 }}>
                    IoT is already used in digital patient observations. IoT can be used to enable better medical measurements in regional settings. IoT can be used with medical alerts.  
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }} variant="h6">
                    What is the future of IoT in healthcare?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 0 }}>
                    IoT can make healthcare cheaper and efficient in the future. It can help in the creation of more customized and patient-oriented equipment. Moreover, IoT will also enable patients to get better access to data, personalized care; thus, leading to fewer visits to the hospital.  
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }} variant="h6">
                    What are security issues in IoT?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 0 }}>
                    A lack of data protection (communications and storage) is one of the main issues in data security for IoT applications. Insecure communications and data storage are the two biggest concerns. Compromised devices can give hackers access to confidential data, which represents a significant challenge for IoT privacy and security.  
                </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default FAQs;