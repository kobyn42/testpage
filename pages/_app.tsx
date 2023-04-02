import { ChakraProvider } from '@chakra-ui/react'
import 'highlight.js/styles/default.css'

const App = ({ Component, pageProps }) => {
    return (
        <ChakraProvider>
            <Component {...pageProps} />
        </ChakraProvider>
    )
}

export default App