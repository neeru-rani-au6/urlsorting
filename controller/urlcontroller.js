const ShortUrl = require('../models/url');

//for shorting
const geturl = async(req,res) => {
    try {
        const shortUrls = await ShortUrl.find()
        res.json(shortUrls);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
      
  }

  const fullurl =  async(req,res) => {
      try {
          const data = await ShortUrl.create({full:req.body.fullUrl})
          res.json(data);
      } catch (error) {
          console.log(error);
          res.status(400).json(error);
      }
  }
  
  const shorturl = async (req,res) => {
      console.log(req.params.shortUrl);
    const shortUrl = await ShortUrl.findOne({ short : req.params.shortUrl})
    if  (shortUrl == null) return res.sendStatus(404)
  
    shortUrl.click++
    shortUrl.save();
  
    res.redirect(shortUrl.full)
  } 

  module.exports = {
    geturl,
    fullurl,
    shorturl

}
