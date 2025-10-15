import React, {useContext, useEffect, useState} from 'react'
import BaseText from '../../../components/common/text';
import { useAppDispatch } from '../../../redux/hooks';
import { SocketContext } from '../../../context/socket';
import { cartState } from '../../../redux/slices/cartSlice';
import { addToCart } from '../../../redux/slices/cartSlice';
import { useAppSelector } from '../../../redux/hooks';
import { userState } from '../../../redux/slices/userSlice';
import { createCart } from '../../../redux/slices/cartSlice';
import NameInputModal from '../../../components/modals/name-input';

export default function AddToggle({onClick}) {

  const [adding, setAdding] = useState(false)
  const [name, setName] = useState("")
  const [visible, setVisible] = useState(false)

  const dispatch = useAppDispatch()

  const { loading, cart_keys } = useAppSelector(cartState)

  const { userData, counter, active_warehouse } = useAppSelector(userState)

  const { socket } = useContext(SocketContext);

  const newCart = async () => {
    setAdding(true)
    if(cart_keys.length > 4){
        setAdding(false)
        return alert("You cannot have more than 5 active carts")
    }
    if(cart_keys.includes("Pending...")){
        setAdding(false)
        return alert("Seems you have a pending cart creation.")
    }
    try {
        await dispatch(createCart({}))
        await socket.emit('create_cart', {
            counter: counter,
            warehouse: active_warehouse,
            customer_name: name
        })

        setTimeout(() => {
          setAdding(false)
        }, 3000)
    } catch (error) {

    }
}

  return (
    <>
    <button
    onClick={() => {
      if(cart_keys.length > 4){
          return alert("You cannot have more than 5 active carts")
      }
      setVisible(true)
    }}
    disabled={adding}
    className='h-fit w-[115px]'>
        <svg className={`fill-current text-toggle-unselect`}
        width="60" height="37" viewBox="0 0 60 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.50383 37C3.6576 37 0.804667 33.432 1.65083 29.68L7.28892 4.68002C7.90604 1.94362 10.3368 0 13.1419 0H45.9884C48.7366 0 51.1335 1.86714 51.806 4.5318L58.1152 29.5318C59.0718 33.3219 56.2066 37 52.2976 37H7.50383Z"/>
            <path d="M36 15.75H24C23.59 15.75 23.25 15.41 23.25 15C23.25 14.59 23.59 14.25 24 14.25H36C36.41 14.25 36.75 14.59 36.75 15C36.75 15.41 36.41 15.75 36 15.75Z" fill="#888888"/>
            <path d="M30 21.75C29.59 21.75 29.25 21.41 29.25 21V9C29.25 8.59 29.59 8.25 30 8.25C30.41 8.25 30.75 8.59 30.75 9V21C30.75 21.41 30.41 21.75 30 21.75Z" fill="#888888"/>
        </svg>
    </button>
    <NameInputModal
    email={name}
    setEmail={(value) => setName(value)}
    handleSubmit={() => {newCart(); setVisible(false); setName("")}}
    visible={visible}
    setVisible={setVisible}
    />
    </>
  )
}
