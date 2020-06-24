const { Router } = require('express')
const tripController = require('../controllers/trip')
const userController = require('../controllers/user')
const auth = require('../utils/auth')
const router = Router()

router.get('/login', userController.get.login)
router.post('/login', userController.post.login)
router.get('/register', userController.get.register)
router.post('/register', userController.post.register)
router.get('/logout', auth(), userController.get.logout)
router.all('*', auth(false), tripController.get.notFound)
module.exports = router