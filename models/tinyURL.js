const mongoose = require("mongoose");
 
const shortId = require("shortid");

const tinyURL = new mongoose.Schema({
    fullURL :{
        type : String,
        required: true
    },
    shortURL: {
        type : String,
        required: true,
        default: shortId.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model("tinyURL",tinyURL);