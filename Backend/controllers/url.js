const URL = require('../models/url');
const uuidv4 = require("uuid")
const ShortUniqueId = require('short-unique-id');
const {randomUUID} = new ShortUniqueId();

const handleGenerateNewShortURL = async(req, res)=>{
    const {url} = req.body;
    if(!url){
        return res.status(400).json("URL is reqiure");
    }
    
    const shortID = randomUUID();
    const user = await URL.create({
        shortId: shortID,
        redirectURL: url,
    });

    return res.json({id: shortID});
}




module.exports = {
    handleGenerateNewShortURL,
}