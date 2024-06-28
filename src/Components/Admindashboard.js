import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
 

const AdminDashboard = () => {
const navigate=useNavigate();


const registerProject=()=>{
    navigate('/admin/project')
    
}
const registerclient=()=>{
    navigate('/admin/client')
}

const registerEmployee=()=>{
    navigate('/admin/employee')
}

const viewProject=()=>{
  navigate('/admin/viewpr')
}
const viewEmployee=()=>{
  navigate('/admin/viewem')
}
const viewClient=()=>{
  navigate('/admin/viewcl')
}
const viewassign=()=>{
  navigate('/admin/viewas')
}
const assignemployee=()=>{
  navigate('/admin/assign')
}
  return (

    <div>
       < Navbar/>
     <h1 className="font-bold text-center mt-5 pt-17" style={{marginTop:'6rem', fontSize:'42px'}}></h1>

      <div className="flex justify-center space-x-4 mt-5 " style={{marginTop:'6rem'}} >

        <div className="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

          <div  className="flex items-center space-x-9">

          <img  className='w-[70px] h-[70px]' src='/project.png'></img>

            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">

              Add&nbsp;Project

            </h5>

            </div>

          <p className=" font-normal text-gray-500 dark:text-gray-400 mt-3">

            Go to this step by step guideline process on how to certify for your weekly benefits:

          </p>

          <button onClick={registerProject} className='rounded-lg bg-green-400 hover:bg-green-600 w-[150px] text-white font-bold'>Add</button>
          <button onClick={viewProject}  className='rounded-lg bg-green-400 hover:bg-green-600 w-[150px] text-white font-bold ml-2'>View</button>
          

        </div>

        <div className="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

          <div  className="flex items-center space-x-9">

          <img  className='w-[70px] h-[70px]' src='/group.png'></img>

            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">

              Add&nbsp;Client

            </h5>

            </div>

          <p className=" font-normal text-gray-500 dark:text-gray-400 mt-3">

            Go to this step by step guideline process on how to certify for your weekly benefits:

          </p>

          <button onClick={registerclient} className='rounded-lg bg-green-400 hover:bg-green-600 w-[150px] text-white font-bold'>Add</button>
          <button onClick={viewClient}  className='rounded-lg bg-green-400 hover:bg-green-600 w-[150px] text-white font-bold ml-2'>View</button>
        </div>

        <div className="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

          <div  className="flex items-center space-x-9">

          <img  className='w-[70px] h-[70px]' src='/employee.png'></img>

            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">

              Add&nbsp;Employee

            </h5>

            </div>

          <p className=" font-normal text-gray-500 dark:text-gray-400 mt-3">

            Go to this step by step guideline process on how to certify for your weekly benefits:

          </p>

          <button onClick={registerEmployee} className='rounded-lg bg-green-400 hover:bg-green-600 w-[150px] text-white font-bold'>Add</button>
          <button onClick={viewEmployee} className='rounded-lg bg-green-400 hover:bg-green-600 w-[150px] text-white font-bold ml-2'>View</button>

        </div>
        

      </div>
      <div className="flex justify-center space-x-4 mt-5 mb-3 " style={{marginTop:'3rem'}} >
      <div className="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

<div  className="flex items-center space-x-9">

<img  className='w-[70px] h-[70px]' src='/employee.png'></img>

  <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">

    Assign&nbsp;Employee

  </h5>

  </div>

<p className=" font-normal text-gray-500 dark:text-gray-400 mt-3">

  Go to this step by step guideline process on how to certify for your weekly benefits:

</p>

<button onClick={assignemployee} className='rounded-lg bg-green-400 hover:bg-green-600 w-[150px] text-white font-bold'>Assign</button>
<button onClick={viewassign} className='rounded-lg bg-green-400 hover:bg-green-600 w-[150px] text-white font-bold ml-2'>View</button>

</div>



    </div>

</div>
  );

};

export default AdminDashboard;

