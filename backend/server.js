const express = require('express');
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const cors = require('cors');


connectDb();
const app = express();
app.use(cors());

const port = process.env.port || 5678;
app.use(express.json());
app.use("/api/users", require('./Routes/userRoutes'))
app.use("/api/enduser", require('./Routes/endUserRoutes'))
app.use("/api/technician", require('./Routes/technicianRoutes'))
app.use("/api/complain", require('./Routes/complaintRoutes'))

app.listen(port,()=>{
    console.log(`App listening on port ${port}`);
})