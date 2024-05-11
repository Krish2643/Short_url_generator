const express = require('express');
const app = express();
const URL = require('./models/url');
const urlRoutes = require('./routes/url');
const dns = require('dns');
const mongoose = require('mongoose');
var cors = require('cors')
require('dotenv').config();

app.use(express.json());
app.set('trust proxy', true);
app.use(cors())
app.use('/', urlRoutes);

const PORT = process.env.PORT || 8000;

const connectDB = async()=>{
    await mongoose.connect(`mongodb+srv://${process.env.REACT_APP_DB_USER}:${process.env.REACT_APP_DB_PASSWORD}@cluster0.bguybj1.mongodb.net/ShortUrlDB`)

    console.log(`the db is connected with ${mongoose.connection.host}`);
}

connectDB();


function findIPAddress(link) {
    return new Promise((resolve, reject) => {
      dns.lookup(link, (err, address) => {
        if (err) {
          reject(err);
        } else {
          resolve(address);
        }
      });
    });
  }

  app.get('/check', (req, res)=>{
     res.send("backend is live and working fine");
  })

app.get('/url/:shortId', async (req, res)=>{
    const shortId = req.params.shortId;
    // console.log("this is org url from backend", shortId);
    findIPAddress(shortId).then(ipAddress => {
        console.log(`IPv6 address of ${shortId}: ${ipAddress}`);
         res.status(200).json({shortId, ipAddress});
      })
      .catch(error => {
        console.error('Error finding IP address:', error);
        res.status(400).json({ipAddress: "can not get ip address"});
      });
})





// app.get('/:shortId', async (req, res)=>{
//     const {shortId} = req.params;
//     const user = await URL.findOne({shortId})
//     if(!user) {
//         return res.status(404).json("invalid short url");
//     }
//     const orgUrl = user.redirectURL;
//     // let IPv6 = null;
//     findIPAddress(orgUrl).then(ipAddress => {
//         console.log(`IPv6 address of ${orgUrl}: ${ipAddress}`);
//          res.status(200).json({orgUrl, ipAddress});
//       })
//       .catch(error => {
//         console.error('Error finding IP address:', error);
//         res.status(400).json("can not get ip address");
//       });
// })


app.listen(PORT, ()=>{
    console.log("Server is running at", PORT);
})