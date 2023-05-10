const express = require('express') 
const router =  express.Router() 
const authMiddleware = require("../middlewares/authMiddleware");
const { getDoctorInfoController } = require('../controllers/doctorCtrl');


//Get Single Doc Info 

router.post('/getDoctorInfo' , authMiddleware , getDoctorInfoController) ; 
module.exports = router;
