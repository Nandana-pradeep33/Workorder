
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './Components/Login';
import Admin from './Components/Admin';
import User from './Components/User';
import Reset from './Components/Reset';
import Project from './Components/Project';
import Employee from './Components/Employee';
import Client from './Components/Client';
import AdminDashboard from './Components/Admindashboard';
import ViewProject from './Components/ViewProject';
import ViewClient from './Components/ViewClient';
import ViewEmployee from './Components/ViewEmployee';
import Assign from './Components/Assign';
import ViewAssign from './Components/ViewAssign';



import ViewLead from './Components/ViewLead';
import ViewProposal from './Components/ViewProposal';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"  element={<Login/>} />
        <Route path="/admin"  element={<Admin/>}/>
        <Route path='/admin1' element={<AdminDashboard/>}/>
        <Route path="/user"  element={<User/>}/>
        <Route path="/reset" element={<Reset/>}/>
        <Route path='/admin/client' element={<Client/>}/>
        <Route path='/admin/project' element={<Project/>}/>
        <Route path='/admin/employee'element={<Employee/>}/>
        <Route path='/admin/viewpr'  element={<ViewProject/>}/>
        <Route path='/admin/viewcl'  element={<ViewClient/>}/>
        <Route path='/admin/viewem'  element={<ViewEmployee/>}/>
        <Route path='/admin/assign' element={<Assign/>}/>
        <Route path='/admin/viewas' element={<ViewAssign/>}/>


        <Route path='/user/viewproposal' element={<ViewProposal/>}/>
        <Route path='/admin1/viewlead' element={<ViewLead/>}/>


        
      </Routes>
    </Router>
  );
}

export default App;
