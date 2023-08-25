import React from 'react'
import BaseText from './text'
import eye from "../../assets/auth/eye.svg"

function TextInput(props) {

  const { style, type, name, label, onChangeText, onKeyPress, error, ref, value, titleStyle } = props

  return (
    <div className={`mt-6 static`}>
        {label && <BaseText p style={`mb-2 ${titleStyle}`} >
            {label}
        </BaseText>}
        <input value={value} ref={ref} onKeyDown={onKeyPress} onChange={onChangeText} className={`w-96 text-sm h-12 bg-input rounded-md self-center px-3.5 focus:outline-none font-bold ${style}`} type={type || "text"} name={name} />
        {error && <BaseText color="error" p style="my-2 text-error" >
            {error}
        </BaseText>}
        {/* {type === "password" &&
        <div
            // hitSlop={HITSLOP}
            // style={styles.iconArea}
            // onPress={() => setSecure(secure => !secure)}
            class='absolute bottom-0 left-0'
          >
            <img src={eye} alt="eye" />
        </div>} */}
    </div>
  )
}

export default TextInput