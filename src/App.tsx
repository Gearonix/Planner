import React from 'react';
import './App.css';
import {Routes,Route} from "react-router-dom";
import Login from "./components/Login/login";
import Register from "./components/Register/register";
import Main from './components/Main/main';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path={'/login'} element={<Login isRegistration={false}/>}/>
          <Route path={'/register'} element={<Login isRegistration={true} />} />
          <Route path={'/'} element={<Main/>}/>
        </Routes>
    </div>
  );
}

export default App;
