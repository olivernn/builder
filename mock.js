var mocks = []

var mockHandler = function (target) {
  return {
    get: function (proxy, name) {
      target.stats.push({type: 'get', name: name})
      if (target[name]) return target[name]
      return function () {}
    },

    set: function (proxy, name, value) {
      target.stats.push({type: 'set', name: name, value: value})
      if (target[name]) return target[name] = value
      return value
    },

    delete: function (name) {
      target.stats.push({type: 'delete', name: name})
      return (delete self.target[name])
    }
  }
}

var assertions = {

  stats: {
    value: []
  },

  didReceive: {
    value: function (name, opts) {
      return this.stats.any(function (stat) {
        return stat.name == name
      })
    }
  },

  didNotReceive: {
    value: function (name, opts) {
      return !this.didReceive(name)
    }
  }
}

Mock = {
  create: function (stubs) {
    var target = Object.create(assertions, assertions)

    Object.keys(stubs).forEach(function (stub) {
      target[stub] = stubs[stub]
    })

    var mock = Proxy.create(mockHandler(target), Object.getPrototypeOf(target))
    return mock
  }
}

mockUser = Mock.create({name: "oliver"})

