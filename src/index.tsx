import * as React from 'react'
import { ContextStateProvider, useContextState } from 'dynamic-context-provider';
import { Formik, FormikHelpers } from 'formik';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { inputGenerator } from './bluePrintComponents'
import { FormikProps, RowProps, ColProps, FormGeneratorProps } from './types'

const EmptyDiv = () => <div style={{ display: 'block', height: '45px' }} />

export const useWithContext = (props: {cacheStateKey?: any, children: any, initialValues: any}) => {
  return (
    <ContextStateProvider cacheStateKey={props.cacheStateKey} stateConfig={props.initialValues}>
      {props.children}
    </ContextStateProvider>
  )
}
export const FormGenerator = (props: any)=>{
  if((props.components && !props.FormGeneratorProps) || (!props.components && props.FormGeneratorProps)){
    throw 'Error: components prop and FormGeneratorProps must be used together to work'
  }
  else if(props.components){
    return(
      <ContextStateProvider  stateConfig={{components: props.components || {}}}>
        <FormGeneratorContent {...props.FormGeneratorProps} />
    </ContextStateProvider>
    )
  }
  return(
    <FormGeneratorContent {...props} />
  )
}
export const FormGeneratorContent = (props: FormGeneratorProps) => {
  const { updateContextState } = useContextState() || {}

  async function submitForm(values: any, formikProps: FormikHelpers<any>) {
    const { setSubmitting } = formikProps
    props.handleSubmit && props.handleSubmit(values, formikProps)
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  }
const emptyFunc = ()=>{
  return {}
}
  return <Formik
    initialValues={props.initialValues}
    validate={props.validation ? (values:any)=>props.validation(values) : emptyFunc}
    onSubmit={submitForm}
  >
    {(formikProps: FormikProps) => {
      const { handleSubmit, isSubmitting } = formikProps


      return (
        <Grid fluid>
          <form onSubmit={(e:any)=>{
            handleSubmit(e)
            }}>
            {props.bluePrint.Rows.map((row: RowProps, i: number) => {
              // TODO: extract into components file
              // TODO: add in types
              // interface TitleLocationProps {
              //   left?: string,
              //   center?: string,
              //   right?: string,
                
              // }
              // interface TitleTypeProps {
              //   row?: string,
              //   col?: string,
              // }
              const Title = (props: { title?: any, type: any, titleLocation?: any, underline?: boolean }) => {
                const justifyContentMap = {
                  left: 'flex-start',
                  right: 'flex-end',
                  center: 'center'
                }
                const titleStyle = {
                  display: 'flex',
                  justifyContent: justifyContentMap[props.titleLocation] || 'center'
                }
                const underlineStyle = {
                  borderTop: '1px solid gainsboro',
                  margin: '-5px 0px 10px',
                }
                const displayRowTitle = props.title && props.type === 'row'
                const displayColTitle = props.title && props.type === 'col'
                return <React.Fragment>
                  {displayRowTitle && <h2 style={titleStyle}>{props.title}</h2> }
                  {displayColTitle && <h3 style={titleStyle}>{props.title}</h3>}
                  {props.underline && <div style={underlineStyle} />}
                </React.Fragment>
              }
              // Empty Cols will auto format the flex position
              if (row.Cols) {
                return <React.Fragment key={i}>
                  <Title titleLocation={row.titleLocation} title={row.title} underline={row.underline} type="row" />
                  <Row between="xs">{
                    row.Cols.map((col: ColProps, j: number) => {
                      if (col.Inputs) {

                        return <Col style={{margin: '10px'}} key={j} xs={col.as || undefined}>
                          <Title titleLocation={col.titleLocation} title={col.title} underline={col.underline} type="col" />
                          {inputGenerator({ Inputs: col.Inputs, formikProps, updateContextState })}
                        </Col>

                      }
                      return <Col style={{margin: '10px'}} key={j} xs={col.as || undefined}>
                        <Title titleLocation={col.titleLocation} title={col.title} underline={col.underline} type="col" />
                      </Col>
                    })
                  }</Row>
                </React.Fragment>

              }
              if (row.Inputs) {
                return <React.Fragment key={i}>
                  <Title titleLocation={row.titleLocation} title={row.title} underline={row.underline} type="row" />
                  <Row style={{
                    marginLeft: '-7px',
                    marginRight: '-7px',
                  }} between="xs">{inputGenerator({ Inputs: row.Inputs, formikProps, updateContextState })}</Row>
                </React.Fragment>
              }
              return <EmptyDiv key={i} />
            })}

            {props.submitButton ?
              props.submitButton(formikProps) :
              <button type="submit" disabled={isSubmitting || !formikProps.dirty}>
                Submit
           </button>}
          </form>

        </Grid>


      )
    }}
  </Formik>
}

FormGenerator.useContextState = useContextState