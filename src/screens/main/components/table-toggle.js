import React, {useContext, useEffect} from 'react'
import BaseText from '../../../components/common/text';
import { useAppDispatch } from '../../../redux/hooks';
import { SocketContext } from '../../../context/socket';
import { cartState } from '../../../redux/slices/cartSlice';
import { addToCart } from '../../../redux/slices/cartSlice';
import { useAppSelector } from '../../../redux/hooks';

export default function CartToggle({value, selected, onClick}) {

  const dispatch = useAppDispatch()

  const { loading } = useAppSelector(cartState)

  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on(value, (payload) => {
      console.log("---------NEW ITEM--------")
      let new_payload = payload
      new_payload.cart = value
      addItem(new_payload)
    })

    return () => {
      socket.off(value);
    };

  }, [socket])

  const addItem = async (payload) => {
    await dispatch(addToCart(payload))
  }

  return (
    <button
    onClick={onClick}
    className='h-fit w-[115px]'>
        <div className="absolute mt-[18px] w-[115px]">
            <BaseText p fontSize={"xs"}
            color={value === selected ? "white" : "toggle-unselect-text"}
            style={`font-medium visible whitespace-nowrap text-center self-center text-xs ${value === selected ? "text-white" : "text-toggle-unselect-text"}`} >
                {value}
            </BaseText>
        </div>
        <svg className={`fill-current ${value === selected ? 'text-toggle-select' : 'text-toggle-unselect'}`}
        width="120" height="37" viewBox="0 0 151 15" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.3044 37C5.70527 37 2.81615 32.0382 5.08633 28.0384L19.2755 3.03837C20.3414 1.16037 22.3342 0 24.4936 0H124.203C126.256 0 128.167 1.04995 129.268 2.78318L145.146 27.7832C147.683 31.7778 144.813 37 140.081 37H10.3044Z"/>
        </svg>
    </button>
  )
}
