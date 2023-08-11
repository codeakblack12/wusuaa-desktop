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
import Select from 'react-select';
import TextInput from '../../../components/common/input';
import { changeWarehouse, userState } from '../../../redux/slices/userSlice';
import BaseButton from '../../../components/common/button';

function AccountSettings() {

  const dispatch = useAppDispatch()

  const { userData, active_warehouse } = useAppSelector(userState)
  const [warehouses, setWarehouses] = useState([])

  useEffect(() => {
    processWarehouses()
  }, [])

  const processWarehouses = async () => {
    const warehouse_data = await userData?.warehouse?.map((val) => {
        return {value: val, label: val}
    })
    setWarehouses(warehouse_data)
  }

  const changeWarehouse_ = async (data) => {
    dispatch(changeWarehouse(data?.label))
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
                        {`First Name`}
                    </h3>
                    <TextInput
                    // label={"Email address"}
                    value={`${userData.firstName}`}
                    style="w-96 bg-white border border-unselect-text text-dark"
                    titleStyle="text-dark"
                    />
                </div>
                <div>
                    <h3 className="text-base">
                        {`Last Name`}
                    </h3>
                    <TextInput
                    // label={"Email address"}
                    value={`${userData.lastName}`}
                    style="w-96 bg-white border border-unselect-text text-dark"
                    titleStyle="text-dark"
                    />
                </div>
            </div>
            <div className="relative p-[20px] w-full flex justify-between">
                <div>
                    <h3 className="text-base">
                        {`Active Warehouse`}
                    </h3>
                    {/* <TextInput
                    // label={"Email address"}
                    value={userData?.warehouse ? userData?.warehouse[0] : ""}
                    type="email"
                    style="w-96 bg-white border border-unselect-text text-dark"
                    titleStyle="text-dark"
                    /> */}
                    <Select
                        className="mt-6 w-96 bg-white text-dark"
                        classNamePrefix="select"
                        defaultValue={{value: active_warehouse, label: active_warehouse}}
                        isDisabled={false}
                        isLoading={false}
                        isClearable={false}
                        isSearchable={true}
                        options={warehouses}
                        onChange={(value) => {
                            changeWarehouse_(value)
                        }}
                        styles={{
                            control: base => ({
                                ...base,
                                height: 46,
                                minHeight: 35
                            })
                        }}
                    />
                </div>
                <div>
                    <h3 className="text-base">
                        {`Email address`}
                    </h3>
                    <TextInput
                    // label={"Email address"}
                    value={userData.email}
                    type="email"
                    style="w-96 bg-white border border-unselect-text text-dark"
                    titleStyle="text-dark"
                    />
                </div>
            </div>
            <div className="relative p-[20px] w-full flex justify-between">
                <BaseButton
                title="Save"
                style="w-96 mt-[20px]"
                onClick={() => console.log("help")}
                />
            </div>
          </table>
      </div>
    </div>
  )
}

export default AccountSettings