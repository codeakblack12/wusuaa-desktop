import React, {useEffect, useState} from 'react'
import { useAppSelector, useAppDispatch } from '../../../redux/hooks'
import { cartState } from '../../../redux/slices/cartSlice'
import toggle from '../../../assets/dashboard/cart-toggle.svg'
import { Button as AppButton } from '@mui/material';
import BaseText from '../../../components/common/text';
import CartToggle from './table-toggle';
import AddToggle from './add-toggle';
import { selectCart } from '../../../redux/slices/cartSlice';
import { firstLetterUppercase, formatMoney } from '../../../utils/functions';

function DataTable() {

  const dispatch = useAppDispatch()

  const { carts, cart_keys, selected_cart, selected_cart_items } = useAppSelector(cartState)

  const [selected, setSelected] = useState("")

  const ItemRender = ({item, index}) => {
    return (
      <tr className='h-[56px] border-b-[1px]'>
        <td className='text-center font-sans ' >{index + 1}</td>
        <td className='text-center font-sans' >{item?.uid?.toUpperCase()}</td>
        <td className='text-center  ' >{firstLetterUppercase(item.category)}</td>
        <td className='text-center font-sans ' >{`x1`}</td>
        <td className='text-center font-sans ' >{formatMoney(item.price, item.currency)}</td>
        <td className='text-center font-sans ' >{'N/A'}</td>
      </tr>
    )
  }

  return (
    <div className='h-full mt-4 ml-10'>
      <div className='flex pl-10 min-h-[37px]'>
        {
          cart_keys.map((val) => {
            return <CartToggle key={val} value={val} selected={selected_cart} onClick={async () => {
              await dispatch(selectCart(val))
              // setSelected(val)
            }} />
          })
        }
        <AddToggle
        />
      </div>
      <div className="w-[98%] h-full bg-white border border-primary rounded-2xl overflow-y-auto">
          <table className="table-fixed w-full">
              <thead className="bg-sky-blue h-12 sticky top-0">
                  <tr>
                  <th className="text-dark-transparent text-sm font-medium">#</th>
                  <th className="text-dark-transparent text-sm font-medium">Barcode No.</th>
                  <th className="text-dark-transparent text-sm font-medium">Item Name</th>
                  <th className="text-dark-transparent text-sm font-medium">Quantity</th>
                  <th className="text-dark-transparent text-sm font-medium">Price</th>
                  <th className="text-dark-transparent text-sm font-medium">Action</th>
                  </tr>
              </thead>
              <tbody className='overflow-y-scroll'>
                {
                  selected_cart_items.map((item, index) => {
                    return <ItemRender index={index} item={item} />
                  })
                }
              </tbody>
          </table>
      </div>
    </div>
  )
}

export default DataTable