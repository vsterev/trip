const { Router } = require('express')
const tripController = require('../controllers/trip')
const auth = require('../utils/auth')
const router = Router()

router.get('/', auth(false), tripController.get.home)
router.get('/home', auth(false), tripController.get.home)
router.all('/home/*', auth(false), tripController.get.notFound)
// router.all('*', auth(false), tripController.get.notFound)

module.exports = router