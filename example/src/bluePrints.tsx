import * as React from 'react'
import { styles } from './styles.js'

const CustomComponent = (props: any) => {
    const inputProps = {...props}
    delete inputProps.Title
    return <input {...inputProps} style={styles.customForm} />
}
const CustomInputTitle = (props: any) => {
    return <h2 style={{ margin: 0 }}>{props.name}</h2>
}

export const BasicFormBluePrint = () => {
    return {
        Rows: [
            {
                title: 'Row Title',
                Cols: [
                    {
                        Inputs: [
                            {
                                id: 'first',
                                name: 'first',
                                type: 'text',
                                onChange: (value: any, formikProps:any)=>{
                                    console.log('input onchange', {formikProps, value})
                                }
                            },
                        ],
                    }
                ]
            },
            {
                Cols: [
                    {
                        title: 'Col Title',
                        Inputs: [
                            {
                                id: 'last',
                                name: 'last',
                                type: 'text',
                            },
                        ],
                    }
                ]
            },
            {
                Cols: [
                    {
                        Inputs: [
                            {
                                id: 'role',
                                name: 'role',
                                type: 'select',
                                options: [
                                    {value: 'admin', label: 'admin'},
                                    {value: 'user', label: 'user'},
                                    {value: 'viewer', label: 'viewer'},
                            ]
                            },
                        ],
                    }
                ]
            }

        ]
    }
}

export const ComplexFormBluePrint = {
    Rows: [
        {
            title: 'Complex Form',
            Cols: [
                {
                    Inputs: [
                        {
                            id: 'first',
                            name: 'first',
                            type: 'text',
                            Component: (props: any) => <CustomComponent {...props} />,
                            Title: (props: any) => <CustomInputTitle {...props} />
                        },
                    ],
                },
                {
                    Inputs: [
                        {
                            id: 'last',
                            name: 'last',
                            type: 'text',
                            Component: (props: any) => <CustomComponent {...props} />,
                            Title: (props: any) => <CustomInputTitle {...props} />
                        },
                    ],
                }
            ]
        },
        {
            Cols: [
                {
                    Inputs: [
                        {
                            id: 'email',
                            name: 'email',
                            type: 'email',
                            Component: (props: any) => <CustomComponent {...props} />,
                            Title: (props: any) => <CustomInputTitle {...props} />
                        },
                        {
                            id: 'telephone',
                            name: 'telephone',
                            type: 'tel',
                            pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}',
                            placeholder: "123-456-7890",
                            helperText: 'Enter in this format "123-456-7890"',
                            Component: (props: any) => <CustomComponent {...props} />,
                            Title: (props: any) => <CustomInputTitle {...props} />
                        },
                    ]
                }
            ]
        },
    ]
}