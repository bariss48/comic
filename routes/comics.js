const express = require('express');
const router = express.Router({mergeParams: true});
const Comic = require('../models/comic');
const Comment = require('../models/comment');

router.get("/", async (req,res) => {
    try{
        console.log(req.user);
        const comics = await Comic.find().exec();
        res.render("comics",{comics});
    }catch(err){
        console.log(err);
        res.send("hata hata");
    }
})
router.post("/", async (req,res) => {
      const genre = req.body.genre.toLowerCase();
      const newComic = {
          title: req.body.title,
          description: req.body.description,
          author:req.body.author,
          publisher:req.body.publisher,
          date:req.body.date,
          series:req.body.series,
          issue:req.body.issue,
          genre,
          color: !!req.body.color,
          image_link: req.body.image_link
      }
      try {
        const comic = await Comic.create(newComic);
        res.redirect("/comics/"+ comic._id);
      } catch (err) {
          console.log(err);
          res.send("hata!");
      }
})

router.get("/new",(req,res) => {
    res.render("comics_new");
})

//search
router.get("/search", async (req,res) => {
      try{
          const comics = await Comic.find({
              $text: {
                  $search: req.query.term
              }
          });
          res.render("comics", {comics});
      }catch(err){
          console.log(err);
        res.send("hata");
      }
})

router.get("/:id", async (req,res) => {
    try {
       const comic = await Comic.findById(req.params.id).exec();
       const comments = await Comment.find({comicId: req.params.id});
       res.render("comics_show",{comic,comments})
    } catch (err) {
        console.log(err);
        res.send("hata!");
    }
    })

router.get("/:id/edit", async (req,res) => {
        try {
            const comic = await Comic.findById(req.params.id).exec();
            res.render("comics_edit",{comic});
        } catch (err) {
            console.log(err);
            res.send("hata");
        }
    })

router.post("/:id/edit", async (req,res) => {
        try {
            const comic = await Comic.findById(req.params.id).exec();
            res.render("comics_edit",{comic});
        } catch (err) {
            console.log(err);
            res.send("hata");
        }
    })
    
router.post('/:id', async (req, res) => {
      const genre = req.body.genre.toLowerCase();
      const comicBody = {
          title: req.body.title,
          description: req.body.description,
          author:req.body.author,
          publisher:req.body.publisher,
          date:req.body.date,
          series:req.body.series,
          issue:req.body.issue,
          genre,
          color: !!req.body.color,
          image_link: req.body.image_link
      }
      try {
        const comic = await Comic.findByIdAndUpdate(req.params.id, comicBody, {new: true}).exec();
        res.redirect(`/comics/${req.params.id}`);
      } catch (err) {
          console.log(err);
          res.send("hata hata");
      }
})

router.delete("/:id",async (req, res) => {
    try {
        const deletedComic = await Comic.findByIdAndDelete(req.params.id).exec();
         console.log("Deleted:", deletedComic);
         res.redirect("/comics");   
    } catch (err) {
        console.log(err);
        res.send("hata hata");
    }
})

module.exports = router;