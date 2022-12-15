import React, {useEffect, useState} from 'react';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {
    AvatarButton,
    AvatarButtonTitle,
    ChangePasswordBlock,
    EmptyAvatar,
    EmptyAvatarTitle,
    FieldBlock,
    FieldInput,
    FieldsContainer,
    FieldTitle,
    GreyLine,
    InnerContainer,
    MainContent,
    PasswordBlock,
    PasswordButton,
    PasswordButtons,
    PasswordInput,
    PasswordInputsBlock,
    ProfileTitle,
    ProfileWrapper,
    SmallerTitle,
    UserAvatarBlock,
    UserImageElement
} from './profile.styles';
import {changePasswordValidator, profileValidator} from '../../helpers/validate';
import {useNavigate} from "react-router-dom";
import {
    changeUserName,
    changeUserPassword,
    logoutUser,
    updateUserImage,
    uploadFile
} from "../../reducers/userDataReducer";
import {FILES_LOCATION} from "../../global/constants";
import {StateType} from "../../global/types/types";
import {changePassFormType, profileFormType, userImageProps} from "../../global/types/components/profileTypes";


const Profile = () => {
    const {
        userName, user_id, userImage,
        email, password
    } = useSelector((state: StateType) => state.userData)
    const initialValues: profileFormType = {userName: userName || ''}
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isPasswordOpened, openPasswordComp] = useState(true)
    useEffect(() => {
        if (!user_id) navigate('/login')
    })

    const onSubmit = (formData : profileFormType) => {
        if (formData.userName == userName) return
        // @ts-ignore
        dispatch(changeUserName({...formData,user_id}))
    }
    const changeAvatar = async (e : any) => {

        if (e.target.files.length>0) {
            // @ts-ignore
            const {payload : filename} = await dispatch(uploadFile(
                {file : e.target.files[0], name : 'user_avatars'}))
            if (!filename) return
            // @ts-ignore
            dispatch(updateUserImage({user_id,filename}))
        }
    }


    // @ts-ignore
    const formik = useFormik({initialValues,onSubmit,validateOnChange : false, validate: profileValidator})

    return <>
        <ProfileWrapper>
            <MainContent>
               <ProfileTitle>Settings</ProfileTitle>
                <GreyLine/>
                <SmallerTitle>Profile Settings</SmallerTitle>
                <InnerContainer>
                    <UserAvatarBlock>
                        <UserImage size={232} fontSize={48}/>
                        <AvatarButton>
                            <AvatarButtonTitle>Edit</AvatarButtonTitle>
                            <input type="file" onChange={changeAvatar}/>
                        </AvatarButton>
                    </UserAvatarBlock>
                    <FieldsContainer>
                        <FieldBlock>
                            <FieldTitle>Username</FieldTitle>
                            {createInput(FieldInput,formik,'userName')}
                        </FieldBlock>
                        <FieldBlock>
                            <FieldTitle>Email</FieldTitle>
                            <FieldInput disabled value={email || ''}/>
                        </FieldBlock>
                        <FieldBlock>
                            <FieldTitle>Password</FieldTitle>
                            <ChangePasswordBlock>
                                <FieldInput isPassword={true} disabled value={password || ''}/>
                                <PasswordButton  onClick={() => openPasswordComp(!isPasswordOpened)}>
                                    Change password
                                </PasswordButton>
                            </ChangePasswordBlock>
                        </FieldBlock>
                        {isPasswordOpened || <ChangePassword close={() => openPasswordComp(true)}/> }
                        <FieldBlock>
                            <FieldTitle>Leave the account</FieldTitle>
                            {/*@ts-ignore   */}
                            <PasswordButton style={{width: '27%' }} onClick={() => dispatch(logoutUser())} >
                                Log out
                            </PasswordButton>
                        </FieldBlock>
                    </FieldsContainer>

                </InnerContainer>
            </MainContent>

        </ProfileWrapper>


    </>
}

const ChangePassword = ({close} : {close : () => void}) => {
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
    return <PasswordBlock>
        <FieldTitle></FieldTitle>
        <PasswordInputsBlock>
            <PasswordInput disabled value={currentPassword  || ''}/>
            <PasswordInput value={values.nextPassword} onChange={handleChange}
                       name={'nextPassword'} placeholder={'New password'}/>
            <PasswordInput value={values.repeatPassword} onChange={handleChange}
                           name={'repeatPassword'} placeholder={'Confirm new password'}/>

        <PasswordButtons>
            <PasswordButton onClick={close}>
                Cancel
            </PasswordButton>
            {/*@ts-ignore*/}
            <PasswordButton onClick={handleSubmit}>
                Save
            </PasswordButton>
        </PasswordButtons>
        </PasswordInputsBlock>
    </PasswordBlock>
}


const createInput = (Component : any,formik : any,name : string) => {
    return <Component value={formik.values[name]} onChange={formik.handleChange}
                      onBlur={formik.handleSubmit}
                      type={'text'} name={name}/>
}


export const UserImage = ({size,fontSize} : userImageProps) => {
    const {userName,userImage} = useSelector((state : StateType) => state.userData)
    return userImage ?
        <UserImageElement src={FILES_LOCATION + '/user_avatars/' +  userImage} size={size}/> :
        <EmptyAvatar color={localStorage.getItem('defaultAvatarColor') || ''} size={size}>
            <EmptyAvatarTitle fontSize={fontSize}>{userName ? userName[0].toUpperCase() : ''}</EmptyAvatarTitle></EmptyAvatar>

}


export default Profile
