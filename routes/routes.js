var express = require('express')
const {getDashboard,signup,signin,verifyOtp,forgotPassword, googlesign, ForgotverifyOtp, editProfile ,getUserDetails} = require('../controllers/authController');
const { getCompanyDetails, getAllCompanies ,getAllTaskOfUser,startTask} = require('../controllers/companyControllers');
const { getFeaturedJobs, getAllJobs, getJobsByCompany, applyJob, getUserAppliedJobs , getJobById ,getCategories } = require('../controllers/jobControllers');
const {validateSignUp, validateSignIn, validatePhone, validateNewPassword} = require('../middlewares/AuthMiddleware');
const { validateApplyJob } = require('../middlewares/JobMiddleware');
const { createResume , getResume , taskCompleted , doSearch , getUserAppliedJobStatus} = require('../controllers/userController');
const multer  = require('multer');
const { verifyLogin } = require('../middlewares/tokenverify');
const upload = multer({ dest: 'uploads/' })

const router  = express.Router();

router.get('/',getDashboard)

// Auth Routes.
router.post('/signup',validateSignUp,signup)
router.post('/signin',validateSignIn,signin)
router.post('/verifyotp',verifyOtp)
router.post('/googlesign',googlesign)
router.post('/forgot-password',validatePhone,forgotPassword)
router.post('/forgot-otp-verify',validateNewPassword,ForgotverifyOtp)
router.patch('/edit-profile/:id', upload.single('pdf') ,editProfile)
router.get('/get-user/:id' , getUserDetails)


//user
router.post('/create-resume/:userId' , createResume)
router.get('/get-resume/:userId' , getResume)
router.get('/tasks/:userId' , getAllTaskOfUser)
router.patch('/start-task/:taskId' , startTask)
router.post('/task/completed/:userId', taskCompleted)
router.get('/applied/jobs/details/:userId' , getUserAppliedJobStatus)

//Jobs
router.get('/getfeaturedjobs',getFeaturedJobs)
router.get('/getjobs' , getAllJobs)
router.get('/job/details/:jobId' , getJobById)
router.get('/company-jobs/:id' , getJobsByCompany)
router.post('/applyjob/:jobId',  upload.single('pdf') , applyJob)
router.get('/user-applied-jobs/:id' , getUserAppliedJobs)
router.get('/jobs/catogories' , getCategories)
// router.get('/jobs/catogory/:cat' , getJobsByCategory)

//company
router.get('/companies' , getAllCompanies)
router.get('/getcompany/:id' , getCompanyDetails)


//Search
router.get("/search/:keyword" , doSearch)

module.exports = router;