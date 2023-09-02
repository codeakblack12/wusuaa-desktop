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
import { useFormik } from 'formik'
import { sendPut } from '../../../server';
import { ChangePasswordSchema } from '../../../forms/schemas';

function ChangePassword() {

  const dispatch = useAppDispatch()

  const { userData, active_warehouse } = useAppSelector(userState)
  const [loading, setLoading] = useState(false)

  const initialValues = {
    oldPassword: '',
    newPassword: '',
    cNewPassword: ''
  };

  const { values, errors, touched, handleChange, handleSubmit, handleBlur, setFieldValue, isValid } = useFormik({
    initialValues,
    validationSchema: ChangePasswordSchema,
    onSubmit: async (values) => {
        try {
            setLoading(true)
            await sendPut('users/change-password', values)
            alert("Successfully updated password!")
            setLoading(false)
        } catch (error) {
            setLoading(false)
            alert(error?.response?.data?.message)
        }
    },
  });


  return (
    <div className='h-full mt-4 ml-10'>
      <div className='flex pl-10 min-h-[37px]'>

      </div>
      <div className="w-[98%] h-full bg-white border border-primary rounded-2xl overflow-y-auto">
          <table className="table-fixed w-full">
            <div className="relative p-[20px] w-full flex justify-between">
                <div className='w-6/12'>
                    <h3 className="text-base">
                        {`Old Password`}
                    </h3>
                    <TextInput
                    // label={"Email address"}
                    value={values.oldPassword}
                    type="password"
                    style="w-11/12 bg-white border border-unselect-text text-dark"
                    titleStyle="text-dark"
                    onChangeText={handleChange('oldPassword')}
                    error={touched.oldPassword ? errors.oldPassword : undefined}
                    />
                </div>
                <div className='w-6/12'>
                    <h3 className="text-base">
                        {`New Password`}
                    </h3>
                    <TextInput
                    // label={"Email address"}
                    value={values.newPassword}
                    type="password"
                    style="w-11/12 bg-white border border-unselect-text text-dark"
                    titleStyle="text-dark"
                    onChangeText={handleChange('newPassword')}
                    error={touched.newPassword ? errors.newPassword : undefined}
                    />
                </div>
            </div>
            <div className="relative p-[20px] w-full flex justify-between">
                <div className='w-6/12'>
                    <h3 className="text-base">
                        {`Confirm New Password`}
                    </h3>
                    <TextInput
                    // label={"Email address"}
                    value={values.cNewPassword}
                    type="password"
                    style="w-11/12 bg-white border border-unselect-text text-dark"
                    titleStyle="text-dark"
                    onChangeText={handleChange('cNewPassword')}
                    error={touched.cNewPassword ? errors.cNewPassword : undefined}
                    />
                </div>
            </div>
            <div className="relative p-[20px] w-full flex justify-between">
                <BaseButton
                title="Save"
                style="w-full mt-[20px]"
                loading={loading}
                onClick={handleSubmit}
                />
            </div>
          </table>
      </div>
    </div>
  )
}

export default ChangePassword