import React, { useEffect } from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useState } from 'react'
import axios from 'axios'
import Loading from '../components/Loading'
import { toast } from 'react-toastify'

const ViewApplications = () => {
const {backendUrl,companyToken}=useContext(AppContext)

const [applicants,setApplicants]=useState(false)

// Function to fetch Company job Application Data
const fetchCompanyjobApplications=async()=>{
  try {
    const {data}=await axios.get(backendUrl+'/api/company/applicants',
      {headers:{token:companyToken}}
    )
    if(data.success){
      setApplicants(data.applications.reverse())
    }else{
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}

// Function to update Job application status
const changeJobApplicationStatus=async(id,status)=>{
  try {
    const {data}=await axios.post(backendUrl+'/api/company/change-status',
      {id,status},
      {headers:{token:companyToken}}
    )
    if(data.success){
      fetchCompanyjobApplications()
    }else{
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}

useEffect(()=>{
if(companyToken){
  fetchCompanyjobApplications()
}
},[companyToken])

  return applicants?applicants.length===0?(
    <div className='flex items-center justify-center h-[70vh]'>
  <p className='text-xl sm:text-2xl'>No Applications Available </p>

  </div>
  ): (
    <div className='container p-4 mx-auto'>
      <div>
        <table className='w-full max-w-4xl bg-white border border-gray-300 max-sm:text-sm'>
          <thead>
            <tr className='border border-gray-300'>
              <th className='px-4 py-2 text-left'>#</th>
              <th className='px-4 py-2 text-left'>User Name</th>
              <th className='px-4 py-2 text-left max-sm:hidden' >Job Title</th>
              <th className='px-4 py-2 text-left max-sm:hidden' >Location</th>
              <th className='px-4 py-2 text-left'>Resume</th>
              <th className='px-4 py-2 text-left'>Action</th>
            </tr>
          </thead>
          <tbody>
            {applicants.filter(item=>item.jobId&& item.userId).map((applicant,index)=>(
              <tr key={index} className='text-gray-700'>
                <td className='items-center px-4 py-2 text-center border border-gray-300'>{index+1}</td>
                <td className='flex px-4 py-2 text-center border border-gray-300'>
                  <img className='w-10 h-10 mr-3 rounded-full max-sm:hidden' src={applicant.userId.image} alt="" />
                  <span>{applicant.userId.name}</span>
                </td>
                <td className='px-4 py-2 border border-gray-300 max-sm:hidden'>
                  {applicant.jobId.title}
                </td>
                <td className='px-4 py-2 border border-gray-300 max-sm:hidden'>{applicant.jobId.location}</td>
                <td className='px-4 py-2 border border-gray-300'>
                  <a href={applicant.userId.resume} target='_blank'
                  className='inline-flex items-center gap-2 px-3 py-1 text-blue-400 rounded bg-blue-50'>
                    Resume <img src={assets.resume_download_icon} alt="" />
                  </a>
                </td>
                <td className='relative px-4 py-2 border border-gray-300'>
                  {applicant.status==="Pending"
                  ?<div className='relative inline-block text-left group'>
                    <button className='text-gray-500 action-button'>...</button>
                    <div className='absolute top-0 right-0 z-10 hidden w-32 mt-2 bg-white border border-gray-300 rounded shadow md:left-0 group-hover:block'>
                      <button onClick={()=>changeJobApplicationStatus(applicant._id,'Accepted')}  className='block w-full px-4 py-2 text-left text-blue-500 cursor-pointer hover:bg-gray-100'>
                        Accept  
                        </button>
                        <button onClick={()=>changeJobApplicationStatus(applicant._id,'Rejected')} className='block w-full px-4 py-2 text-left text-red-500 cursor-pointer hover:bg-gray-100'>
                           Reject 
                        </button>
                    </div>
                  </div>
                  :<div>{applicant.status}</div>
                  }
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ):<Loading/>
}

export default ViewApplications