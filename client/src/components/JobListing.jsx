import  { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocations } from '../assets/assets';
import JobCard from './JobCard';

const JobListing = () => {

const { isSearched, searchFilter ,setSearchFilter,jobs} = useContext(AppContext);

const [showFilter,setShowFilter]=useState(false)

const [currentPage,setCurrentPage]=useState(1)

const [selectedCategories,setSlectedCategories]=useState([])
const [selectedLocations,setSelectedLocations]=useState([])

const [filteredJobs,setFilteredjobs]=useState(jobs)

const HandleCategoryChange=(category)=>{
     setSlectedCategories(
        prev=>prev.includes(category)? prev.filter(c=>c!==category):[...prev,category]
     )
}
const HandleLocationChange=(location)=>{
     setSelectedLocations(
        prev=>prev.includes(location)? prev.filter(c=>c!==location):[...prev,location]
     )
}

useEffect(()=>{
 const matchesCategory = job => selectedCategories.length === 0 || selectedCategories.includes(job.category || "");

const matchesLocation = job => selectedLocations.length === 0 || selectedLocations.includes(job.location || "");

const matchesTitle = (job) => {
  const jobTitle = job?.title || "";
  const filterTitle = typeof searchFilter?.title === "string" ? searchFilter.title : "";
  return filterTitle === "" || jobTitle.toLowerCase().includes(filterTitle.toLowerCase());
};

const matchesSearchLocation = (job) => {
  const jobLocation = job?.location || "";
  const filterLocation = typeof searchFilter?.location === "string" ? searchFilter.location : "";
  return filterLocation === "" || jobLocation.toLowerCase().includes(filterLocation.toLowerCase());
};


const newFilteredJobs=jobs.slice().reverse().filter(
    job=>matchesCategory(job)&& matchesLocation(job) && matchesTitle(job)&& matchesSearchLocation(job)
)

setFilteredjobs(newFilteredJobs)
setCurrentPage(1)

},[jobs,selectedCategories,selectedLocations,searchFilter])



  return (
    <div className='container flex flex-col py-8 mx-auto 2xl:px-20 lg:flex-row max-lg:space-y-8'>
        {/* Sidebar */}
        <div className='w-full px-4 bg-white lg:w-1/4'>
            {/*search filter from hero component */}
            {
              isSearched && (searchFilter.title!=="" || searchFilter.location!=="") && (
                <>
            <h3 className='mb-4 text-lg font-medium'>Current Search</h3>
                <div className='mb-4 text-gray-600'>
                    {searchFilter.title && (
                        <span  className='inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>
                              {searchFilter.title}
                              <img onClick={e=>setSearchFilter(prev=>({...prev,title:""}))} className='cursor-pointer' src={assets.cross_icon} alt="" />
                        </span>
                    )}
                      {searchFilter.location && (
                        <span className='ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded'>
                            {searchFilter.location}
                             <img onClick={e=>setSearchFilter(prev=>({...prev,location:""}))} className='cursor-pointer' src={assets.cross_icon} alt="" />
                        </span>
                    )}
                </div>
                </>
              ) 
            }
            <button onClick={e=>setShowFilter(prev=>!prev)} className='px-6 py-1.5 rounded border border-gray-400 lg:hidden'>
                {showFilter?"close":"Filters"}
            </button>
         {/* Category Filter */}
             <div className={showFilter?"" :"max-lg:hidden"}>
                <h4 className='py-4 text-lg font-medium'>Search by Categories</h4>
                <ul className='space-y-4 text-gray-600'>
                    {
                        JobCategories.map((category,index)=>(
                            <li className='flex items-center gap-3' key={index}>
                                <input className='scale-125' type="checkbox" 
                                onChange={()=>HandleCategoryChange(category)}
                                checked={selectedCategories.includes(category)}/>
                                {category}
                            </li>
                        ))
                    }
                </ul>
             </div>
                {/* Location  Filter */}
             <div  className={showFilter?"" :"max-lg:hidden"}>
                <h4 className='py-4 text-lg font-medium pt-14'>Search by Locations</h4>
                <ul className='space-y-4 text-gray-600'>
                    {
                        JobLocations.map((location,index)=>(
                            <li className='flex items-center gap-3' key={index}>
                                <input className='scale-125' type="checkbox" 
                                 onChange={()=>HandleLocationChange(location)}
                                checked={selectedLocations.includes(location)}/>
                                {location}
                            </li>
                        ))
                    }
                </ul>
             </div>
        </div>

        {/*  Job listings     */}
        <section className='w-full text-gray-800 lg:w-3/4 max-lg:px-4'>
            <h3 className='py-2 text-3xl font-medium ' id='job-list'>Latest jobs</h3>
            <p className='mb-8'>Get your desired job from top companies</p>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
                     {filteredJobs.slice((currentPage-1)*6,currentPage*6).map((job,index)=>(
                        <JobCard key={index} job={job} />
                     ))}
            </div>

            {/* Pagination  */}
            {filteredJobs.length>0 &&(
                <div className='flex items-center justify-center mt-10 space-x-2'>
                    <a href="#job-list">
                        <img onClick={()=>setCurrentPage(Math.max(currentPage-1),1)} src={assets.left_arrow_icon} alt="" />
                    </a>
                    {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
                 <a href="#job-list" key={index}>
               <button onClick={()=>setCurrentPage(index+1)} className={`w-10 h-10 flex items-center justify-center border border-gray-300 rounded ${currentPage===index+1?'bg-blue-100 text-blue-500':'text-gray-500'}`}>{index + 1}</button>
               </a>
                    ))}
                    <a href="#job-list">
                        <img onClick={()=>setCurrentPage(Math.min(currentPage+1,Math.ceil(filteredJobs.length/6)))} src={assets.right_arrow_icon} alt="" />
                    </a>
                </div>
            ) }
        </section>
    </div>
  )
}

export default JobListing