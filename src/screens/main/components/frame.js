import React from 'react'
import TopNav from './topnav'
import DataTable from './table'
import CheckoutTable from './checkout-table'

function Frame() {
  return (
    <div className="flex flex-col w-full h-screen bg-offwhite">
        <TopNav/>
        <div className="flex h-5/6">
          <DataTable/>
          <CheckoutTable/>
        </div>
    </div>
  )
}

export default Frame