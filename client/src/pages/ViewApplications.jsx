import React from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'

const ViewApplications = () => {
  return (
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
            {viewApplicationsPageData.map((applicant,index)=>(
              <tr key={index} className='text-gray-700'>
                <td className='px-4 py-2 text-center border border-gray-300'>{index+1}</td>
                <td className='flex px-4 py-2 text-center border border-gray-300'>
                  <img className='w-10 h-10 mr-3 rounded-full max-sm:hidden' src={applicant.imgSrc} alt="" />
                  <span>{applicant.name}</span>
                </td>
                <td className='px-4 py-2 border border-gray-300 max-sm:hidden'>
                  {applicant.jobTitle}
                </td>
                <td className='px-4 py-2 border border-gray-300 max-sm:hidden'>{applicant.location}</td>
                <td className='px-4 py-2 border border-gray-300'>
                  <a href="" target='_blank'
                  className='inline-flex items-center gap-2 px-3 py-1 text-blue-400 rounded bg-blue-50'>
                    Resume <img src={assets.resume_download_icon} alt="" />
                  </a>
                </td>
                <td className='relative px-4 py-2 border border-gray-300'>
                  <div className='relative inline-block text-left group'>
                    <button className='text-gray-500 action-button'>...</button>
                    <div className='absolute top-0 right-0 z-10 hidden w-32 mt-2 bg-white border border-gray-300 rounded shadow md:left-0 group-hover:block'>
                      <button className='block w-full px-4 py-2 text-left text-blue-500 hover:bg-gray-100'>
                        Accept
                        </button>
                        <button className='block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100'>
                           Reject
                        </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewApplications