const express = require('express'),
  router = express.Router();

const { getTwitterTweets } = require('../services/twitter.service');

router.get('/', async(req, res, next) => {
    let { query } = req;
    if (query.hashTag !== 'undefined'){
        try{
            tweetInformation = await getTwitterTweets(query);
            res.send({
                data: { tweetInformation },
                success: true
            });
        } catch (err) {
            console.log(err)
        }
    } else {
        res.send({
            data: { statuses: [] }
        })
    }
})

module.exports = router;
