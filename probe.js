var Proxy = require('node-proxy')

var forwardingHandler = function () {
  var self = this
  return {
    get: function (proxy, name) {
      self.stats.push({type: 'get', name: name})
      return self.target[name]
    },

    set: function (proxy, name, value) {
      self.stats.push({type: 'set', name: name, value: value})
      return self.target[name] = value
    },

    delete: function (name) {
      self.stats.push({type: 'delete', name: name})
      return (delete self.target[name])
    },

    keys: function ()
  }
}

var profile = function (target) {

  var profile = {
    stats: [],
    target: target
  }

  profile.proxy = Proxy.create(forwardingHandler.call(profile), Object.getPrototypeOf(target))

  return profile
}

oliver = { name: 'Oliver', age: 27, sex: 'M' }
p = profile(oliver)

exports.p = p

exports.create = profile