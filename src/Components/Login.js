import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Login = () => {
 
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  
  
  return (
    <section className="lg:w-3/6 mx-auto " style={{marginTop:'5rem'}}>
      <h1 className="text-3xl font-bold mb-4">Sign In</h1>
      <form >
        <label htmlFor="username">Email:</label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          required
          className="h-1/2 sm:w-1 !important"
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          required
          className="h-1/2 w-100"
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
