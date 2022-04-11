import React, { useState, useEffect, useContext } from 'react';
import firebase from 'firebase/compat/app';
import { CardActions, Card, CardContent, Typography, Box, IconButton, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Context from '../Context';
import CloseIcon from '@mui/icons-material/Close';
import LineChart from './LineChart';

export default function Device({device, deviceService, deviceCharacteristic, dbRef}) {
    const {context, setContext} = useContext(Context);
    const [time, setTime] = useState(new Date());
    const [isDisconnected, setIsDisconnected] = useState(false);
    const [isClosed, setIsClosed] = useState(false);
    const [deviceName, setdeviceName] = useState(device.name);
    const [reading, setDeviceReading] = useState(0);

    const [backgroundColor, setBackgroundColor] = useState('lightgreen');
    
    useEffect(() => {
        subscribeToUpdates();
    }, [])

    // Push reading to the cloud every 2 seconds
    useEffect(() => {
        setTimeout(() => {
            // push the heart rate if it exists
            if(device && !isDisconnected) {
                dbRef.add({
                  reading: reading,
                  createdAt: firebase.firestore.FieldValue.serverTimestamp()
                })
                .then((docRef) => {
                  // can do something with the newly created document here
                  console.log(`Firebase: ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} - ${deviceName} - ${reading}`)
                })
                .catch((e) => {
                  console.error(`Error adding document: ${e}`);
                });
            }
          // trigger the effect again by changing the time dependency
            setTime(new Date());
        }, 2000);
    }, [time]);

    const onSelected = (event) => {
        if(!context.devices[deviceName].isDisconnected && context.selectedDevice !== deviceName) {
            console.log(`Device selected: ${deviceName}`);
            let newContext = {...context};
            newContext.selectedDevice = deviceName;
            setContext(newContext);
        }
    }

    const onClickDisconnect = (event) => {
        device.gatt.disconnect();
        setIsDisconnected(true);
        setBackgroundColor('lightcoral');
    }

    const onDisconnected = (event) => {
        let newContext = {...context};
        newContext.devices[deviceName].isDisconnected = true;
        if(context.selectedDevice === deviceName) {
            console.log(`Disconnecting from selected device: ${context.selectedDevice}`);
            newContext.selectedDevice = '';
        }
        setContext(newContext);
        console.log(`Disconnected from ${deviceName}`);
        console.log(newContext);
    }

    const onClosed = (event) => {
        setIsClosed(true);
        onDisconnected();
    }

    /**
    * Update the value shown on the web page when a notification is
    * received.
    */
     const handleCharacteristicValueChanged = (event) => {
        let value = event.target.value.getUint8(1);
        setDeviceReading(value);
        
        /**
         * Changing the application level context
         */
        let newContext = {...context};
        newContext.devices[deviceName].reading = value;
        setContext(newContext);

        let now = new Date()
        console.log(`Local: ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} - ${deviceName} - ${value}`);
    }

    /**
    * Attempts to connect to a Bluetooth device and subscribe to
    * battery level readings using the battery service.
    */
    const subscribeToUpdates = async () => {
        try {
            device.addEventListener('gattserverdisconnected', onDisconnected);

            // Set the device as connected
            setIsDisconnected(false);
            let newContext = {...context};
            newContext.devices[deviceName].isDisconnected = false;
            setContext(newContext);
            
            setBackgroundColor('lightgreen');

            // Set the device name
            setdeviceName(device.name);

            // Try to connect to the remote GATT Server running on the Bluetooth device
            const server = await device.gatt.connect();

            // Get the service from the Bluetooth device
            const service = await server.getPrimaryService(deviceService);

            // Get the device characteristic from the Bluetooth device
            const characteristic = await service.getCharacteristic(deviceCharacteristic);

            // Subscribe to heart rate notifications
            characteristic.startNotifications();

            // When the battery level changes, call a function
            characteristic.addEventListener('characteristicvaluechanged', handleCharacteristicValueChanged);
        
            // Read the value
            const reading = await characteristic.readValue();

            // Show the initial reading on the web page
            setDeviceReading(reading.getUint8(1));
        }
        catch(error) {
            // console.log(`There was an error: ${error}`);
        }
    };

    return (
        <>
            {!isClosed && 
            <Accordion sx={{width: '98%', alignSelf: 'center', bgcolor: backgroundColor}}>
                <AccordionSummary
                    onClick={onSelected}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Box sx={{ minWidth: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Typography sx={{ minWidth: '33%', flexShrink: 0 }}>Device Name: {deviceName}</Typography>
                        {!isDisconnected &&
                            <Typography sx={{ color: 'text.secondary' }}>
                                Measurement: {reading}
                            </Typography>
                        }
                        <IconButton onClick={onClosed}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </AccordionSummary>
                <AccordionDetails sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                }}
                >
                    <CardActions disableSpacing
                        sx={{minWidth: '40%'}}
                    >
                        <Card sx={{
                            height: '100%',
                            width: '100%',
                            borderRadius: 4,
                            bgcolor: backgroundColor,
                        }}
                        >
                            <CardContent sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}
                            >
                                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 2}}>
                                    <Typography variant='h6'>Device Information</Typography>
                                </Box>
                                <Box sx={{ marginBottom: 2 }}>
                                    <Typography>
                                        Name: {deviceName}
                                    </Typography>
                                    <Typography variant="body1" color="black">
                                        Device Data:
                                    </Typography>
                                    {!isDisconnected &&
                                        <Typography variant="body2" color="black">
                                            Measurement: {reading}
                                        </Typography>
                                    }
                                </Box>
                                <Box sx={{alignSelf: 'center'}}>
                                    {!isDisconnected &&
                                        <Button variant='contained' onClick={onClickDisconnect}>
                                            Disconnect Device
                                        </Button>
                                    }
                                    {isDisconnected &&
                                        <Button variant='contained' color='error' onClick={subscribeToUpdates}>
                                            Reconnect Device
                                        </Button>
                                    }
                                </Box>
                            </CardContent>
                        </Card>
                    </CardActions>
                    <LineChart deviceName={deviceName}/>
                </AccordionDetails>
            </Accordion>
            }
        </>
    )
}
