import React, { useState ,useEffect} from 'react';

import axios from 'axios';

import styles from '../Style1.module.css'

const AdminDashboard = () => {

  const [designation, setDesignation] = useState('');

  const [employee, setEmployee] = useState('');
  
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');

  const [isHovered, setIsHovered] = useState(false);

  const [designations, setDesignations] = useState([]);

  const [employees, setEmployees] = useState([]);

 

  useEffect(() => {

    // Fetch designations from PHP backend on component mount

    const fetchDesignations = async () => {

      try {

        const response = await axios.get('http://localhost/myapp_backend/admin.php');

        setDesignations(response.data);

      } catch (error) {

        console.error('Error fetching designations:', error);

      }

    };

 

    fetchDesignations();

  }, []);

 

  useEffect(() => {
    // Fetch employees based on selected designation
    const fetchEmployees = async () => {
      if (designation) {
        try {
          const response = await axios.get(`http://localhost/myapp_backend/admin.php?designation=${designation}`);
          setEmployees(response.data);
        } catch (error) {
          console.error('Error fetching employees:', error);
        }
      } else {
        setEmployees([]);
      }
    };

    fetchEmployees();
  }, [designation]);




  const handleCreatePassword = async () => {

    if (!designation || !employee || !password) {
      setMessage('Please fill in all fields');
      return;
    }

    try {

      const response = await axios.post('http://localhost/myapp_backend/admin.php', {

        designation,
        employee,
        password,

      });

      setMessage(response.data.message);

    } catch (error) {

      setMessage('Error creating password');

    }

  };

 

  return (

    <div className='bg-white w-3/5 mx-auto ' style={{ textAlign: 'center', marginTop: '8rem' }}>

      <h1 className='text-black pb-2  pt-5 pb-3'>Welcome Admin!</h1>

      <div className='text-white' style={{ margin: '20px' }}>
        

        <label htmlFor="designation">Choose Designation: </label>

        <select

          style={{ fontSize: '18px' }}

          className={`${styles.input} bg-gray-700 rounded`}

          id="designation"

          value={designation}

          onChange={(e) => setDesignation(e.target.value)}

        >

          <option value="" style={{ fontSize: '18px' }}>Select Designation</option>

          {designations.map((desig, index) => (

            <option key={index} value={desig}>

              {desig}

            </option>

          ))}

        </select>

      </div>



      <div  className='text-white'  style={{ margin: '20px' }}>

      <label htmlFor="employee">Choose Employee: </label>
        <select
          style={{ fontSize: '18px' }}
          className={`${styles.input} bg-gray-700 rounded`}
          id="employee"
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
        >
          <option value="" style={{ fontSize: '18px' }}>Select Employee</option>
          {employees.map((emp, index) => (
            <option key={index} value={emp}>
              {emp}
            </option>
          ))}
        </select>

</div>

          

      <div className='pb-2 pt-3' style={{ margin: '20px' }}>

        <label htmlFor="password">Password: </label>

        <input
         className={`${styles.input}`}
           style={{ width: "9rem" }}

          type="password"

          id="password"

          value={password}
          
          required

          onChange={(e) => setPassword(e.target.value)}

        />

      </div>

      <button

          className="btn button mb-5"

          type="submit"

          style={{

            fontFamily: 'Nunito, sans-serif',

            fontSize: '22px',

            fontWeight: 'bold',

            padding: '0.5rem',

            borderRadius: '0.5rem',

            color: '#fff',

            width: '50%',

           marginBottom:'30px',

            background: isHovered

              ? 'linear-gradient(to left, rgb(36, 243, 91), rgb(21, 138, 70))'

              : 'linear-gradient(to right, rgb(36, 243, 91), rgb(21, 138, 70))',

            marginTop: '2rem',

          }}

          onMouseEnter={() => setIsHovered(true)}

          onMouseLeave={() => setIsHovered(false)}

          onClick={handleCreatePassword}

        >

          Create User

        </button>

      {message && <p>{message}</p>}

    </div>

  );

};

 

export default AdminDashboard;


