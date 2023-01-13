const adminRepository = require('./AdminRepository');
const fs = require('fs');
const path = require('path');

const validExtension_ofPictures = 
{
    _png: '.png',
    _jpg: '.jpg',
    _jpeg: '.jpeg',
    _svg: '.svg'
}

const uploadPath = path.join(__dirname, '../../public/image/upload/');
// const uploadPath = '../../public/image/upload/';


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

exports.updateShopInfor = async(shopId, shopName, shopDes, shopBank) =>
{
    let shopImg_path = null;
    let shopMomo_path = null;
    if(fs.existsSync(uploadPath+shopId+'_shopImg'+validExtension_ofPictures._jpeg) === true)
    {
        shopImg_path = uploadPath+shopId+'_shopImg'+validExtension_ofPictures._jpeg;
    }
    else if(fs.existsSync(uploadPath+shopId+'_shopImg'+validExtension_ofPictures._jpg) === true)
    {
        shopImg_path = uploadPath+shopId+'_shopImg'+validExtension_ofPictures._jpg;
    }
    else if(fs.existsSync(uploadPath+shopId+'_shopImg'+validExtension_ofPictures._png) === true)
    {
        shopImg_path = uploadPath+shopId+'_shopImg'+validExtension_ofPictures._png;
    }
    else if(fs.existsSync(uploadPath+shopId+'_shopImg'+validExtension_ofPictures._svg) === true)
    {
        shopImg_path = uploadPath+shopId+'_shopImg'+validExtension_ofPictures._svg;
    }

    if(fs.existsSync(uploadPath+shopId+'_momoQr'+validExtension_ofPictures._jpeg) === true)
    {
        shopMomo_path = uploadPath+shopId+'_momoQr'+validExtension_ofPictures._jpeg;
    }
    else if(fs.existsSync(uploadPath+shopId+'_momoQr'+validExtension_ofPictures._jpg) === true)
    {
        shopMomo_path = uploadPath+shopId+'_momoQr'+validExtension_ofPictures._jpg;
    }
    else if(fs.existsSync(uploadPath+shopId+'_momoQr'+validExtension_ofPictures._png) === true)
    {
        shopMomo_path = uploadPath+shopId+'_momoQr'+validExtension_ofPictures._png;
    }
    else if(fs.existsSync(uploadPath+shopId+'_momoQr'+validExtension_ofPictures._svg) === true)
    {
        shopMomo_path = uploadPath+shopId+'_momoQr'+validExtension_ofPictures._svg;
    }

    //fit the absolute path -> (public) /image/...
    if(shopImg_path != null)
    {
        let start = shopImg_path.indexOf('public');
        start = shopImg_path.indexOf('\\', start);
        shopImg_path = shopImg_path.substring(start);

        while(shopImg_path.includes('\\'))
        {
            shopImg_path = shopImg_path.replace('\\','/');
        }
    }

    if(shopMomo_path != null)
    {
        let start = shopMomo_path.indexOf('public');
        start = shopMomo_path.indexOf('\\', start);
        shopMomo_path = shopMomo_path.substring(start);

        while(shopMomo_path.includes('\\'))
        {
            shopMomo_path = shopMomo_path.replace('\\','/');
        }
    }

    if(!shopBank)
    {
        shopBank = "";
    }
    if(!shopDes)
    {
        shopDes = "No description";
    }
    if(!shopName)
    {
        shopName = "Shop name";
    }
    console.log(shopImg_path);
    console.log(shopMomo_path);
    const check = await adminRepository.updateShopInfor(shopId, shopImg_path, shopName, shopDes, shopMomo_path, shopBank);
    return check;
}