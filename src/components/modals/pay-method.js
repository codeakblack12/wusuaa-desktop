import React, { useContext, useRef, useState } from 'react'
import Modal from '@mui/material/Modal';
import closeicon from "../../assets/dashboard/close-circle.svg"
import cash from "../../assets/dashboard/cash.svg"
import wallet from "../../assets/dashboard/wallet.svg"
import card from "../../assets/dashboard/card.svg"
import momo from "../../assets/dashboard/momo.svg"

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

function PayMethod(props) {

    const { visible, onCancel, data } = props

    const [selected, setSelected] = useState("")
    const [link, setLink] = useState(null)
    const [loading, setLoading] = useState(false)
    const [confirmed, setConfirmed] = useState(false)
    const [email, setEmail] = useState("")
    const [reference, setReference] = useState(null)

    const socket = useContext(SocketContext)

    const initialValues = {
        email: '',
    };

    const { values, errors, touched, handleChange, handleSubmit, handleBlur, setFieldValue, isValid } = useFormik({
        initialValues,
        validationSchema: selected !== "ONLINE" ? null : OnlinePaySchema,
        onSubmit: (values) => {
            if(selected !== "ONLINE"){
                confirmPayment()
            }else{
                onlinePayment()
            }
        },
    });

    const PAY_METHODS = [
        {
            id: 1,
            title: "Cash",
            icon: cash,
            value: "CASH"
        },
        {
            id: 2,
            title: "Online Payment",
            icon: wallet,
            value: "ONLINE"
        },
        {
            id: 3,
            title: "POS (Point of sale)",
            icon: card,
            value: "POS"
        },
        {
            id: 4,
            title: "Momo Pay",
            icon: momo,
            value: "MOMO"
        },
    ]

    const confirmPayment = async () => {
        try {
            setLoading(true)
            const response = await sendPost('sales/cart/checkout', {
                id: data._id,
                email: values.email,
                payment_type: selected,
                customer_name: data?.customer_name
            })
            setLoading(false)
            onCancel()

        } catch (error) {
            setLoading(false)
            alert(error?.response?.data?.message)
        }
    }

    const onlinePayment = async () => {
        try {
            setLoading(true)
            const response = await sendPost('sales/payment/paystack-link', {
                id: data?._id,
                email: values.email,
                customer_name: data?.customer_name,
                location: "WAREHOUSE"
            })
            setLink(response?.data?.link)
            // alert(response?.data?.reference)
            setReference(response?.data?.reference)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            alert(error?.response?.data?.message)
        }
    }

    const PayCard = ({item}) => {
        return(
            <div className={`flex py-[18px] border-b-[${item?.id < 4 ? "1px" : "0px"}] border-unselect-text justify-between`}>
                <div className='flex'>
                    <img src={item?.icon} alt="close" />
                    <BaseText p fontSize={"sm"} style={`text-${"sm"} font-${"bold"} ml-[12px]`} color="black" >
                        {item?.title}
                    </BaseText>
                </div>
                <button
                onClick={() => setSelected(item?.value)}
                >
                    <img src={item?.value === selected ? select : unselect} alt="close" />
                </button>
            </div>
        )
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
                            <h3 className="text-base font-semibold">
                                Payment Options
                            </h3>
                            <button
                                onClick={onCancel}
                            >
                                <img src={closeicon} alt="close" />
                            </button>
                        </div>
                        {/* BODY */}
                        <div className="relative p-[20px] flex-auto">
                            {
                                PAY_METHODS.map((val) => {
                                    return <PayCard item={val} />
                                })
                            }
                        </div>
                        {/* FOOTER */}
                        <div className='p-[20px]' >
                            <BaseButton
                            title="Confirm"
                            style="w-full"
                            loading={loading}
                            disabled={(loading || selected === "") ? true : false}
                            onClick={() => setConfirmed(true)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const QrLink = ({}) => {
        return(
            <div
                className="justify-center bg-dark-transparent items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="animate-[wiggle_1s_ease-in-out_infinite] relative w-[548px] h-[560px] my-6 mx-auto">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/* HEADER */}
                        <div className="flex items-start justify-between px-[20px] pt-6 rounded-t">
                            <div/>
                            <button
                                onClick={() => setLink(null)}
                            >
                                <img src={closeicon} alt="close" />
                            </button>
                        </div>
                        {/* BODY */}
                        <div className="relative p-[20px] grid justify-items-center">
                            <div className='w-[200px] py-[10px] grid justify-items-center mb-[44px] border rounded-lg border-unselect-text'>
                                <BaseText p fontSize={"sm"} style={`text-${"sm"} font-${"bold"}`} color="black" >
                                    Online Payment
                                </BaseText>
                            </div>
                            <div className='w-[250px] h-[229px] grid justify-items-center'>
                                <div className='w-full flex justify-between'>
                                    <div className='border-black border-t-4 border-l-4 w-[34px] h-[34px]'/>
                                    <div className='border-black border-t-4 border-r-4 w-[34px] h-[34px]'/>
                                </div>
                                <QRCode
                                    size={195}
                                    style={{ alignSelf: 'center' }}
                                    value={link}
                                    viewBox={`0 0 195 195`}
                                />
                                <div className='w-full flex justify-between'>
                                    <div className='border-black border-b-4 border-l-4 w-[34px] h-[34px]'/>
                                    <div className='border-black border-b-4 w-[34px] border-r-4 h-[34px]'/>
                                </div>
                            </div>
                        </div>
                        {/* FOOTER */}
                        <div className='mt-[32px] grid justify-items-center'>
                            <BaseText p fontSize={"base"} style={`text-${"base"} font-${"bold"}`} color="black" >
                                Scan to Pay
                            </BaseText>
                            <BaseText p fontSize={"xs"} style={`text-${"xs"} font-${"medium"} mt-[12px]`} color="black" >
                                We're waiting to confirm your transfer
                            </BaseText>
                            <BaseText p fontSize={"xs"} style={`text-${"xs"} font-${"medium"} mt-[4px] mb-[10px]`} color="black" >
                                This can take a few minutes
                            </BaseText>

                            <img className='w-2/4 h-[6px] mb-[77px]' src={loader} alt="close" />
                        </div>

                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {visible && !confirmed && !link && <Choose/>}


            {visible && confirmed && !link && <TextInputModal
            email={values.email} setEmail={(value) => setFieldValue('email', value)} selected={selected}
            loading={loading} setConfirmed={setConfirmed} handleSubmit={handleSubmit} errors={errors}
            touched={touched}
            />}


            {visible && link && <QrLink/>}
        </>
    )
}

export default PayMethod