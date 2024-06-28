
/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductTable = () => {
  const [employees, setEmployees] = useState([]);
  const [columns, setColumns] = useState([]);
  const [editingId, setEditingId] = useState(null); // State to track which row is being edited

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost/myapp_backend/employee.php');
        if (Array.isArray(response.data) && response.data.length > 0) {
          setColumns(Object.keys(response.data[0])); // Set table headers dynamically
          setEmployees(response.data); // Set table data
        } else {
          console.error('Response data is not an array or is empty:', response.data);
        }
      } catch (error) {
        console.error('Error fetching Employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleEdit = (projectId) => {
    setEditingId(projectId); // Set the editingId state to enable editing mode
  };

  const handleSave = async (editedProject) => {
    try {
      // Send a PUT request to update the project in the database
      const response = await axios.put(`http://localhost/myapp_backend/editemployee.php`, editedProject);
      console.log('Response from server:', response.data);
      if (response.data.success) {
        // If update is successful, update the projects state with updated data
        const updatedProjects = employees.map(employee => {
          if (employee.EmployeeID === editedProject.EmployeeID) {
            return editedProject;
          }
          return employee;
        });
        setEmployees(updatedProjects);
        setEditingId(null); // Exit editing mode
      } else {
        console.error('Error updating Employee:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating Employee:', error);
    }
  };
  

  const handleInputChange = (projectId, columnName, value) => {
    const updatedProjects = employees.map(employee => {
      if (employee.EmployeeID === projectId) {
        return { ...employee, [columnName]: value };
      }
      return employee;
    });
    setEmployees(updatedProjects);
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
          {employees.map((employee) => (
            <tr key={employee.EmployeeID} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              {columns.map((column) => (
                <td key={column} className="px-6 py-4">
                  {editingId === employee.EmployeeID ? (
                    <input
                      type="text"
                      value={employee[column]}
                      onChange={(e) => handleInputChange(employee.EmployeeID, column, e.target.value)}
                    />
                  ) : (
                    employee[column]
                  )}
                </td>
              ))}
              <td>
                {editingId === employee.EmployeeID ? (
                  <button className='rounded-lg bg-blue-400 mb-5 text-white' onClick={() => handleSave(employee)}>Save</button>
                ) : (
                  <button className='rounded-lg bg-green-400 mb-5 text-white' onClick={() => handleEdit(employee.EmployeeID)}>Edit</button>
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
  const [employees, setEmployees] = useState([]);
  const [columns, setColumns] = useState([]);
  const [editingId, setEditingId] = useState(null); // State to track which row is being edited
  const [errorMessages, setErrorMessages] = useState({}); // State to hold error messages

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost/myapp_backend/employee.php');
        if (Array.isArray(response.data) && response.data.length > 0) {

          const keys = Object.keys(response.data[0]).filter(key => key !== 'EmployeeID');            //use when EmployeeID not required
          setColumns(keys);                                                                         //use when EmployeeID not required

          //setColumns(Object.keys(response.data[0])); // Set table headers dynamically               //use when EmployeeID  required

          setEmployees(response.data); // Set table data
        } else {
          console.error('Response data is not an array or is empty:', response.data);
        }
      } catch (error) {
        console.error('Error fetching Employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleEdit = (projectId) => {
    setEditingId(projectId); // Set the editingId state to enable editing mode
  };

  const handleSave = async (editedProject) => {
    const newErrorMessages = {};

    if (!/^\d{10}$/.test(editedProject.ContactNo)) {
      newErrorMessages.ContactNo = 'Invalid contact number.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editedProject.Email)) {
      newErrorMessages.Email = 'Invalid email format.';
    }

    if (Object.keys(newErrorMessages).length > 0) {
      setErrorMessages(newErrorMessages);
      return;
    }

    try {
      // Send a PUT request to update the project in the database
      const response = await axios.put(`http://localhost/myapp_backend/editemployee.php`, editedProject);
      console.log('Response from server:', response.data);
      if (response.data.success) {
        // If update is successful, update the projects state with updated data
        const updatedProjects = employees.map(employee => {
          if (employee.EmployeeID === editedProject.EmployeeID) {
            return editedProject;
          }
          return employee;
        });
        setEmployees(updatedProjects);
        setEditingId(null); // Exit editing mode
        setErrorMessages({}); // Clear error messages
      } else {
        setErrorMessages({ general: response.data.message || 'Error updating Employee.' });
        console.error('Error updating Employee:', response.data.message);
      }
    } catch (error) {
      setErrorMessages({ general: 'Error updating Employee.' });
      console.error('Error updating Employee:', error);
    }
  };
  

  const handleInputChange = (projectId, columnName, value) => {
    const updatedProjects = employees.map(employee => {
      if (employee.EmployeeID === projectId) {
        return { ...employee, [columnName]: value };
      }
      return employee;
    });
    setEmployees(updatedProjects);
    setErrorMessages({}); // Clear error messages on input change
  };

  return (
    <div className="relative overflow-x-auto">
      {errorMessages.general && <p className="text-red-500">{errorMessages.general}</p>}
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
          {employees.map((employee) => (
            <tr key={employee.EmployeeID} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              {columns.map((column) => (
                <td key={column} className="px-6 py-4">
                  {editingId === employee.EmployeeID ? (
                    <div>
                    <input
                      type={column === 'Email' ? 'email' : 'text'}
                      value={employee[column]}
                      onChange={(e) => handleInputChange(employee.EmployeeID, column, e.target.value)}
                    />
                    {errorMessages[column] && (
                      <p className="text-red-500">{errorMessages[column]}</p>
                    )}
                    </div>
                  ) : (
                    employee[column]
                  )}
                </td>
              ))}
              <td>
                {editingId === employee.EmployeeID ? (
                  <button className='rounded-lg bg-blue-400 mb-5 mr-5 text-white' onClick={() => handleSave(employee)}>Save</button>
                ) : (
                  <button className='rounded-lg bg-green-400 mb-5 text-white' onClick={() => handleEdit(employee.EmployeeID)}>Edit</button>
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

