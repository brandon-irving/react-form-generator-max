import * as React from 'react'
import { InputProps, InputFieldProps, InputGeneratorProps } from './types'
import { transformInput, inputMap } from './helperFunctions'
import styles from './styles.module.css'

const InputField = (props: InputFieldProps) => {
    const { input: { Component, options = [], helperText }, input, errors, values, handleFormChange } = props
    const errorMessage = errors[input.name]
    const inputProps = transformInput(input, values, handleFormChange)
    return (
        <div className={styles.inputContainer}>
            {Component ? <Component {...inputProps} /> : inputMap(input, options) || <input  {...inputProps} />}
            {errorMessage && <small className={styles.inputTextDefault}>{errorMessage}</small>}
            {!errorMessage && helperText && <small className={styles.inputTextDefault}>{helperText}</small>}
        </div>
    )
}


export function inputGenerator(props: InputGeneratorProps) {
    const {
        formikProps: { handleChange, values, errors },
        visible,
        updateContextState,
        Inputs,
    } = props

    return (
        <div style={{ display: visible ? 'none' : 'block', width: '100%' }}>
            {
                Inputs.map((input: InputProps, i: number) => {
                    function handleFormChange(e: any) {
                        const value = e.target.value
                        const key = input.name
                        updateContextState({ [key]: value })
                        handleChange(e)
                    }
                    return (
                        <InputField key={i} errors={errors} input={input} values={values} handleFormChange={handleFormChange}  />
                    )
                })
            }
        </div>
    )
}