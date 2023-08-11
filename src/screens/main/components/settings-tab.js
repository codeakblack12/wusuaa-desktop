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
import { changeSettingsTab, userState } from '../../../redux/slices/userSlice';
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

function SettingsTab() {

  const { socket } = useContext(SocketContext)
  const { userData } = useAppSelector(userState)

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [pay, setPay] = useState(false)
  const [email, setEmail] = useState("")


  const dispatch = useAppDispatch()

  const { settings_tab } = useAppSelector(userState)


  return (
    <div className={`h-full mt-2 mr-[25px] ml-[10px] opacity-${loading ? "20" : "100"}`}>
      <BaseText p fontSize={"2xl"} style="text-2xl font-medium mb-[15px]" color="black" >
        Settings
      </BaseText>
      <div className="w-[255px] px-[20px] py-[20px] h-full flex flex-col justify-between bg-white border border-primary rounded-2xl overflow-hidden">

        <div>
          <BaseButton
          title="Account settings"
          style={`w-full items-start px-[10px] ${settings_tab === "account" ? "" : "bg-white"}`}
          textStyle={`text-left`}
          textColor={settings_tab === "account" ? "" : "text-base"}
          onClick={() => dispatch(changeSettingsTab("account"))}
          />
          <BaseButton
          title="Change Password"
          style={`w-full items-start mt-[20px] px-[10px] ${settings_tab === "password" ? "" : "bg-white"}`}
          textStyle={`text-left`}
          textColor={settings_tab === "password" ? "" : "text-base"}
          onClick={() => dispatch(changeSettingsTab("password"))}
          />
          <BaseButton
          title="Counter settings"
          style={`w-full items-start mt-[20px] px-[10px] ${settings_tab === "counter" ? "" : "bg-white"}`}
          textStyle="text-left"
          textColor={settings_tab === "counter" ? "" : "text-base"}
          onClick={() => dispatch(changeSettingsTab("counter"))}
          />
        </div>

        <div>
          <BaseButton
          title="Log Out"
          style="w-full bg-black"
          backColor="bg-black"
          onClick={() => setPay(true)}
          />
        </div>

      </div>
    </div>
  )
}

export default SettingsTab