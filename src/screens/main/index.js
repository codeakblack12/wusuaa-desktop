import React, { useEffect, useContext } from 'react'
import NavBar from './components/navbar'
import Frame from './components/frame'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { addToCart, getCarts, updateCartList } from '../../redux/slices/cartSlice'
import { getMe, getPrevMe } from '../../redux/slices/userSlice'
import { userState } from '../../redux/slices/userSlice'
import { SocketContext } from '../../context/socket'

function Dashboard() {

  const { socket } = useContext(SocketContext);

  const { userData } = useAppSelector(userState)

  useEffect(() => {
    initialize()
  }, [])

  useEffect(() => {
    socket.on(userData._id, (payload) => {
      addCart(payload)
    })

    return () => {
      socket.off(userData._id);
    };
  }, [userData, socket])

  const addCart = async (payload) => {
    await dispatch(updateCartList({type: "add", payload: payload}))
  }

  const dispatch = useAppDispatch()


  const initialize = async () => {
    await dispatch(getMe())
    await dispatch(getCarts())

  }

  return (
    <div className="flex h-screen">
      <NavBar/>
      <Frame/>
    </div>
  )
}

export default Dashboard