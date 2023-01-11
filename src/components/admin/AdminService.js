const adminRepository = require('./AdminRepository');

exports.getShopInfor = async(_shopId) =>
{
    const res = await adminRepository.getShopInfor(_shopId);
    //return
    // {
    //     idshop: 10,
    //     shopimage: null,
    //     shopname: 'SUNFLOWER',
    //     shopdescription: 'No information',
    //     momoqr: null,
    //     bankaccount: null
    //   }
    console.log(res[0]);
    return res[0]; 
}