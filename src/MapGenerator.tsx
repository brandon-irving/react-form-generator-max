import * as React from 'react'
import { Row, Col, Grid } from 'react-flexbox-grid'
import { useComponentsContext } from './ComponentsContext';
import { useContextState } from 'dynamic-context-provider';

export const MapGenerator = (props: any) => {
    return (
        <Grid fluid={true}>
            {
                props.bluePrint.Rows.map((row: any, i: number) => {
                    return (
                        <Row key={i}>
                            <div style={{ marginBottom: '20px' }}>
                                {row.title}
                                <ColGenerator formikProps={props.formikProps} cols={row.Cols} />
                            </div>

                        </Row>
                    )
                })
            }
        </Grid>
    )
}

function ColGenerator(props: any) {

    return props.cols.map((col: any, i: number) => {
        return (<div key={i}>
            {col.title}
            <Col xs={col.as || 12} >
                <InputGenerator formikProps={props.formikProps} key={i} inputs={col.Inputs} />
            </Col>
        </div>


        )
    })
}

function InputGenerator(props: any) {
    const { updateContextState } = useContextState()

    return props.inputs.map((input: any, i: number) => {
        function handleChange(e: any) {
            if (input.onChange) {
                input.onChange(e.target.value, props.formikProps)
            }
            updateContextState({ [input.name]: e.target.value })
            props.formikProps.handleChange(e)

        }
        const inputProps = {
            ...input,
            value: props.formikProps.values[input.name],
            onChange: handleChange,
        }
        // Remove anything that isnt a native input prop
        return (
            <InputMap {...inputProps} key={i}/>
            // <Input {...inputProps} key={i} />
        )
    })

}
function componentTyper(type: string){
    const inputTypes = ["button","checkbox","color","date","datetime-local","email","file","hidden","image","month","number","password","radio","range","reset","search","submit","tel","text","time","url","week","datetime"]
    if(inputTypes.includes(type))return 'input'
    return type
}
function InputMap(props:any) {
    const { components } = useComponentsContext()
    const Component =   components[componentTyper(props.type)](props) 
    return Component
}