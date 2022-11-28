import React from 'react'
import {Formik, Form, Field, useFormik} from 'formik';
import {Input,Button} from "./login.styles";


type FormValues = {
    email : string,
    password : string
}


const Login : React.FC = () => {
    const initialValues : FormValues = {email: '',password:''}

    const {handleSubmit,handleChange,values} = useFormik({initialValues,onSubmit: (data : FormValues) => console.log(data)})

    return <div>
      login
        <Input type="text" name={'email'} onChange={handleChange('email')} value={values['email']}/>
        <input type="text" name={'password'} onChange={handleChange('password')} value={values['password']}/>
        {/*@ts-ignore*/}
        <Button onClick={handleSubmit}>submit</Button>
    </div>
}





export default Login
