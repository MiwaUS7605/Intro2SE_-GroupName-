const db = require('../../db');

class ShopRepository {
    async getAll() { 
        let query_str = "select * from `shop`";
        const result = await db.connection.execute(query_str);
        return result[0];
    }

    async get(shopId) { 
        let query_str = "select * from `shop` where idshop = ?";
        const result = await db.connection.execute(query_str, [shopId]);
        return result[0][0];
    }

    async getrating(shopId){
        let query_str = 'select * from `rating` where `idshop` = ?';
        const result = await db.connection.execute(query_str, [shopId]);

        console.log(result[0]);
        return result[0];
    }

    async rating(rate, message, idshop, idcustomer) {
        await db.connection.execute('insert into `rating`(rate,message,idshop,idcustomer)\
                                    values (?,?,?,?)', [rate, message, idshop, idcustomer]);
    }

    async getSer(shopId){
        let query_str = 'select se.image, se.idservice, se.servicename, se.price \
                        from `shop` as s join `service` as se on s.idshop = se.idshop\
                        where se.idshop = ?';
        const result = await db.connection.execute(query_str, [shopId]);
        return result[0];
    }
}

module.exports = new ShopRepository;