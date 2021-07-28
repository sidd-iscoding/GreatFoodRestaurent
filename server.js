const express = require('express');
const dotenv = require('dotenv');

//lOAD ENV VARS
dotenv.config({path:'./config/config.env'});
app=express();
const PORT=process.env.PORT ;
const ENV=process.env.NODE_ENV;
app.listen(PORT,console.log(`server is running in ${ENV} mode on port ${PORT}`));