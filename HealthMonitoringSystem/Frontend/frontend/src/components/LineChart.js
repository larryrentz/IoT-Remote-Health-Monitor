import { Card } from '@mui/material';
import { QuerySnapshot } from 'firebase/firestore';
import React, { useState, useEffect, useContext } from 'react'
import Plot from 'react-plotly.js'
import Context from '../Context';
import { auth, firestore } from './Firebase'

const LineChart = () => {
    const {context, setContext} = useContext(Context);
    const [time, setTime] = useState(new Date());
    const [data , setData] = useState([null]);
    const [dbRef, setDbRef] = useState(null);
    const device = context.devices['Polar H10 9C3FB127'];

    //Fetch data every 2 seconds
    useEffect(() => {
        setTimeout(() => {
            if(dbRef) {
                FetchData();
                // console.log(data);
            }
            else {
                if(device) {
                    const newDbRef = device['dbRef'];
                    if(newDbRef) {
                        setDbRef(newDbRef);
                    }
                }
            }

            // trigger the effect again by changing the time dependency
            setTime(new Date());
        }, 2000);
      }, [time]);

    // Fetch the required data using the get() method
    const FetchData = async () => {
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
    <div>
        {data.length == 10 && !device['isDisconnected'] ? 
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
            layout={ {width: 400, height: 400, title: 'Heart Rate',
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
        :
        <Card sx={{
            width: 400,
            height: 400,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}
        >
            {/* <h2>No Data</h2> */}
            No Data
        </Card>}
    </div>
    
  )
}

export default LineChart