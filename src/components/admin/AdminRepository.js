const db = require('../../db');


exports.getShopInfor = async(_shopInfor) =>
{
    const query_string = 'SELECT shop.idshop, shop.shopimage, shop.shopname, shop.shopdescription, shop.momoqr, shop.bankaccount, account.idaccount, account.name FROM shop JOIN account ON (shop.idshop = ? AND shop.idshop = account.idaccount)';
    const res = await db.connection.execute(query_string, [_shopInfor]);
    return res[0];
}