import React, {useContext, useState} from 'react'
import logo from "../../../assets/dashboard/mini-logo.svg"

import home from "../../../assets/dashboard/Home.svg"
import add from "../../../assets/dashboard/add-square.svg"
import gear from "../../../assets/dashboard/Setting.svg"
import BaseText from '../../../components/common/text'
import { Button as AppButton } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { changeTab, userState } from '../../../redux/slices/userSlice'
import { cartState } from '../../../redux/slices/cartSlice'
import { SocketContext } from '../../../context/socket'
import { createCart } from '../../../redux/slices/cartSlice'

function NavBar() {

    const [selected, setSelected] = useState("home")

    const { socket } = useContext(SocketContext);

    const { carts, cart_keys } = useAppSelector(cartState)

    const { userData, current_tab } = useAppSelector(userState)

    const dispatch = useAppDispatch()

    const tabChange = (tab) => {
        dispatch(changeTab(tab))
    }

    return (
        <div className="group flex flex-col hover:transition-all duration-100 ease-out h-screen items-start w-32 bg-primary pl-3 hover:w-60">
            <img className="mt-10" src={logo} alt="logo" />

            <div className="flex flex-col mt-10 ml-8">
                <button onClick={() => tabChange("home")} className={`flex mt-10 items-center justify-start ${ current_tab === "home" ? "bg-button" : ""} p-2.5 rounded group-hover:w-36`}>
                    <img src={home} alt="home" />
                    <BaseText p style="font-medium ml-4 line-clamp-1 hidden group-hover:block" >
                        Home
                    </BaseText>
                </button>
                <button onClick={() => tabChange("settings")} className={`flex mt-5 items-center justify-start ${ current_tab === "settings" ? "bg-button" : ""} p-2.5 rounded group-hover:w-36`}>
                    <img src={gear} alt="gear" />
                    <BaseText p style="font-medium ml-4 line-clamp-1 hidden group-hover:block" >
                        Settings
                    </BaseText>
                </button>
            </div>
        </div>
    )
}

export default NavBar