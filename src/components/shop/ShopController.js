const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const shopRepo = require('./ShopRepository');

const createError = require('http-errors');
const qs = require('qs');
const Paginator = require('paginator');

const ajv = new Ajv();
addFormats(ajv);

class ShopController {    
    async details(req, res, next) {
        const shopId = req.params['shopId'];
        console.log('shopId', shopId);
        const shop = await shopRepo.get(shopId);
        console.log('shop', shop);
        if (!shop) return next(createError(404));

        let products = [];
        products = await shopRepo.getNumber(shopId, 4);
        if (!products) return next(createError(404));

        let ratings = [];
        ratings = await shopRepo.getrating(shopId);
        const countResult = Object.keys(ratings).length;
        
        res.render('users/shop-details', { shop, products, ratings, countResult});
    }

    async ratingshop(req, res) {
        try{ 
            const { rate, message, idshop } = req.body;

            console.log(rate, message, idshop);
            
            let email = res.locals.user.email;
            //if (!email) return;
            
            const iduser = await authService.getUserIdByEmail(email);
            await shopRepo.rating(rate,message,idshop,iduser['idcustomer']);
            console.log(iduser);
        }catch(e){
            console.log(e.message);
            return;
        }
    }
}

module.exports = new ShopController;