import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import {useSelector} from "react-redux";
import { StateType } from '../../store';

const Main = () => {
    const user_id = useSelector((state : StateType) => state.userData.user_id)
    const navigate = useNavigate()
    useEffect(() => {
        if (!user_id) return navigate('/login')
    })


    return <>main</>
}



export default Main
