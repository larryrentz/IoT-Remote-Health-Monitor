import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';


function Patient() {
  return (
    //patient information
    <div>
      <CardActions disableSpacing>
        <Card sx={{ width: 250 }} color="blue">
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
        <Card sx={{ width: 250 }} color="blue">
          <CardContent>
            <Typography sx={{ fontSize: 20 }} color="black" gutterBottom>
              Device Information
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="black">
              Name: FitBit2.0
            </Typography>
            <Typography variant="body1" color="black">
              Device Data:
              <Typography variant="body2" color="black">
                Heart rate: 98bpm
              </Typography>
            </Typography>
          </CardContent>
        </Card>
      </CardActions>

      <Button
        id="webBLEButton"
        variant="contained"
        size="medium"
      >
        Device BLE
      </Button>

    </div>

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
