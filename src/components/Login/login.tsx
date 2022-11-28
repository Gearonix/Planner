import React, {useEffect, useState} from 'react'
import {Formik, Form, Field, useFormik} from 'formik';
import {Input,Button,Error} from "./login.styles";
import {useDispatch, useSelector} from "react-redux";
import { getOrCreateUser } from '../../reducers/loginReducer';
import { globalDispatch, StateType } from '../../store';
import {Link, useNavigate} from "react-router-dom";
import {loginValidator} from "../../validate";


export type formValues = {
    email : string,
    password : string
}

type LoginProps = {
    isRegistration : boolean
}

const Login  = ({isRegistration} : LoginProps) => {


    const pageName = isRegistration ? '/login' : '/register'
    const initialValues : formValues = {email: '',password:''}
    const [globError,setError] = useState(null)
    const dispatch= useDispatch<globalDispatch>()

    const user_id = useSelector((state : StateType) => state.userData.user_id)

    const onSubmit = async (data : formValues) => {
        const {payload} = await dispatch(getOrCreateUser({...data,isRegistration}))
        // @ts-ignore
        if (payload) setError(payload)
    }
    const navigate = useNavigate()
    useEffect(() => {
        if (user_id) navigate('/')
    },[user_id])

    const formik = useFormik({initialValues,
        onSubmit,validate: loginValidator,validateOnBlur: true,validateOnChange : false})
    return <div>
      login
        <Input type="text" name={'email'} onChange={formik.handleChange('email')}
           value={formik.values['email']} onBlur={formik.handleBlur}/>
        <Error>{formik.errors.email}</Error>
        <input type="text" name={'password'} onChange={formik.handleChange('password')}
               value={formik.values['password']} onBlur={formik.handleBlur}/>
        <Error>{formik.errors.password}</Error>
        {/*@ts-ignore*/}
        <Button onClick={formik.handleSubmit} type={'submit'}>submit</Button>
        <Error>{globError}</Error>
        <Link to={pageName}>{pageName.slice(1)}</Link>
    </div>
}





export default Login
