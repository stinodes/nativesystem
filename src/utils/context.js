// @flow
import * as React from 'react'
import createReactContext from 'create-react-context'

let createContext = React.hasOwnProperty('createContext')
  ? // $FlowFixMe
    React.createContext
  : createReactContext

export { createContext }
