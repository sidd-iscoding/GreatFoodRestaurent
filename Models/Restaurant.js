const mongoose = require('mongoose');

const resturSchema=new mongoose.Schema({
    name:{
        type: String,
        required:[true, 'Name is requires!'],
        unique: true,
        maxlenght: [50, 'Name should not be more than 50 characters!']
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

module.exports=mongoose.model('Restaurant',resturSchema); 