const express = require('express');
const router = express.Router();
//const isLoggedIn = require('../utils/isLoggedIn');

router.get("/", (req,res) => {
    res.render("landing");
})

router.get("/account", isLoggedIn, (req, res) => {
    res.render("account");
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated() /* === false */) {   // TRUE OLMASI LAZIM 
		return next();
	} else {
        // else giriyor kod
        console.log("yakalandın");
		res.redirect("/login");
	}	
};

module.exports = router;