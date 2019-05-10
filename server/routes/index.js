const router = require('express').Router()
const userRouter = require('./user')
const foodRouter = require('./food')
const oauthRouter = require('./oauth')

router.use('/foods', foodRouter)
router.use('/user', userRouter)
router.use('/oauth', oauthRouter)

module.exports = router