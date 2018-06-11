import express from 'express';
const router = express.Router()

import lightRoutes from './light_routes'


router.use(function (req, res, next) {
  // console.log('Time:', Date.now())
  next()
})
router.get('/', (req, res) => {
  console.log('hiii');
  res.send('hi back');
});

router.use('/light', lightRoutes);

module.exports = router;
