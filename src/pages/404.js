import React from 'react'
import {
    Box,
    Heading,
    Button,
    Center,
    Container,
    Stack,
    ChakraProvider,
    Spacer
} from '@chakra-ui/react'
import { navigate } from "gatsby"

export default function EmptyPages() {
    return (
        <ChakraProvider>
            <Box bgColor="#FBECDB">
            <Container centerContent maxW="xl" height="100vh">
                <Center>
                    <Stack direction="column" spacing={8}>
                        <Box height="100px"></Box>
                        <Heading as="h2" size="2xl" textAlign="center">Are ya losing, Son?</Heading>
                    <img src="https://media.giphy.com/media/13mLwGra9bNEKQ/giphy.gif" alt='404 page not found' />
                    <Button colorScheme="messenger" onClick={()=>navigate('/')}>Back to main page</Button>
                    </Stack>
                </Center>
            </Container>
            </Box>
        </ChakraProvider>
    )
}
