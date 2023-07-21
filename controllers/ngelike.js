const db = require('../models')
const like = db.likeTweet

module.exports = {
    likeTweet : async (req, res) => {
        try {
            const id = req.user.id
            const {tweetId} = req.body
            const isLike = await like.findOne(
                {where : {userId : req.user.id,tweetId : req.body.tweetId}}
            )
            if (isLike === null) {
                await like.create(
                    {userId : id, tweetId:tweetId},
                )
            }
            else {
                await like.destroy(
                {
                    where : {userId : id, tweetId:tweetId}
                }
                )
            }     
            res.status(200).send({
                status : true
            })
            
        } catch (error) {
            console.log(error);
            res.status(400).send(error)
        }
    }
}