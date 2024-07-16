
import React, { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

 

const Employee = () => {

  const navigate = useNavigate();

 

  const [employeeDetails, setEmployeeDetails] = useState({

    name: '',

    designation: '',

    email: '',

    contact: '',

  });

 

  const [contactError, setContactError] = useState('');

  const [isOtherSelected, setIsOtherSelected] = useState(false);

  const [otherDesignation, setOtherDesignation] = useState('');

 

  const handleChange = (e) => {

    const { name, value } = e.target;

 

    if (name === 'contact') {

      if (value.length <= 10 && /^\d*$/.test(value)) {

        setEmployeeDetails({ ...employeeDetails, [name]: value });

        setContactError('');

      }

      if (value.length !== 10) {

        setContactError('Contact number must be exactly 10 digits');

      } else {

        setContactError('');

      }

    } else if (name === 'designation') {

      if (value === 'other') {

        setIsOtherSelected(true);

        setEmployeeDetails({ ...employeeDetails, [name]: '' });

      } else {

        setIsOtherSelected(false);

        setEmployeeDetails({ ...employeeDetails, [name]: value });

      }

    } else {

      setEmployeeDetails({ ...employeeDetails, [name]: value });

    }

  };

 

  const handleOtherDesignationChange = (e) => {

    setOtherDesignation(e.target.value);

    setEmployeeDetails({ ...employeeDetails, designation: e.target.value });

  };

 

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (employeeDetails.contact.length !== 10) {

      setContactError('Contact number must be exactly 10 digits');

      return;

    }

 

    try {

      const response = await axios.post('http://localhost/myapp_backend/employee.php', employeeDetails);

      alert(response.data.message);

      if (response.data.success) {

        navigate('/some-route');  // Redirect to a different page if needed

      }

    } catch (error) {

      alert('Error adding employee');

    }

  };

 

  return (

    <section>

      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">

          <div className="p-6 space-y-4 md:space-y-6 sm:p-8" style={{ boxShadow: '1px 4px 10px rgba(0.1, 0, 0, 0.2)' }}>

            <h1 className="text-xl font-bold leading-tight text-gray-900 md:text-2xl dark:text-white">

              Employee Details

            </h1>

            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>

              <div>

                <label htmlFor="name" className="block mb-2 text-gray-900 dark:text-white">Employee Name</label>

                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                  placeholder="Employee Name" value={employeeDetails.name} onChange={handleChange} required />

              </div>

              <div>

                <label htmlFor="designation" className="block mb-2 text-gray-900 dark:text-white">Designation</label>

                <select name="designation" id="designation"

                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                  value={isOtherSelected ? 'other' : employeeDetails.designation} onChange={handleChange} required>

                  <option value="">Select Designation</option>

                  <option value="HR">HR</option>

                  <option value="CHIEF TECHNICAL OFFICER">CHIEF TECHNICAL OFFICER</option>

                  <option value="GENERAL MANAGER">GENERAL MANAGER</option>

                  <option value="PROJECT MANAGER">PROJECT MANAGER</option>

                  <option value="MARKETING MANAGER">MARKETING MANAGER</option>

                  <option value="CUSTOMER RELATION MANAGER">CUSTOMER RELATION MANAGER</option>

                  <option value="ADMINISTRATIVE OFFICER">ADMINISTRATIVE OFFICER</option>

                  <option value="DATA CENTRE ADMINISTRATOR">DATA CENTRE ADMINISTRATOR</option>

                  <option value="PROJECT LEADER">PROJECT LEADER</option>

                  <option value="SENIOR PROGRAMMER">SENIOR PROGRAMMER</option>

                  <option value="BUSINESS DEVELOPMENT MANAGER">BUSINESS DEVELOPMENT MANAGER</option>

                  <option value="HARDWARE & NETWORK SUPERVISOR">HARDWARE & NETWORK SUPERVISOR</option>

                  <option value="SENIOR DEVELOPER">SENIOR DEVELOPER</option>

                  <option value="SOFTWARE DEVELOPER">SOFTWARE DEVELOPER</option>

                  <option value="ELECTRICIAN">ELECTRICIAN</option>

                  <option value="RECEPTIONIST">RECEPTIONIST</option>

                  <option value="other">Other</option>

                </select>

                {isOtherSelected && (

                  <input type="text" name="otherDesignation" id="otherDesignation" placeholder="Enter new designation"

                    className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                    value={otherDesignation} onChange={handleOtherDesignationChange} required />

                )}

              </div>

              <div>

                <label htmlFor="email" className="block mb-2 text-gray-900 dark:text-white">Email</label>

                <input type="email" name="email" id="email" placeholder="Employee@example.com"

                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                  value={employeeDetails.email} onChange={handleChange} required />

              </div>

              <div>

                <label htmlFor="contact" className="block mb-2 text-gray-900 dark:text-white">Contact-No</label>

                <input type="text" name="contact" id="contact" placeholder="1234567890"

                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                  value={employeeDetails.contact} onChange={handleChange} required pattern="\d{10}" />

                {contactError && <p className="text-red-500 text-sm">{contactError}</p>}

              </div>

              <button type="submit" className="w-full text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Add Employee</button>

            </form>

          </div>

        </div>

      </div>

    </section>

  );

};

 

export default Employee;












