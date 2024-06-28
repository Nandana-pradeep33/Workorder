
/*import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductTable = () => {
  const [projects, setProjects] = useState([]);
  const [columns, setColumns] = useState([]);
  const [editingId, setEditingId] = useState(null); // State to track which row is being edited

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost/myapp_backend/project.php');
        if (Array.isArray(response.data) && response.data.length > 0) {
          setColumns(Object.keys(response.data[0])); // Set table headers dynamically
          setProjects(response.data); // Set table data
        } else {
          console.error('Response data is not an array or is empty:', response.data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleEdit = (projectId) => {
    setEditingId(projectId); // Set the editingId state to enable editing mode
  };

  const handleSave = async (editedProject) => {
    try {
      // Send a PUT request to update the project in the database
      const response = await axios.put(`http://localhost/myapp_backend/editproject.php`, editedProject);
      console.log('Response from server:', response.data);
      if (response.data.success) {
        // If update is successful, update the projects state with updated data
        const updatedProjects = projects.map(project => {
          if (project.Project_ID === editedProject.Project_ID) {
            return editedProject;
          }
          return project;
        });
        setProjects(updatedProjects);
        setEditingId(null); // Exit editing mode
      } else {
        console.error('Error updating project:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };
  

  const handleInputChange = (projectId, columnName, value) => {
    const updatedProjects = projects.map(project => {
      if (project.Project_ID === projectId) {
        return { ...project, [columnName]: value };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((column) => (
              <th key={column} scope="col" className="px-6 py-3">
                {column.replace(/_/g, ' ')}
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.Project_ID} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              {columns.map((column) => (
                <td key={column} className="px-6 py-4">
                  {editingId === project.Project_ID ? (
                    <input
                      type="text"
                      value={project[column]}
                      onChange={(e) => handleInputChange(project.Project_ID, column, e.target.value)}
                    />
                  ) : (
                    project[column]
                  )}
                </td>
              ))}
              <td>
                {editingId === project.Project_ID ? (
                  <button className='rounded-lg bg-blue-400 mb-5 text-white' onClick={() => handleSave(project)}>Save</button>
                ) : (
                  <button className='rounded-lg bg-green-400 mb-5 text-white' onClick={() => handleEdit(project.Project_ID)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;

*/




import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductTable = () => {
  const [projects, setProjects] = useState([]);
  const [columns, setColumns] = useState([]);
  const [editingId, setEditingId] = useState(null); // State to track which row is being edited
  const [errorMessages, setErrorMessages] = useState({}); // State to hold error messages

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost/myapp_backend/project.php');
        if (Array.isArray(response.data) && response.data.length > 0) {

          const keys = Object.keys(response.data[0]).filter(key => key !== 'Project_ID'); // Use when Project_ID not required
          setColumns(keys); // Use when Project_ID not required

          // setColumns(Object.keys(response.data[0])); // Set table headers dynamically // Use when Project_ID required

          setProjects(response.data); // Set table data
        } else {
          console.error('Response data is not an array or is empty:', response.data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleEdit = (projectId) => {
    setEditingId(projectId); // Set the editingId state to enable editing mode
  };

  const handleSave = async (editedProject) => {
    try {
      // Send a PUT request to update the project in the database
      const response = await axios.put(`http://localhost/myapp_backend/editproject.php`, editedProject);
      console.log('Response from server:', response.data);
      if (response.data.success) {
        // If update is successful, update the projects state with updated data
        const updatedProjects = projects.map(project => {
          if (project.Project_ID === editedProject.Project_ID) {
            return editedProject;
          }
          return project;
        });
        setProjects(updatedProjects);
        setEditingId(null); // Exit editing mode
        setErrorMessages({}); // Clear error messages
      } else {
        // Set error message for the specific field
        setErrorMessages({
          ...errorMessages,
          [editedProject.Project_ID]: { Project_name: response.data.message || 'Error updating project.' }
        });
        console.error('Error updating project:', response.data.message);
      }
    } catch (error) {
      setErrorMessages({
        ...errorMessages,
        [editedProject.Project_ID]: { Project_name: 'Error updating project.' }
      });
      console.error('Error updating project:', error);
    }
  };

  const handleInputChange = (projectId, columnName, value) => {
    const updatedProjects = projects.map(project => {
      if (project.Project_ID === projectId) {
        // Format date to YYYY-MM-DD
        if (columnName === 'Project_date') {
          const date = new Date(value);
          const formattedDate = date.toISOString().split('T')[0];
          return { ...project, [columnName]: formattedDate };
        }
        return { ...project, [columnName]: value };
      }
      return project;
    });
    setProjects(updatedProjects);

    // Clear error message for the specific field on input change
    setErrorMessages({
      ...errorMessages,
      [projectId]: { ...errorMessages[projectId], [columnName]: '' }
    });
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((column) => (
              <th key={column} scope="col" className="px-6 py-3">
                {column.replace(/_/g, ' ')}
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.Project_ID} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              {columns.map((column) => (
                <td key={column} className="px-6 py-4">
                  {editingId === project.Project_ID ? (
                    <div>
                      {column === 'Project_date' ? (
                        <input
                          type="date"
                          value={project[column]}
                          onChange={(e) => handleInputChange(project.Project_ID, column, e.target.value)}
                        />
                      ) : (
                        <input
                          type="text"
                          value={project[column]}
                          onChange={(e) => handleInputChange(project.Project_ID, column, e.target.value)}
                        />
                      )}
                      {errorMessages[project.Project_ID] && errorMessages[project.Project_ID][column] && (
                        <p className="text-red-500">{errorMessages[project.Project_ID][column]}</p>
                      )}
                    </div>
                  ) : (
                    project[column]
                  )}
                </td>
              ))}
              <td>
                {editingId === project.Project_ID ? (
                  <button className='rounded-lg bg-blue-400 mb-5 text-white' onClick={() => handleSave(project)}>Save</button>
                ) : (
                  <button className='rounded-lg bg-green-400 mb-5 text-white' onClick={() => handleEdit(project.Project_ID)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;




