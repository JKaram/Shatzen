import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <body
        style={{
          backgroundImage: 'url("bg_pattern.png")',
        }}
        className="bg-repeat"
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
