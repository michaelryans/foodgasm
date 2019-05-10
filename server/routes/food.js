const controller = require('../controllers/food.js')
const router = require('express').Router()
const {multer, sendUploadToGCS} = require('../middlewares/gcs')
const googleVision = require('../middlewares/googleVison')

router.post('/', multer.single('file'), sendUploadToGCS, googleVision, controller.create)
router.patch('/like/:id', controller.updateLike)
router.get('/', controller.getAll)
router.patch('/:id', controller.updateOne)

module.exports = router