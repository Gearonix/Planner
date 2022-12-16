import React, {useEffect, useState} from 'react';
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {
    AvatarButton,
    AvatarButtonTitle,
    ChangePasswordBlock,
    FieldBlock,
    FieldInput,
    FieldsContainer,
    FieldTitle,
    GreyLine,
    InnerContainer,
    MainContent,
    PasswordButton,
    ProfileTitle,
    ProfileWrapper,
    SmallerTitle,
    UserAvatarBlock
} from './profile.styles';
import {profileValidator} from '../../helpers/validate';
import {useNavigate} from "react-router-dom";
import {changeUserName, logoutUser, updateUserImage, uploadFile} from "../../reducers/userDataReducer";
import Selectors from '../../helpers/selectors';
import {DispatchType} from "../../global/store";
import {ChangePassword, createInput, UserImage} from "./components";


const Profile = () => {
    const dispatch = useDispatch<DispatchType>()
    const navigate = useNavigate()

    const [isPasswordOpened, openPasswordComp] = useState(true)
    const {userName, user_id, email, password} = useSelector(Selectors.userData)
    const initialValues: { userName: string } = {userName: userName || ''}

    useEffect(() => {
        if (!user_id) navigate('/login')
    })

    const onSubmit = (formData: { userName: string }) => {
        if (formData.userName == userName) return
        dispatch(changeUserName({...formData, user_id: user_id || ''}))
    }

    const changeAvatar = async (e: any) => {
        if (e.target.files.length > 0) {
            const {payload: filename} = await dispatch(uploadFile({file: e.target.files[0], name: 'user_avatars'}))
            if (!filename) return
            dispatch(updateUserImage({user_id: user_id || '', filename}))
        }
    }

    const formik = useFormik({initialValues,onSubmit,validateOnChange : false, validate: profileValidator})

    return <>
        <ProfileWrapper>
            <MainContent>
               <ProfileTitle>Settings</ProfileTitle>
                <GreyLine/>
                <SmallerTitle>Profile Settings</SmallerTitle>
                <InnerContainer>
                    <UserAvatarBlock>
                        <UserImage size={232} fontSize={48} handler={() => {
                        }}/>
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

export default Profile
