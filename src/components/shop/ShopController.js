const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const shopRepo = require('./ShopRepository');
const authService = require('../auth/AuthService');

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

        // let products = [];
        // products = await shopRepo.getNumber(shopId, 4);
        // if (!products) return next(createError(404));

        let ratings = [];
        ratings = await shopRepo.getrating(shopId);
        const countResult = Object.keys(ratings).length;
        
        res.render('users/shop-details', { shop, ratings, countResult});
    }

    async ratingshop(req, res, next) {
        try{ 
            const { rate, message, idshop } = req.body;
            
            let email = res.locals.user.email;
            if (!email) return;
            
            const iduser = await authService.getUserIdByEmail(email);
            await shopRepo.rating(rate,message,idshop,iduser['idaccount']);
            console.log(iduser);
            
            res.redirect(`users/shops/${qs.stringify(idshop)}`);
        }catch(e){
            console.log(e.message);
            return;
        }
    }
}

module.exports = new ShopController;