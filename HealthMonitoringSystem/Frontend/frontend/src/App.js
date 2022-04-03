import './App.css';
import { Box, Typography } from '@mui/material';
import Patient from './components/Patient.js'
import FAQs from './components/FAQs.js'
import Alerts from './components/Alerts'

function App() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '140px',
        '& > .MuiBox-root > .MuiBox-root': {
          p: 1,
          borderRadius: 2,
          margin: 1,
          fontWeight: '700'
        },
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateAreas: `"header header header header" "main main main sidebar" "footer footer footer sidebar"`
        }}
      >
        <Box sx={{ gridArea: 'header', bgcolor: 'lightgreen'}}>
          <Typography variant="h4" sx={{ textAlign: 'center'}}> IoT Remote Health Monitor </Typography>
        </Box>

        <Box sx={{ gridArea: 'main', bgcolor: 'lightyellow' }}>
          <Patient /> 
        </Box>
        <Box sx={{ gridArea: 'sidebar', bgcolor: 'lightblue'}}>
          <Typography> Notifications </Typography>
          <Typography> Sidebar </Typography>
          <Box sx={{gridArea: 'sidebar', justifySelf:'right', allignSelf:'end'}}>
            <Alerts/>
          </Box>
        </Box>

        <Box sx={{ gridArea: 'footer', bgcolor: 'lightgray'}}>
          <Typography sx={{ textAlign: 'center'}}> Made with Love :) </Typography>
        </Box>
        <Box sx={{ gridArea: 'sidebar', justifySelf: 'end', alignSelf: 'end'}}>
          <FAQs/> 
        </Box>

      </Box>
    </Box>
  );
}
export default App;
