const { Router } = require('express');
const tripController = require('../controllers/trip')
const auth = require('../utils/auth')
const router = Router();

router.get('/', auth(false), tripController.get.trips)
router.get('/offer', auth(), tripController.get.offer)
router.post('/offer', auth(), tripController.post.offer)
router.get('/details/:id', auth(), tripController.get.details)
router.get('/delete/:id', auth(), tripController.get.delete)
router.get('/join/:id', auth(), tripController.get.join)
router.all('*', auth(false), tripController.get.notFound)


module.exports = router;