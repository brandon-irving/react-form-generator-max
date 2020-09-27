import React from 'react'
import {
  FormGenerator,
  useWithContext
} from 'form-generator'
import 'form-generator/dist/index.css'
import { styles } from './styles.js'
import { BasicFormBluePrint, ComplexFormBluePrint } from './bluePrints'

const CustomButtonComponent = (props: any) => {
  return <button style={styles.customButton} type="submit" disabled={!props.dirty}>Submit the Form!</button>
}
const App = () => {
  return (
    <div style={styles.formContainer} >
      <div style={{ border: '1px solid', textAlign: "center" }}>
        <BasicForm />
      </div>
      <div style={{ border: '1px solid', textAlign: "center" }}>
        <ContextEnabledFormContainer />
      </div>
      <div style={{ border: '1px solid', textAlign: "center" }}>
        <ComplexForm />
      </div>
    </div>


  )
}

const BasicForm = () => {
  const initialValues = { first: '', last: '' }
  function handleSubmit(values: any, formikProps: any){
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      formikProps.setSubmitting(false);
    }, 400);
    formikProps.resetForm()
  }
  const FormGeneratorProps = { 
    initialValues, 
    bluePrint: BasicFormBluePrint(true), 
    handleSubmit
  }
  return (<FormGenerator {...FormGeneratorProps} />)
}
const ContextEnabledFormContainer = () => {
  const [initialValues, setInitialValues] = React.useState({ first: '', last: '' })
  return (useWithContext({ children: <ContextEnabledForm setInitialValues={setInitialValues} initialValues={initialValues} />, initialValues }))
}
const ContextEnabledForm = (props: any) => {
  const { updateContextState } = FormGenerator.useContextState()
  function handleSubmit(values: any, formikProps: any) {
    props.setInitialValues(values)
    updateContextState({ ...values })

    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      formikProps.setSubmitting(false);
    }, 400);
    formikProps.resetForm()
  }
  const FormGeneratorProps = { initialValues: props.initialValues, bluePrint: BasicFormBluePrint(false), handleSubmit }
  return (<FormGenerator {...FormGeneratorProps} />)
}

const ComplexForm = () => {
  const initialValues = { first: '', last: '', email: '', telephone: '' }
  const validation = (values: any,) => {
    const errors = Object.keys(values).reduce((acc: object, curr: string) => {
      let newErrors = { ...acc }
      if (curr !== 'telephone' && !values[curr].length) {
        newErrors[curr] = 'Required'
      }
      return { ...newErrors }
    }, {})
    return errors
  }

  const FormGeneratorProps = {
    validation,
    initialValues,
    bluePrint: ComplexFormBluePrint,
    handleSubmit: (values: any, formikProps: any) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        formikProps.setSubmitting(false);
      }, 400);
    },
    submitButton: (props: any) => <CustomButtonComponent {...props} />
  }
  return (<FormGenerator {...FormGeneratorProps} />)
}



export default App
