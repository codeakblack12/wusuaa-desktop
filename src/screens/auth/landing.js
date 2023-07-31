import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import logo from '../../assets/auth/big-logo.svg'
import TextInput from '../../components/common/input'
import BaseText from '../../components/common/text'
import BaseButton from '../../components/common/button'
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { userState } from '../../redux/slices/userSlice'
import { LoginSchema } from '../../forms/schemas'
import { getPrevMe } from '../../redux/slices/userSlice'

function Landing() {

  const dispatch = useAppDispatch()

  const { loading } = useAppSelector(userState)

  let navigate = useNavigate();

  const routeChange = (path) => {
      navigate(path, { replace: true });
  }

  useEffect(() => {
    const token = localStorage.getItem("USER_TOKEN")
    if(token){
      getUserData()
    }else{
      navigate('/login')
    }

  }, [])

  const getUserData = async () => {
    const login = await dispatch(getPrevMe())
    if(login?.type === "user/prevme/fulfilled"){
      navigate("/dashboard")
    }else{
      navigate('/login')
    }
  }

  return (
    <div className="flex flex-col bg-primary h-screen justify-center items-center">
        <img src={logo} alt="logo" />
    </div>
  )
}

export default Landing