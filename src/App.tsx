import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import Login from "./components/Login/login";
import Main from './components/Main/main';
import Profile from "./components/Profile/profile";
import {useDispatch} from "react-redux";
import {getAuth} from "./reducers/userDataReducer";


function App() {
    const dispatch = useDispatch()
    const [isUserLoading, setUserLoading] = useState(true)
    // @ts-ignore
    useEffect(() => {
        dispatch(getAuth()).then(() => setUserLoading(false))
    })
    return isUserLoading ? null : (
        <div className="App">
            <Routes>
                <Route path={'/login'} element={<Login isRegistration={false}/>}/>
                <Route path={'/signup'} element={<Login isRegistration={true}/>}/>
                <Route path={'/users/me'} element={<Profile/>}/>
                <Route path={'*'} element={<Main/>}/>
            </Routes>
        </div>
    )
}

export default App;
