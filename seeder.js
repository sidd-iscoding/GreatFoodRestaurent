const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Load  env vars
dotenv.config({path:'./config/config.env'});

//load models
const Restaurant= require('./Models/Restaurant');

//connect to Db
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true,
});

//Read JSON  files
const restaurant= JSON.parse(fs.readFileSync(`${__dirname}/data/restaurants.json`,'utf-8'));

//import into DB
const importData=async () =>{
    try {
        await Restaurant.create(restaurant);
        console.log('Data imported....');
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

//Delete Data from DB
const deleteData=async () =>{
    try {
        await Restaurant.deleteMany();
        console.log('Data Deleted....');
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

//call the import or delete methods
if (process.argv[2] === '-i') {
    importData();
} else if(process.argv[2] === '-d') {
    deleteData();
}else{
    console.log('Wrong argument chosen');
}
    
