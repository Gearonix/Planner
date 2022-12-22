import React from 'react'
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
} from "./others/login.styles";
import {OutlinedInput} from "@mui/material";
import {CheckBox} from "../others/materialUI/buttonsAndInputs";
import {Link} from "react-router-dom";
import {SpaceBackground} from "../others/SpaceBackground/spaceBackground";
import {loginRenderType} from './others/loginTypes';


const LoginRender: React.FC<loginRenderType> = ({formik, isRegistration, pageName, error}) => {
    const {handleChange, values, errors} = formik
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

export default LoginRender
