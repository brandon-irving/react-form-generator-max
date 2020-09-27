
export interface FormGeneratorProps {
  initialValues: any;
  bluePrint: any;
  validation?: any;
  submitButton?: (values: any) => React.ReactElement;
  handleSubmit?: (values: any, formikProps:any) => any;
}

export interface OnInputChangeProps {
  value:any, values: Array<object>, seterror: any, key: string
}


export interface InputProps {
    id: string,
    name: string,
    type: string,
    Component?: any,
    options?:Array<object>,
    visible?:boolean,
    helperText?: string,
    hideTitle?: boolean,
    Custom?: (values: any) => React.ReactElement;
    Title?: any,

  }

  export interface RowProps {
    justifyContent?: string, // around, between
    visible?: boolean,
    Inputs?: Array<InputProps> ,
    Cols?: Array<ColProps>,
    title?: string,
    titleLocation?: string,
    underline?: boolean,
  }
  export interface ColProps {
    visible?: boolean,
    Inputs?: Array<InputProps>,
    as?:number,
    title?: string,
    titleLocation?: string,
    underline?: boolean,

  }
  
  export interface InputFieldProps {
    input: InputProps,
    errors: object,
    handleFormChange: (value:any)=>void,
    values: any,
    submitCount?: number
}
export interface InputGeneratorProps {
  formikProps: FormikProps,
  visible?: boolean,
  updateContextState: any,
  Inputs: Array<object>,
}
export interface FormikProps  {
  dirty: boolean,
  errors: object,
  handleBlur: (e:any)=>any,
  handleChange: (e:any)=>any,
  handleReset: (e:any)=>any,
  handleSubmit: (e:any)=>any,
  isSubmitting: boolean,
  isValid: boolean,
  isValidating: boolean,
  resetForm: (e:any)=>any,
  setErrors: (e:any)=>any,
  setFieldError: (e:any)=>any,
  setFieldTouched: (e:any)=>any,
  submitForm: (e:any)=>any,
  submitCount: number,
  setFieldValue: (e:any)=>any,
  setStatus: (e:any)=>any,
  setSubmitting: (e:any)=>any,
  setTouched: (e:any)=>any,
  setValues: (e:any)=>any,
  status: any,
  touched: object,
  values: object,
  validateForm: (e:any)=>any,
  validateField: (e:any)=>any,
  setFormikState: (e:any)=>any,

};
