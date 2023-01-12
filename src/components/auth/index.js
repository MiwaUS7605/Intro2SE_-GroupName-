const express = require('express');
const router = express.Router();
const passport= require('./passport');

const authController=require('./AuthController');

router.get('/register', authController.showRegistrationForm);
router.post('/register', authController.register);

router.get('/login', authController.showLoginForm);
router.post('/login', passport.authenticate('local', {
  // successRedirect: '/',
  failureRedirect: '/users/auth/login',
}),
function(req, res)
  {
    console.log("req.user");
    console.log(req.user);
    if(!req.user)
    {
      res.redirect('/');
      return;
    } 
    else if(req.user.role == 1)
    {
      res.redirect('/users/home');
    }
    else if(req.user.role == 2)
    { 
      res.redirect('/admin/dashboard');
    }
    else if(req.user.role == 3)
    {
      res.redirect('/deliverer/available-order');
    }
  });
router.get('/logout', authController.logout);

router.get('/edit', authController.showEditForm);
router.post('/edit', authController.editProfile);

module.exports = router;
