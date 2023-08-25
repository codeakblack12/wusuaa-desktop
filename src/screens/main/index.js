import React, { useEffect, useContext } from 'react'
import NavBar from './components/navbar'
import Frame from './components/frame'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { addToCart, closeCart, getCarts, updateCartList } from '../../redux/slices/cartSlice'
import { getMe, getPrevMe } from '../../redux/slices/userSlice'
import { userState } from '../../redux/slices/userSlice'
import { SocketContext } from '../../context/socket'

function Dashboard() {

  const { socket } = useContext(SocketContext);

  const { userData, active_warehouse } = useAppSelector(userState)

  useEffect(() => {
    initialize()
  }, [])
  useEffect(() => {
    initializeCarts()
  }, [active_warehouse])

  useEffect(() => {
    socket.on(userData._id, (payload) => {
      addCart(payload)
    })

    socket.on(`CLOSE-CART-${active_warehouse}`, (payload) => {
      closeCart_(payload)
    })

    return () => {
      socket.off(userData._id);
    };
  }, [userData, socket, active_warehouse])

  const addCart = async (payload) => {
    await dispatch(updateCartList({type: "add", payload: payload}))
  }

  const closeCart_ = async (payload) => {
    await dispatch(closeCart(payload))
  }

  const dispatch = useAppDispatch()


  const initialize = async () => {
    await dispatch(getMe())
  }

  const initializeCarts = async () => {
    if(active_warehouse){
      await dispatch(getCarts(active_warehouse))
    }
  }

  return (
    <div className="flex h-screen">
      <NavBar/>
      <Frame/>
    </div>
  )
}

export default Dashboard