
import express from 'express'
import { applyForJob, getUserData, getUserJobApplications, updateUserResume } from '../controllers/userController.js'
import upload from '../config/multer.js'

const router=express.Router()

// Get user Data
router.get('/user',getUserData)

// Apply for a Job
router.post('/apply',applyForJob)

// Get applied jobs data
router.get('/applications',getUserJobApplications)

// Update user profile
router.post('/upload-resume',upload.single('resume'),updateUserResume)


export default router