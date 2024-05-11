const express = require('express');
const {handleGenerateNewShortURL}  = require('../controllers/url')


const router = express.Router();
router.get('/eg', (req, res)=>{
    res.send("this is url/route");
})

router.post("/", handleGenerateNewShortURL);

module.exports = router;