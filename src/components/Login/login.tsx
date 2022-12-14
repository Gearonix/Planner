import React, {useEffect, useState} from 'react'
import {useFormik} from 'formik';
import {useDispatch, useSelector} from "react-redux";
import {getOrCreateUser} from '../../setup/reducers/userDataReducer';
import {DispatchType} from '../../setup/store';
import {useNavigate} from "react-router-dom";
import {loginValidator} from "../../utils/validate";
import {loginFormValues, LoginProps} from "./others/loginTypes";
import Selectors from '../../helpers/selectors';
import LoginRender from './loginRender';
import {useTranslation} from "react-i18next";

const Login: React.FC<LoginProps> = ({isRegistration}) => {
    const dispatch = useDispatch<DispatchType>()
    const user_id = useSelector(Selectors.userId)
    const [error, setError] = useState<null | string>(null)
    const navigate = useNavigate()
    const {i18n} = useTranslation()

    useEffect(() => {
        if (user_id) navigate('/')
    }, [user_id])

    const pageName = isRegistration ? '/login' : '/signup'
    const rememberMe = JSON.parse(localStorage.getItem('rememberMe') || 'true')

    const onSubmit = async (data: loginFormValues) => {
        const {payload} = await dispatch(getOrCreateUser({...data, isRegistration}))
        if (payload) setError(payload)
    }

    const formikParams = {
        initialValues: {email: '', password: '', rememberMe}, onSubmit,
        validate: loginValidator, validateOnBlur: true, validateOnChange: false
    }

    const changeLanguage = () => {
        const isEnglish = i18n.language == 'en'
        i18n.changeLanguage(isEnglish ? 'ru' : 'en')
    }

    const formik = useFormik(formikParams)

    return <LoginRender error={error} formik={formik} isRegistration={isRegistration} pageName={pageName}
                        changeLanguage={changeLanguage}/>
}
export default Login
