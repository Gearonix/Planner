import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getAuth} from "./setup/reducers/userDataReducer";
import {About, Login, Main} from './components'
import {DispatchType} from "./setup/store";
import i18next from "i18next";
import {initReactI18next} from "react-i18next";
import Translations from './helpers/translation';

i18next.use(initReactI18next).init(Translations)

function App() {
    const dispatch = useDispatch<DispatchType>()
    const [isUserLoading, setUserLoading] = useState(true)
    useEffect(() => {
        dispatch(getAuth()).then(() => setUserLoading(false))
    }, [])

    return isUserLoading ? null : (
        <div className="App">
            <Routes>
                <Route path={'/login'} element={<Login isRegistration={false}/>}/>
                <Route path={'/signup'} element={<Login isRegistration={true}/>}/>
                <Route path={'*'} element={<Main/>}/>
                <Route path={'/about'} element={<About/>}/>
            </Routes>
        </div>
    )
}

export default App;
