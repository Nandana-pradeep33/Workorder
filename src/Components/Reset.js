import React, { useState, useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";

import axios from 'axios';

import styles from '../Style1.module.css'

const ResetPassword = () => {

  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

 

  const [errMsg, setErrMsg] = useState("");

 

  const handleResetPassword = async (e) => {

    e.preventDefault();

    const loggedInUser = localStorage.getItem('username'); // Retrieve username from local storage

    console.log(loggedInUser);

    if (newPassword !== confirmPassword) {

      setErrMsg("Passwords do not match");

      return;

    }

 

    try {

      const response = await axios.post('http://localhost/myapp_backend/reset-password.php', {

        newPassword,

        confirmPassword,

        loggedInUser

      });

 

      if (response.data.message === 'Password updated successfully') {

        navigate('/'); // Navigate to a success page or show a success message

      } else {

        setErrMsg(response.data.message);

      }

    } catch (error) {

      setErrMsg('Error updating password');

    }

  };






  return (

    <section className={` ${styles.section} p-8 lg:w-3/5 mx-auto mt-5`} style={{ marginTop: '5rem' }}>

      <h1 className="text-3xl font-bold mb-4">Reset Password</h1>

      <form className={` ${styles.form} mb-6`}   onSubmit={handleResetPassword} >

        <div className="mb-4">

          <label htmlFor="user" className="block text-sm font-semibold mb-1">

            New Password :

          </label>

          <input

            type="password"

            id="newPassword"

            value={newPassword}

            onChange={(e) => setNewPassword(e.target.value)}

            className= {`${styles.input}  sm:w-48 !important border rounded-md py-3 px-5 h-1/2 focus:outline-none focus:border-blue-400`}

          />

        </div>

        <div>

          <div className="mb-4">

            <label htmlFor="pwd" className="block text-sm font-semibold mb-1">

              Confirm Password

            </label>

            <input

             

             type="password"

              id="confirmPassword"

              value={confirmPassword}

              onChange={(e) => setConfirmPassword(e.target.value)}

              className= {`${styles.input}  sm:w-48 !important border rounded-md py-3 px-5 h-1/2 focus:outline-none focus:border-blue-400`}

            />

          </div>

          <button

            type="submit"

            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"

          >

            Reset Password

          </button>

        </div>

      </form>

      {errMsg && (

        <p className="bg-red-100 text-red-700 py-2 px-4 mb-4">{errMsg}</p>

      )}

    </section>

  );

};

 

export default ResetPassword;


