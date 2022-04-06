import React, {useState, useEffect} from 'react';
import { Container, CardActions, Card, CardContent, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import './Patient.css';
import LineChart from './LineChart';
import DeviceModal from './DeviceModal.js';
import DevicesView from './DevicesView.js';


function Patient() {
  return (
    //patient information
    <Container class="container">
      <h1>Dashboard</h1>
      <div>
        <DeviceModal/>
      </div>
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

      <DevicesView />

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
