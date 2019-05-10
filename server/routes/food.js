const controller = require('../controllers/food.js')
const router = require('express').Router()
const {multer, sendUploadToGCS} = require('../middlewares/gcs')
const googleVision = require('../middlewares/googleVison')
const {authenticate, authorize} = require('../middlewares/auth')

router.get('/', controller.getAll)

router.use(authenticate)
router.post('/upload', multer.single('file'), sendUploadToGCS, googleVision, controller.upload)
router.post('/', controller.create)
router.patch('/like/:id', controller.updateLike)
router.patch('/:id', controller.updateOne)
router.delete('/:id', controller.deleteOne)

module.exports = router