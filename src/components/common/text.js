import React from 'react'

function BaseText(props) {
    const { children, style, p, h1, h2, fontSize, color } = props
    return (
        <div>
            {p && <p class={`text-${color || "offwhite"} text-${fontSize || "sm"} font-sans ${style}`}>
                {children}
            </p>}
            {h1 && <h1 class={`text-${color || "offwhite"} text-${fontSize || "sm"} font-sans ${style}`}>
                {children}
            </h1>}
            {h2 && <h2 class={`text-${color || "offwhite"} text-${fontSize || "sm"} font-sans ${style}`}>
                {children}
            </h2>}
        </div>
    )
}

export default BaseText