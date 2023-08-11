import React, {useContext, useEffect, useState} from 'react'
import { useAppSelector, useAppDispatch } from '../../../redux/hooks'
import { cartState } from '../../../redux/slices/cartSlice'
import toggle from '../../../assets/dashboard/cart-toggle.svg'
import { Button as AppButton } from '@mui/material';
import BaseText from '../../../components/common/text';
import CartToggle from './table-toggle';
import AddToggle from './add-toggle';
import { selectCart } from '../../../redux/slices/cartSlice';
import BaseButton from '../../../components/common/button';
import { getRequest } from '../../../server';
import { firstLetterUppercase, formatMoney, generateReceipt } from '../../../utils/functions';
import { SocketContext } from '../../../context/socket';
import PayMethod from '../../../components/modals/pay-method';
import { render, Printer, Text } from 'react-thermal-printer';
import { userState } from '../../../redux/slices/userSlice';
// import { IpcRenderer } from 'electron'

// const {PosPrinter} = require('@electron/remote/main/index')

// import {ThermalPrinter } from "node-thermal-printer"

// const {PosPrinter} = require('electron').remote.require("electron-pos-printer");
// const {IpcRenderer} = require("electron")
// import { IpcRenderer } from 'electron'
// import PosPrinter from "electron-pos-printer"

const data_ = await render(
  <Printer type="epson">
    <Text>Hello World</Text>
  </Printer>
);

function CheckoutTable() {

  const { socket } = useContext(SocketContext)
  const { userData } = useAppSelector(userState)

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [pay, setPay] = useState(false)
  const [email, setEmail] = useState("")


  const dispatch = useAppDispatch()

  const { carts, cart_keys, selected_cart, selected_cart_items } = useAppSelector(cartState)

  useEffect(() => {
    getCheckout(selected_cart)
  }, [selected_cart])

  useEffect(() => {
    socket.on(`CHECKOUT-${selected_cart}`, (payload) => {
      setPay(false)
      setData(payload)
    })

    return () => {
      socket.off(`CHECKOUT-${selected_cart}`);
    };

  }, [socket, selected_cart])

  const onPrintReceipt = async () => {
    // alert(JSON.stringify(data))
    // return
    try {
      setLoading(true)
      const receipt = await generateReceipt({
        ...data,
        cashier: `${userData.firstName} ${userData.lastName}`
      })
      await window.print_receipt(receipt)
      setTimeout(() => {
        setLoading(false)
      }, 3000)
    } catch (error) {
      alert(error)
      setLoading(false)
    }
  }

  const getCheckout = async (cart) => {
    try {
      setLoading(true)
      setData({})
      const response = await getRequest(`sales/checkout-summary/${cart}`)
      setData(response.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setData({})
    }
  }

  const PriceComponent = ({
    title, value, size, weight
  }) => {
    return(
      <div className='w-full flex justify-between' >
        <BaseText p fontSize={size} style={`text-${size} font-${weight || "normal"}`} color="black" >
          {title}
        </BaseText>
        <BaseText p fontSize={size} style={`text-${size} font-${weight || "normal"}`} color="black" >
          {value}
        </BaseText>
      </div>
    )
  }

  const ItemRender = ({item, index}) => {
    return (
      <tr className='mt-[15px] w-full flex justify-between'>
        <td className='text-center text-sm w-[33%] text-start' >{firstLetterUppercase(item.category)}</td>
        <td className='text-center text-sm font-sans w-[33%] text-start' >{`x ${item?.quantity}`}</td>
        <td className='text-center text-sm font-sans w-[33%] text-start' >{formatMoney(item.price, data?.currency)}</td>
      </tr>
    )
  }

  return (
    <div className={`h-full my-[50px] mr-10 opacity-${loading ? "20" : "100"}`}>
      <div className="w-80 px-[20px] py-[20px] h-full flex flex-col justify-between bg-white border border-primary rounded-2xl overflow-hidden">

        <div>
          <BaseText p fontSize={"2xl"} style="text-2xl font-medium" color="black" >
            Checkout
          </BaseText>
          {/* <div className='w-full my-[20px] h-[400px] border-t-[1px] border-unselect-text flex flex-col justify-around'>

          </div> */}
          <table className='table-fixed w-full mb-[20px] h-[400px] border-unselect-text flex flex-col justify-start overflow-y-auto'>
            <thead className="bg-white h-10 border-b-[1px] flex items-center sticky top-0">
                <tr className='w-full flex justify-between'>
                  <th className="text-dark-transparent text-sm font-medium w-[33%] text-start">Item Name</th>
                  <th className="text-dark-transparent text-sm font-medium w-[33%] text-start">Quantity</th>
                  <th className="text-dark-transparent text-sm font-medium w-[33%] text-start">Price</th>
                </tr>
            </thead>
            <tbody>
              {
                data?.items?.map((item, index) => {
                  return <ItemRender index={index} item={item} />
                })
              }
              {/* {
                selected_cart_items?.map((item, index) => {
                  return <ItemRender index={index} item={item} />
                })
              } */}
            </tbody>
          </table>
          <div className='w-full my-[20px] h-[100px] border-y-[1px] border-unselect-text flex flex-col justify-around'>
            <PriceComponent
            title={"Subtotal"}
            value={formatMoney(data?.subtotal || 0, data?.currency)}
            size={"base"}
            weight={"normal"}
            />
            <PriceComponent
            title={"VAT(0%)"}
            value={formatMoney(0, data?.currency)}
            size={"base"}
            weight={"normal"}
            />
          </div>
          <PriceComponent
          title={"Total"}
          value={formatMoney(data?.subtotal || 0, data?.currency)}
          size={"xl"}
          weight={"semibold"}
          />
        </div>

        <div>
          {!data?.confirmed && <BaseButton
          title="Proceed to checkout"
          style="w-full"
          loading={loading}
          disabled={loading || data?.subtotal < 1 || !data?.items?.length}
          onClick={() => setPay(true)}
          />}
          {data?.confirmed && <BaseButton
          // textColor={"button"}
          title="Print Receipt"
          style="w-full"
          // style="w-full bg-white border border-black"
          loading={loading}
          disabled={loading || data?.subtotal < 1}
          onClick={async () => {
            onPrintReceipt()
            // alert("Feature currently unavailable")
          }}
          />}
        </div>

      </div>
      <PayMethod
      visible={pay}
      onCancel={() => setPay(false)}
      data={data}
      />
    </div>
  )
}

export default CheckoutTable