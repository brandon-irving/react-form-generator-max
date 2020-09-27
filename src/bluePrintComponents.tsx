import * as React from 'react'
import {  InputFieldProps, InputGeneratorProps } from './types'
import { transformInput, inputMap } from './helperFunctions'
import styles from './styles.module.css'
import { useContextState } from 'dynamic-context-provider';

const InputField = (props: InputFieldProps) => {
    const { submitCount=0, input: { Component, options = [], helperText, Title }, input, errors, values, handleFormChange } = props
    const errorMessage = errors[input.name]
    const inputProps = transformInput(input, values, handleFormChange)
    return (
        <div className={styles.inputContainer}>
            {Title && <Title  {...inputProps} />}
            {!Title && !input.hideTitle && input.name && input.type !== 'checkbox' && <small>{input.name}</small>}
            {Component ? <Component {...inputProps} /> : inputMap(inputProps, options)}
            { (submitCount > 0) && errorMessage && <small className={styles.errorTextDefault}>{errorMessage}</small>}
            { (submitCount > 0) && !errorMessage && helperText && <small className={styles.inputTextDefault}>{helperText}</small>}
        </div>
    )
}


export function inputGenerator(props: InputGeneratorProps) {
    const { updateContextState } = useContextState() || {}
    // If the only 2 keys in useContextState is "component, updateContextState", 
    // then do not update state
    const stateShouldBeUpdated = Object.keys(useContextState()).length > 2
    const {
        formikProps: { handleChange, values, errors, submitCount },
        visible,
        Inputs,
    } = props
    return (
        <div style={{ display: visible ? 'none' : 'block', width: '100%' }}>
            {
                // TODO: find out issue with typing
                Inputs.map((input: any, i: number) => {
                    function handleFormChange(e: any) {
                        const value = e.target.value
                        const key = input.name
                        stateShouldBeUpdated && updateContextState({ [key]: value })
                        handleChange(e)
                    }
                    return (
                        <InputField key={i} submitCount={submitCount} errors={errors} input={input} values={values} handleFormChange={handleFormChange} />
                    )
                })
            }
        </div>
    )
}