const express = require('express');
const router = express.Router();
const Meme = require('../models/meme');

router.post('/',async (req,res) => {
    const newMeme = new Meme({
        name : req.body.name,
        caption : req.body.caption,
        url : req.body.url
    });

    const result = await newMeme.save();
    console.log(result);
    res.redirect('/');

})


module.exports = router;