const express = require('express');

//need to set mergeParams: true on the router,
// if we want to access params from the parent router i.e  from routes.js 
const router = express.Router({mergeParams: true});

const {
    getmenus
}=require('../controllers/menus');


router.route('/').get(getmenus);

module.exports = router;