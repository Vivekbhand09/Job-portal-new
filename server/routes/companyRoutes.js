import express from "express"
import { ChangeJobApplicationsStatus, changeVisiblity, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from "../controllers/companyController.js"
import upload from "../config/multer.js"
import { protectCompany } from "../middleware/authMiddleware.js"

const router=express.Router()

//Register a router
router.post('/register',upload.single('image'),registerCompany)

// Company login 
router.post('/login',loginCompany)

// Get Comapny data
router.get('/company',protectCompany,getCompanyData)

// Post a job 
router.post('/post-job',protectCompany,postJob)

// Get Applicants data of Company
router.get('/applicants',protectCompany,getCompanyJobApplicants)

// Get Comapny Job list 
router.get('/list-jobs',protectCompany,getCompanyPostedJobs)

// Change Applicant Status
router.post('/change-status',protectCompany,ChangeJobApplicationsStatus)

//Change Application Visibility
router.post('/change-visiblity',protectCompany,changeVisiblity)

export  default router