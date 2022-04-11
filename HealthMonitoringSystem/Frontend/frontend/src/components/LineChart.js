import { Card, Typography, Box } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react'
import Plot from 'react-plotly.js'
import Context from '../Context';

const LineChart = ({deviceName}) => {
    const {context, setContext} = useContext(Context);
    const [time, setTime] = useState(new Date());
    const [data , setData] = useState([null]);

    //Fetch data every 2 seconds
    useEffect(() => {
        setTimeout(() => {
            const device = context.devices[deviceName];

            if(device && !device.isDisconnected) {
                // console.log('Getting dbRef ...');
                const dbRef = device.dbRef;
                if(dbRef) {
                    FetchData();
                    // console.log('Fetching data ...');
                    // console.log(data);
                }
            }

            // trigger the effect again by changing the time dependency
            setTime(new Date());
        }, 2000);
      }, [time]);

    // Fetch the required data using the get() method
    const FetchData = async () => {
        const device = context.devices[deviceName];
        const dbRef = device.dbRef;
        const recentReadings = await dbRef.orderBy('createdAt', 'desc').limit(10).get()
        .then((querySnapshot) => {
            let dataPoints = [];
            querySnapshot.forEach((doc) => {
                dataPoints.push({ ...doc.data(), id: doc.id})
            })
            setData(dataPoints);
        })
        .catch(err => {
            console.log(err);
        });
    }
  return (
    <Box sx={{minWidth: '50%', overflow: 'auto'}}>
        {data.length === 10 && !context.devices[deviceName].isDisconnected ? 
        <>
            <Plot
                data={[
                    {
                        //x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                        y: [data[9].reading, data[8].reading, data[7].reading, 
                            data[6].reading, data[5].reading, data[4].reading, 
                            data[3].reading, data[2].reading, data[1].reading, 
                            data[0].reading],
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                    }
                ]}  
                layout={ {width: 500, height: 300, title: 'Heart Rate',
                        yaxis: {
                            title: {
                                text: 'Heart Rate (bps)',
                                font: {
                                    family: 'Courier New, monospace',
                                    size: 18,
                                    color: '#7f7f7f'
                                }
                            }        
                        },
                        xaxis: {
                            visible: false,
                            showgrid: false,
                            showline: false,
                            zeroline: false,
                            showticklabels: false
                        }
                    }
                }
            />
        </>
        :
        <Card sx={{
            height: 300,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}
        >
            <h2>No Data</h2>
        </Card>}
    </Box>
    
  )
}

export default LineChart