import React, {useEffect, useState} from 'react';
import './App.css';
import {Routes,Route} from "react-router-dom";
import Login from "./components/Login/login";
import Main from './components/Main/main';
import Profile from "./components/Profile/Profile";
import {useDispatch} from "react-redux";
import {getAuth} from "./reducers/loginReducer";
import {randomizeColors} from "./tools";



function App() {
    const dispatch = useDispatch()
    const [isUserLoading,setUserLoading] = useState(true)
    useEffect(() => {
        // @ts-ignore
        dispatch(getAuth()).then(() =>  setUserLoading(false))})
  return isUserLoading ? null : (
    <div className="App">
        <Routes>
          <Route path={'/login'} element={<Login isRegistration={false}/>}/>
          <Route path={'/signup'} element={<Login isRegistration={true} />} />
          <Route path={'/'} element={<Main/>}/>
          <Route path={'/users/me'} element={<Profile/>}/>
        </Routes>
    </div>
  )
}

export default App;
