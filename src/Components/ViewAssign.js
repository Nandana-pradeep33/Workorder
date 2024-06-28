import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductTable = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost/myapp_backend/viewassign.php');
        setAssignments(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  // Function to group assignments by Project Type and Project Name
  const groupAssignments = () => {
    const grouped = {};
    assignments.forEach(assignment => {
      const key = `${assignment.proj_type}_${assignment.proj_name}`;
      if (!grouped[key]) {
        grouped[key] = {
          proj_type: assignment.proj_type,
          proj_name: assignment.proj_name,
          designations: {},
        };
      }
      if (!grouped[key].designations[assignment.emp_desig]) {
        grouped[key].designations[assignment.emp_desig] = [];
      }
      grouped[key].designations[assignment.emp_desig].push(assignment.emp_name);
    });
    return Object.values(grouped);
  };

  const groupedAssignments = groupAssignments();

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 border-r border-gray-300">
              Project Type
            </th>
            <th scope="col" className="px-6 py-3 border-r border-gray-300">
              Project Name
            </th>
            <th scope="col" className="px-6 py-3 border-r border-gray-300">
              Designation
            </th>
            <th scope="col" className="px-6 py-3">
              Employee Name
            </th>
          </tr>
        </thead>
        <tbody>
          {groupedAssignments.map((group, index) => (
            <React.Fragment key={index}>
              <tr className="bg-white">
                <td className="px-6 py-4 font-medium text-gray-900 border-r border-gray-300" rowSpan={Object.keys(group.designations).length + 1}>
                  {group.proj_type}
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300 border-r border-gray-300" rowSpan={Object.keys(group.designations).length + 1}>
                  {group.proj_name}
                </td>
                <td colSpan="2"></td>
              </tr>
              {Object.entries(group.designations).map(([designation, employees], idx) => (
                <tr key={idx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4 border-r border-gray-300">{designation}</td>
                  <td className="px-6 py-4">{employees.join(', ')}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
