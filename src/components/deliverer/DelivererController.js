const delivererRepo=require('./DelivererRepository');  

const createError = require('http-errors');
const qs = require('qs');

class DelivererController{
    //get method
    async showAvailableOrder(req,res,next){

        const orders= await delivererRepo.getAvailableOrder();
        res.render('deliverer/available-order',{layout:'deliverer-layout',orders});
    }

    async showHandlingOrder(req,res,next){
        const iddeliverer=res.locals.user.id;
        const orders=await delivererRepo.getHandlingOrders(iddeliverer);
        for(let i=0;i<orders.length;i++){
            if(orders[i].statusname === 'Collecting')
                orders[i].isCollecting=true;
            else if(orders[i].statusname === 'Delivering')
                orders[i].isDelivering=true;
        }
        
        res.render('deliverer/handling-order',{layout:'deliverer-layout',orders});
    }

    async showCompletedOrder(req,res,next){ 
        const iddeliverer=res.locals.user.id;
        const orders=await delivererRepo.getCompletedOrders(iddeliverer);
        res.render('deliverer/completed-order',{layout:'deliverer-layout', orders});
    }

    //post method
    async acceptOrder(req,res,next){
        
        if (res.locals.user){
            const idorder=req.body.idorder;
            if (await delivererRepo.checkDelivererExist(idorder))
            {
                res.redirect(req.get('referer'));
                return;
            }
            const iddeliverer=res.locals.user.id;
            try{
                await delivererRepo.acceptOrder(idorder,iddeliverer);
                res.json({status:true});
            }catch(e){
                res.redirect(req.get('referer'));
            }   
        }
        else{
            res.json({status:false});
        }
    }

    async cancelOrder(req,res,next){
        const idorder=req.body.idorder;
        try{
            await delivererRepo.cancelOrder(idorder);
            res.json({status:true});
        }catch(e){
            res.redirect(req.get('referer'));
        }   
    }

    async processOrder(req,res,next){
        const idorder=req.body.idorder;
        try{
            await delivererRepo.processOrder(idorder);
            res.json({status:true});
        }catch(e){
            res.redirect(req.get('referer'));
        }   
    }

    async completeOrder(req,res,next){
        const idorder=req.body.idorder;
        try{
            await delivererRepo.completeOrder(idorder);
            res.json({status:true});
        }catch(e){
            res.redirect(req.get('referer'));
        }   
    }
}
module.exports =new DelivererController;