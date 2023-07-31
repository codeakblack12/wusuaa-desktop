import React from 'react'
import logo from '../../assets/auth/big-logo.svg'
import tick from '../../assets/auth/tick-circle.svg'
import BaseText from '../../components/common/text'
import BaseButton from '../../components/common/button'
import { useNavigate } from 'react-router-dom'

function ResetSuccess() {

  const navigate = useNavigate();
  const routeChange = (path) =>{
    navigate(path);
  }

  return (
    <div class="flex flex-col bg-primary h-screen justify-center items-center">
      <img src={logo} alt="logo" />
      <img src={tick} alt="tick" class="mt-20" />
      <BaseText h1 fontSize={"3xl"} style="mb-2 mt-4 font-black text-offwhite text-3xl" >
            Password Reset Successful
        </BaseText>
        <BaseText p style="mb-8 font-medium" >
            Your password reset was successful. You’ll be automatically logged out, kindly log back in.
        </BaseText>
        <BaseButton
        title="Done"
        style={"mt-10"}
        onClick={() => routeChange("/login")}
        />
    </div>
  )
}

export default ResetSuccess