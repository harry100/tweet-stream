const express = require('express'),
  router = express.Router();

const { getTwitterTweets } = require('../services/twitter.service');

router.get('/', async(req, res, next) => {
    let hashTag = req.query;

    try{
        const tweetInformation = await getTwitterTweets(hashTag);
        res.send({
            data: { tweetInformation },
            success: true
        });
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;
