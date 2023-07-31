import React, {useContext} from 'react'
import logo from "../../../assets/dashboard/mini-logo.svg"

import home from "../../../assets/dashboard/Home.svg"
import add from "../../../assets/dashboard/add-square.svg"
import gear from "../../../assets/dashboard/Setting.svg"
import BaseText from '../../../components/common/text'
import { Button as AppButton } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { userState } from '../../../redux/slices/userSlice'
import { cartState } from '../../../redux/slices/cartSlice'
import { SocketContext } from '../../../context/socket'
import { createCart } from '../../../redux/slices/cartSlice'

function NavBar() {
    const { socket } = useContext(SocketContext);

    const { carts, cart_keys } = useAppSelector(cartState)

    const { userData } = useAppSelector(userState)

    const dispatch = useAppDispatch()

    const newCart = async () => {
        if(cart_keys.length > 4){
            return alert("You cannot have more than 5 active carts")
        }
        if(cart_keys.includes("Pending...")){
            return alert("Seems you have a pending cart creation.")
        }
        try {
            // await dispatch(createCart({}))
            await socket.emit('create_cart', {
                handler: userData._id,
                warehouse: userData?.warehouse[0]
            })
        } catch (error) {

        }
    }

    return (
        <div className="group flex flex-col hover:transition-all duration-100 ease-out h-screen items-start w-32 bg-primary pl-3 hover:w-60">
            <img className="mt-10" src={logo} alt="logo" />

            <div className="flex flex-col mt-10 ml-8">
                <button onClick={() => console.log("help")} className="flex mt-10 items-center justify-start">
                    <img src={home} alt="home" />
                    <BaseText p style="font-medium ml-4 line-clamp-1 hidden group-hover:block" >
                        Home
                    </BaseText>
                </button>
                {/* <button onClick={newCart} className="flex mt-10 items-center justify-start">
                    <img src={add} alt="add" />
                    <BaseText p style="font-medium ml-4 line-clamp-1 whitespace-nowrap hidden group-hover:block" >
                        New Cart
                    </BaseText>
                </button> */}
                <button className="flex mt-10 items-center justify-start">
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