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

//include  other resource routers
const menusRouter = require('./menuRoutes');


//re-route  into other resource routers by nesting routers by attaching them as middleware:
router.use('/:resturId/menus', menusRouter);

router.route('/radius/:zipcode/:distance').get(getRestaurantInRadius);
router.route('/').get(getrestaurants).post(createrestaurant);
router.route('/:id').get(getrestaurant).put(updaterestaurant).delete(deleterestaurant);

module.exports= router;