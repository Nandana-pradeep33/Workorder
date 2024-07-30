import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewProposal = () => {
  const [proposals, setProposals] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await axios.get('http://localhost/myapp_backend/view_userprop.php');
        if (Array.isArray(response.data) && response.data.length > 0) {
          const keys = Object.keys(response.data[0]);
          setColumns(keys.filter(key => key !== 'Proposal_ID' ));
          setProposals(response.data);
        } else {
          console.error('Response data is not an array or is empty:', response.data);
        }
      } catch (error) {
        console.error('Error fetching proposals:', error);
      }
    };

    fetchProposals();
  }, []);

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
          </tr>
        </thead>
        <tbody>
          {proposals.map((proposal) => (
            <tr key={proposal.Proposal_ID} className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${proposal.viewed === 0 ? 'bg-yellow-100' : ''}`}>
              {columns.map((column) => (
                <td key={column} className={`px-6 py-4 ${column === 'existing' && proposal[column] === 'no' ? 'border-2 border-yellow-500' : ''}`}>
                {column === 'remark' ? (
                  <span className={proposal[column] ? 'text-green-500' : 'text-yellow-500'}>
                    {proposal[column] ? proposal[column] : 'waiting'}
                  </span>
                ) : (
                  proposal[column]
                )}
              </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewProposal;











