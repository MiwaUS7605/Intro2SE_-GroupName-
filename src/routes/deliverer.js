const express = require('express');
const router=express.Router();

const delivererConstroller=require('../components/deliverer/DelivererController');

router.get('/available-order',delivererConstroller.showAvailableOrder);
router.get('/handling-order',delivererConstroller.showHandlingOrder);
router.get('/completed-order',delivererConstroller.showCompletedOrder);

router.post('/accept-order',delivererConstroller.acceptOrder);
router.post('/cancel-order',delivererConstroller.cancelOrder);
router.post('/process-order',delivererConstroller.processOrder);
router.post('/complete-order',delivererConstroller.completeOrder);

module.exports=router;