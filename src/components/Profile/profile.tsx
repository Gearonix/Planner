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
} from './others/profile.styles';
import {profileValidator} from '../../utils/validate';
import {changeUserName, logoutUser, updateUserImage, uploadFile} from "../../setup/reducers/userDataReducer";
import Selectors from '../../helpers/selectors';
import {DispatchType} from "../../setup/store";
import {ChangePassword, UserImage} from "./components";
import {useTranslation} from "react-i18next";


const Profile = () => {
    const dispatch = useDispatch<DispatchType>()
    const [isPasswordOpened, openPasswordComp] = useState<boolean>(true)
    const {userName: currentUserName, user_id, email, password} = useSelector(Selectors.userData)
    const [userNameField, setUserName] = useState<string>(currentUserName || '')
    const {t} = useTranslation()

    const onSubmit = () => {
        if (profileValidator(userNameField, currentUserName || '')) return
        dispatch(changeUserName({userName: userNameField, user_id: user_id || ''}))
    }

    const changeAvatar = async (e: any) => {
        if (e.target.files.length === 0) return
        const {payload: filename} = await dispatch(uploadFile({file: e.target.files[0], name: 'user_avatars'}))
        if (!filename) return
        dispatch(updateUserImage({user_id: user_id || '', filename}))
    }

    return <>
        <ProfileWrapper>
            <MainContent>
                <ProfileTitle>{t('settings')}</ProfileTitle>
                <GreyLine/>
                <SmallerTitle>{t('profileSettings')}</SmallerTitle>
                <InnerContainer>
                    <UserAvatarBlock>
                        <UserImage size={232} fontSize={48} handler={() => {
                        }}/>
                        <AvatarButton>
                            <AvatarButtonTitle>{t('edit')}</AvatarButtonTitle>
                            <input type="file" onChange={changeAvatar}/>
                        </AvatarButton>
                    </UserAvatarBlock>
                    <FieldsContainer>
                        <FieldBlock>
                            <FieldTitle>{t('UserName')}</FieldTitle>
                            <FieldInput value={userNameField || ''}
                                        onChange={(e: any) =>
                                            setUserName(e.target.value)} onBlur={() => onSubmit()}/>
                        </FieldBlock>
                        <FieldBlock>
                            <FieldTitle>{t('email')}</FieldTitle>
                            <FieldInput disabled value={email || ''}/>
                        </FieldBlock>
                        <FieldBlock>
                            <FieldTitle>{t('password')}</FieldTitle>
                            <ChangePasswordBlock>
                                <FieldInput isPassword={true} disabled value={password || ''}/>
                                <PasswordButton onClick={() => openPasswordComp(!isPasswordOpened)}>
                                    {t('ChangePassword')}
                                </PasswordButton>
                            </ChangePasswordBlock>
                        </FieldBlock>
                        {isPasswordOpened || <ChangePassword close={() => openPasswordComp(true)}/>}
                        <FieldBlock>
                            <FieldTitle>{t('LeaveAccount')}</FieldTitle>
                            <PasswordButton style={{width: '27%'}} onClick={() => dispatch(logoutUser())}>
                                {t('logout')}
                            </PasswordButton>
                        </FieldBlock>
                    </FieldsContainer>

                </InnerContainer>
            </MainContent>

        </ProfileWrapper>


    </>
}

export default Profile
