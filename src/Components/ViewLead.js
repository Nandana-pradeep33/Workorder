
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewLead = () => {
  const [proposals, setProposals] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await axios.get('http://localhost/myapp_backend/view_proposals.php');
        if (Array.isArray(response.data) && response.data.length > 0) {
          const keys = Object.keys(response.data[0]);
          setColumns(keys.filter(key => key !== 'Proposal_ID' && key !== 'remark' && key !== 'viewed'));
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

  const handleAccept = async (proposalId) => {
    try {
      const response = await axios.post('http://localhost/myapp_backend/accept_proposal.php', { id: proposalId });
      if (response.data.success) {
        setProposals((prevProposals) =>
          prevProposals.map((proposal) =>
            proposal.Proposal_ID === proposalId ? { ...proposal, remark: 'accepted' } : proposal
          )
        );
      } else {
        console.error('Error accepting proposal:', response.data.message);
      }
    } catch (error) {
      console.error('Error accepting proposal:', error);
    }
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
       {/*${proposal.existing === 'no' ? 'bg-yellow-100' : ''}*/}
          {proposals.map((proposal) => (
            <tr key={proposal.Proposal_ID} className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 `}>
              {columns.map((column) => (
                <td key={proposal.existing} className={`px-6 py-4 ${column === 'existing' && proposal[column] === 'no' ? 'border-2 border-yellow-500' : ''}`}>
                  {proposal[column]}
                </td>
              ))}
              <td className="px-6 py-4">
                {proposal.remark === 'accepted' ? (
                  <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded mb-5" disabled style={{fontStyle:'italic'}}>
                    Accepted
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5"
                    onClick={() => handleAccept(proposal.Proposal_ID)}
                  >
                    Accept
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewLead;











