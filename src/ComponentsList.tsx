import React from 'react'

export const ComponentsList = {
    input: (props:any)=><input {...props} />,
    select: (props:any)=>{
        const inputProps = {...props}
        delete inputProps.options
    return <select {...inputProps}>{props.options.map((option: any, i:number)=>{
    return<option key={i} value={option.value}>{option.label}</option>
    })}
    </select>
},
    checkbox: (props:any)=><input {...props} />,
    button: (props:any)=><button {...props} >{props.name}</button>,
}
