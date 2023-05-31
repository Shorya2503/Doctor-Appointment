const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointModels");
const moment = require('moment');

//register callback
const registerController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);//salt is used for making password more protected
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register Sucessfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

// login callback
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200) //200 denotes OK
        .send({ message: "user not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Invalid EMail or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};

//auth controller
const authController = async(req,res)=>{
  try {
    const user= await userModel.findById({ _id:req.body.userId}) 
    user.password = undefined ; 
    if(!user){
      return res.status(200).send({
        message:"user not found",
        success:false
      })
    }else{
      res.status(200).send({
        success:true,
        data: user
      });
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message:'auth error',
      success:false,
      error
    })
  }
};

//apply doctor ctrl
const applyDoctorController = async (req, res) => {
  console.log(req.body);
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-doctor-request",    
      message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/doctors",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "Doctor Account Applied SUccessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error WHile Applying For Doctotr",
    });
  }
};

//notificatio ctrl

const getAllNotificationController = async(req,res) =>{
  try {
     const user = await userModel.findOne({_id:req.body.userId})
     const seennotification = user.seennotification;
     const notification = user.notification;
     seennotification.push(...notification);
     user.notification = []
     user.seennotification = notification
     const updatedUser = await user.save()
     res.status(200).send({
      success:true,
      message:'all notification marked as read',
      data: updatedUser,
     });
  } catch (error) {
    console.log(error),
    res.status(500).send({
      success:false,
      message:'Error in notification',
      error,
    });
  }
};

//delete all notification
const deleteAllNotificationController = async(req,res) =>{
  try {
    const user = await userModel.findOne({_id:req.body.doctorInfo.userId})
     user.notification = []
     user.seennotification = []
     const updateUser = await user.save(); //to save the changes made above
     updateUser.password=undefined;
     res.status(200).send({
      success:true,
      message:"notifications are deleted successfully",
      data:updateUser,
     });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:false,
      message:"unable to delete all notifications",
      error
    })
  }
}; 

// GET ALL DOC 

const getAllDoctorsController = async (req , res) =>{
  try {
    const doctors = await doctorModel.find({status:'approved'}) 
    res.status(200).send({
      success:true , 
      message : "Doctors List Fetched successfully", 
      data : doctors,
    })
  } catch (error) {
    console.log(error); 
    res.status(500).send({
      success:false , 
      error, 
      message: 'Error while fetching Doctor'
    })
  }
}
const bookAppointmentController = async (req, res) => {
  try {
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    req.body.status = "pending";
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notification.push({
      type: "New-appointment-request",
      message: `A new Appointment Request from ${req.body.userInfo.name}`,
      onCLickPath: "/user/appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Book succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Booking Appointment",
    });
  }
};

const bookingAvailabilityController = async(req,res) =>{
  try {
    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const fromtime = moment(req.body.time, "HH:mm").subtract(1,"hours").toISOString();
    const totime = moment(req.body.time, "HH:mm").add(1,"hours").toISOString();

    const doctorId = req.body.doctorId;

    const appointments = await appointmentModel.find({doctorId,date,time:{
      $gte: fromtime,
      $lte: totime,
    },
  });
if(appointments.length>0){
  return res.status(200).send({
    message: "not available",
    success: true,
  });
}else{
  return res.status(200).send({
    success:true,
    message: "available",
  });
}
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      error,
      message: "error in booking"
    })
  }
};

const userAppointmentsController = async(req,res) =>{
  try {
    const appointments = await appointmentModel.find({userId:req.body.userId});
    res.status(200).send({
      success:true,
      message:'Users Appointments fetch successfully',
      data:appointments,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message:"error in fetching",
    })
  }
};

module.exports = { loginController,
   registerController, 
   authController,
   applyDoctorController,
   getAllNotificationController,
   deleteAllNotificationController ,
   getAllDoctorsController ,
  bookAppointmentController,
  bookingAvailabilityController,
  userAppointmentsController
};