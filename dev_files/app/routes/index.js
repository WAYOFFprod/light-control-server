import express from 'express';
const router = express.Router()

import lightRoutes from './light_routes'
import controllerRoutes from './controller_routes'


router.use(function (req, res, next) {
  console.log('Time:', Date.now(), 'query', req.path);
  next()
})
router.get('/', (req, res) => {
  console.log('hiii');
  res.send('hi back');
});

router.use('/light', lightRoutes);
router.use('/controller', controllerRoutes);

module.exports = router;
