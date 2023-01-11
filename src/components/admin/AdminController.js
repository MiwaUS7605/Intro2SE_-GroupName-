const adminService = require('./AdminService');

class AdminController {
    //[GET] /
    dashboard(req,res) {
        res.render('admin/dashboard', {layout: 'admin-layout'});
    }
    //[GET] /admin/revenue
    // revenue(req, res) {
    //     res.render('admin/revenue', {layout: 'admin-layout'});
    // }
    async shopInfo(req, res) {
        // if(!req.user)
        // {
        //     res.redirect('user/auth/login');
        //     return;
        // }
        let shopId = 10;
        const receivedRes = await adminService.getShopInfor(shopId);
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
}
module.exports = new AdminController;
