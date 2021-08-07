const express = require('express');
const router = express.Router();
const {
    getrestaurant,
    getrestaurants,
    createrestaurant,
    updaterestaurant,
    deleterestaurant,
    getRestaurantInRadius
}=require('../controllers/restaurants');

router.route('/radius/:zipcode/:distance').get(getRestaurantInRadius);
router.route('/').get(getrestaurants).post(createrestaurant);
router.route('/:id').get(getrestaurant).put(updaterestaurant).delete(deleterestaurant);

module.exports= router;