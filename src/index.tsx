import React from 'react'
import { ContextStateProvider, useContextState } from 'dynamic-context-provider';
import { Formik } from 'formik'
import { ComponentsContextProvider as CCP } from './ComponentsContext'
import { MapGenerator } from './MapGenerator'
import { useComponentsContext } from './ComponentsContext';

export const ComponentsContextProvider = CCP
export const FormGenerator = (props:any)=>{
  const { components: {button} } = useComponentsContext()

  const {
    initialValues = {},
    bluePrint,
    submitConfig,
    validation=()=>{}
  } = props
  const onSubmit = submitConfig ? submitConfig.handleSubmit : ()=>{}
  return(
    <Formik
    initialValues={initialValues}
    validate={validation}
    onSubmit={onSubmit}
  >
    {(formikProps: any) => {
      const buttonProps = {
        disabled: !formikProps.dirty,
        type: 'submit',
        name: 'Submit',
      }
      return (
        <form onSubmit={formikProps.handleSubmit}>
          <MapGenerator formikProps={formikProps} bluePrint={bluePrint} />
          <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
          }}>
          {button(buttonProps)}
          </div>
        </form>
      )
    }
    }
  </Formik>
  )
}


export const useWithContext = (props: { cacheStateKey?: any, children: any, initialValues: any }) => {
  return (
    <ContextStateProvider cacheStateKey={props.cacheStateKey} stateConfig={props.initialValues}>
      {props.children}
    </ContextStateProvider>
  )
}

FormGenerator.useContextState = useContextState



