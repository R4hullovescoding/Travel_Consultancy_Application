const express = require('express');
const morgan = require('morgan');
const colors=require("colors")
const connectDB = require('./config/db');
const dotenv = require('dotenv');

// Reset object
const app = express();

// Env config
dotenv.config();
//mongo connection
connectDB();
// Middlewares
// Remove or deal with parsing errors
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use("/api/v1/user",require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/agent", require("./routes/agentRoutes"));
// Listen port
const port = process.env.PORT || 8090;

// Port listen
app.listen(port, () => {
    console.log('\x1b[46m\x1b[37m%s\x1b[0m', `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`);
});
