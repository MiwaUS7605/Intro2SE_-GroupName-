const express = require('express');
const router = express.Router(); 

const shopController = require('./ShopController');

/* GET home page. */
  
router.get('/:shopId', shopController.details); 

router.post('/:shopId', shopController.ratingshop); 
 
module.exports = router;
 