const db = require('../models')
const user = db.user
const tweet = db.tweet
const like = db.likeTweet

module.exports = {
    getAll : async (req, res) => {
        const result = await tweet.findAll({
            include : [{
                model : user
            },{
                model : like
            }]
        })
        res.status(200).send(result)
    }
}