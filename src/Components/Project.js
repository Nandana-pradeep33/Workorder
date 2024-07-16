import React, { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

 

const Project = () => {

  const navigate = useNavigate();

 

  const [projectDetails, setProjectDetails] = useState({

    name: '',

    type1: '',

    date1: '',

  });

 

  const [isOtherSelected, setIsOtherSelected] = useState(false);

  const [otherType, setOtherType] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

 

  const handleChange = (e) => {

    const { name, value } = e.target;

    if (name === 'type1') {

      if (value === 'other') {

        setIsOtherSelected(true);

        setProjectDetails({ ...projectDetails, [name]: '' });

      } else {

        setIsOtherSelected(false);

        setProjectDetails({ ...projectDetails, [name]: value });

      }

    } else {

      setProjectDetails({ ...projectDetails, [name]: value });

    }

  };

 

  const handleOtherTypeChange = (e) => {

    setOtherType(e.target.value);

    setProjectDetails({ ...projectDetails, type1: e.target.value });

  };

 

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post('http://localhost/myapp_backend/project.php', projectDetails);

      if (response.data.success) {

        alert(response.data.message);

        navigate('/some-route'); // Redirect to a different page if needed

      } else {

        setErrorMessage(response.data.message);

      }

    } catch (error) {

      alert('Error adding project');

    }

  };

 

  return (

    <section>

      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">

          <div className="p-6 space-y-4 md:space-y-6 sm:p-8" style={{ boxShadow: '1px 4px 10px rgba(0.1, 0, 0, 0.2)' }}>

            <h1 className="text-xl font-bold leading-tight text-gray-900 md:text-2xl dark:text-white pb-2 pt-2">

              Project&nbsp;&nbsp;Details

            </h1>

            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>

              <div>

                <label htmlFor="name" className="block mb-2 text-gray-900 dark:text-white">Project Name:</label>

                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                  placeholder="Project Name" value={projectDetails.name} onChange={handleChange} required />

                {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

              </div>

              <div>

                <label htmlFor="type1" className="block mb-2 text-gray-900 dark:text-white">Project Type:</label>

                <select name="type1" id="type1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                  value={isOtherSelected ? 'other' : projectDetails.type1} onChange={handleChange} required>

                  <option value="">Select type</option>

                  <option value="waste">Network</option>

                  <option value="water">Service</option>

                  <option value="electricity">Outsourcing</option>

                  <option value="other">Other</option>

                </select>

                {isOtherSelected && (

                  <input type="text" name="otherType" id="otherType" placeholder="Other project type"

                    className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                    value={otherType} onChange={handleOtherTypeChange} required />

                )}

              </div>

              <div>

                <label htmlFor="date1" className="block mb-2 text-gray-900 dark:text-white">Project Date:</label>

                <input type="date" name="date1" id="date1" placeholder="Project date"

                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                  value={projectDetails.date1} onChange={handleChange} required />

              </div>

              <button type="submit" className="w-full text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Add Project</button>

            </form>

          </div>

        </div>

      </div>

    </section>

  );

};

 

export default Project;


