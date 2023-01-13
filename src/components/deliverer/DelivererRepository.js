const db = require('../../db');

class DelivererRepository{
    async getAvailableOrder(){
        let query_str="select idorder,acc.name,acc.address,acc.phonenumber,acc.email, \
                                shopname,acs.address as shopaddress,acs.phonenumber as shopphonenumber,acs.email as shopemail, \
                                totalprice,shipfee,statusname \
                                FROM `order` as o \
                                join `account` as acc on o.idcustomer=acc.idaccount \
                                join `account` as acs on o.idshop=acs.idaccount \
                                join `shop` as s on o.idshop=s.idshop \
                                join `orderstatus` as st on o.status=st.idstatus \
                                where o.iddeliverer is null";
        
        const result= await db.connection.execute(query_str);
        return result[0];
    }

    async getHandlingOrders(iddeliverer){
        let query_str="select idorder,acc.name,acc.address,acc.phonenumber,acc.email, \
                                shopname,acs.address as shopaddress,acs.phonenumber as shopphonenumber,acs.email as shopemail, \
                                totalprice,shipfee,statusname \
                                FROM `order` as o \
                                join `account` as acc on o.idcustomer=acc.idaccount \
                                join `account` as acs on o.idshop=acs.idaccount \
                                join `shop` as s on o.idshop=s.idshop \
                                join `orderstatus` as st on o.status=st.idstatus \
                                where st.idstatus!=3 and o.iddeliverer=?";
        
        const result= await db.connection.execute(query_str,[iddeliverer]);
        return result[0];
    }

    async getCompletedOrders(iddeliverer){
        let query_str="select idorder,acc.name,acc.address,acc.phonenumber,acc.email, \
                                shopname,acs.address as shopaddress,acs.phonenumber as shopphonenumber,acs.email as shopemail, \
                                totalprice,shipfee,statusname \
                                FROM `order` as o \
                                join `account` as acc on o.idcustomer=acc.idaccount \
                                join `account` as acs on o.idshop=acs.idaccount \
                                join `shop` as s on o.idshop=s.idshop \
                                join `orderstatus` as st on o.status=st.idstatus \
                                where st.statusname='Completed' and o.iddeliverer=?";
        
        const result= await db.connection.execute(query_str,[iddeliverer]);
        return result[0];
    }

    async acceptOrder(idorder,iddeliverer){
        let query_str="update `order` set iddeliverer=? where idorder=?";
        await db.connection.execute(query_str,[iddeliverer,idorder]);
    }

    async cancelOrder(idorder){
        let query_str="update `order` set iddeliverer=NULL where idorder=?";
        await db.connection.execute(query_str,[idorder]);
    }

    async processOrder(idorder){
        let query_str="update `order` set status=1 where idorder=?";
        await db.connection.execute(query_str,[idorder]);
    }

    async completeOrder(idorder){
        let query_str="update `order` set status=3 where idorder=?";
        await db.connection.execute(query_str,[idorder]);
    }
    
    async checkDelivererExist(idorder){
        let query_str="select * from `order` where idorder=? and iddeliverer is not null";
        const result= await db.connection.execute(query_str,[idorder]);
        return result[0].length > 0;
    }
}

module.exports = new DelivererRepository();

