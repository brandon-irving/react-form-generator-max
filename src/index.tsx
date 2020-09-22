import * as React from 'react'
import { ContextStateProvider, useContextState } from 'dynamic-context-provider';
import { Formik, FormikHelpers } from 'formik';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { inputGenerator } from './bluePrintComponents'
import { FormikProps, RowProps, ColProps, FormGeneratorProps } from './types'

const EmptyDiv = ()=> <div style={{ display: 'block', height: '45px' }} />

// TODO: import as npm package, add UseWithContextProps
export const useWithContext = (props: any) => {
  return (
    <ContextStateProvider cacheStateKey={props.cacheStateKey} stateConfig={props.initialValues}>
      {props.children}
    </ContextStateProvider>
  )
}

// TODO: investigate why IFormGeneratorProps is not working
export const FormGenerator = (props: FormGeneratorProps) => {
  const { updateContextState } = useContextState() || {}

  async function submitForm(values: any, formikProps: FormikHelpers<any>) {
    const { setSubmitting } = formikProps
    console.log('formikProps', formikProps)
    props.handleSubmit && props.handleSubmit(values)
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  }

  return <Formik
    initialValues={props.initialValues}
    validate={props.validation}
    onSubmit={submitForm}
  >
    {(formikProps: FormikProps) => {
      const { handleSubmit, isSubmitting } = formikProps
      return (
        <Grid fluid>
          <form onSubmit={handleSubmit}>
            {props.bluePrint.Rows.map((row: RowProps, i: number) => {
              // Empty Cols will auto format the flex position
              if (row.Cols) {
                return <Row between="xs" key={i}>{
                  row.Cols.map((col: ColProps, j: number) => {
                    if(col.Inputs){
                      return <Col xs={col.as || undefined} key={j} >{inputGenerator({ Inputs: col.Inputs, formikProps, updateContextState })}</Col>
                    }
                    return <Col xs={col.as || undefined} key={j} />
                  })
                }</Row>
              }
              if (row.Inputs) {
                return <Row between="xs" key={i}>{inputGenerator({ Inputs: row.Inputs, formikProps, updateContextState })}</Row>
              }
              return <EmptyDiv key={i} />
            })}

            {props.submitButton ?
            props.submitButton(formikProps.values) :
             <button type="submit" disabled={isSubmitting}>
              Submit
           </button>}
          </form>

        </Grid>


      )
    }}
  </Formik>
}

FormGenerator.useContextState = useContextState