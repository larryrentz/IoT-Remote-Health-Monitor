const express = require('express');
const cors = require('cors')


const PORT = process.env.PORT || 3000;
const app = express();

// Adding Middlewware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Start the Server
server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});



