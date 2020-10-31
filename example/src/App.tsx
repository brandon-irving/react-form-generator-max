import React from 'react'
import { ComponentsContextProvider, FormGenerator, useWithContext } from 'form-generator'
import 'form-generator/dist/index.css'
import { BasicFormBluePrint, ExampleFormBluePrint } from './bluePrints'

// Replaces all components with your own custom components
const components = {
  input: (props: any)=>{
    return <input style={{width: '100%'}} {...props}/>
  },
  button: (props: any)=>{
    return <button style={{width: '150px', height: '30px',color:  props.disabled ? 'black' : 'white', backgroundColor: props.disabled ? 'gainsboro':'blue'}} {...props}>Custom Button</button>
  }
}

const App = () => {

  return (
    <div>
      <ComponentsContextProvider components={components}>
     <Home />
      </ComponentsContextProvider>
      <Example />
    </div>
  )
}

const Example = ()=>{
  const initialValues = {phone: '954', addy: '234'}
  return(
    <FormGenerator 
    validation={()=>{}}
    bluePrint={ExampleFormBluePrint()}
    initialValues={initialValues} 
    // submitConfig={submitConfig}
    />
  )
}
const Home = () => {

  const initialValues ={
    first: 'Brandon',
    last: 'Irving',
    role: 'user',
  }

  return (
    <div>
      {/* Makes state accessible to all children */}
      { useWithContext({
        children: <ComponentForm 
        initialValues={initialValues}
        />, 
        initialValues})}
    </div>
  )
}

const ComponentForm = (props: any) => {
  // const { first, last, updateContextState } = FormGenerator.useContextState()

   async function handleSubmit(values:any, formikProps:any){
  console.log('onSubmit', {values, formikProps})
  }
  const submitConfig ={
    button: (props:any)=><button type="submit" {...props}>Submit</button>,
    handleSubmit
  }
  function handleValidation(values:any){
    const errors = {}
    console.log('validation', values)
    return errors
  }
  return (
      <FormGenerator 
      validation={handleValidation}
      bluePrint={BasicFormBluePrint()}
      initialValues={props.initialValues} 
      submitConfig={submitConfig}
      />
  )
}


export default App
