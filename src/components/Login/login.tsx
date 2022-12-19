import React, {useEffect, useState} from 'react'
import {useFormik} from 'formik';
import {
    Button,
    ButtonContainer,
    ButtonInner,
    ButtonTitle,
    Error,
    Input,
    InputTitle,
    LinkContainer,
    LoginSection,
    LoginTitle,
    LoginWrapper,
    SwitchPageLink,
    WelcomeBack
} from "./login.styles";
import {useDispatch, useSelector} from "react-redux";
import {getOrCreateUser} from '../../reducers/userDataReducer';
import {DispatchType} from '../../global/store';
import {Link, useNavigate} from "react-router-dom";
import {loginValidator} from "../../helpers/validate";
import {loginFormValues, LoginProps} from "../../global/types/components/loginTypes";
import {OutlinedInput} from "@mui/material";
import {CheckBox} from '../others/components';
import {SpaceBackground} from "../others/SpaceBackground/spaceBackground";
import Selectors from '../../helpers/selectors';

const Login: React.FC<LoginProps> = ({isRegistration}) => {
    const pageName = isRegistration ? '/login' : '/signup'
    const rememberMe = JSON.parse(localStorage.getItem('rememberMe') || 'true')
    const [error, setError] = useState(null)
    const dispatch = useDispatch<DispatchType>()
    const user_id = useSelector(Selectors.userId)
    const navigate = useNavigate()
    const onSubmit = async (data: loginFormValues) => {
        const {payload} = await dispatch(getOrCreateUser({...data, isRegistration}))
        if (payload) setError(payload)
    }
    useEffect(() => {
        if (user_id) navigate('/')
    }, [user_id])
    const {handleChange, values, errors, ...formik} =
        useFormik({
            initialValues: {email: '', password: '', rememberMe}, onSubmit,
            validate: loginValidator, validateOnBlur: true, validateOnChange: false
        })

    return <SpaceBackground>
        <LoginSection>
            <LoginWrapper>
                <WelcomeBack>Welcome back</WelcomeBack>
                <LoginTitle>{!isRegistration ? 'Login to your account' : 'Create an account'}</LoginTitle>
                <InputTitle>Email</InputTitle>

                <Input id="outlined-basic" variant="outlined" fullWidth placeholder={'Email'}
                       onChange={handleChange('email')} value={values.email}/>

                <Error>{errors.email}</Error>
                <InputTitle>Password</InputTitle>
                <Input id="outlined-basic"
                       variant="outlined" fullWidth placeholder={'Password'}
                       as={OutlinedInput} onChange={handleChange('password')} value={values.password}/>
                <Error>{errors.password || error}</Error>
                <CheckBox title={'Remember me'} darkMode={true} checked={values.rememberMe}
                          handler={(val: boolean) => formik.setFieldValue('rememberMe', val)}/>
                <ButtonContainer>
                    <Button onClick={() => formik.handleSubmit()}>
                        <ButtonTitle>{!isRegistration ? 'Login now' : 'Sign Up'}</ButtonTitle>
                        <ButtonInner isPink={isRegistration}/>
                    </Button>
                </ButtonContainer>
                <LinkContainer>
                    <SwitchPageLink>
                        <Link to={pageName}>
                            {isRegistration ? 'Already have an account?' : 'Dont have an account?'}
                            <span style={{color: '#499AEE'}}>Join free today</span></Link>
                    </SwitchPageLink>
                </LinkContainer>
            </LoginWrapper>
        </LoginSection>
    </SpaceBackground>
}
export default Login
