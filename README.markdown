# Builder

Some experiments with [JavaScript Proxy Object](https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Proxy)

A simple clone of ruby's builder lib

open test.html in Firefox

    b = builder.create()
    
    b.body(function () {
      this.header(function () {
        this.h1("Proxy's are cool")
      })
      this.div(function () {
        this.p("This is a little example of what can be done with the Proxy object")
      }, {class: 'main'})
    })
    
    b.toString() // should print out some html.

Can also be used in node if you also install [node-proxy](https://github.com/samshull/node-proxy) via npm.  Just require index.js from the node console.

    node > builder = require('./index.js')

