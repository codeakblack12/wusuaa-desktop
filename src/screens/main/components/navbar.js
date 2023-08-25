import React, {useContext, useState} from 'react'
import logo from "../../../assets/dashboard/mini-logo.svg"

import home from "../../../assets/dashboard/Home.svg"
import add from "../../../assets/dashboard/add-square.svg"
import gear from "../../../assets/dashboard/Setting.svg"
import BaseText from '../../../components/common/text'
import { Button as AppButton } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { changeTab, userState } from '../../../redux/slices/userSlice'
import { cartState, getCarts } from '../../../redux/slices/cartSlice'
import { SocketContext } from '../../../context/socket'
import { createCart } from '../../../redux/slices/cartSlice'
import { CircularProgress } from '@mui/material';

function NavBar() {

    const [loading, setLoading] = useState(false)

    const [selected, setSelected] = useState("home")

    const { socket } = useContext(SocketContext);

    const { carts, cart_keys } = useAppSelector(cartState)

    const { userData, current_tab, active_warehouse } = useAppSelector(userState)

    const dispatch = useAppDispatch()

    const tabChange = (tab) => {
        dispatch(changeTab(tab))
    }

    const refreshCarts = async () => {
        setLoading(true)
        await dispatch(getCarts(active_warehouse))
        setLoading(false)
    }

    return (
        <div className="group flex flex-col hover:transition-all duration-100 ease-out h-full items-center w-20 px-3.5 bg-primary pl-3 hover:w-56">
            <img className="mt-10" src={logo} alt="logo" />

            <div className="flex flex-col mt-10 justify-items-center">
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
                <button disabled={loading} onClick={refreshCarts} className={`flex mt-5 items-center justify-start p-2.5 rounded group-hover:w-36`}>
                    {loading ? <CircularProgress
                    size={20}
                    color="secondary" sx={{
                        color: "#fff"
                    }} /> : <img src={add} alt="add" />}
                    <BaseText p style="font-medium ml-4 line-clamp-1 hidden group-hover:block" >
                        Refresh
                    </BaseText>
                </button>
            </div>
        </div>
    )
}

export default NavBar