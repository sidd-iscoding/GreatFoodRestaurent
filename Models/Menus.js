const mongoose = require('mongoose');

const menuSchema=new mongoose.Schema({
    menuName: {
        type: String,
        trim: true,
        required: [true, 'Please add the menu name!']
    },
    description: {
        type: String,
        required:[true, 'Please add the details about the menu!']
    },
    cuisine: {
        type: String,
        required:[true, 'Please add the cuisine name!'],
        enum: [ 'Korean', 'Indian', 'German']
    },
    charges: {
        type: Number,
        required:[true, 'Please add the charges for the menu!']
    },
    discountAvailable: {
        type: Boolean,
        default: false
    },
    addedAt: {
        type: Date,
        default: Date.now
    },
    resturant: {
        type: mongoose.Schema.ObjectId,
        ref: 'Restaurant',   //The ref option is what tells Mongoose which model to use during population
        required: true
    }
});

module.exports = mongoose.model('Menu',menuSchema );