import {useDispatch, useSelector} from "react-redux";
import {changePassFormType, userImageProps} from "./others/profileTypes";
import {changeUserPassword} from "../../setup/reducers/userDataReducer";
import {useFormik} from "formik";
import {changePasswordValidator} from "../../utils/validate";
import {
    EmptyAvatar,
    EmptyAvatarTitle,
    FieldTitle,
    PasswordBlock,
    PasswordButton,
    PasswordButtons,
    PasswordInput,
    PasswordInputsBlock,
    UserImageElement
} from "./others/profile.styles";
import React, {FC} from "react";
import {FILES_LOCATION} from "../../setup/constants";
import Selectors from "../../helpers/selectors";
import {DispatchType} from "../../setup/store";
import {useTranslation} from "react-i18next";

export const ChangePassword = ({close}: { close: () => void }) => {
    const {password: currentPassword, user_id} = useSelector(Selectors.userData)
    const dispatch = useDispatch<DispatchType>()
    const {t} = useTranslation()

    const initialValues: changePassFormType = {
        nextPassword: '',
        repeatPassword: ''
    }

    const {values, handleChange, handleSubmit} = useFormik({
        initialValues,
        onSubmit: (data: changePassFormType) => dispatch(changeUserPassword({...data, user_id: user_id || ''})),
        validateOnChange: false, validateOnBlur: false, validate: changePasswordValidator
    })

    return <PasswordBlock>
        <FieldTitle/>
        <PasswordInputsBlock>
            <PasswordInput disabled value={currentPassword || ''}/>
            <PasswordInput value={values.nextPassword} onChange={handleChange}
                           name={'nextPassword'} placeholder={t('newPassword') || ''}/>
            <PasswordInput value={values.repeatPassword} onChange={handleChange}
                           name={'repeatPassword'} placeholder={t('confirmPass') || ''}/>

            <PasswordButtons>
                <PasswordButton onClick={close}>
                    {t('cancel')}
                </PasswordButton>
                <PasswordButton onClick={() => handleSubmit()}>
                    {t('save')}
                </PasswordButton>
            </PasswordButtons>
        </PasswordInputsBlock>
    </PasswordBlock>
}

export const createInput = (Component: FC<any>, formik: any, name: string) => {
    return <Component value={formik.values[name]} onChange={formik.handleChange}
                      onBlur={formik.handleSubmit}
                      type={'text'} name={name}/>
}

export const UserImage = ({size, fontSize, handler}: userImageProps) => {
    const {userName, userImage} = useSelector(Selectors.userData)
    return userImage ? <UserImageElement src={FILES_LOCATION + '/user_avatars/' + userImage} size={size}
                                         onClick={() => handler()}/> :
        <EmptyAvatar color={localStorage.getItem('defaultAvatarColor') || ''} size={size}
                     onClick={() => handler()}>
            <EmptyAvatarTitle
                fontSize={fontSize}>{userName ? userName[0].toUpperCase() : ''}</EmptyAvatarTitle></EmptyAvatar>

}
