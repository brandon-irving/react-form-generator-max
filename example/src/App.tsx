import React from 'react'
import { 
  FormGenerator, 
  useWithContext
 } from 'form-generator'
import 'form-generator/dist/index.css'
// import {styles} from './styles.js'


// const CustomComponent = (props: any)=>{
//   return <input {...props} style={styles.customForm} />
// }
// const CustomInputTitle = (props: any)=>{
//   return <h2 style={{margin: 0}}>{props.name}</h2>
// }
// const CustomButtonComponent = (props: any)=>{
//   console.log('CustomButtonComponent', props)
//   return <button style={styles.customButton} type="submit" disabled={!props.dirty}>Submit the Form!</button>
// }
const BasicFormBluePrint = {
  Rows: [
    {
      Cols: [
        {
          Inputs: [
            {
              id: 'first',
              name: 'first',
              type: 'text',
            },
            {
              id: 'last',
              name: 'last',
              type: 'text',
            },
          ],
        }
      ]
    }
  ]
}
// const ComplexFormBluePrint = {
//   Rows: [
//     {
//       Cols: [
//         {
//           Inputs: [
//             {
//               id: 'first',
//               name: 'first',
//               type: 'text',
//               Component: (props: any)=><CustomComponent {...props} />,
//               Title:  (props: any)=><CustomInputTitle {...props}/>
//             },
//           ],
//         },
//         {
//           Inputs: [
//             {
//               id: 'last',
//               name: 'last',
//               type: 'text',
//               Component: (props: any)=><CustomComponent {...props} />,
//               Title:  (props: any)=><CustomInputTitle {...props}/>
//             },
//           ],
//         }
//       ]
//     },
//     {
//       Cols: [
//         {
//           Inputs:[
//             {
//               id: 'email',
//               name: 'email',
//               type: 'email',
//               Component: (props: any)=><CustomComponent {...props} />,
//               Title:  (props: any)=><CustomInputTitle {...props}/>
//             },
//             {
//               id: 'telephone',
//               name: 'telephone',
//               type: 'tel',
//               pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}',
//               placeholder: "123-456-7890",
//               helperText: 'Enter in this format "123-456-7890"',
//               Component: (props: any)=><CustomComponent {...props} />,
//               Title:  (props: any)=><CustomInputTitle {...props}/>
//             },
//           ]
//         }
//       ]
//     },
//   ]
// }

const App = () => {
  return (
    <div className="formContainer">
 <div className="form">
      {/* <ComplexForm /> */}
    </div>
    <div className="form">
      {/* <BasicForm /> */}
    </div>
    <div className="form">
    <ContextEnabledFormContainer />
    </div>
    </div>
   
      
  )
}

const ContextEnabledFormContainer = ()=>{
  const [initialValues, setInitialValues] = React.useState({first: '', last: ''})
  return(useWithContext({children: <ContextEnabledForm setInitialValues={setInitialValues} initialValues={initialValues}/>, initialValues}))
}
const ContextEnabledForm = (props:any)=>{
  const { updateContextState } = FormGenerator.useContextState()
  function handleSubmit(values:any, formikProps:any){
    props.setInitialValues(values)
    updateContextState({...values})
    formikProps.resetForm()
  }
const FormGeneratorProps = {initialValues: props.initialValues, bluePrint: BasicFormBluePrint, handleSubmit}
  return(<FormGenerator {...FormGeneratorProps}/>)
}


// const BasicForm = ()=>{
//   const initialValues = {first: '', last: ''}
// const FormGeneratorProps = {initialValues, bluePrint: BasicFormBluePrint, handleSubmit:(values:any)=>console.log('values', values)}
//   return(<FormGenerator {...FormGeneratorProps}/>)
// }


// const ComplexForm = ()=>{
//   const initialValues = {first: '', last: '', email: '', telephone: ''}
//   const validation = (values:any,)=>{
//     console.log('log: values',values)
//     const errors = Object.keys(values).reduce((acc:object,curr:string)=>{
//       let newErrors = {...acc}
//       if(curr !== 'telephone' && !values[curr].length ){
//         newErrors[curr] = 'Required'
//       }
//       return {...newErrors}
//     },{})
//     return errors
//   }

// const FormGeneratorProps = {
//   validation, 
//   initialValues, 
//   bluePrint: ComplexFormBluePrint, 
//   handleSubmit:(values:any, formikProps:any)=>{
//     console.log('handleSubmit', {values, formikProps})
//   },
//   submitButton: (props: any)=><CustomButtonComponent {...props} />
// }
//   return(<FormGenerator {...FormGeneratorProps}/>)
// }



export default App
