const { text } = require("body-parser");
const mongoose = require("mongoose");

const comicSchema = new mongoose.Schema({
     title:String,
     description: String,
     author: String,
     publisher:String,
     date: Date,
     series: String,
     issue:Number,
     genre: String,
     color: Boolean,
     image_link: String,
});
comicSchema.index({
     '$**': 'text'
});

module.exports = mongoose.model("comic",comicSchema);