import React from 'react'
import BaseText from '../../../components/common/text'
import { useAppSelector } from '../../../redux/hooks'
import { userState } from '../../../redux/slices/userSlice'

function TopNav() {

    const { userData } = useAppSelector(userState)

    return (
        <div className="flex w-full h-20 shadow bg-white items-center" >
            <div className="flex">
                <BaseText p style="font-medium ml-10 mt-1" color="light-gray" >
                    Cashier:
                </BaseText>
                <BaseText p style="font-medium ml-1 mt-1" color="black" >
                {`${userData.firstName} ${userData.lastName}`}
                </BaseText>
            </div>

            <div className="flex">
                <BaseText p style="font-medium ml-80 mt-1" color="light-gray" >
                    Warehouse no:
                </BaseText>
                <BaseText p style="font-medium ml-1 mt-1" color="black" >
                    {userData?.warehouse ?userData?.warehouse[0] : ""}
                </BaseText>
            </div>


            <div className="flex">
                <BaseText p style="font-medium ml-80 mt-1" color="light-gray" >
                    Counter:
                </BaseText>
                <BaseText p style="font-medium ml-1 mt-1" color="black" >
                    {process.env.REACT_APP_COUNTER}
                </BaseText>
            </div>

        </div>
    )
}

export default TopNav