import React from 'react';
import './App.css';
import {Routes,Route} from "react-router-dom";
import Login from "./components/Login/login";
import Register from "./components/Register/register";
import Main from './components/Main/main';
import Profile from "./components/Profile/Profile";

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path={'/login'} element={<Login isRegistration={false}/>}/>
          <Route path={'/signup'} element={<Login isRegistration={true} />} />
          <Route path={'/'} element={<Main/>}/>
          <Route path={'/users/me'} element={<Profile/>}/>
        </Routes>
    </div>
  );
}

export default App;
