import React from 'react'
import { Center, Spinner } from 'native-base'

const Loading = () => {
    return (
        <Center height="full" pb={100}>
            <Spinner size="lg" color="warning.500"/>
        </Center>
    )
}

export default Loading
