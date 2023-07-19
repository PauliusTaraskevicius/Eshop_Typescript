import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className='scroll-smooth'>
      <Head />
      <link rel="shortcut icon" href="/images/favicon.ico" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
