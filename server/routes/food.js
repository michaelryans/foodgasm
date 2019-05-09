const controller = require('../controllers/food.js')
const router = require('express').Router()
const {multer, sendUploadToGCS} = require('../middlewares/gcs')

router.post('/', multer.single('file'), sendUploadToGCS, controller.create)

module.exports = router