import React from 'react'
import './App.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import CompoundInterestCalc from './containers/InterestCalc'
import theme from './theme'

const defaultTheme = extendTheme(theme)

function App() {
    return (
        <ChakraProvider theme={defaultTheme}>
            <CompoundInterestCalc />
        </ChakraProvider>
    )
}

export default App
