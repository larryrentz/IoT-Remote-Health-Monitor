import React, { useState, useContext } from 'react';
import { Button } from '@mui/material';
import LineChart from './LineChart';
import Device from './Device';
import Context from '../Context';
import { firestore } from './Firebase';

export default function DevicesView() {
    const [connectedDevices, setConnectedDevices] = useState([]);
    const [dbRef, setDbRef] = useState(null);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const {context, setContext} = useContext(Context);
    const user = context.user;

    const selectDevice = (event) => {
        setSelectedDevice(event.target);
    }
    const connectToDevice = async() => {
        const service = 'heart_rate';
        const characteristic = 'heart_rate_measurement';
        try {
            // Search for Bluetooth devices that advertise a battery service
            const device = await navigator.bluetooth.requestDevice({
                filters: [{services: [service]}]
            });
            console.log(user);
            const dbRef = firestore.collection(`users/${user.uid}/devices/${device.name}/services/${service}/characteristics/${characteristic}/readings`);

            // TODO: Pass as props into patients or display below
            setConnectedDevices([...connectedDevices,
                <Device
                    key={device.name}
                    device={device}
                    deviceService={service}
                    deviceCharacteristic={characteristic}
                    dbRef={dbRef}
                    onClick={selectDevice}
                />
            ]);
        }
        catch(error) {
            console.log(`Error connecting to device: ${error}`)
        }
    };

    return (
        <div>
            {connectedDevices}

            {selectedDevice && <LineChart dbRef={dbRef}/>}

            <Button class="button"
                id="webBLEButton"
                variant="contained"
                size="medium"
                onClick={connectToDevice}
            >
                Device BLE
            </Button>
        </div>  
    );
}
