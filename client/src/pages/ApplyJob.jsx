import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets} from '../assets/assets'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import kconvert from 'k-convert'
import moment from 'moment'
import JobCard from '../components/JobCard'
import Footer from '../components/Footer'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '@clerk/clerk-react'


const ApplyJob = () => {

const {id}=useParams()
const {getToken}=useAuth()
const navigate=useNavigate()
const [JobData,setJobData]=useState(null)
const [isAlreadyApplied,setIsAlreadyApplied]=useState(false)
const {jobs,backendUrl,userData,userApplications,fetchUserApplications}=useContext(AppContext)

const fetchJob=async()=>{
    try {
       const {data}=await axios.get(backendUrl+`/api/jobs/${id}`)

  if(data.success){
    setJobData(data.job)
  }else{
    toast.error(data.message)
  }
    } catch (error) {
       toast.error(error.message)
    }
 
}
const applyHandler=async()=>{
  try {
    if(!userData){
      return toast.error('Login to apply for a jobs')
    }
    if(!userData.resume){
      navigate('/applications')
      return toast.error("Upload resume to apply")
    }
const token=await getToken()
const {data}=await axios.post(backendUrl+'/api/users/apply',
  {jobId:JobData._id},
  {headers:{Authorization:`Bearer ${token}`}}
)

if(data.success){
  toast.success(data.message)
  fetchUserApplications()
}else{
 toast.error( data.message)
}

  } catch (error) {
     toast.error( error.message)
  }

  
}
const checkdAlreadyApplied=()=>{
 const hasApplied = userApplications.some(item => item.jobId._id === JobData._id)

setIsAlreadyApplied(hasApplied)
}

useEffect(()=>{
  
 fetchJob()
  
},[id])

useEffect(()=>{
  if(userApplications.length>0 && JobData){
    checkdAlreadyApplied()
  }
},[JobData,userApplications,id])

  return JobData? (
   <>
   <Navbar/>
   <div className='container flex flex-col min-h-screen px-4 py-10 mx-auto 2xl:px-20'>
    <div className='w-full text-black bg-white rounded-lg '>
      <div className='flex flex-wrap justify-center gap-8 py-20 mb-6 border md:justify-between px-14 bg-sky-50 border-sky-400 rounded-xl'>
        <div className='flex flex-col items-center md:flex-row'>
          <img className='h-24 p-4 mr-4 bg-white border-none rounded-lg max-md:mb-4' src={JobData.companyId.image} alt="" />
          <div className='text-center md:text-left text-neutral-700'>
            <h1 className='text-2xl font-medium sm:text-4xl '>{JobData.title}</h1>
            <div className='flex flex-row flex-wrap items-center gap-6 mt-2 text-gray-600 max-md:justify-center gap-y-2'>
              <span className='flex items-center gap-1'>
                <img src={assets.suitcase_icon} alt="" />
                {JobData.companyId.name}
              </span>
              <span className='flex items-center gap-1'>
                <img src={assets.location_icon} alt="" />
                {JobData.location}
              </span>
              <span className='flex items-center gap-1'>
                <img src={assets.person_icon} alt="" />
                {JobData.level}
              </span>
              <span className='flex items-center gap-1'>
                <img src={assets.money_icon} alt="" />
                CTC:{kconvert.convertTo(JobData.salary)}
              </span>
            </div> 
          </div>
        </div>

        <div className='flex flex-col justify-center text-sm text-end max-md:mx-auto max-md:text-center'>
          <button onClick={applyHandler} className='bg-blue-600 p-2.5 px-10 text-white rounded cursor-pointer'>{isAlreadyApplied?'Already Applied':'Apply Now'}</button>
          <p className='mt-1 text-gray-600'>Posted {moment(JobData.date).fromNow()}</p>
        </div>

      </div>

      <div className='flex flex-col items-start justify-between lg:flex-row '>
        <div className='w-full lg:w-3/3'>
          <h2 className='mb-4 text-2xl font-bold'>Job Description</h2>
          <div className='rich-text' dangerouslySetInnerHTML={{__html:JobData.description}}></div>
            <button onClick={applyHandler} className='bg-blue-600 p-2.5 px-10 text-white rounded mt-10'>{isAlreadyApplied?'Already Applied':'Apply Now'}</button>
            
        </div>
        <div>
          {/* Right section more jobs */}
          <div className='w-full mt-8 space-y-5 lg:w-1/2 lg:mt-0 lg:ml-auto'>
            <h2>More jobs from {JobData.companyId.name}</h2>
            {jobs.filter(job=>job._id!==JobData._id && job.companyId._id===JobData.companyId._id)
            .filter(job=>{
              // Set of applied jobId
              const appliedJobsIds=new Set(userApplications.map(app=>app.jobId&&app.jobId._id))
              // Return true if user not already applied for this job
              return !appliedJobsIds.has(job._id)
            }).slice(0,4).map((job,index)=><JobCard key={index} job={job} />)}
          </div>
        </div>

      </div>
    </div>

   </div>
   <Footer/>
   </>
  ):(
     <Loading/>
  )
}

export default ApplyJob