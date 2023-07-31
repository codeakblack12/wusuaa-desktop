import React from 'react'
import BaseText from './text'
import { CircularProgress } from '@mui/material';
import { Button as AppButton } from '@mui/material';


function BaseButton(props) {
    const { style, title, onClick, type, disabled, loading, textColor } = props

    return (
        <button
        data-testid="start-icon"
        onClick={onClick}
        type={type || "button"}
        disabled={disabled}
        className={`w-80 h-12 bg-button rounded-md ${style} ${disabled ? "opacity-50" : "opacity-100"}`} >
            {!loading && <BaseText style={`font-bold text-${textColor || "white"}`} color={textColor || "white"} p>
                {title}
            </BaseText>}
            {loading && <CircularProgress
            size={20}
            color="secondary" sx={{
                color: textColor || "#fff"
            }} />}
        </button>
    )
}

export default BaseButton