const adminService = require('./AdminService');
const fs = require('fs');
const path = require('path');
const uploadPath = path.join(__dirname, '../../public');


class AdminController {
    //[GET] /
    dashboard(req,res) {
        console.log(req.user);
        if(!req.user || req.user.role != 2)
        {
            res.redirect('/');
            return;
        }
        const shopInfor = req.user;
        res.render('admin/dashboard', {layout: 'admin-layout', shopInfor});
    }
    //[GET] /admin/revenue
    // revenue(req, res) {
    //     res.render('admin/revenue', {layout: 'admin-layout'});
    // }
    async shopInfo(req, res) {
        if(!req.user)
        {
            res.redirect('auth/login');
            return;
        }
        let shopId = req.user.id;
        const receivedRes = await adminService.getShopInfor(shopId);

        if(fs.existsSync(uploadPath + receivedRes.shopimage) == false)
        {
            receivedRes.shopimage = null;
        }
        if(fs.existsSync(uploadPath + receivedRes.momoqr) == false)
        {
            receivedRes.momoqr = null;
        }
        console.log(receivedRes);
        res.render('admin/shop-infor', {layout: 'admin-layout', receivedRes});
    }
    //[GET] /admin/list
    history(req, res) {
        res.render('admin/order-history', {layout: 'admin-layout'});
    }
    chat(req,res) {
        res.render('admin/chat', {layout: 'admin-layout'});
    }
    feedback(req,res) {
        res.render('admin/feedback', {layout: 'admin-layout'});
    }
    location(req,res) {
        res.render('admin/google-map', {layout: 'admin-layout'});
    }
    signin(req,res) {
        res.render('admin/signin', {layout: 'admin-layout'});
    }
    editprofile(req,res) {
        res.render('admin/edit-profile', {layout: 'admin-layout'});
    }
    customerList(req,res) {
        res.render('admin/customer-list', {layout: 'admin-layout'});
    }

    async showEditShopInfor(req, res, next)
    {
        if(!req.user)
        {
            next();
        }
        // const shopId =10;
        const shopId = req.user.id;
        const shopInfor = await adminService.getShopInfor(shopId);

        if(fs.existsSync(uploadPath + shopInfor.shopimage) == false)
        {
            shopInfor.shopimage = null;
        }
        if(fs.existsSync(uploadPath + shopInfor.momoqr) == false)
        {
            shopInfor.momoqr = null;
        }
        console.log(shopInfor);
        res.render('admin/edit-shop-infor', {layout: 'admin-layout', shopInfor});
    }

    async editShopInfor(req, res)
    {
        const updateName = req.body.updatename;
        const updateDes = req.body.updatedescription;
        const upadateBank = req.body.updatebank;
        const check = await adminService.updateShopInfor(req.user.id, updateName, updateDes, upadateBank);
        if(check === true)
        {
            res.redirect('shop-info');
        }
        else
        { 
            res.redirect('edit-shop-infor');
        }
    }
}
module.exports = new AdminController;
// module.exports = uploadPicture;