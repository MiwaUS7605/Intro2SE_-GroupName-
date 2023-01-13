const express = require('express');
const router = express.Router();

const adminController = require('../components/admin/AdminController');
const customerListController=require('../components/customerList/CustomerListController');
const serviceListController = require('../components/serviceList/ServiceListController');
const orderListController = require('../components/orderList/OrderListController');


const multer = require('multer');
const path = require('path');

const storageSettingShopInfor = multer.diskStorage( //multer disk storage setting
{
    destination: function(req, file, cb)
    {
        cb(null, path.join(__dirname, '../public/image/upload/'));
    },
    filename: function(req, file, cb)
    {
        // const datetimestamp = Date.now();
        if(file.fieldname === 'shop-img')
        {
            cb(null, req.user.id.toString(10) + '_shopImg' + '.' + file.originalname.split('.')[file.originalname.split('.').length-1]);
        }
        else if(file.fieldname === 'momo-qr')
        {
            cb(null, req.user.id.toString(10) + '_momoQr' + '.' + file.originalname.split('.')[file.originalname.split('.').length-1]);
        }
    }
}
);

const storageSettingEditService = multer.diskStorage({
    destination: function(req, file, cb)
    {
        cb(null, path.join(__dirname, '../public/image/cleanings/upload/'));
    },
    filename: function(req, file, cb)
    {
        //file.originalname.split('.')[file.originalname.split('.').length - 1] of 'test.png' === '.png'
        cb(null, req.user.id.toString(10) + "_s" + req.query.idservice + '_serviceImg' + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});


// multer setting for pictures/avatars upload
//reference: https://stackoverflow.com/questions/38652848/filter-files-on-the-basis-of-extension-using-multer-in-express-js
//note: user can upload file.jpg, file.png, file.svg, file.jpeg for pictures
const uploadPictureShopInfor = multer({
    storage: storageSettingShopInfor,
    fileFilter: function(req, file, callback)
    {
        const fileExtension = path.extname(file.originalname);
        if((fileExtension !== '.png' ) && (fileExtension !== '.svg') && (fileExtension !== '.jpg') && (fileExtension !== '.jpeg'))
        {
            return callback(new Error('Only images allowed'));
        }
        callback(null, true); 
    },
    limits: {
        fileSize: 1024 * 1024
    }
}).fields(
    [
        {
            name: 'shop-img',
            maxCount: 1
        },
        {
            name: 'momo-qr',
            maxCount: 1
        }
    ]
);


const uploadPictureService = multer({
    storage: storageSettingEditService,
    fileFilter: function(req, file, callback)
    {
        const fileExtension = path.extname(file.originalname);
        if((fileExtension !== '.png' ) && (fileExtension !== '.svg') && (fileExtension !== '.jpg') && (fileExtension !== '.jpeg'))
        {
            return callback(new Error('Only images allowed'));
        }
        callback(null, true); 
    },
    limits: {
        fileSize: 1024 * 1024
    }
}).single('imageLink');


router.get('/', adminController.dashboard);
router.get('/dashboard', adminController.dashboard);
// router.get('/revenue', adminController.revenue);
router.get('/shop-info', adminController.shopInfo);
router.get('/edit-shop-infor', adminController.showEditShopInfor);
router.post('/edit-shop-infor', uploadPictureShopInfor, adminController.editShopInfor)
router.get('/chat', adminController.chat);
router.get('/feedback', adminController.feedback); 
router.get('/google-map', adminController.location);
router.get('/signin', adminController.signin);
router.get('/edit-profile', adminController.editprofile);
router.get('/customer-list',customerListController.list);
router.get('/service-list',serviceListController.list);
router.post('/service-list',serviceListController.list);
router.get('/service-list/create-info',serviceListController.showCreateInfoService);
router.post('/service-list/create-info',serviceListController.createService);
router.get('/service-list/create-image',serviceListController.showCreateImageService);
router.post('/service-list/create-image',serviceListController.insertImg);
router.get('/service-list/edit',serviceListController.showEditService);
router.post('/service-list/edit',uploadPictureService, serviceListController.editService);
router.post('/service-list/delete',serviceListController.deleteService);
router.post('/service-list/delete-image',serviceListController.deleteImage);
router.get('/order-history',orderListController.list);
router.post('/order-history',orderListController.updatestatus);


module.exports = router;