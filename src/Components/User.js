/*
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar';
import React, { useState } from "react";
import axios from "axios";



const User = () => {
const navigate= useNavigate();


const [projectDetails, setProjectDetails] = useState({
  name: '',
  type1: '',
  date1: '',
  date2: '',
  budget: '',
});

const [errorMessage, setErrorMessage] = useState('');

const handleChange = (e) => {
  const { name, value } = e.target;
  setProjectDetails({ ...projectDetails, [name]: value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost/myapp_backend/proposal.php', projectDetails);
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
    <div>
     <Navbar/>

     <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8" style={{ boxShadow: '1px 4px 10px rgba(0.1, 0, 0, 0.2)' }}>
            <h1 className="text-xl font-bold leading-tight text-gray-900 md:text-2xl dark:text-white pb-2 pt-2">
              Proposal&nbsp;&nbsp;Details
            </h1>
            <form className="space-y-4 md:space-y-6 " onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block mb-2 text-gray-900 dark:text-white">Proposal Name:</label>
                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Proposal Name" value={projectDetails.name} onChange={handleChange} required />
                {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
              </div>
              <div>
                <label htmlFor="type1" className="block mb-2 text-gray-900 dark:text-white">Proposal Type:</label>
                <input type="text" name="type1" id="type1" placeholder="Proposal type"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={projectDetails.type1} onChange={handleChange} required />
              </div>
              <div>
                <label htmlFor="date1" className="block mb-2 text-gray-900 dark:text-white">Proposal Date:</label>
                <input type="date" name="date1" id="date1" placeholder="Proposal date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={projectDetails.date1} onChange={handleChange} required />
              </div>
              <div>
                <label htmlFor="date2" className="block mb-2 text-gray-900 dark:text-white">Proposal End Date:</label>
                <input type="date" name="date2" id="date2" placeholder="Proposal date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={projectDetails.date2} onChange={handleChange} required />
              </div>
              <div>
                <label htmlFor="budget" className="block mb-2 text-gray-900 dark:text-white">Proposal Budget:</label>
                <input type="text" name="budget" id="budget" placeholder="Proposal budget"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={projectDetails.budget} onChange={handleChange} required />
              </div>
              <button type="submit" className="w-full text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Add Proposal</button>
            </form>
          </div>
        </div>
      </div>
    </section>
     
    </div>
  );
};

export default User*/


import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar';
import React, { useState ,useEffect} from "react";
import axios from "axios";

const User = () => {
const navigate= useNavigate();
const [searchQuery, setSearchQuery] = useState('');
const [projectDetails, setProjectDetails] = useState({
  name: '',
  type1: '',
  date1: '',
  date2: '',
  budget: '',
});

const [filteredProjects, setFilteredProjects] = useState([]);
const [existingProjectMessage, setExistingProjectMessage] = useState('');
const [showProjectsDropdown, setShowProjectsDropdown] = useState(false);
const [showNewRequestMessage, setShowNewRequestMessage] = useState(false);
const [showProjectDetails, setShowProjectDetails] = useState(false);
const [projects, setProjects] = useState([]);
const [errorMessage, setErrorMessage] = useState('');
const headingStyle = {
  marginTop: '30px',
  marginBottom: '20px',
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333',
};

const handleChange = (e) => {
  const { name, value } = e.target;
  setProjectDetails({ ...projectDetails, [name]: value });
};

const handleNewRequestClick = () => {
  setShowProjectDetails(true);
};

useEffect(() => {
  fetchProjects();
}, []);

const fetchProjects = async () => {
  try {
    const response = await axios.get('http://localhost/myapp_backend/search_project.php?type=names');
    setProjects(response.data);
  } catch (error) {
    console.error('Error fetching projects:', error);
  }
};

const handleSearchChange = (event) => {
  const query = event.target.value;
  setSearchQuery(query);
  setShowProjectsDropdown(true);
  clearMessages();
  filterProjects(query);
};

const handleSearchEnter = (event) => {
  if (event.key === 'Enter') {
    filterProjects(searchQuery);
    setShowProjectsDropdown(false);
  }
};

const filterProjects = (query) => {
  const filtered = projects.filter((project) =>
    project.Project_name.toLowerCase().includes(query.toLowerCase())
  );

  setFilteredProjects(filtered);
  if (filtered.length > 0) {
    setExistingProjectMessage(`Project '${query}' exists.`);
    setShowNewRequestMessage(false);
  } else {
    setExistingProjectMessage('');
    setShowNewRequestMessage(true);
  }
};

const clearMessages = () => {
  setExistingProjectMessage('');
  setShowNewRequestMessage(false);
};

const handleProjectSelection = (name) => {
  setSearchQuery(name);
  setShowProjectsDropdown(false);
  filterProjects(name);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost/myapp_backend/proposal.php', projectDetails);
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
    <div>
     <Navbar/>
     <section>
     <div style={{ padding: '20px', display: 'flex', alignItems: 'center' }}>
        <h1 style={headingStyle}>Search Lead</h1>
        <input
          type="text"
          placeholder="Search by project name"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyPress={handleSearchEnter}
          style={{ marginLeft: '10px', padding: '5px' }}
        />
        {showNewRequestMessage && (
          <p className='bg-blue-400 p-3 ml-2 rounded-lg'>
            You can send your request for a new project by clicking{' '}
            <button className='bg-green-500 text-white rounded-xl text-center w-[120px] h-1/2' onClick={handleNewRequestClick}>here</button>
          </p>
        )}
      </div>
      {showProjectsDropdown && (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {filteredProjects.map((project) => (
            <li
              key={project.Project_ID}
              style={{ cursor: 'pointer', padding: '5px' }}
              onClick={() => handleProjectSelection(project.Project_name)}
            >
              {project.Project_name}
            </li>
          ))}
        </ul>
      )}
      {showProjectDetails && (
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 mt-5">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8" style={{ boxShadow: '1px 4px 10px rgba(0.1, 0, 0, 0.2)' }}>
            <h1 className="text-xl font-bold leading-tight text-gray-900 md:text-2xl dark:text-white pb-2 pt-2">
              Proposal&nbsp;&nbsp;Details
            </h1>
            <form className="space-y-4 md:space-y-6 " onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block mb-2 text-gray-900 dark:text-white">Proposal Name:</label>
                <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                  placeholder="Proposal Name" value={projectDetails.name} onChange={handleChange} required />

                {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
              </div>
              <div>
                <label htmlFor="type1" className="block mb-2 text-gray-900 dark:text-white">Proposal Type:</label>
                <input type="text" name="type1" id="type1" placeholder="Proposal type"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                  value={projectDetails.type1} onChange={handleChange} required />
              </div>
              <div>
                <label htmlFor="date1" className="block mb-2 text-gray-900 dark:text-white">Proposal Date:</label>
                <input type="date" name="date1" id="date1" placeholder="Proposal date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                  value={projectDetails.date1} onChange={handleChange} required />

              </div>

              <div>

                <label htmlFor="date2" className="block mb-2 text-gray-900 dark:text-white">Proposal End Date:</label>

                <input type="date" name="date2" id="date2" placeholder="Proposal date"

                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                  value={projectDetails.date2} onChange={handleChange} required />

              </div>

              <div>

                <label htmlFor="budget" className="block mb-2 text-gray-900 dark:text-white">Proposal Budget:</label>

                <input type="text" name="budget" id="budget" placeholder="Proposal budget"

                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                  value={projectDetails.budget} onChange={handleChange} required />

              </div>

              <button type="submit" className="w-full text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Add Proposal</button>

            </form>

          </div>

        </div>

      </div>

      )}

    </section>
    </div>
  );
};

export default User;