import React, { createContext, useContext } from 'react'
import { ComponentsList } from './ComponentsList'
const ComponentsContext = createContext({components: ComponentsList})


function globalReducer(state:any, action:any) {
  switch (action.type) {
    case 'components': {
      return { ...state, components: action.components }
    }
    default: return state
  }
}

export function ComponentsContextProvider(props: any) {
    const initialState = {
        components: {...ComponentsList, ...props.components}
    }
  const [state] = React.useReducer(globalReducer, initialState)

  
  
  return (
    <ComponentsContext.Provider value={{...state}}>
      {props.children}
    </ComponentsContext.Provider>
  )
}

export function useComponentsContext() {
  return useContext(ComponentsContext)
}
