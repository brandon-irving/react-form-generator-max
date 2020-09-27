import * as React from 'react'
import { useContextState } from 'dynamic-context-provider';
import { InputProps } from "./types"
import styles from './styles.module.css'

const Checkbox = (props: any) => {
    const { id, name = "", onChange, type, value, labelLocation = "left" } = props
    const inputProps = { id, name, onChange, type, value }
    const renderCheckBoxRight = labelLocation === 'left' ? true : false
    // TODO: Work out CSS
    return (
        <div>
            <label className={styles.label} htmlFor={id} >
                {!renderCheckBoxRight && <input className={styles.checkboxRight} {...inputProps} checked={value} />}
                {name}
                {renderCheckBoxRight && <input className={styles.checkboxLeft} {...inputProps} checked={value} />}
            </label>

        </div>
    )
}
// TODO: add all input fields 
export const inputMap = (inputProps: InputProps, options: Array<any>) => {
    const { components: { Input=null, Select=null } } = useContextState().components ? useContextState() : {components: {}}

    const inputMapper = (key: string, inputProps:InputProps)=>{
        const inputs = {
        select: Select ? <Select {...inputProps} /> : <select {...inputProps}>
            {options.map((option: any, i: number) => {
                return <option key={i} value={option.value}>{option.label}</option>
            })}
        </select>,
        textArea: <textarea {...inputProps} />,
        checkbox: <Checkbox {...inputProps} /> || <input {...inputProps} type="checkbox" />,
        // custom: <Custom />
    }
    return inputs[key]
}
    return inputMapper[inputProps.type] ||  (Input ?<Input  {...inputProps} /> : <input  {...inputProps} />)
}
export function transformInput(input: InputProps, values: any, handleFormChange: (e: any) => void) {
    const inputProps = { ...input, value: values[input.name], onChange: handleFormChange }
    // TODO find better way to handle this
    // cleans up input destructure
    delete inputProps.Component
    delete inputProps.visible
    delete inputProps.helperText
    return inputProps
}
