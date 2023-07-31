import React from 'react'
import logo from '../../assets/auth/big-logo.svg'
import back from '../../assets/auth/back.svg'
import BaseText from '../../components/common/text'
import BaseButton from '../../components/common/button'
import { useNavigate } from "react-router-dom";
import { MuiOtpInput } from 'mui-one-time-password-input'
import OtpInput from 'react-otp-input';
import { Button as AppButton } from '@mui/material';

function Otp() {

  const navigate = useNavigate();
  const routeChange = (path) => {
    navigate(path);
  }

  const [otp, setOtp] = React.useState('')

  const handleChange = (newValue) => {
    setOtp(newValue)
  }

  return (
    <div class="flex flex-col bg-primary h-screen justify-center items-center">
        <AppButton type='button' onClick={() => routeChange(-1)} class="absolute left-16 top-16">
          <img src={back} alt="logo" />
        </AppButton>
        <img src={logo} alt="logo" />
        <BaseText h1 fontSize={"3xl"} style="mb-2 mt-12 font-black text-3xl" >
            Enter OTP Code
        </BaseText>
        <BaseText p style="mb-8 font-medium" >
          Kindly enter the OTP code sent to your registered email address. This code will expire soon.
        </BaseText>
        <MuiOtpInput value={otp} TextFieldsProps={{
          className: "bg-input focus:outline-none text-white text-2xl"
        }} className="w-80 h-16 text-white text-2xl" onChange={handleChange} />
        <BaseText p style="mb-8 font-medium text-center mt-2 text-light-gray" >
          Didn’t receive code? Resend Code
        </BaseText>
        <BaseButton
        title="Next"
        onClick={() => routeChange("/reset-password")}
        />
        {/* <div>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span>--</span>}
            renderInput={(props) => <input class={`text-sm h-14 bg-input text-white focus:outline-none font-bold`} {...props} />}
            // containerStyle={"w-96"}
          />
        </div> */}
    </div>
  )
}

export default Otp