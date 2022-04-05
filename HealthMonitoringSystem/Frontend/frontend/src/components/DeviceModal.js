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


function onButtonClick() {
    // Validate services UUID entered by user first.
    let optionalServices = document.querySelector('#optionalServices').value;
  
    console.log('Requesting any Bluetooth Device...');
    navigator.bluetooth.requestDevice({
     // filters: [...] <- Prefer filters to save energy & show relevant devices.
        acceptAllDevices: true,
        optionalServices: [optionalServices]})
    .then(device => {
      console.log('Connecting to GATT Server...');
      return device.gatt.connect();
    })
    .then(server => {
      // Note that we could also get all services that match a specific UUID by
      // passing it to getPrimaryServices().
      console.log('Getting Services...');
      return server.getPrimaryServices();
    })
    .then(services => {
      console.log('Getting Characteristics...');
      let queue = Promise.resolve();
      services.forEach(service => {
        queue = queue.then(_ => service.getCharacteristics().then(characteristics => {
          console.log('> Service: ' + service.uuid);
          characteristics.forEach(characteristic => {
            console.log('>> Characteristic: ' + characteristic.uuid + ' ' +
                getSupportedProperties(characteristic));
          });
        }));
      });
      return queue;
    })
    .catch(error => {
      console.log('Argh! ' + error);
    });
  }
  
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

function DeviceModal() {

  const style = {
    position: 'absolute',
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

  
  const [service, setService] = React.useState('');
  const handleChange = (event) => {setService(event.target.value);};


  return (
    <Container>
        <Button onClick={handleOpen}>Device Configuration</Button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Typography sx={{ mt: 2 }}> 
              <FormControl fullWidth id="optionalServices">
                <InputLabel>Services</InputLabel>
                  <Select
                    label="Services"
                    onChange={handleChange}
                  >
                  <MenuItem value='heart_rate'>heart_rate</MenuItem>
                  </Select>
            </FormControl>
            {/* <p id='optionalServices'>{service}</p> */}
            </Typography>
            <Typography variant="h6" component="h2">
            <Button onClick={onButtonClick}>Discover Services and Characteristics</Button>
            </Typography>
        </Box>
        </Modal>
    </Container>
  )

}
export default DeviceModal;