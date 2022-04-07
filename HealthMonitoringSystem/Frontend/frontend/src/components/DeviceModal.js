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
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '35%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 4,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <>
      <Button sx={{ margin: 1 }} variant='contained' onClick={handleOpen}>
        Device Configuration
      </Button>
      <Container>
          <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >
          <Box sx={style}>
              <Typography variant='h5' sx={{ textAlign: 'center' }}>
                Connect to Device
              </Typography>
              <Box sx={{textAlign: 'center'}}>
                <Typography sx={{ mt: 2, marginBottom: 3, display: 'flex', justifyContent: 'space-evenly'}}> 
                  <TextField id='optionalServices' label="Service"></TextField>
                  <TextField id='characteristic' label="Characteristic"></TextField>
                </Typography>
                <Button onClick={onButtonClick} variant='contained'>
                    Discover Services and Characteristics
                </Button>
              </Box>
          </Box>
          </Modal>
      </Container>
    </>

  )

}
export default DeviceModal;