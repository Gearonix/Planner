import React, {useEffect, useState} from 'react'
import {Formik, Form, Field, useFormik} from 'formik';
import {Input,Button,Error, PageContainer, LoginWrapper, IconWrapper, LoginTitle, ButtonTitle, ButtonInner, SwitchPageLink, InputWrapper, InputPlaceholder, Preloader, EyeIconWrapper} from "./login.styles";
import {useDispatch, useSelector} from "react-redux";
import { getOrCreateUser } from '../../reducers/loginReducer';
import { globalDispatch, StateType } from '../../store';
import {Link, useNavigate} from "react-router-dom";
import {loginValidator} from "../../validate";
import {GoGear} from 'react-icons/go'
import {FaHeart} from 'react-icons/fa'
import { refType } from '../../types';
import {BsEyeFill,BsEyeSlashFill} from 'react-icons/bs'

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

    const [isLoading,setPreloader] = useState(false)
    const [isPasswordOpened,switchInputPassType] = useState(false)

    const dispatch= useDispatch<globalDispatch>()

    const user_id = useSelector((state : StateType) => state.userData.user_id)

    const onSubmit = async (data : loginFormValues) => {
        setPreloader(true)
        const {payload} = await dispatch(getOrCreateUser({...data,isRegistration}))
        setPreloader(false)
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



    const emailInputRef : refType = React.createRef();
    const passwordInputRef  : refType= React.createRef()


    return   <PageContainer>
        <LoginWrapper>

            <LoginTitle>{!isRegistration ? 'Welcome back.' : 'Create an account'}</LoginTitle>
            <IconWrapper>
                {PageIcon}
            </IconWrapper>
            <InputWrapper>
                <Input type="text" name={'email'} onChange={formik.handleChange('email')}
                       value={formik.values['email']}
                       onBlur={formik.handleBlur} autoComplete={'off'} ref={emailInputRef}
                isPassword={false}/>
                       {/*@ts-ignore*/}
                {formik.values.email ? null :   <InputPlaceholder
                    onClick={() => {emailInputRef.current?.focus()}} >Email</InputPlaceholder>}
            </InputWrapper>

            <Error>{formik.errors.email}</Error>
            <InputWrapper>
                <Input type={'text'} name={'password'} onChange={formik.handleChange('password')}
                       value={formik.values['password']}
                       onBlur={formik.handleBlur} autoComplete={'off'} ref={passwordInputRef}
                       isPassword={!isPasswordOpened}/>
                {formik.values.password ? null :   <InputPlaceholder onClick={() => {passwordInputRef.current?.focus()}}>Password</InputPlaceholder>}
                <EyeIconWrapper onClick={() => {
                    switchInputPassType(!isPasswordOpened)
                }}>
                    {isPasswordOpened ? <BsEyeSlashFill/> : <BsEyeFill/> }
                </EyeIconWrapper>
            </InputWrapper>

            <Error>{formik.errors.password}</Error>

            {!isLoading || <LoginPreloader />}


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

const LoginPreloader = () => <Preloader>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</Preloader>




export default Login
