import React, { useState, useContext, useEffect } from 'react';
import { Button, Box, Typography } from '@mui/material';
import LineChart from './LineChart';
import Device from './Device';
import Context from '../Context';
import { firestore } from './Firebase';
import DeviceModal from './DeviceModal';
import { Container } from '@mui/material';

export default function DevicesView() {
    const [connectedDevices, setConnectedDevices] = useState([]);
    const {context, setContext} = useContext(Context);
    const user = context.user;

    // useEffect(() => {
    //     let newConnectedDevices = [...connectedDevices];
    //     newConnectedDevices.filter(device => {
    //         const deviceName = device.key;
    //         if(context.devices[deviceName]) {
    //             return !context.devices[deviceName].isDisconnected;
    //         }

    //         return true;
    //     });
    //     setConnectedDevices(newConnectedDevices);
    //     console.log(newConnectedDevices);
    // }, [context.devices]);

    const connectToDevice = async(service, characteristic) => {
        
        try {
            // Search for Bluetooth devices that advertise a battery service
            const device = await navigator.bluetooth.requestDevice({
                filters: [{services: [service]}]
            });
            // console.log(user);
            // console.log(device.name);
            const dbRef = firestore.collection(`users/${user.uid}/devices/${device.name}/services/${service}/characteristics/${characteristic}/readings`);
            
            // TODO: Pass as props into patients or display below
            setConnectedDevices([...connectedDevices,
                <Device
                    key={device.name}
                    device={device}
                    deviceService={service}
                    deviceCharacteristic={characteristic}
                    dbRef={dbRef}
                    deviceDisconnected={false}
                />
            ]);
            let newContext = {...context};
            const newDevice = {
                reading : -1,
                dbRef : dbRef,
                isDisconnected : false
            }
            newContext.devices[device.name] = newDevice;
            newContext.selectedDevice = device.name;
            setContext(newContext);

            console.log(`Device connected: ${device.name}`);
            console.log(newContext);
        }
        catch(error) {
            console.log(`Error connecting to device: ${error}`)
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', maxWidth: '100%', maxHeight: '100%', overflow: 'scroll'}}>
            {connectedDevices}
            <DeviceModal connectedDevice={connectToDevice}/>
        </Box> 
    );
}
