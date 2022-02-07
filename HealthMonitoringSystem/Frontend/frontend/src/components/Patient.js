import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function Patient() {
    return (
      <Card sx={{ width: 250 }} color="blue">
      <CardContent>
        <Typography sx={{ fontSize: 20 }} color="black" gutterBottom>
          Patient Information
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="black">
            Name: Jane Doe
        </Typography>
        <Typography variant="body2" color="black">
            DOB: 10/20/1975
        </Typography>
      </CardContent>
    </Card>
  );
}
export default Patient;
  