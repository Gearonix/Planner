import React, {useState} from 'react';
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
import {changeUserName, logoutUser, updateUserImage, uploadFile} from "../../reducers/userDataReducer";
import Selectors from '../../helpers/selectors';
import {DispatchType} from "../../global/store";
import {ChangePassword, UserImage} from "./components";


const Profile = () => {
    const dispatch = useDispatch<DispatchType>()
    const [isPasswordOpened, openPasswordComp] = useState<boolean>(true)
    const {userName: currentUserName, user_id, email, password} = useSelector(Selectors.userData)
    const [userNameField, setUserName] = useState<string>(currentUserName || '')

    const onSubmit = () => {
        if (profileValidator(userNameField, currentUserName || '')) return
        dispatch(changeUserName({userName: userNameField, user_id: user_id || ''}))
    }

    const changeAvatar = async (e: any) => {
        if (e.target.files.lengt == 0) return
        const {payload: filename} = await dispatch(uploadFile({file: e.target.files[0], name: 'user_avatars'}))
        if (!filename) return
        dispatch(updateUserImage({user_id: user_id || '', filename}))
    }

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
                            <FieldInput value={userNameField || ''}
                                        onChange={(e: any) =>
                                            setUserName(e.target.value)} onBlur={() => onSubmit()}/>
                        </FieldBlock>
                        <FieldBlock>
                            <FieldTitle>Email</FieldTitle>
                            <FieldInput disabled value={email || ''}/>
                        </FieldBlock>
                        <FieldBlock>
                            <FieldTitle>Password</FieldTitle>
                            <ChangePasswordBlock>
                                <FieldInput isPassword={true} disabled value={password || ''}/>
                                <PasswordButton onClick={() => openPasswordComp(!isPasswordOpened)}>
                                    Change password
                                </PasswordButton>
                            </ChangePasswordBlock>
                        </FieldBlock>
                        {isPasswordOpened || <ChangePassword close={() => openPasswordComp(true)}/>}
                        <FieldBlock>
                            <FieldTitle>Leave the account</FieldTitle>
                            {/*@ts-ignore   */}
                            <PasswordButton style={{width: '27%'}} onClick={() => dispatch(logoutUser())}>
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
