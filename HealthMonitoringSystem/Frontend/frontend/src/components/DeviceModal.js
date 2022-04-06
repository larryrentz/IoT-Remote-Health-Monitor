import React, {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField } from '@mui/material';

  /* Utils */
  
  function getSupportedProperties(characteristic) {
    let supportedProperties = [];
    for (const p in characteristic.properties) {
      if (characteristic.properties[p] === true) {
        supportedProperties.push(p.toUpperCase());
      }
    }
    return '[' + supportedProperties.join(', ') + ']';
  }

function DeviceModal({connectedDevice}) {

  function onButtonClick() {
    let optionalServices = document.querySelector('#optionalServices').value;
    let characteristic = document.querySelector('#characteristic').value;
    connectedDevice(optionalServices, characteristic);
  
    console.log(optionalServices);
    console.log(characteristic);
  }

  const style = {
    position: 'absolute',
    marginLeft: '200px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <Container>
        <Button onClick={handleOpen} class="button" style={{marginBottom: 30, marginLeft: -50}}> Device Configuration</Button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Typography sx={{ mt: 2 }}> 
            <TextField id='optionalServices' label="Service" style={{marginLeft: 0,}}></TextField>
            <TextField id='characteristic' label="Characteristic" style={{marginLeft: -195, marginTop: 80}}></TextField>
            </Typography>
            <Typography variant="h6" component="h2">
            <Button onClick={onButtonClick} class="button">Discover Services and Characteristics</Button>
            </Typography>
        </Box>
        </Modal>
    </Container>
  )

}
export default DeviceModal;