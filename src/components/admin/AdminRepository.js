const db = require('../../db');


exports.getShopInfor = async(_shopInfor) =>
{
    const query_string = 'SELECT shop.idshop, shop.shopimage, shop.shopname, shop.shopdescription, shop.momoqr, shop.bankaccount, account.idaccount, account.name FROM shop JOIN account ON (shop.idshop = ? AND shop.idshop = account.idaccount)';
    const res = await db.connection.execute(query_string, [_shopInfor]);
    return res[0];
}

exports.updateShopInfor = async(shopId, shopImgLink, shopName, shopDes, shopMomo, shopBank) =>
{
    try
    {
        const query_string = 'UPDATE shop SET shop.shopimage = ?, shop.shopname = ?, shop.shopdescription = ?, shop.momoqr = ?, shop.bankaccount = ? WHERE shop.idshop = ?';
        await db.connection.execute(query_string, [shopImgLink, shopName, shopDes, shopMomo, shopBank, shopId]);
        return true;
    }
    catch(e)
    {
        console.log(e);
        return false;
    }
}