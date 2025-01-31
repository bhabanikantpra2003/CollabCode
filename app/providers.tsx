// app/providers.tsx
'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import { store } from './lib/redux/store/store'

export function Providers({ children, session}: { children: React.ReactNode, session: any }) {
  return (
    <Provider store={store}>
    <ChakraProvider>
      <SessionProvider session={session}>{children}</SessionProvider>
    </ChakraProvider>
    </Provider>
  )
}