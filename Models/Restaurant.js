const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder=require('../utility/geocoder');

const resturSchema=new mongoose.Schema({
    name:{
        type: String,
        required:[true, 'Name is requires!'],
        unique: true,
        maxlength: [50, 'Name should not be more than 50 characters!']
    },
    slug: String,
    description: {
        type: String,
        required:[true, 'Description is requires!'],
        unique: true,
        maxlenght: [50, 'Description should not be more than 50 characters!']
    },
    website: {
        type: String,
        match: [
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
          'Please use a valid URL with HTTP or HTTPS'
        ]
      },
      phone: {
        type: String,
        maxlength: [20, 'Phone number can not be longer than 20 characters']
      },
      email: {
        type: String,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please add a valid email'
        ]
      },
      address: {
        type: String,
        required: [true, 'Please add an address']
      },
      location: {
        // GeoJSON Point
        type: {
          type: String,
          enum: ['Point']
        },
        coordinates: {
          type: [Number],
          index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
      },
      resturType: {
        // Array of strings
        type: [String],
        required: true,
        enum: [
          'Veg Restaurant',
          'Contemporary Casual',
          'Fast Food',
          'Family Style',
          'Business',
          'Other'
        ]
      },
      averageRating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [10, 'Rating must can not be more than 10']
      },
      averageCost: Number,
      photo: {
        type: String,
        default: 'no-photo.jpg'
      },
      barAndBeverage: {
        type: Boolean,
        default: false
      },
      allDayDining: {
        type: Boolean,
        default: false
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
});

//create restaurant slug form the name
//arrow function handles scope differently and can't be used with this keyword
resturSchema.pre('save', function(next){
  this.slug=slugify(this.name,{lower: true });
  next();
});

//Geocode & create location field
resturSchema.pre('save', async function(next){
  const loc= await  geocoder.geocode(this.address);
  this.location={
    type: 'Point',
    coordinates: [loc[0].longitude,loc[0].latitude],
    formattedAddress:loc[0].formattedAddress,
    street:loc[0].streetName,
    city:loc[0].city,
    state:loc[0].state,
    zipcode:loc[0].zipcode,
    country:loc[0].countryCode
  };
  //Do not save address
  this.address=undefined;
  next();
});



module.exports=mongoose.model('Restaurant',resturSchema); 

/*
// output of geocoder:
[
  {
    latitude: 48.8698679,
    longitude: 2.3072976,
    country: 'France',
    countryCode: 'FR',
    city: 'Paris',
    zipcode: '75008',
    streetName: 'Champs-Élysées',
    streetNumber: '29',
    administrativeLevels: {
      level1long: 'Île-de-France',
      level1short: 'IDF',
      level2long: 'Paris',
      level2short: '75'
    },
    provider: 'google'
  }
];
*/