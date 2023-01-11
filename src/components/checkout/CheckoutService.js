const db = require('../../db');
const checkoutRepository = require('./CheckoutRespository');

class CheckoutService {
   
    async getLatestOrder(idcustomer) {
        return checkoutRepository.getlatestorder(idcustomer);
    }

    async placeOrder(services, checkoutForm) {
        return checkoutRepository.placeorder(services, checkoutForm);
    }

    async getAllMyOrders(userId){
        return checkoutRepository.getallmyorders(userId);
    }

    async sort(userId, idtype) {
        return checkoutRepository.sorttype(userId, idtype);
    }
}

module.exports = new CheckoutService;