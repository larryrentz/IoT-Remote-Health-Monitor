import React, { useState, useContext } from 'react';
import { Button } from '@mui/material';
import LineChart from './LineChart';
import Device from './Device';
import Context from '../Context';
import { firestore } from './Firebase';
import DeviceModal from './DeviceModal';
import { Container } from '@mui/material';

export default function DevicesView() {
    const [connectedDevices, setConnectedDevices] = useState([]);
    const [dbRef, setDbRef] = useState(null);
    const {context, setContext} = useContext(Context);
    const user = context.user;

    const connectToDevice = async(service, characteristic) => {
        
        try {
            // Search for Bluetooth devices that advertise a battery service
            const device = await navigator.bluetooth.requestDevice({
                filters: [{services: [service]}]
            });
            console.log(user);
            console.log(device.name);
            const dbRef = firestore.collection(`users/${user.uid}/devices/${device.name}/services/${service}/characteristics/${characteristic}/readings`);
            setDbRef(dbRef);
            console.log("old devices")
            console.log(connectedDevices)
            // TODO: Pass as props into patients or display below
            setConnectedDevices([...connectedDevices,
                <Device
                    key={device.name}
                    device={device}
                    deviceService={service}
                    deviceCharacteristic={characteristic}
                    dbRef={dbRef}
                    connectedDevices={connectedDevices}
                    setConnectedDevices={setConnectedDevices}
                />
            ]);
        }
        catch(error) {
            console.log(`Error connecting to device: ${error}`)
        }
    };

    return (
        <Container>
            {connectedDevices}

            
                <DeviceModal connectedDevice={connectToDevice}/>
           

            {dbRef && <LineChart dbRef={dbRef}/>}
        </Container>  
    );
}
