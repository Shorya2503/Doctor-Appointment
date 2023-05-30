const express = require('express') 
const authMiddleware = require("../middlewares/authMiddleware");
const { getAllUsersController, getAllDoctorsController, changeAccountStatusController } = require('../controllers/adminCtrl');
const router = express.Router()

//Get Mehod || users 
router.get('/getAllUsers' , authMiddleware , getAllUsersController); 

//Get Mehod || users 
router.get('/getAllDoctors' , authMiddleware , getAllDoctorsController);  

//Post account status 

router.post('/changeAccountStatus' , authMiddleware , changeAccountStatusController)
module.exports = router 