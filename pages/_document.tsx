import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#282828" />
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Restaurant order platform - Easy Order "
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
