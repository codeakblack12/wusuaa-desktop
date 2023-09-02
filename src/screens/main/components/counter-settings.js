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
import TextInput from '../../../components/common/input';
import { userState, updateCounter } from '../../../redux/slices/userSlice';
import BaseButton from '../../../components/common/button';

function CounterSettings() {

  const dispatch = useAppDispatch()

  const { userData, counter } = useAppSelector(userState)
  const [counterr, setCounterr] = useState(counter)

  const updateCounterr = async () => {
    try {
        dispatch(updateCounter(counterr))
        alert(`Counter number changed to ${counterr}`)
    } catch (error) {
        alert(error)
    }
  }


  return (
    <div className='h-full mt-4 ml-10'>
      <div className='flex pl-10 min-h-[37px]'>

      </div>
      <div className="w-[98%] h-full bg-white border border-primary rounded-2xl overflow-y-auto">
          <table className="table-fixed w-full">
            <div className="relative p-[20px] w-full flex justify-between">
                <div>
                    <h3 className="text-base">
                        {`Counter`}
                    </h3>
                    <TextInput
                    // label={"Email address"}
                    type="number"
                    value={counterr}
                    onChangeText={(v) => {
                        setCounterr(v.target.value)
                    }}
                    style="w-96 bg-white border border-unselect-text text-dark"
                    titleStyle="text-dark"
                    />
                    <BaseButton
                    title="Save"
                    style="w-96 mt-[20px]"
                    onClick={updateCounterr}
                    />
                </div>
            </div>
          </table>
      </div>
    </div>
  )
}

export default CounterSettings