import React, {useEffect, useState} from 'react'
import {Formik, Form, Field, useFormik} from 'formik';
import {Input,Button,Error, PageContainer, LoginWrapper, IconWrapper, LoginTitle, ButtonTitle, ButtonInner, SwitchPageLink, InputWrapper, InputPlaceholder} from "./login.styles";
import {useDispatch, useSelector} from "react-redux";
import { getOrCreateUser } from '../../reducers/loginReducer';
import { globalDispatch, StateType } from '../../store';
import {Link, useNavigate} from "react-router-dom";
import {loginValidator} from "../../validate";
import {GoGear} from 'react-icons/go'
import {FaHeart} from 'react-icons/fa'


export type loginFormValues = {
    email : string,
    password : string
}

type LoginProps = {
    isRegistration : boolean
}

const Login  = ({isRegistration} : LoginProps) => {


    const pageName = isRegistration ? '/login' : '/signup'
    const linkTitle = isRegistration ? 'Already have an account? Login!' :
        'Don’t have an account? Sign Up'
    const initialValues : loginFormValues = {email: '',password:''}
    const [globError,setError] = useState(null)
    const dispatch= useDispatch<globalDispatch>()

    const user_id = useSelector((state : StateType) => state.userData.user_id)

    const onSubmit = async (data : loginFormValues) => {
        const {payload} = await dispatch(getOrCreateUser({...data,isRegistration}))
        // @ts-ignore
        if (payload) setError(payload)
    }
    const navigate = useNavigate()

    const PageIcon = !isRegistration ? <GoGear style={{
        width: '90%',
        height: '100%',
        color : '#333'
        }} /> :
        <FaHeart  style={{
            width: '85%',
            height: '100%',
            color: '#f52c47'
        }}/>

    useEffect(() => {
        if (user_id) navigate('/')
    },[user_id])



    const formik = useFormik({initialValues,
        onSubmit,validate: loginValidator,validateOnBlur: true,validateOnChange : false})
    return <PageContainer>
        <LoginWrapper>
            <LoginTitle>{!isRegistration ? 'Welcome back.' : 'Create an account'}</LoginTitle>
            <IconWrapper>
                {PageIcon}
            </IconWrapper>
            <InputWrapper>
                <Input type="text" name={'email'} onChange={formik.handleChange('email')}
                       value={formik.values['email']} onBlur={formik.handleBlur}/>
                {formik.values.email ? null :   <InputPlaceholder>Email</InputPlaceholder>}
            </InputWrapper>

            <Error>{formik.errors.email}</Error>
            <InputWrapper>
                <Input type="text" name={'password'} onChange={formik.handleChange('password')}
                       value={formik.values['password']} onBlur={formik.handleBlur}/>
                {formik.values.password ? null :   <InputPlaceholder>Password</InputPlaceholder>}
            </InputWrapper>

            <Error>{formik.errors.password}</Error>
            {/*@ts-ignore*/}
            <Button onClick={formik.handleSubmit}>
                <ButtonTitle>{!isRegistration ? 'Login' : 'Sign Up'}</ButtonTitle>
                <ButtonInner isPink={isRegistration}/>
            </Button>
            <Error>{globError}</Error>
            <SwitchPageLink>
                <Link to={pageName}>{linkTitle}</Link>
            </SwitchPageLink>
        </LoginWrapper>

    </PageContainer>
}





export default Login
