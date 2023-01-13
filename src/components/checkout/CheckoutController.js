const laundryService = require('../cart/LaundryService');
const checkoutService = require('./CheckoutService');
const authService = require('../auth/AuthService');
const createError = require('http-errors');
const qs = require('qs');

class CheckoutController {

    async displayCheckout(req, res, next) {
        let email = res.locals.user.email;
        if (!email) return;
        const idUser = await authService.getUserIdByEmail(email);

        //Get the cart first when the order has not been processed
        let services = await laundryService.getcart(idUser['idaccount']);
        
        //The cart empty when the order has been processed,
        //and get the latest processed order
        if (services.length == 0) {
            services = await checkoutService.getLatestOrder(idUser['idaccount']);
            // console.log("You have process order before!");
        }
        var sub_total = await laundryService.getSubtotal(services);

        let orders = await checkoutService.getAllMyOrders(idUser['idaccount']);

        res.render('users/checkout', { services, sub_total, orders});
    }

    async placeOrder(req,res,next) {
        let email = res.locals.user.email;
        if (!email) return;
        const idUser = await authService.getUserIdByEmail(email);
        
        let services = [];
        services = await laundryService.getcart(idUser['idaccount']);
        
        //Empty cart
        if (!services) return next(createError(404));
        console.log("from placeOrder in CheckoutController\n");
        console.log(services);

        const checkoutForm = req.body; 

        console.log(checkoutForm);

        await checkoutService.placeOrder(services, checkoutForm);

        res.redirect('/');
    }

    async manageOrder(req, res, next) {
        let email = res.locals.user.email;
        if (!email) return;
        const idUser = await authService.getUserIdByEmail(email);

        const orderType = req.query.order;
        let orders = [];
        if (orderType) {
            orders = await checkoutService.sort(idUser['idaccount'],orderType);
        }
        else {
            orders = await checkoutService.getAllMyOrders(idUser['idaccount']);
        }
        if (!orders) return next(createError(404));
        const { sort, ...withoutSort } = req.query;

        res.render('users/manage-order',  { orders, originalUrl: `${req.baseUrl}?${qs.stringify(withoutSort)}`});
    }
}

module.exports = new CheckoutController;