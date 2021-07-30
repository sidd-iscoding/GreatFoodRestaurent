const express = require('express');
const router = express.Router();
const {
    getrestaurent,
    getrestaurents,
    createrestaurent,
    updaterestaurent,
    deleterestaurent
}=require('../controllers/restaurents');

router.route('/').get(getrestaurents).post(createrestaurent);
router.route(':/id').get(getrestaurent).put(updaterestaurent).delete(deleterestaurent);

module.exports= router;