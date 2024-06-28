import React, { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import "../App.css";

import styles from '../Style1.module.css'

const Login = () => {

  const [user, setUser] = useState("");

  const [pwd, setPwd] = useState("");

  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

 

  const handleSubmit = async (e) => {

    e.preventDefault();

 

    try {

      const response = await axios.post("http://localhost/myapp_backend/login.php", {

        username: user,

        password: pwd

      });

      const resData = response.data;

      alert(resData.message);

      if (resData.success) {

       localStorage.setItem('username',user );

       

       

        if (resData.isAdmin) {

          navigate("/admin1"); // Redirect to admin page

        } else {

          navigate("/user"); // Redirect to user page

        }

      } else {

        alert(resData.message);

      }

    } catch (error) {

      console.error("There was an error logging in!", error);

      alert("There was an error logging in!");

    }

  };

 

  return (

   

        <section className={`${styles.section} lg:w-3/5  mx-auto mt-5`} style={{marginTop:'7rem'}}>

      <h1 className="text-3xl font-bold mb-4">Sign In</h1>

      <form   className={`${styles.form}`} onSubmit={handleSubmit}>

        <label htmlFor="username">Username:</label>

        <input

          type="text"

          id="username"

          autoComplete="off"

          onChange={(e) => setUser(e.target.value)}

          required

          className={` ${styles.input} h-1/2 w-1/2 sm:w-1 !important`}

        />

        <label htmlFor="password">Password:</label>

        <input

          type="password"

          id="password"

          onChange={(e) => setPwd(e.target.value)}

          required  

          className={` ${styles.input} h-1/2 w-1/2 sm:w-1 !important`}

        />

        <button

          className="btn button"

          type="submit"

          style={{

            fontFamily: 'Nunito, sans-serif',

            fontSize: '22px',

            fontWeight: 'bold',

            padding: '0.5rem',

            borderRadius: '0.5rem',

            color: '#fff',

            width: '60%',

            margin: '0 auto',

            background: isHovered

              ? 'linear-gradient(to left, rgb(36, 243, 91), rgb(21, 138, 70))'

              : 'linear-gradient(to right, rgb(36, 243, 91), rgb(21, 138, 70))',

            marginTop: '2rem',

          }}

          onMouseEnter={() => setIsHovered(true)}

          onMouseLeave={() => setIsHovered(false)}

        >

          Sign In

        </button>

        <label htmlFor="persist" style={{ fontSize: '19px' }}>

          <input

            type="checkbox"

            className="pr-5"

          />

          Remember Me

        </label>

      </form>

    </section>

  );

};

 

export default Login;












