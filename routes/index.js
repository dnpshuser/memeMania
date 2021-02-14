const express = require('express');
const router = express.Router();
const Meme = require('../models/meme');

router.get('/',async (req,res) => {
    const getMemes = await Meme.find();
    getMemes.reverse();
    let len = getMemes.length;
    let sub = 0;
    if(len>100)
        sub = len-100;
    getMemes.length -= sub;
    
    res.render("index", {memes : getMemes});
})



module.exports = router;