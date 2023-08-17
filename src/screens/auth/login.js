import React from 'react'
import { useFormik } from 'formik'
import logo from '../../assets/auth/big-logo.svg'
import TextInput from '../../components/common/input'
import BaseText from '../../components/common/text'
import BaseButton from '../../components/common/button'
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { userState } from '../../redux/slices/userSlice'
import { LoginSchema } from '../../forms/schemas'
import { LoginUser, getMe } from '../../redux/slices/userSlice'
import { Button as AppButton } from '@mui/material';

function Login() {

  const dispatch = useAppDispatch()

  const { loading } = useAppSelector(userState)

  let navigate = useNavigate();

  const routeChange = (path) =>{
      navigate(path);
  }

  const initialValues = {
    email: '',
    password: '',
    platform: 'DESKTOP'
  };

  const { values, errors, touched, handleChange, handleSubmit, handleBlur, setFieldValue, isValid } = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values) => handleLogin(values),
  });

  const handleLogin = async (data) => {
    try {
      const login = await dispatch(LoginUser(data))
      if(login?.type === "user/loginUser/fulfilled" && login?.payload?.access_token){
          const userInfo = await dispatch(getMe())
          if(userInfo?.type === "user/me/fulfilled"){
            routeChange("/dashboard")
              // navigation.reset({
              //     index: 0,
              //     routes: [{ name: 'dashboard' }],
              // })
          }else{
              alert("Seems something went wrong!, please try again")
          }
      }else{
          alert("Invalid login credentials!")
      }
    } catch (error) {
      alert("Seems something went wrong!")
    }
  }

  return (
    <div className="flex flex-col bg-primary h-screen justify-center items-center">
        <img src={logo} alt="logo" />
        <BaseText h1 fontSize={"3xl"} style="mb-2 mt-12 font-black text-3xl" >
            Login
        </BaseText>
        <BaseText p style="mb-8 font-medium" >
            Enter your login details below
        </BaseText>
        <TextInput
        label={"Email address"}
        style={"text-white"}
        type="email"
        onChangeText={handleChange('email')}
        error={touched.email ? errors.email : undefined}
        />
        <TextInput
        label={"Password"}
        style={"text-white"}
        type="password"
        onChangeText={handleChange('password')}
        error={touched.password ? errors.password : undefined}
        />
        <div className="w-96 mb-8"></div>
        {/* <button onClick={() => routeChange("/forgot-password")} className="w-96" >
          <BaseText p style="mb-8 font-medium text-end mt-2" >
              Forgot Password?
          </BaseText>
        </button> */}

        <BaseButton
        title="Login"
        loading={loading}
        onClick={handleSubmit}
        />

    </div>
  )
}

export default Login