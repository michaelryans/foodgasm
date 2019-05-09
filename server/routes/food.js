const controller = require('../controllers/food.js')
const router = require('express').Router()

router.post('/', controller.create)

module.exports = router