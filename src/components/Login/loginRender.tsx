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
import {useTranslation} from "react-i18next";


const LoginRender: React.FC<loginRenderType> = ({formik, isRegistration, pageName, error}) => {
    const {handleChange, values, errors} = formik
    const {t} = useTranslation()
    return <SpaceBackground>
        <LoginSection>
            <LoginWrapper>
                <WelcomeBack>{t('welcomeBack')}</WelcomeBack>
                <LoginTitle>{!isRegistration ? t('loginToAccount') : t('createAccount')}</LoginTitle>
                <InputTitle>Email</InputTitle>

                <Input id="outlined-basic" variant="outlined" fullWidth placeholder={t('email') || ''}
                       onChange={handleChange('email')} value={values.email}/>

                <Error>{errors.email}</Error>
                <InputTitle>{t('password')}</InputTitle>
                <Input id="outlined-basic"
                       variant="outlined" fullWidth placeholder={t('password') || ''}
                       as={OutlinedInput} onChange={handleChange('password')} value={values.password}/>
                <Error>{errors.password || error}</Error>
                <CheckBox title={t('rememberMe')} darkMode={true} checked={values.rememberMe}
                          handler={(val: boolean) => formik.setFieldValue('rememberMe', val)}/>
                <ButtonContainer>
                    <Button onClick={() => formik.handleSubmit()}>
                        <ButtonTitle>{!isRegistration ? t('loginNow') : t('signUp')}</ButtonTitle>
                        <ButtonInner isPink={isRegistration}/>
                    </Button>
                </ButtonContainer>
                <LinkContainer>
                    <SwitchPageLink>
                        <Link to={pageName}>
                            {isRegistration ? t('alreadyHaveAccount') : t('noAccount')}
                            <span style={{color: '#499AEE'}}> {t('joinFree')}</span></Link>
                    </SwitchPageLink>
                </LinkContainer>
            </LoginWrapper>
        </LoginSection>
    </SpaceBackground>
}

export default LoginRender
