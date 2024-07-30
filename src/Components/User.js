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


import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import React, { useState, useEffect } from "react";
import axios from "axios";

const User = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [projectDetails, setProjectDetails] = useState({
    name: '',
    type1: '',
    date1: '',
    date2: '',
    budget: '',
    clientname:'',
    clientaddress:'',
    existing:'',
  });
  
  const[existingProject,setExistingProject]=useState('No');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [existingProjectMessage, setExistingProjectMessage] = useState('');
  const [showProjectsDropdown, setShowProjectsDropdown] = useState(false);
  const [showNewRequestMessage, setShowNewRequestMessage] = useState(false);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [projects, setProjects] = useState([]);
  const [projectTypes, setProjectTypes] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [newProjectType, setNewProjectType] = useState(''); // State for new project type
  const [clients, setClients] = useState([]); // State for existing clients
  const [newClientName, setNewClientName] = useState(''); // State for new client name

  const headingStyle = {
    marginTop: '30px',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  };

  useEffect(() => {
    fetchProjects();
    fetchProjectTypes();
    fetchClients(); // Fetch existing clients when component mounts
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost/myapp_backend/search_project.php?type=names');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchProjectTypes = async () => {
    try {
      const response = await axios.get('http://localhost/myapp_backend/project.php');
      setProjectTypes(response.data);
    } catch (error) {
      console.error('Error fetching project types:', error);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await axios.get('http://localhost/myapp_backend/proposal_client_fetch.php');
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectDetails({ ...projectDetails, [name]: value });
  };

  const handleNewRequestClick = () => {
    setShowProjectDetails(true);
  };

  const handleProjectTypeChange = (e) => {
    const { value } = e.target;
    setProjectDetails(prevDetails => ({
      ...prevDetails,
      type1: value,
      existing: value !== 'Other' ? 'yes' : 'no'
    }));
    setNewProjectType(value === 'Other' ? '' : newProjectType); // Clear new project type input if selecting an existing type
  };

  const handleNewProjectTypeChange = (e) => {
    const { value } = e.target;
    setNewProjectType(value);
  };

  const handleClientChange = (e) => {
    const { value } = e.target;
    setProjectDetails({ ...projectDetails, clientname: value });
    if (value !== 'Other') {
      setNewClientName(''); // Clear new client name input when selecting an existing client
    }
  };

  const handleNewClientNameChange = (e) => {
    const { value } = e.target;
    setNewClientName(value);
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
  const handleUserPropView=()=>{
  navigate('/user/viewproposal')

  }
  const handleProjectSelection = (name) => {
    setSearchQuery(name);
    setShowProjectsDropdown(false);
    filterProjects(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        ...projectDetails,
        type1: projectDetails.type1 === 'Other' ? newProjectType : projectDetails.type1,
        clientname: projectDetails.clientname === 'Other' ? newClientName : projectDetails.clientname,
      };
      const response = await axios.post('http://localhost/myapp_backend/proposal.php', postData);
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
      <Navbar />
      <section>
        <div style={{ padding: '20px', display: 'flex', alignItems: 'center',justifyContent: 'space-between'  }}>
          <h1 style={headingStyle}>Search Lead</h1>
          <input
            type="text"
            placeholder="Search by project name"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={handleSearchEnter}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
          <p className='bg-blue-400 p-3 ml-2 rounded-lg'>
            You can send your request for a new project by clicking{' '}
            <button className='bg-green-500 text-white rounded-xl text-center w-[120px] h-1/2' onClick={handleNewRequestClick}>here</button>
          </p>
          <button className='bg-blue-500 text-white rounded-xl text-center w-[200px] h-1/2 mb-5' onClick={handleUserPropView}>
    View Proposals
  </button>
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
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 mt-5" style={{marginTop:'7rem'}}>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8 " style={{ boxShadow: '1px 4px 10px rgba(0.1, 0, 0, 0.2)' }} >
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
                    <select
                      name="type1"
                      id="type1"
                      value={projectDetails.type1}
                      onChange={handleProjectTypeChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    >
                      <option value="">Select Project Type</option>
                      {projectTypes.map((type) => (
                        <option key={type.Project_type} value={type.Project_type}>{type.Project_type}</option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                    {/* Display input field for new project type if "Other" is selected */}
                    {projectDetails.type1 === 'Other' && (
                      <input
                        type="text"
                        name="newProjectType"
                        id="newProjectType"
                        placeholder="Enter New Project Type"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mt-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={newProjectType}
                        onChange={handleNewProjectTypeChange}
                        required
                      />
                    )}
                  </div>
                  <div>
                    <label htmlFor="clientname" className="block mb-2 text-gray-900 dark:text-white">Client Name:</label>
                    <select
                      name="clientname"
                      id="clientname"
                      value={projectDetails.clientname}
                      onChange={handleClientChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    >
                      <option value="">Select Client Name</option>
                      {clients.map((client, index) => (
                        <option key={index} value={client}>{client}</option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                    {/* Display input field for new client name if "Other" is selected */}
                    {projectDetails.clientname === 'Other' && (
                      <input
                        type="text"
                        name="newClientName"
                        id="newClientName"
                        placeholder="Enter New Client Name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mt-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={newClientName}
                        onChange={handleNewClientNameChange}
                        required
                      />
                    )}
                  </div>
                  <div>
                    <label htmlFor="clientaddress" className="block mb-2 text-gray-900 dark:text-white">Client Address:</label>
                    <input type="text" name="clientaddress" id="clientaddress" placeholder="Client Address"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={projectDetails.clientaddress} onChange={handleChange} required />
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