import React from 'react'
import serialize from 'serialize-javascript'

export default function Html({ content, store, css }) {
  return (
    <html>
      <head>
        <title>connect-async-work demo</title>
        <meta charSet="utf8"/>
        <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:100,300,400,500" />
        <style dangerouslySetInnerHTML={{ __html: '#main>:nth-child(2){display:none;}' }} />
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }}/>
        <style id="jss-server-side" dangerouslySetInnerHTML={{ __html: css }} />
        <script dangerouslySetInnerHTML={{ __html: `window.__initialState__=${serialize(store)}` }}/>
        <script src="/__build__/bundle.js"/>
      </body>
    </html>
  )
}
