import React, { useContext, useEffect, useState } from 'react'
import { manageJobsData } from '../assets/assets'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'

const ManageJobs = () => {

const navigate=useNavigate()
const [jobs,setJobs]=useState(false)
const {backendUrl,companyToken}=useContext(AppContext)
// Function to fetch company Job Applications data
const fetchCompanyJobs=async()=>{
    try {
      const {data}=await axios.get(backendUrl+'/api/company/list-jobs',
        {headers:{token:companyToken}}
      )
      if(data.success){
        setJobs(data.jobsData.reverse())
       
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
}
// Function to change job visibility

const changeJobVisibility=async(id)=>{
  try {
    const {data} =await axios.post(backendUrl+'/api/company/change-visiblity',
      {id},
      {headers:{token:companyToken}}
    )

    if(data.success){
      toast.success(data.message)
      fetchCompanyJobs()
    }else{
      toast.error(data.message)
    }
  } catch (error) {
     toast.error(error.message)
  }
}

useEffect(()=>{
if(companyToken){
  fetchCompanyJobs()
}
},[companyToken])



  return jobs?jobs.length===0?(
  <div className='flex items-center justify-center h-[70vh]'>
  <p className='text-xl sm:text-2xl'>No Jobs Available or Posted</p>

  </div>): (
    <div className='container max-w-5xl p-4'>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-300 max-sm:text-sm'>
          <thead>
            <tr>
              <th className='px-4 py-2 text-left border border-gray-300 max-sm:hidden'>#</th>
              <th className='px-4 py-2 text-left border border-gray-300'>Job Title</th>
              <th className='px-4 py-2 text-left border border-gray-300 max-sm:hidden'>Date</th>
              <th className='px-4 py-2 border-gray-300 text-leftborder max-sm:hidden'>Location</th>
              <th className='px-4 py-2 text-center border border-gray-300 '>Applicants</th>
              <th className='px-4 py-2 text-left border border-gray-300'>Visible</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job,index)=>(
                  <tr key={index} className='text-gray-700'> 
                  <td  className='px-4 py-2 border border-gray-300 max-sm:hidden'>{index+1}</td>
                  <td className='px-4 py-2 border border-gray-300'>{job.title}</td>
                  <td className='px-4 py-2 border border-gray-300 max-sm:hidden'>{moment(job.date).format('ll')}</td>
                  <td className='px-4 py-2 border border-gray-300 max-sm:hidden'>{job.location}</td>
                  <td className='px-4 py-2 text-center border border-gray-300'>{job.applicants}</td>
                  <td className='px-4 py-2 border border-gray-300'>
                    <input onChange={()=>changeJobVisibility(job._id)} className='ml-4 scale-125' type="checkbox" checked={job.visible} />
                  </td>
                  </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex justify-end mt-4'>
        <button onClick={()=>navigate('/dashboard/add-job')} className='px-4 py-2 text-white bg-black rounded cursor-pointer'>
          Add New Job
        </button>
      </div>
    </div>
  ):<Loading/>
}

export default ManageJobs