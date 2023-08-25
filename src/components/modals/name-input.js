import React from 'react'
import TextInput from '../common/input';
import BaseButton from '../common/button';
import BaseText from '../common/text';
import closeicon from "../../assets/dashboard/close-circle.svg"

function NameInputModal({
  email, setEmail, handleSubmit, visible, setVisible
}) {

  return (
    <>
        {visible && <div
            className="justify-center bg-dark-transparent items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
            <div className="animate-[wiggle_1s_ease-in-out_infinite] relative w-[393px] h-[399px] my-6 mx-auto">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/* HEADER */}
                    <div className="flex items-start justify-between px-[20px] pt-6 rounded-t">
                        <h3 className="text-base font-semibold">
                            {`Enter Customer Name`}
                        </h3>
                        <button
                            onClick={() => setVisible(false)}
                        >
                            <img src={closeicon} alt="close" />
                        </button>
                    </div>
                    {/* BODY */}
                    <div className="relative p-[20px] flex-auto w-full">
                        <TextInput
                        // label={"Email address"}
                        value={email}
                        type="email"
                        style="w-full bg-white border border-unselect-text text-dark"
                        onChangeText={(v) => {
                            setEmail(v.target.value)
                        }}
                        // error={touched.email ? errors.email : undefined}
                        />
                    </div>
                    {/* FOOTER */}
                    <div className='p-[20px]' >
                        <BaseButton
                        title="Confirm"
                        style="w-full"
                        // loading={loading}
                        disabled={email === "" ? true : false}
                        onClick={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>}
    </>
  )
}

export default NameInputModal