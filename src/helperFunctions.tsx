import * as React from 'react'
import { InputProps } from "./types"

// TODO: add all input fields 
export const inputMap = (inputProps: InputProps, options: Array<any>) => {  
    const map =  {
            select: <select>
                {options.map((option: any, i: number) => {
                    return <option key={i} value={option.value}>{option.label}</option>
                })}
            </select>,
            textArea: <textarea {...inputProps} />,
        }
    return  map[inputProps.type]
} 
export function transformInput(input: InputProps, values: any, handleFormChange: (e:any)=>void){
    const inputProps = { ...input, value: values[input.name], onChange: handleFormChange }
    // TODO find better way to handle this
    // cleans up input destructure
    delete inputProps.Component
    delete inputProps.visible
    delete inputProps.helperText
    delete inputProps.Inputs
    return inputProps
}
