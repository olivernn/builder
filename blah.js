var builder = require('./builder').create()

builder
  .head(function () {
    this
      .script("", {src: "//jquery.com/jquery"})
      .style("h1 { color: 'red'; }")
  })
  .body(function () {
    this
      .header(function () {
        this.h1("Hello World!")
      })
      .p("This is an awesome demo of using the new JavaScript Proxy api")
  })

console.log(builder.toString())