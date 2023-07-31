import React from 'react'
import logo from '../../assets/auth/big-logo.svg'
import back from '../../assets/auth/back.svg'
import TextInput from '../../components/common/input'
import BaseText from '../../components/common/text'
import BaseButton from '../../components/common/button'
import { Button as AppButton } from '@mui/material';
import { useNavigate } from 'react-router-dom'

function ForgotPassword() {
  const navigate = useNavigate();
  const routeChange = (path) =>{
    navigate(path);
}

  return (
    <div class="flex flex-col bg-primary h-screen justify-center items-center">
      <AppButton type='button' onClick={() => routeChange(-1)} class="absolute left-16 top-16">
        <img src={back} alt="logo" />
      </AppButton>
      <img src={logo} alt="logo" />
      <BaseText h1 fontSize={"3xl"} style="mb-2 mt-12 font-black text-offwhite text-3xl" >
          Forgot Password
      </BaseText>
      <BaseText p style="mb-8 font-medium" >
          Enter your registered email address
      </BaseText>
      <TextInput
      label={"Email address"}
      type="email"
      style={"mb-20"}
      />
      <BaseButton
        title="Next"
        onClick={() => routeChange("/otp")}
      />
    </div>
  )
}

export default ForgotPassword