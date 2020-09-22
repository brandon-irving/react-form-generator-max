import React from 'react'
import { FormGenerator, useWithContext } from 'form-generator'
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'form-generator/dist/index.css'
const initialValues = { test:'test', component: 'Default', id: '0', first: 'Brandon', last: 'Irving'}

const CustomComponent = (props: any)=>{
  return <Form.Control id={props.name} value={props.value} onChange={props.onChange} type="text"   />
}

const App = () => {

  return (
    // <Test />
      <>{useWithContext({children: <Test />, initialValues})}</>
  )
}

const bluePrint = {
  Rows: [
    {},
    {
      as: 6,
      Inputs: [
        {
          id: 'test',
          name: 'test',
          type: 'text',
          Component: (props: any)=><CustomComponent {...props} />,
        },
    ]
  },
    { 
      Cols:[
        {
          as: 6,
          Inputs: [
            {
              id: 'first',
              name: 'first',
              type: 'text',
              helperText:'yo first name son',
              Component: (props: any)=><CustomComponent {...props} />,
            },
        ]
      },
      {
        as: 6,
        Inputs: [
          {
            id: 'last',
            name: 'last',
            type: 'text',
              Component: (props: any)=><CustomComponent {...props} />,
          },
      ]
      
    },
      ]
    },
  // Blank rows, can be used as spacer
  // {},
    { 
      Cols:[
        {
          Inputs: [
            {
              id: 'email',
              name: 'email',
              type: 'text',
                  Component: (props: any)=><CustomComponent {...props} />,
            },
          ]
        },
      ]
    },
  ]
  
}
const Test = ()=>{
  // access to form values
  const { first } = FormGenerator.useContextState()
  console.log('first', first)

  // Where you can do your input logic
  const validation = (values:any)=>{
    const errors: any = {};
    if (values.first === 'nigga') {
      errors.first = 'Woooaaah';
    } 
    if (!values.last) {
      errors.last = 'Required';
    } 
    return errors;
  }
  return(
 <FormGenerator 
    validation={validation}
    initialValues={initialValues} 
    bluePrint={bluePrint}  
    handleSubmit={(values:any)=>console.log('values', values)}
    // submitButton={(values:any)=> <Button onClick={()=>console.log('values', values)}> submit</Button>}
    />
   
  )
}

export default App
