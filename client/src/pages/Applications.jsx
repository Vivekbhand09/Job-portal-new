import React, { useContext, useState } from 'react'
import Navbar from '../components/Navbar'
import { assets, jobsApplied } from '../assets/assets'
import moment from 'moment'
import Footer from '../components/Footer'
import { AppContext } from '../context/AppContext'
import { useAuth, useUser } from '@clerk/clerk-react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const Applications = () => {


  const {user}=useUser()
  const {getToken}=useAuth()
const [isEdit,setIsEdit]=useState(false)

const [resume,setResume]=useState(null)

const {backendUrl,userData,userApplications,fetchUserData,fetchUserApplications}=useContext(AppContext)

const updateResume=async()=>{
    try {
      const formData=new FormData()
      formData.append('resume',resume)
      const token =await getToken()

      const {data}=await axios.post(backendUrl+'/api/users/upload-resume',
        formData,
        {headers:{Authorization:`Bearer ${token}`}}
      )
      if(data.success){
         toast.success(data.message)
        await fetchUserData()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
        toast.error(error.message)
    }
    setIsEdit(false)
    setResume(null)
}

useEffect(()=>{
  if(user){
    fetchUserApplications();
  }
},[user])

  return (
    
      <>
      <Navbar/>
      <div className='conayiner px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10'>
        <h2 className='text-xl font-semibold'>Your Resume</h2>
           <div className='flex gap-2 mt-3 mb-6'>
            {
              isEdit || userData && userData.resume===""
              ?<>
                 <label className='flex items-center' htmlFor="resumeUpload">
                  <p className='px-4 py-2 mr-2 text-blue-600 bg-blue-100 rounded-lg cursor-pointer'>{resume?resume.name:"Select Resume"}</p>
                  <input id='resumeUpload' onChange={e=>setResume(e.target.files[0])} accept='application/pdf' type="file" hidden />
                  <img className='cursor-pointer' src={assets.profile_upload_icon} alt="" />
                 </label>
                 <button onClick={updateResume} className='px-4 py-2 bg-green-100 border border-green-400 rounded-lg cursor-pointer'>Save </button>
              </>
              : <div className='flex gap-2'>    
                <a target='_blank' href={userData.resume} className='px-4 py-2 text-blue-600 bg-blue-100 rounded-lg' >
                  Resume
                </a>
                <button onClick={()=>setIsEdit(true)}  className='px-4 py-2 text-gray-600 border border-gray-300 rounded-lg cursor-pointer'>Edit</button>
              </div>
            }
           </div>

           <h2 className='mb-4 text-xl font-semibold'>Jobs Applied</h2>
           <table className='min-w-full bg-white border border-gray-300 rounded-lg '>
            <thead>
              <tr>
                <th className='px-4 py-3 text-left border border-gray-300'> Company</th>
                <th className='px-4 py-3 text-left border border-gray-300'>Job Title</th>
                <th className='px-4 py-3 text-left border border-gray-300 max-sm:hidden'>Location</th>
                <th className='px-4 py-3 text-left border border-gray-300 max-sm:hidden'>Date</th>
                <th className='px-4 py-3 text-left border border-gray-300'>Status</th>
              </tr>
            </thead>
            <tbody>
              {userApplications.map((job,index)=>true ?(
                <tr key={index}>
                     <td className='flex items-center gap-2 px-4 py-3 border border-gray-300'>
                      <img className='w-8 h-8' src={job.companyId.image} alt="" />
                      {job.companyId.name}
                     </td>
                     <td className='px-4 py-2 border border-gray-300'>
                      {job.jobId.title}
                     </td>
                     <td className='px-4 py-2 border border-gray-300 max-sm:hidden'>{job.jobId.location}</td>
                     <td className='px-4 py-2 border border-gray-300 max-sm:hidden'>{moment(job.date).format('ll')}</td>
                     <td className='px-4 py-2 border border-gray-300'>

                      <span className={`${job.status=== 'Accepted'? 'bg-green-100':job.status==='Rejected' ?'bg-red-100' : 'bg-blue-100'} px-4 py-1.5 rounded`}>
                        {job.status}
                      </span>
                     </td>
                </tr>
              ):(null))}
            </tbody>
           </table>
      </div>
      <Footer/>
      </>
    
  )
}

export default Applications