import React from 'react'
import serialize from 'serialize-javascript'

export default function Html({ content, store, css, useAnalytics }) {
  return (
    <html>
      <head>
        <title>connect-async-work demo</title>
        <meta charSet="utf8"/>
        <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:100,300,400,500" />
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }}/>
        <style id="jss-server-side" dangerouslySetInnerHTML={{ __html: css }} />
        <script dangerouslySetInnerHTML={{ __html: `window.__initialState__=${serialize(store)}` }}/>
        <script src="/build/bundle.js"/>
        {useAnalytics && <script dangerouslySetInnerHTML={{ __html: `
        
                    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
        
                    ga('create', 'UA-104215197-1', 'auto');
                    ga('send', 'pageview');
        
                  `}} />}
      </body>
    </html>
  )
}
