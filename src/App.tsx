import React, {useEffect, useState} from 'react';
import {Routes, Route, useNavigate} from "react-router-dom";
import Login from "./components/Login/login";
import Main from './components/Main/main';
import Profile from "./components/Profile/profile";
import {useDispatch, useSelector} from "react-redux";
import {getAuth} from "./reducers/userDataReducer";
import DayCalendar from "./components/Main/DayCalendar/dayCalendar";
import MonthCalendar from "./components/Main/MonthCalendar/MonthCalendar";
import {StateType} from "./global/store";
import 'react-calendar/dist/Calendar.css';


function App() {
    const dispatch = useDispatch()
    const [isUserLoading,setUserLoading] = useState(true)
    const user_id = useSelector((state : StateType) => state.userData.user_id)
    const navigate = useNavigate()
    useEffect(() => {
        // @ts-ignore
        dispatch(getAuth())

        .then(() =>  setUserLoading(false))
    }

        )
  return isUserLoading ? null : (
    <div className="App">
        <Routes>
          <Route path={'/login'} element={<Login isRegistration={false}/>}/>
          <Route path={'/signup'} element={<Login isRegistration={true} />} />
          <Route path={'/users/me'} element={<Profile/>}/>
          <Route path={'*'} element={<Main/>}/>
        </Routes>
    </div>
  )
}

export default App;
