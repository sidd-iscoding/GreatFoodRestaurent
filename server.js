const express = require('express');
const dotenv = require('dotenv');
const logger=require('./middleware/logger');
const connectDb = require('./config/db');
const errorHandler=require('./middleware/error');

//Route files
const restaurents = require('./routes/routes');

//lOAD ENV VARS
dotenv.config({path:'./config/config.env'});

//connect to database
connectDb();
app=express();
const PORT=process.env.PORT ;
const ENV=process.env.NODE_ENV;

//Body Parser
app.use(express.json());

//use of custom logger
app.use(logger);

//Mount the router(restaurents) on a specific url(/api/v1/restaurents)
app.use('/api/v1/restaurants',restaurents);
app.use(errorHandler);




const server=app.listen(PORT,console.log(`server is running in ${ENV} mode on port ${PORT}`));

//Handle unhandled promise rejections if database is not able to connect
process.on('unhandledRejection',(err,Promise) => {
    console.log(`Error:${err.message}`);
    server.close(() => process.exit(1));
});