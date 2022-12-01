import React, {useEffect, useState} from 'react'
import {Formik, Form, Field, useFormik} from 'formik';
import {InputElement,Button, PageContainer, LoginWrapper, IconWrapper, LoginTitle, ButtonTitle, ButtonInner, SwitchPageLink, InputWrapper, InputPlaceholder, Preloader, EyeIconWrapper, ErrorMessage, MainErrorMessage} from "./login.styles";
import {useDispatch, useSelector} from "react-redux";
import { getOrCreateUser } from '../../reducers/loginReducer';
import { globalDispatch, StateType } from '../../store';
import {Link, useNavigate} from "react-router-dom";
import {loginValidator} from "../../validate";
import {GoGear} from 'react-icons/go'
import {FaHeart} from 'react-icons/fa'
import { refType } from '../../types';
import {BsEyeFill,BsEyeSlashFill} from 'react-icons/bs'
import {IoMdAlert} from 'react-icons/io'
import { capitalizeFirstLetter } from '../../tools';




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

    const dispatch= useDispatch<globalDispatch>()

    const user_id = useSelector((state : StateType) => state.userData.user_id)

    const onSubmit = async (data : loginFormValues) => {
        setPreloader(true)
        const {payload} = await dispatch(getOrCreateUser({...data,isRegistration}))
        setPreloader(false)
        if (payload) setError(payload)
    }
    const navigate = useNavigate()

    const PageIcon = <IconWrapper>
        {!isRegistration ? <GoGear style={{
        width: '90%',
        height: '100%',
        color : '#333'
    }} /> :
        <FaHeart  style={{
            width: '85%',
            height: '100%',
            color: '#f52c47'
        }}/>}
    </IconWrapper>

    useEffect(() => {
        if (user_id) navigate('/')
    },[user_id])


    const formik = useFormik({initialValues,
        onSubmit,validate: loginValidator,validateOnBlur: true,validateOnChange : false})


    return   <PageContainer>
        <LoginWrapper>

            <LoginTitle>{!isRegistration ? 'Welcome back.' : 'Create an account'}</LoginTitle>
            {PageIcon}
            <Input formik={formik} name={'email'}/>
            <Input formik={formik} name={'password'}/>
            {!isLoading || <LoginPreloader />}
            {/*@ts-ignore*/}

            <Button onClick={formik.handleSubmit}>
                <ButtonTitle>{!isRegistration ? 'Login' : 'Sign Up'}</ButtonTitle>
                <ButtonInner isPink={isRegistration}/>
            </Button>

            <MainErrorMessage>{globError}</MainErrorMessage>
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


const Error = ({message} : {message : string | void}) => {
    const ErrorMessageRef = React.createRef()
    return  !message ? null : <>
        {/*@ts-ignore*/}
        <ErrorMessage ref={ErrorMessageRef}>
            {message}
    </ErrorMessage>
    <EyeIconWrapper onMouseOver={() => {
        // @ts-ignore
        ErrorMessageRef.current.style.opacity = '1'

    }} onMouseOut={() => {
        // @ts-ignore
        ErrorMessageRef.current.style.opacity = '0'

    }
    }>
        <IoMdAlert style={{color : 'red',width: '14px',
            height: '14px'}}/>
    </EyeIconWrapper>

    </>
}

const Input = ({formik,name} : {formik: any,name : string}) => {
    const InputRef : refType = React.createRef()
    const [isPasswordOpened,openPassword] = useState(false)
    const ErrorPin = name == 'password' ? <EyeIconWrapper onClick={() => {
        openPassword(!isPasswordOpened)
    }}>{isPasswordOpened ? <BsEyeSlashFill/> : <BsEyeFill/> }
    </EyeIconWrapper> : null

    return  <InputWrapper>
        <InputElement type="text" name={name} onChange={formik.handleChange(name)}
                      value={formik.values[name]}
                      onBlur={formik.handleBlur} autoComplete={'off'} ref={InputRef}
                      isPassword={name == 'password' && !isPasswordOpened}/>
        {formik.values[name] ? null :   <InputPlaceholder
            onClick={() => {InputRef.current?.focus()}} >{capitalizeFirstLetter(name)}</InputPlaceholder>}

        {formik.errors[name] ? <Error message={formik.errors[name]}/> : ErrorPin }

    </InputWrapper>
}



export default Login
