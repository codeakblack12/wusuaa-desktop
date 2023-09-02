import React, {useState} from 'react'
import BaseText from './text'
import eye from "../../assets/auth/eye.svg"

function TextInput(props) {

  const { style, type, name, label, onChangeText, onKeyPress, error, ref, value, titleStyle } = props

  const [secure, setSecure] = useState(true)

  return (
    <div className={`mt-6 relative`}>
        {label && <BaseText p style={`mb-2 ${titleStyle}`} >
            {label}
        </BaseText>}
        <input
        value={value} ref={ref} onKeyDown={onKeyPress} onChange={onChangeText}
        className={`w-96 text-sm h-12 bg-input rounded-md self-center px-3.5 focus:outline-none font-bold ${style}`}
        type={secure ? (type || "text") : "text"} name={name} />
        {error && <BaseText color="error" p style="my-2 text-error" >
            {error}
        </BaseText>}
        {type === "password" &&
        <button
            // hitSlop={HITSLOP}
            // style={styles.iconArea}
            onClick={() => setSecure(secure => !secure)}
            class='absolute inset-y-0 mt-6 right-0 flex items-center pr-3'
          >
            <img src={eye} alt="eye" />
        </button>}
    </div>
  )
}

export default TextInput