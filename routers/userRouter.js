const { verifyToken } = require('../auth/auth')
const { userController } = require('../controllers')
const allTweet = require('../controllers/allTweet')
const ngelike = require('../controllers/ngelike')
const { likeTweet } = require('../controllers/ngelike')
const ngetweet = require('../controllers/ngetweet')
const { multerUpload } = require('../middleware/multer')

const router = require('express').Router()

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/write',verifyToken,multerUpload('./public', 'pict').single('file'),ngetweet.ngetweet)
router.get('/getAll', allTweet.getAll)
router.patch('/verify',verifyToken, userController.verify)
router.post('/keepLogin', verifyToken, userController.keepLogin)
router.get('/getAllUser', userController.getAllUser)
router.post('/like', verifyToken, ngelike.likeTweet)

module.exports = router