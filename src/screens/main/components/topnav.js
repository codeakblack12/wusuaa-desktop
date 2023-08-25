import React, { useEffect, useState } from 'react'
import BaseText from '../../../components/common/text'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { changeWarehouse, updateCounter, userState } from '../../../redux/slices/userSlice'

function TopNav() {

    const dispatch = useAppDispatch()

    const { userData, counter, active_warehouse } = useAppSelector(userState)

    useEffect(() => {
        getCounter()
        getActiveWarehouse()
    }, [userData])

    const getCounter = async () => {
        const counter_ = await localStorage.getItem("COUNTER");
        if(counter_){
            dispatch(updateCounter(counter_))
        }
    }

    const getActiveWarehouse = () => {
        if(userData?.warehouse?.length){
            dispatch(changeWarehouse(userData?.warehouse[0]))
        }

    }



    return (
        <div className="flex w-full h-fit py-3 justify-between shadow bg-white items-center" >
            <div className="flex">
                <BaseText p style="font-medium ml-10 mt-1 w-max" color="light-gray" >
                    Cashier:
                </BaseText>
                <BaseText p style="font-medium ml-1 mt-1 line-clamp-1 w-max" color="black" >
                {`${userData.firstName} ${userData.lastName}`}
                </BaseText>
            </div>

            <div className="flex">
                <BaseText p style="font-medium mt-1 line-clamp-1 w-max" color="light-gray" >
                    Warehouse no:
                </BaseText>
                <BaseText p style="font-medium ml-1 mt-1 line-clamp-1 w-max" color="black" >
                    {active_warehouse}
                </BaseText>
            </div>


            <div className="flex mr-10">
                <BaseText p style="font-medium mt-1 w-max" color="light-gray" >
                    Counter:
                </BaseText>
                <BaseText p style="font-medium ml-1 mt-1 line-clamp-1 w-max" color="black" >
                    {counter}
                </BaseText>
            </div>

        </div>
    )
}

export default TopNav