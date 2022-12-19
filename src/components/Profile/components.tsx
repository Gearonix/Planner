import {useDispatch, useSelector} from "react-redux";
import {changePassFormType, userImageProps} from "../../global/types/components/profileTypes";
import {changeUserPassword} from "../../reducers/userDataReducer";
import {useFormik} from "formik";
import {changePasswordValidator} from "../../helpers/validate";
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
} from "./profile.styles";
import React from "react";
import {FILES_LOCATION} from "../../global/constants";
import Selectors from "../../helpers/selectors";
import {DispatchType} from "../../global/store";

export const ChangePassword = ({close}: { close: () => void }) => {
    const {password: currentPassword, user_id} = useSelector(Selectors.userData)
    const dispatch = useDispatch<DispatchType>()

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
                           name={'nextPassword'} placeholder={'New password'}/>
            <PasswordInput value={values.repeatPassword} onChange={handleChange}
                           name={'repeatPassword'} placeholder={'Confirm new password'}/>

            <PasswordButtons>
                <PasswordButton onClick={close}>
                    Cancel
                </PasswordButton>
                <PasswordButton onClick={() => handleSubmit()}>
                    Save
                </PasswordButton>
            </PasswordButtons>
        </PasswordInputsBlock>
    </PasswordBlock>
}

export const createInput = (Component: any, formik: any, name: string) => {
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
