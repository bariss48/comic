const express = require('express');
const router = express.Router({mergeParams: true});
const Comment = require('../models/comment');
const Comic = require('../models/comic');

router.get("/new",(req,res) => {
    res.render("comments_new",{comicId: req.params.id})
 })

router.post("/", async (req,res) =>  {
      try {
      const comment = await Comment.create({
		    user: req.body.user,
		    text: req.body.text,
            comicId: req.body.comicId
      });
      console.log(comment);
      res.redirect(`/comics/${req.body.comicId}`)     
      }catch (err) {
            console.log(err);
            res.send("hata");      
      }
})

//Edit Comment - SHow the edit form
router.get("/:commentId/edit", async (req, res) => {
	try {
		    const comic = await Comic.findById(req.params.id).exec();
            const comment = await Comment.findById(req.params.commentId).exec();
            console.log("comic:",comic);
            console.log("comment:",comment);
		    res.render("comments_edit", {comic, comment});
	} catch (err) {
		console.log(err);
		res.send("broke comment edit get");
	}
})

// Update Comment - Actually update in DB
router.put("/:commentId", async (req, res) => {
	try {
		const comment = await Comment.findByIdAndUpdate(req.params.commentId, {text: req.body.text}, {new: true})
		console.log(comment);
		res.redirect(`/comics/${req.params.id}`);
	} catch (err) {
		console.log(err);
		res.send("hata hata");
	}
})

router.delete("/:commentId", async (req, res) => {
	try{
            const comment = await Comment.findByIdAndDelete(req.params.commentId);
            console.log(comment);
            res.redirect(`/comics/${req.params.id}`);
	} catch (err) {
		console.log(err);
		res.send("hata hata");
	}
})

module.exports = router;