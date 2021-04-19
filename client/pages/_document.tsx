import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <Head lang="ru">
          <link rel="icon" href="/favicon.ico" />
          <meta name="theme-color" content="#000000" />
          <meta
            name="description"
            content="Ника Дмитриева. Художник и фотограф. На сайте собраны все лучшие работы. Приятного просмотра!"
          />
          <meta
            property="og:title"
            content="Ника Дмитриева. Художник и фотограф. На сайте собраны все лучшие работы. Приятного просмотра!"
            key="og:title"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
