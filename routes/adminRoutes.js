const express = require('express') 
const authMiddleware = require("../middlewares/authMiddleware");
const { getAllUsersController, getAllDoctorsController } = require('../controllers/adminCtrl');
const router = express.Router()

//Get Mehod || users 
router.get('/getAllUsers' , authMiddleware , getAllUsersController); 

//Get Mehod || users 
router.get('/getAllDoctors' , authMiddleware , getAllDoctorsController);  

module.exports = router 