const controller = require('../controllers/food.js')
const router = require('express').Router()
const {multer, sendUploadToGCS} = require('../middlewares/gcs')
const googleVision = require('../middlewares/googleVison')

router.post('/', multer.single('file'), sendUploadToGCS, googleVision, controller.create)
router.post('/like', controller.updateLike)

module.exports = router