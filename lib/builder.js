(function (exports) {

  /**
   * Loading the Proxy object, this is availably natively in Firefox and via an npm module in node.js
   */
  if (typeof Proxy == "undefined") {
    if (typeof require == "function") {
      var Proxy = require('node-proxy')
    } else {
      var Proxy = this.Proxy
    };
  };

  /**
   * The builder proxy object, this is where all traps are made
   */
  var builderProxy = {
    get: function (receiver, name) {
      if (name in Object.getPrototypeOf(receiver)) return Object.getPrototypeOf(receiver)[name]

      return function (content, attributes) {
        var tag = name,
          attrs = "",
          text  = ""

        attributes = receiver.attributesToString(attributes)

        if (typeof content == 'function') {
          var innerBuilder = builder.create()
          content.call(innerBuilder, attributes)
          text = innerBuilder.toString()
        } else {
          text = content
        };

        receiver._string += ["<", tag, attributes, ">", text, "</", tag, ">"].join("")
        return receiver
      }
    },

    set: function (receiver, name, value) {
      if (name in Object.getPrototypeOf(receiver)) return Object.getPrototypeOf(receiver)[name] = value
    }
  }


  var builder = {
    create: function () {
      return Proxy.create(builderProxy, {
        _string: "",

        toString: function () {
          return this._string
        },

        attributesToString: function (attrs) {
          if (!attrs) return ""

          return Object.keys(attrs).reduce(function (asString, key) {
            return asString += ' ' + key + '=' + '"' + attrs[key] + '"'
          }, "")
        },

        declare: function (name, attributes) {
          this._string += ["<!", name, " ", attributes.join(" "), ">"].join("")
          return this
        },

        instruct: function (name, attributes) {
          attributes = this.attributesToString(attributes)
          this._string += ["<?", name, attributes, ">"].join("")
          return this
        },

        comment: function (text) {
          this._string += ["<!--", text, "-->"].join(" ")
          return this
        },

        inspect: function () {
          return this
        }
      })
    }
  }

  exports.create = builder.create

})(typeof exports == "undefined" ? this["builder"] = {} : exports)