import React from 'react'
import { manageJobsData } from '../assets/assets'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

const ManageJobs = () => {

const navigate=useNavigate()



  return (
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
            {manageJobsData.map((job,index)=>(
                  <tr key={index} className='text-gray-700'> 
                  <td  className='px-4 py-2 border border-gray-300 max-sm:hidden'>{index+1}</td>
                  <td className='px-4 py-2 border border-gray-300'>{job.title}</td>
                  <td className='px-4 py-2 border border-gray-300 max-sm:hidden'>{moment(job.date).format('ll')}</td>
                  <td className='px-4 py-2 border border-gray-300 max-sm:hidden'>{job.location}</td>
                  <td className='px-4 py-2 text-center border border-gray-300'>{job.applicants}</td>
                  <td className='px-4 py-2 border border-gray-300'>
                    <input className='ml-4 scale-125' type="checkbox" />
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
  )
}

export default ManageJobs