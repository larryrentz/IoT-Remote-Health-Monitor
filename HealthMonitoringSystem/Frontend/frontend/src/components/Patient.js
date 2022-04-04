import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { Grid } from '@mui/material';
import './Patient.css';


function Patient() {
  const [supportsBluetooth, setSupportsBluetooth] = useState(false);
  const [isDisconnected, setIsDisconnected] = useState(true);
  const [heartRate, setheartRate] = useState(null);
  const [deviceName, setdeviceName] = useState(null);

  // When the component mounts, check that the browser supports Bluetooth
  useEffect(() => {
    if (navigator.bluetooth) {
      setSupportsBluetooth(true);
    }
  }, []);

  /**
   * Let the user know when their device has been disconnected.
   */
   const onDisconnected = (event) => {
    alert(`The device ${event.target} is disconnected`);
    setIsDisconnected(true);
  }

   /**
   * Update the value shown on the web page when a notification is
   * received.
   */
    const handleCharacteristicValueChanged = (event) => {
      let value = event.target.value.getUint8(0);
      setheartRate(value);
      let now = new Date()
      console.log("> " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + "Heart rate is now " + value)
    }
  
    /**
     * Attempts to connect to a Bluetooth device and subscribe to
     * battery level readings using the battery service.
     */
    const connectToDeviceAndSubscribeToUpdates = async () => {
      try {
        // Search for Bluetooth devices that advertise a battery service
        const device = await navigator.bluetooth
          .requestDevice({
            filters: [{services: ['heart_rate']}]
          });
  
        setIsDisconnected(false);
  
        // Add an event listener to detect when a device disconnects
        device.addEventListener('gattserverdisconnected', onDisconnected);

        // Set the device name
        setdeviceName(device.name);
  
        // Try to connect to the remote GATT Server running on the Bluetooth device
        const server = await device.gatt.connect();
  
        // Get the heart rate from the Bluetooth device
        const service = await server.getPrimaryService('heart_rate');
  
        // Get the heart rate measurement characteristic from the Bluetooth device
        const characteristic = await service.getCharacteristic('heart_rate_measurement');
  
        // Subscribe to heart rate notifications
        characteristic.startNotifications();
  
        // When the battery level changes, call a function
        characteristic.addEventListener('characteristicvaluechanged',
                                    handleCharacteristicValueChanged);
        
        // Read the heart rate value
        const reading = await characteristic.readValue();
  
        // Show the initial reading on the web page
        setheartRate(reading.getUint8(0));
      } catch(error) {
        console.log(`There was an error: ${error}`);
      }
    };

  return (
    //patient information
    <Container class="container">
      <h1>Dashboard</h1>
      <CardActions disableSpacing>
        <Card sx={{ width: 250 }} class="card1">
          <CardContent>
            <Typography sx={{ fontSize: 20 }} color="black" gutterBottom>
              Patient Information
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="black">
              Name: Jane Doe
            </Typography>
            <Typography variant="body1" color="black">
              DOB: 10/20/1975
            </Typography>
          </CardContent>
        </Card>
      </CardActions>

      {/*deive info*/}
      <CardActions disableSpacing>
        <Card sx={{ width: 250 }} class="card2">
          <CardContent>
            <Typography sx={{ fontSize: 20 }} color="black" gutterBottom>
              Device Information
            </Typography>
            {supportsBluetooth && !isDisconnected &&
              <Typography sx={{ mb: 1.5 }} color="black">
                Name: {deviceName}
              </Typography>
            }
            <Typography variant="body1" color="black">
              Device Data:
              {supportsBluetooth && !isDisconnected &&
                <Typography variant="body2" color="black">
                  Heart rate: {heartRate}
                </Typography>
              }
          
            </Typography>
          </CardContent>
        </Card>
      </CardActions>

      
      {supportsBluetooth && isDisconnected &&
        <Button class="button"
        id="webBLEButton"
        variant="contained"
        size="medium"
        onClick={connectToDeviceAndSubscribeToUpdates}
      >
        Device BLE
      </Button>
      }
      {!supportsBluetooth &&
        <p>This browser doesn't support the Web Bluetooth API</p>
      }

    </Container>

  );
}

function Device() {
  <Card sx={{ width: 250 }} color="blue">
    <CardContent>
      <Typography sx={{ fontSize: 20 }} color="black" gutterBottom>
        Device Information
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="black">
        Name: FitBit2.0
      </Typography>
      <Typography variant="body2" color="black">
        Device Data:
      </Typography>
    </CardContent>
  </Card>
}

export default Patient;
