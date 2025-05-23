import React, { useContext ,useRef} from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Hero = () => {

const {setSearchFilter,setIsSearched}=useContext(AppContext)

const titleRef=useRef(null)
const locationRef=useRef(null)

const onSearch=()=>{
  setSearchFilter({
    title:titleRef.current.value,
    location:locationRef.current.value
  })
  setIsSearched(true)
 
}






  return (
    <div className='mx-auto my-10 conatiner 2xl:px-20'>
      <div className='py-16 mx-2 text-center text-white bg-gradient-to-r from-purple-800 to-purple-950 rounded-xl '>
        <h2 className='mb-4 text-2xl font-medium md:text-3xl lg:text-4xl'>Over 10,000+ jobs to apply</h2>
        <p className='max-w-xl px-5 mx-auto mb-8 text-sm font-light'>Your Next Big Career Move starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Future!</p>
        <div className='flex items-center justify-between max-w-xl pl-4 mx-4 text-gray-600 bg-white rounded sm:mx-auto'>
          <div className='flex items-center'>
            <img className='h4 sm:h-5' src={assets.search_icon} alt="" />
            <input type="text"
            placeholder='Search for jobs' 
            className='w-full p-2 rounded outline-none max-sm:text-xs '
            ref={titleRef}/>
          </div>
            <div className='flex items-center'>
            <img className='h4 sm:h-5' src={assets.location_icon} alt="" />
            <input type="text"
            placeholder='Location' 
            className='w-full p-2 rounded outline-none max-sm:text-xs '
             ref={locationRef}/>
          </div>
          <button onClick={onSearch} className='px-6 py-2 m-1 text-white bg-blue-600 rounded cursor-pointer'>Search</button>
        </div>
      </div>

<div className='flex p-6 mx-2 mt-5 border border-gray-300 rounded-md shadow-md'>
  <div className='flex flex-wrap justify-center gap-10 lg:gap-16'>
    <p className='font-medium'>Trusted By</p>
    <img className='h-6' src={assets.microsoft_logo} alt="" />
    <img className='h-6' src={assets.walmart_logo} alt="" />
    <img className='h-6' src={assets.accenture_logo} alt="" />
    <img className='h-6' src={assets.samsung_logo} alt="" />
    <img className='h-6' src={assets.amazon_logo} alt="" />
    <img className='h-6' src={assets.adobe_logo} alt="" />
  </div>
</div>


    </div>

  )
}

export default Hero