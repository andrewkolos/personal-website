import 'gatsby-remark-vscode/styles.css'
import { AppProps } from 'next/app'
import React from 'react'
import '../styles/global-styles.scss'

// eslint-disable-next-line react/jsx-props-no-spreading -- pageProps is of type any. Can't do anything here.
export const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />

export default MyApp
