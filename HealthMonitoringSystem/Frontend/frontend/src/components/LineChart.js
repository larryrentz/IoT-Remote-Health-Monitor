import { QuerySnapshot } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import Plot from 'react-plotly.js'
import { auth, firestore } from './Firebase'

const LineChart = () => {
    const [time, setTime] = useState(new Date());
    const [data , setData] = useState([null]);
    const hrRef = firestore.collection(`users/${auth.currentUser.uid}/heartRate`);

    //Fetch data every 2 seconds
    useEffect(() => {
        setTimeout(() => {
            FetchData();
            console.log(data);
            
            // trigger the effect again by changing the time dependency
            setTime(new Date());
        }, 2000);
      }, [time]);

    // Fetch the required data using the get() method
    const FetchData = async () => {
        const recentHeartRates = await hrRef.orderBy('createdAt', 'desc').limit(10).get()
        .then((querySnapshot) => {
            let heartRates = [];
            querySnapshot.forEach((doc) => {
                heartRates.push({ ...doc.data(), id: doc.id})
            })
            setData(heartRates);
        })
        .catch(err => {
            console.log(err);
        });
    }
  return (
    <div>
        {data.length == 10 ? 
        <Plot
            data={[
                {
                    //x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    y: [data[9].heartRate, data[8].heartRate, data[7].heartRate, 
                        data[6].heartRate, data[5].heartRate, data[4].heartRate, 
                        data[3].heartRate, data[2].heartRate, data[1].heartRate, 
                        data[0].heartRate],
                    type: 'line',
                    mode: 'lines+markers',
                    marker: {color: 'red'},
                }
            ]}  
            layout={ {width: 400, height: 400, title: 'Heart Rate'} }
        />
        : <p>No data</p>}
    </div>
    
  )
}

export default LineChart