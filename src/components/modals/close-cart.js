import React, { useContext, useRef, useState } from 'react'
import Modal from '@mui/material/Modal';
import closeicon from "../../assets/dashboard/close-circle.svg"
import cash from "../../assets/dashboard/cash.svg"
import wallet from "../../assets/dashboard/wallet.svg"
import card from "../../assets/dashboard/card.svg"

import select from "../../assets/dashboard/select.svg"
import unselect from "../../assets/dashboard/unselect.svg"

import BaseButton from '../common/button';
import BaseText from '../common/text';

import QRCode from "react-qr-code";
import { sendPost } from '../../server';
import TextInput from '../common/input';

import { useFormik } from 'formik'
import { OnlinePaySchema } from '../../forms/schemas';
import TextInputModal from './text-input';

import loader from "../../assets/gifs/Loader.gif"
import { SocketContext } from '../../context/socket';

function CloseCart(props) {

    const { visible, onCancel, data } = props
    const [loading, setLoading] = useState(false)

    const socket = useContext(SocketContext)

    const closeCart = async () => {
        try {
            setLoading(true)
            await sendPost("sales/cart/close", {
                cart: data?.uid
            })
            setLoading(false)
            onCancel()
        } catch (error) {
            alert(error)
            setLoading(false)
        }
    }

    const Choose = ({}) => {
        return(
            <div
                className="justify-center bg-dark-transparent items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="animate-[wiggle_1s_ease-in-out_infinite] relative w-[393px] h-[399px] my-6 mx-auto">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/* HEADER */}
                        <div className="flex items-start justify-between px-[20px] pt-6 rounded-t">
                            <div>
                                <h3 className="text-base font-semibold">
                                    Are you sure you want to close
                                </h3>
                                <h3 className="text-base font-semibold">
                                    {data?.uid}?
                                </h3>
                            </div>
                            <button
                                onClick={onCancel}
                            >
                                <img src={closeicon} alt="close" />
                            </button>
                        </div>
                        {/* BODY */}
                        <div className="relative p-[20px] flex-auto">

                        </div>
                        {/* FOOTER */}
                        <div className='p-[20px]' >
                            <BaseButton
                            title="Yes"
                            style="w-full bg-error"
                            loading={loading}
                            disabled={loading}
                            onClick={closeCart}
                            />
                            <BaseButton
                            title="No"
                            style="w-full mt-[15px]"
                            onClick={onCancel}
                            disabled={loading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {visible && <Choose/>}
        </>
    )
}

export default CloseCart