import React from 'react'
import TopNav from './topnav'
import DataTable from './table'
import CheckoutTable from './checkout-table'
import { useAppSelector } from '../../../redux/hooks'
import { userState } from '../../../redux/slices/userSlice'
import SettingsTab from './settings-tab'
import AccountSettings from './account-settings'
import CounterSettings from './counter-settings'
import ChangePassword from './change-password'

function Frame() {
  const { current_tab, settings_tab } = useAppSelector(userState)

  return (
    <div className="flex flex-col w-full h-screen bg-offwhite">
        <TopNav/>
        {current_tab === "home" && <div className="flex h-5/6">
          <div className='w-[70%]'>
            <DataTable/>
          </div>
          <div className='w-[30%]'>
            <CheckoutTable/>
          </div>

        </div>}
        {current_tab === "settings" && <div className="flex h-5/6">
          <SettingsTab/>
          {settings_tab === "account" && <AccountSettings/>}
          {settings_tab === "password" && <ChangePassword/>}
          {settings_tab === "counter" && <CounterSettings/>}
        </div>}
    </div>
  )
}

export default Frame