const express = require("express")
const router = express.Router()
const userModel = require("../models/user.js");
const requestModel = require("../models/request.js")
const batchModel = require("../models/batch.model.js")
const trainerModel = require("../models/trainer.model.js")
const trainingModel = require("../models/subject.model.js")
const classModel = require("../models/class.model.js")



const { userlogin, usersignup, adminsignup, adminlogin } = require("../controller/auth")

const { auth, isStudent, isAdmin } = require("../middleware/auth")


// router.post("/login", login)
router.post("/signup", usersignup)
router.post("/userlogin", userlogin)
router.post("/adminsignup", adminsignup)
router.post("/adminlogin", adminlogin)

//protected route

router.get("/test", auth, (req, res) => {
    res.status(200).json({
        success: true,
        message: "the user is authentic"
    })
})

router.get("/student", auth, (req, res) => {
    res.status(200).json({
        success: true,
        message: "welcome to the protected route for the student"
    })
})

router.get("/admin", auth, (req, res) => {
    res.status(200).json({
        success: true,
        message: "welcome to the protected route for the Admin"
    })
})

router.get("/Hii", auth, (req, res) => {
    // res.send("hii");
    res.status(200).json({
        success: true,
        message: "welcome to the protected route for the Admin"
    })
})

router.post("/check", auth, (req, res) => {
    let currentUser = req.user;
    res.send(currentUser);
})

// router.post("/student/request/regularpass", auth, async(req, res) => {
//     const {email, passPurpose, passDate, passType } = req.body;

//     // console.log(passType);
//     if(!(email === req.user.email)){
//         res.status(401).json({message : "Invalid email Id"});
//     }

//     const currentUser = await userModel.findOne({email: email});

//     // console.log(currentUser);
    
//     try{
//         const request = await requestModel.create({
//             date: passDate,
//             purpose: passPurpose,
//             pass_type: passType,
//             user : currentUser._id
//         })
//         currentUser.requests.push(request._id);
//         await currentUser.save();
//     }catch(err){
//         console.log(err, "request saving error");
//     }
    
    
// })

// router.get("/student/userhistory",auth, async (req, res) => {

//     // const requestHistory = await requestModel.find(req.user._id.equals(user));
//     // console.log(req.user);
//     const currentUser = await userModel.findOne({
//         _id : req.user.id
//       })
//       .populate('requests');

//     // console.log(currentUser);
//     res.send(currentUser);
// });

// router.get("/admin/requests",auth, async (req, res) => {

//     const requests = await requestModel.find({status : "Pending"})
//     .populate('user');
    
//     res.send(requests);
// });

// router.post("/admin/handle_accept", async(req, res) => {
//     const { id } = req.body;

//     const currentRequest = await requestModel.findOne({
//         _id : id
//       })

//     currentRequest.status = "Approved";
//     await currentRequest.save();

//     const requests = await requestModel.find({status : "Pending"})
//     .populate('user');
    
//     res.send(requests);

//     // console.log(currentRequest);
// })


// router.post("/admin/handle_refuse", async(req, res) => {
//     const { id } = req.body;

//     const currentRequest = await requestModel.findOne({
//         _id : id
//       })

//     currentRequest.status = "Reject";
//     await currentRequest.save();

//     const requests = await requestModel.find({status : "Pending"})
//     .populate('user');
    
//     res.send(requests);

//     // console.log(currentRequest);
// })


// router.get("/admin/accepted",auth, async (req, res) => {

//     const requests = await requestModel.find({status : "Approved"})
//     .populate('user');
    
//     res.send(requests);
// });

// router.get("/admin/rejected",auth, async (req, res) => {

//     const requests = await requestModel.find({status : "Reject"})
//     .populate('user');
    
//     res.send(requests);
// });


router.post("/addbatch", async(req, res) => {
    
    const { batchName, semester } = req.body;
    // console.log(batchName);

    const batch = await batchModel.create({
        batch_name : batchName,
        semester
    })
})

router.get("/batches", async(req, res) => {
    const batchList = await batchModel.find();
    res.send(batchList); 
})

router.post("/update_status", async(req, res) => {
    const { id } = req.body;
    // console.log(id);

    const batch = await batchModel.findOne({
        _id : id
    })

    batch.status = batch.status ? false : true ;
    await batch.save();

    const batchList = await batchModel.find();
    res.send(batchList); 
})

router.post("/addtrainer", async(req, res) => {
    
    const { trainerName, mob, address } = req.body;
    // console.log(batchName);

    const trainer = await trainerModel.create({
        name : trainerName,
        mob,
        address
    })
})

router.get("/trainers", async(req, res) => {
    const trainersList = await trainerModel.find();
    res.send(trainersList); 
})

router.post("/addtraining", async(req, res) => {
    
    const { training_name, batch_id, trainer_id } = req.body;
    // console.log(req.body);

    const training = await trainingModel.create({
        subject_name : training_name,
        batch : batch_id,
        trainer : trainer_id
    })

    const currentTrainer = await trainerModel.findOne({_id : trainer_id});

    currentTrainer.subject.push(training._id);
    await currentTrainer.save();

    const currentBatch = await batchModel.findOne({_id : batch_id});

    currentBatch.trainings.push(training._id);
    await currentBatch.save();
})

router.get("/trainings", async(req, res) => {
    const trainingsList = await trainingModel.find()
    .populate('batch')
    .populate('trainer')


    res.send(trainingsList); 
    // console.log(trainingsList);
})

router.post("/searchtraining", async(req, res) => {

    const { uid } = req.body;

    const training = await trainingModel.findOne({ _id : uid })
    .populate('batch')
    .populate('trainer')


    res.send(training); 
    // console.log(training);
})

router.post("/saveclass", async(req, res) => {

    const { trainer_id , topic, feedback, trainer_entry_hour, trainer_entry_minute, trainer_entry_shift, trainer_exit_hour, trainer_exit_minute, trainer_exit_shift, training_id } = req.body;

    console.log(req.body);
    const classData = await classModel.create({
        trainer_entry_hour,
        trainer_entry_minute,
        trainer_entry_shift,
        trainer_exit_hour,
        trainer_exit_minute,
        trainer_exit_shift,
        trainer : trainer_id,
        subject : training_id,
        class_topic : topic,
        feedback
    });

    const trainer = await trainerModel.findOne({ _id : trainer_id });
    const training = await trainingModel.findOne({ _id : training_id });
    
   
    console.log(training);
    training.syllabus.push(topic);
    training.classes.push(classData._id);
    await training.save();


    res.send("class saved");
})


router.post("/gettraining", async(req, res) => {

    const { uid } = req.body;

    const training = await trainingModel.findOne({ _id : uid})
    .populate('classes')

    res.send(training);
})

module.exports = router