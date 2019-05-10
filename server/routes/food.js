const controller = require('../controllers/food.js')
const router = require('express').Router()
const {multer, sendUploadToGCS} = require('../middlewares/gcs')
const googleVision = require('../middlewares/googleVison')
const {authenticate, authorize} = require('../middlewares/auth')

router.use(authenticate)
router.post('/', multer.single('file'), sendUploadToGCS, googleVision, controller.create)
router.patch('/like/:id', controller.updateLike)
router.get('/', controller.getAll)
router.patch('/:id', controller.updateOne)
router.delete('/:id', controller.deleteOne)

module.exports = router