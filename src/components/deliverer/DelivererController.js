const delivererRepo=require('./DelivererRepository');
//const jsFunc=require('../.././public/deliverer/js/acceptOrder')

const createError = require('http-errors');
const qs = require('qs');

class DelivererRepository{
    //get method
    async showAvailableOrder(req,res,next){
        const orders= await delivererRepo.getAvailableOrder();
        res.render('deliverer/available-order',{layout:'deliverer-layout',orders});
    }

    async showHandlingOrder(req,res,next){
        //const iddeliverer=res.locals.user.idaccount;
        const orders=await delivererRepo.getHandlingOrders(200);
        console.log(orders);
        for(let i=0;i<orders.length;i++){
            if(orders[i].statusname === 'Collecting')
                orders[i].isCollecting=true;
            else if(orders[i].statusname === 'Delivering')
                orders[i].isDelivering=true;
        }
        
        console.log(orders);
        res.render('deliverer/handling-order',{layout:'deliverer-layout',orders});
    }

    async showCompletedOrder(req,res,next){
        //const iddeliverer=res.locals.user.idaccount;
        const orders=await delivererRepo.getCompletedOrders(200);
        res.render('deliverer/completed-order',{layout:'deliverer-layout', orders});
    }


    //post method
    async acceptOrder(req,res,next){
        const idorder=req.body.idorder;
        //const iddeliverer=res.locals.user.idaccount;
        try{
            await delivererRepo.acceptOrder(idorder,200);
            res.json({status:true});
        }catch(e){
            res.redirect(req.get('referer'));
        }   
    }

    async cancelOrder(req,res,next){
        const idorder=req.body.idorder;
        //const iddeliverer=res.locals.user.idaccount;
        try{
            await delivererRepo.cancelOrder(idorder);
            res.json({status:true});
        }catch(e){
            res.redirect(req.get('referer'));
        }   
    }

    async processOrder(req,res,next){
        const idorder=req.body.idorder;
        //const iddeliverer=res.locals.user.idaccount;
        try{
            await delivererRepo.processOrder(idorder);
            res.json({status:true});
        }catch(e){
            res.redirect(req.get('referer'));
        }   
    }

    async completeOrder(req,res,next){
        const idorder=req.body.idorder;
        //const iddeliverer=res.locals.user.idaccount;
        try{
            await delivererRepo.completeOrder(idorder);
            res.json({status:true});
        }catch(e){
            res.redirect(req.get('referer'));
        }   
    }
}
module.exports =new DelivererRepository;