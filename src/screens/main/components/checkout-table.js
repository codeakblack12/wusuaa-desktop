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
import CloseCart from '../../../components/modals/close-cart';
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
  const [close, setClose] = useState(false)
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
      <div className='w-full flex justify-between my-2' >
        <BaseText p fontSize={size} style={`text-${size} font-${weight || "normal"}`} color="black" >
          {title}
        </BaseText>
        <BaseText p fontSize={size} style={`text-${size} font-${weight || "normal"}`} color="black" >
          {value}
        </BaseText>
      </div>
    )
  }

  const dummy = [
    {category: "Titus", quantity: "3", price: "4000", currency: "GHS"},
    {category: "Titus", quantity: "3", price: "4000", currency: "GHS"},
    {category: "Titus", quantity: "3", price: "4000", currency: "GHS"},
    {category: "Titus", quantity: "3", price: "4000", currency: "GHS"},
    {category: "Titus", quantity: "3", price: "4000", currency: "GHS"},
    {category: "Titus", quantity: "3", price: "4000", currency: "GHS"},
    {category: "Titus", quantity: "3", price: "4000", currency: "GHS"},
    {category: "Titus", quantity: "3", price: "4000", currency: "GHS"},
    {category: "Titus", quantity: "3", price: "4000", currency: "GHS"},
    {category: "Titus", quantity: "3", price: "4000", currency: "GHS"},
    {category: "Titus", quantity: "3", price: "4000", currency: "GHS"},
    {category: "Titus", quantity: "3", price: "4000", currency: "GHS"},
    {category: "Titus", quantity: "3", price: "4000", currency: "GHS"},
    {category: "Titus", quantity: "3", price: "4000", currency: "GHS"},
    {category: "Titus", quantity: "3", price: "4000", currency: "GHS"},
    {category: "Titus", quantity: "3", price: "4000", currency: "GHS"},
    {category: "Titus", quantity: "3", price: "4000", currency: "GHS"},
    {category: "Titus", quantity: "3", price: "4000", currency: "GHS"},
    {category: "Titus", quantity: "3", price: "4000", currency: "GHS"},
    {category: "Titus", quantity: "3", price: "4000", currency: "GHS"},
    {category: "Titus", quantity: "3", price: "4000", currency: "GHS"},
    {category: "Titus", quantity: "3", price: "4000", currency: "GHS"},
    {category: "Titus", quantity: "3", price: "4000", currency: "GHS"},
    {category: "Titus", quantity: "3", price: "4000", currency: "GHS"},
  ]

  const ItemRender = ({item, index}) => {
    return (
      <tr className='mt-[15px] w-full flex justify-between'>
        <td className='text-sm w-[30%] text-start' >{firstLetterUppercase(item.category)}</td>
        <td className='text-sm font-sans w-[30%] text-center' >{`x ${item?.quantity}`}</td>
        <td className='text-sm font-sans w-[30%] text-end' >{formatMoney(item.price, data?.currency)}</td>
      </tr>
    )
  }

  return (
    <div className={`h-full my-[50px] mr-10 opacity-${loading ? "20" : "100"}`}>
      <div className="w-full px-[20px] py-[20px] h-full flex flex-col justify-between bg-white border border-primary rounded-2xl overflow-hidden">

        <div className='h-4/6 overflow-auto'>
          <BaseText p fontSize={"2xl"} style="text-2xl font-medium line-clamp-2" color="black" >
            Checkout {'\n'}{data?.customer_name ? `(${data?.customer_name})` : ""}
          </BaseText>
          {/* <div className='w-full my-[20px] h-[400px] border-t-[1px] border-unselect-text flex flex-col justify-around'>

          </div> */}
          <table className='table-fixed w-full border-unselect-text flex flex-col justify-start'>
            <thead className="bg-white h-10 border-b-[1px] flex items-center sticky top-0">
                <tr className='w-full flex justify-between'>
                  <th className="text-dark-transparent text-sm font-medium w-[30%] text-start line-clamp-1">Item Name</th>
                  <th className="text-dark-transparent text-sm font-medium w-[30%] text-center line-clamp-1">Quantity</th>
                  <th className="text-dark-transparent text-sm font-medium w-[30%] text-end line-clamp-1">Price</th>
                </tr>
            </thead>
            <tbody className='overflow-y-scroll'>
              {
                data?.items?.map((item, index) => {
                  return <ItemRender index={index} item={item} />
                })
                // dummy?.map((item, index) => {
                //   return <ItemRender index={index} item={item} />
                // })
              }
              {/* {
                selected_cart_items?.map((item, index) => {
                  return <ItemRender index={index} item={item} />
                })
              } */}
            </tbody>
          </table>
        </div>


        <div className='h-3/6 flex flex-col justify-between'>
          <div className='w-full border-y-[1px] border-unselect-text flex flex-col justify-around'>
            <PriceComponent
            title={"Subtotal"}
            value={formatMoney(data?.subtotal || 0, data?.currency)}
            size={"base"}
            weight={"normal"}
            />
            <PriceComponent
            title={`NHIL/GETFD/COVID(${ data?.covidVatValue ? data?.covidVatValue?.toFixed(2) : "0"}%)`}
            value={formatMoney( data?.covidVat || 0, data?.currency)}
            size={"base"}
            weight={"normal"}
            />
            <PriceComponent
            title={`VAT(${ data?.vatValue ? data?.vatValue?.toFixed(2) : "0"}%)`}
            value={formatMoney( data?.vat || 0, data?.currency)}
            size={"base"}
            weight={"normal"}
            />
          </div>
          <PriceComponent
          title={"Total"}
          value={formatMoney(data?.total || 0, data?.currency)}
          size={"xl"}
          weight={"semibold"}
          />
          <div className=''>
            {!data?.confirmed && <BaseButton
            title="Proceed to checkout"
            style="w-full mt-[10px]"
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
            <BaseButton
            // textColor={"button"}
            title="Close Cart"
            style="w-full bg-error mt-[10px]"
            disabled={loading || !data?.uid}
            onClick={async () => {
              setClose(true)
              // alert("Feature currently unavailable")
            }}
            />
          </div>
        </div>

      </div>
      <PayMethod
      visible={pay}
      onCancel={() => setPay(false)}
      data={data}
      />
      <CloseCart
      visible={close}
      onCancel={() => setClose(false)}
      data={data}
      />
    </div>
  )
}

export default CheckoutTable