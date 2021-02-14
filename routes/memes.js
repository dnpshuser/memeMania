const express = require('express');
const router = express.Router();
const Meme = require('../models/meme');



// end point /memes GET
router.get('/', async (req,res) => { 

    let memeList = await Meme.find();
    memeList.reverse();
    let len = memeList.length;
    let sub = 0;
    if(len>100)
        sub = len-100;
    memeList.length -= sub;

    var List = []
    for(var i=0;i<memeList.length;i++)
    {
        List[i]={}
        List[i].id=memeList[i].id;
        List[i].name=memeList[i].name;
        List[i].url=memeList[i].url;
        List[i].caption=memeList[i].caption;
    }
    try {
    
        res.setHeader('Content-Type', 'application/json');
        res.json(List)

    } catch(err) {
        console.log('error occured while sending the JSON data');
        res.redirect('/');
    }
})




// endpoint /memes POST
router.post('/', async (req,res) => {

    var {name,caption,url} = req.body;

    const memeData = new Meme({
        name:name,
        caption:caption,
        url : url
    })

    const result = await memeData.save();
    console.log("Data Saved in DB through API")
    res.setHeader('Content-Type', 'application/json');
    res.json({id:result.id})
})


// endpoint /memes/id GET
router.get('/:id', (req,res) => {
    var id=req.params.id;
    Meme.find({"_id": id}).then((data)=>{
        var fetchedData = {}
        fetchedData.id = data[0].id;
        fetchedData.name = data[0].name;
        fetchedData.url = data[0].url;
        fetchedData.caption = data[0].caption;

        res.setHeader('Content-Type', 'application/json');
        res.json(fetchedData)
        console.log(`sending the data`);
        console.log(fetchedData);
    }).catch((err) =>{
        res.sendStatus(404);
    })
})


module.exports = router;