const express = require('express');
const dotenv = require('dotenv');
const logger=require('./middleware/logger');

//Route files
const restaurents = require('./routes/routes');

//lOAD ENV VARS
dotenv.config({path:'./config/config.env'});
app=express();
const PORT=process.env.PORT ;
const ENV=process.env.NODE_ENV;

app.use(logger);

//Mount the router(restaurents) on a specific url(/api/v1/restaurents)
app.use('/api/v1/restaurents',restaurents);



app.listen(PORT,console.log(`server is running in ${ENV} mode on port ${PORT}`));