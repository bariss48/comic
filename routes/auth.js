const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

router.get('/signup', (req,res) => {
     res.render('signup');
});

router.post('/signup', async (req,res) => {
   try{
      const newUser = await User.register(new User({
         username: req.body.username,
         email: req.body.email
      }), req.body.password);
      console.log(newUser);
      passport.authenticate('local')(req, res, () => {
          res.redirect('/comics');
      });
   }catch(err){
       console.log(err);
       res.send(err);
   }
});

//login-page
router.get("/login", (req,res) => {
    res.render('login');
});
//login
router.post("/login", passport.authenticate('local', {
    successRedirect: '/comics',
    failureRedirect: '/login',
    failureFlash: true,
	successFlash: "Logged in successFully"
})); 

//logout
router.get("/logout",(req,res) => {
    req.logOut();
    req.flash("success", "Logged you out!");
    res.redirect('/comics');
});

module.exports = router;