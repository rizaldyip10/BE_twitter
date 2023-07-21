const db = require("../models");
const tweet = db.tweet;

module.exports = {
  ngetweet: async (req, res) => {
    const {content} = req.body
    try {
      if (req.file?.size > 1024 * 1024)  throw{
        message : "file size to big asshole"
      }
      const result = await tweet.create({
        Image : req.file?.filename,
        content : content,
        userId : req.user.id
      });
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(400).send(400)
    }
  }
};
