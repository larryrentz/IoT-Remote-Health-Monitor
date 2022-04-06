import React, { useState, useEffect, useContext } from 'react';
import firebase from 'firebase/compat/app';
import { CardActions, Card, CardContent, Typography } from '@mui/material';
import Context from '../Context';
import Button from '@mui/material/Button';

export default function Device({device, deviceService, deviceCharacteristic, dbRef, deviceDisconnected}) {
    const {context, setContext} = useContext(Context);
    const [time, setTime] = useState(new Date());
    const [isDisconnected, setIsDisconnected] = useState(deviceDisconnected);
    const [deviceName, setdeviceName] = useState(device.name);
    const [reading, setDeviceReading] = useState(0);
    
    useEffect(() => {
        subscribeToUpdates();
    }, [])

    // Push reading to the cloud every 2 seconds
    useEffect(() => {
        setTimeout(() => {
            // uncomment to log the heart rate and time in the console
            // console.log(`${time.toLocaleTimeString()} - ${heartRate} BPM`);

            // push the heart rate if it exists
            if(device && !isDisconnected) {
                dbRef.add({
                  reading: reading,
                  createdAt: firebase.firestore.FieldValue.serverTimestamp()
                })
                .then((docRef) => {
                  // can do something with the newly created document here
                })
                .catch((e) => {
                  console.error(`Error adding document: ${e}`);
                });
            }
          // trigger the effect again by changing the time dependency
            setTime(new Date());
        }, 2000);
    }, [time]);

    const onDisconnected = (event) => {
        device.gatt.disconnect();
        setIsDisconnected(true);
        deviceDisconnected = true;
        setTimeout(()=>{
            // alert(`Device: ${deviceName} is disconnected`);
        }, 100);
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
        const newContext = {...context};
        newContext.devices[deviceName] = value;
        setContext(newContext);

        let now = new Date()
        console.log(`> ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} - ${deviceName} - ${value}`);
    }

    /**
    * Attempts to connect to a Bluetooth device and subscribe to
    * battery level readings using the battery service.
    */
    const subscribeToUpdates = async () => {
        try {
            device.addEventListener('gattserverdisconnected', onDisconnected);

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
            console.log(`There was an error: ${error}`);
        }
    };

    return (
        <>
            {!isDisconnected && <CardActions disableSpacing>
                <Card sx={{ width: 250, padding: 10 }} class="card2">
                    <CardContent>
                        <Typography sx={{ fontSize: 20 }} color="black" gutterBottom>
                            Device Information
                        </Typography>
                        {!isDisconnected &&
                            <Typography sx={{ mb: 1.5 }} color="black">
                                Name: {deviceName}
                            </Typography>
                        }
                        <Typography variant="body1" color="black">
                            Device Data:
                        </Typography>
                        {!isDisconnected &&
                            <Typography variant="body2" color="black">
                                Measurement: {reading}
                            </Typography>
                        }
                        
                        {!isDisconnected &&
                            <Button class="button"
                            id="disButton"
                            variant="contained"
                            size="medium"
                            onClick={onDisconnected}
                            >
                            Disconnect Device
                            </Button>
                        }
                    </CardContent>
                </Card>
            </CardActions>}
        </>
    )
}
