'use client'

import { ChakraProvider, StyleFunctionProps, extendTheme } from '@chakra-ui/react'
import React from 'react'

interface ITheme {
    children: React.ReactNode
}

const theme = extendTheme({
    colors: {
        bg: "#07010c",
        card: "#120b17",
        text: "#d6d6d8",
        primary: "#7a22c9",
        error: "#ff5252",
        success: "#80ff52",
        
        hover: {
            primary: "#5f199e"
        }
    },
    styles: {
        global: (props: StyleFunctionProps) => ({
            body: {
                bg: "bg",
                color: "text",
                fontWeight: 500,
            }
        })
    }
})

export default function Theme(props: ITheme) {
    return (
        <ChakraProvider theme={theme}>
            {props.children}
        </ChakraProvider>
    )
}
