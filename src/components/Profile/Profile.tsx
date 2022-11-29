import React, {useEffect, useState} from 'react';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import { StateType } from '../../store';
import { Input } from './Profile.styles';
import {changePasswordValidator, profileValidator } from '../../validate';
import {useNavigate} from "react-router-dom";
import {changeUserName, changeUserPassword, updateUserImage, uploadFile} from "../../reducers/loginReducer";
import {FILES_LOCATION} from "../../constants";


export type profileFormType = {
    userName : string
}
export type setUserImageType = {
    user_id : string,
    filename : string
}



const Profile = () => {
    const {userName,user_id,userImage,
    email,password} = useSelector((state : StateType) => state.userData)
    const initialValues : profileFormType = {userName : userName || ''}
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isPasswordOpened,openPasswordComp] = useState(false)
    useEffect(() => {
        if (!user_id) navigate('/login')
    })

    const onSubmit = (formData : profileFormType) => {
        if (formData.userName == userName) return
        // @ts-ignore
        dispatch(changeUserName(formData))
    }
    const changeAvatar = async (e : any) => {

        if (e.target.files.length>0) {
            // @ts-ignore
            const {payload : filename} = await dispatch(uploadFile(e.target.files[0]))
            if (!filename) return
            // @ts-ignore
            dispatch(updateUserImage({user_id,filename}))
        }
    }


    const formik = useFormik({initialValues,onSubmit,validateOnChange : false,
        validate: profileValidator})

    return <>
    {/*@ts-ignore*/}
    <Input value={formik.values.userName} onChange={formik.handleChange} onBlur={formik.handleSubmit}
           type={'text'} name={'userName'}/>
    <span>{formik.errors.userName}</span>
        <input type="file" onChange={changeAvatar} />
        {userImage ? <img src={FILES_LOCATION +  userImage} alt=""/> : null}
    <button onClick={() => openPasswordComp(!isPasswordOpened)}>change password</button>
        {!isPasswordOpened || <ChangePassword/>}
    </>
}

export type changePassFormType = {
    nextPassword : string,
    repeatPassword : string
}
export type passwordFormType = {
    nextPassword : string,
    repeatPassword : string,
    user_id : string
}

const ChangePassword = () => {
    const {password : currentPassword,user_id} = useSelector((state :StateType) => state.userData)
    const dispatch = useDispatch()
    const initialValues : changePassFormType = {
        nextPassword : '',
        repeatPassword : ''
    }
    const onSubmit = (data : changePassFormType) => {
        // @ts-ignore
        dispatch(changeUserPassword({...data,user_id}))
    }


    const {values,handleChange,handleSubmit,errors} = useFormik({initialValues,onSubmit,
        validateOnChange:false,validateOnBlur : false,validate: changePasswordValidator})
    return <div>
        <span>current password: {currentPassword}</span>
        <Input value={values.nextPassword} onChange={handleChange} name={'nextPassword'}/>
        <Input value={values.repeatPassword} onChange={handleChange} name={'repeatPassword'}/>
        {/*@ts-ignore*/}
        <button type={'submit'} onClick={handleSubmit}>submit changes</button>
        {errors.nextPassword}
        {errors.repeatPassword}
    </div>
}





export default Profile
