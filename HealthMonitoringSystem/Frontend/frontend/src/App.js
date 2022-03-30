import './App.css';
import { Box, Typography } from '@mui/material';
import Patient from './components/Patient.js'
import FAQs from './components/FAQs.js'

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
        <Box sx={{ gridArea: 'header'}}>
          <Typography> IoT Remote Health Monitor </Typography>
        </Box>
        <Box sx={{ gridArea: 'main' }}>
          <Patient /> 
        </Box>
        <Box sx={{ gridArea: 'sidebar'}}>
          <Typography> Notifications </Typography>
          <Typography> Sidebar </Typography>
          <FAQs/> 
        </Box>
        <Box sx={{ gridArea: 'footer'}}>
          <Typography> Made with Love :) </Typography>
        </Box>
      </Box>
    </Box>
  );
}
export default App;
