import ToasterContext from '@/context/ToasterContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { store } from '@/redux/store'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <ToasterContext />
    <Component {...pageProps} />
  </Provider>
}
