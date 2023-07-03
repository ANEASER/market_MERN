const router = require("express").Router();

const marketControllers = require('../controller/marketcontroller')
const multer = require('multer'); // npm install multer -- this handle file  uplaods
const uploadgig = multer({dest: 'uploads/Gigs'});

router.post("/postgig",uploadgig.single('file'),marketControllers.postGig);


module.exports = router;