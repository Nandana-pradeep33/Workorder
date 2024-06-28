
/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductTable = () => {
  const [clients, setClients] = useState([]);
  const [columns, setColumns] = useState([]);
  const [editingId, setEditingId] = useState(null); // State to track which row is being edited

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost/myapp_backend/client.php');
        if (Array.isArray(response.data) && response.data.length > 0) {
          setColumns(Object.keys(response.data[0])); // Set table headers dynamically
          setClients(response.data); // Set table data
        } else {
          console.error('Response data is not an array or is empty:', response.data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchClients();
  }, []);

  const handleEdit = (projectId) => {
    setEditingId(projectId); // Set the editingId state to enable editing mode
  };

  const handleSave = async (editedProject) => {
    try {
      // Send a PUT request to update the project in the database
      const response = await axios.put(`http://localhost/myapp_backend/editclient.php`, editedProject);
      console.log('Response from server:', response.data);
      if (response.data.success) {
        // If update is successful, update the projects state with updated data
        const updatedProjects = clients.map(client => {
          if (client.Client_ID === editedProject.Client_ID) {
            return editedProject;
          }
          return client;
        });
        setClients(updatedProjects);
        setEditingId(null); // Exit editing mode
      } else {
        console.error('Error updating project:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };
  

  const handleInputChange = (projectId, columnName, value) => {
    const updatedProjects = clients.map(client => {
      if (client.Client_ID === projectId) {
        return { ...client, [columnName]: value };
      }
      return client;
    });
    setClients(updatedProjects);
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
          {clients.map((client) => (
            <tr key={client.Client_ID} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              {columns.map((column) => (
                <td key={column} className="px-6 py-4">
                  {editingId === client.Client_ID ? (
                    <input
                      type="text"
                      value={client[column]}
                      onChange={(e) => handleInputChange(client.Client_ID, column, e.target.value)}
                    />
                  ) : (
                    client[column]
                  )}
                </td>
              ))}
              <td>
                {editingId === client.Client_ID ? (
                  <button className='rounded-lg bg-blue-400 mb-5 mr-5 text-white' onClick={() => handleSave(client)}>Save</button>
                ) : (
                  <button className='rounded-lg bg-green-400 mb-5 text-white' onClick={() => handleEdit(client.Client_ID)}>Edit</button>
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
  const [clients, setClients] = useState([]);
  const [columns, setColumns] = useState([]);
  const [editingId, setEditingId] = useState(null); // State to track which row is being edited
  const [errorMessages, setErrorMessages] = useState({}); // State to hold error messages

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost/myapp_backend/client.php');
        if (Array.isArray(response.data) && response.data.length > 0) {

          const keys = Object.keys(response.data[0]).filter(key => key !== 'Client_ID');            //use when Client_Id not required
          setColumns(keys);                                                                         //use when Client_Id not required

          //setColumns(Object.keys(response.data[0])); // Set table headers dynamically             //use when Client_Id required

          setClients(response.data); // Set table data
        } else {
          console.error('Response data is not an array or is empty:', response.data);
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  const handleEdit = (clientId) => {
    setEditingId(clientId); // Set the editingId state to enable editing mode
  };

  const handleSave = async (editedClient) => {
    const newErrorMessages = {};

    if (!/^\d{10}$/.test(editedClient.Contact)) {
      newErrorMessages.Contact = 'Invalid contact number.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editedClient.Email)) {
      newErrorMessages.Email = 'Invalid email format.';
    }

    if (Object.keys(newErrorMessages).length > 0) {
      setErrorMessages(newErrorMessages);
      return;
    }

    try {
      // Send a PUT request to update the client in the database
      const response = await axios.put('http://localhost/myapp_backend/editclient.php', editedClient);
      console.log('Response from server:', response.data);
      if (response.data.success) {
        // If update is successful, update the clients state with updated data
        const updatedClients = clients.map(client => {
          if (client.Client_ID === editedClient.Client_ID) {
            return editedClient;
          }
          return client;
        });
        setClients(updatedClients);
        setEditingId(null); // Exit editing mode
        setErrorMessages({}); // Clear error messages
      } else {
        setErrorMessages({ general: response.data.message || 'Error updating client.' });
        console.error('Error updating client:', response.data.message);
      }
    } catch (error) {
      setErrorMessages({ general: 'Error updating client.' });
      console.error('Error updating client:', error);
    }
  };

  const handleInputChange = (clientId, columnName, value) => {
    const updatedClients = clients.map(client => {
      if (client.Client_ID === clientId) {
        return { ...client, [columnName]: value };
      }
      return client;
    });
    setClients(updatedClients);
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
          {clients.map((client) => (
            <tr key={client.Client_ID} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              {columns.map((column) => (
                <td key={column} className="px-6 py-4">
                  {editingId === client.Client_ID ? (
                    <div>
                      <input
                        type={column === 'Email' ? 'email' : 'text'}
                        value={client[column]}
                        onChange={(e) => handleInputChange(client.Client_ID, column, e.target.value)}
                      />
                      {errorMessages[column] && (
                        <p className="text-red-500">{errorMessages[column]}</p>
                      )}
                    </div>
                  ) : (
                    client[column]
                  )}
                </td>
              ))}
              <td>
                {editingId === client.Client_ID ? (
                  <button className='rounded-lg bg-blue-400 mb-5 mr-5 text-white' onClick={() => handleSave(client)}>Save</button>
                ) : (
                  <button className='rounded-lg bg-green-400 mb-5 text-white' onClick={() => handleEdit(client.Client_ID)}>Edit</button>
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

