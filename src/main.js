const stupidstate = {
  services: {},
  values: {},

  serviceHandler: {
    get(target, property, receiver) {
      if (property === "getData") {
        return function () {
          if (!target.data) {
            window.dispatchEvent(
              new CustomEvent("stupidstate", {
                detail: {
                  definition: property,
                  name: "changedService",
                },
              })
            );
          }
          return target.getData.apply(target, arguments);
        };
      }

      // For other properties/methods, return them as usual
      return Reflect.get(target, property, receiver);
    },
  },

  valueHandler: {
    set(target, property, value) {
      // don't do anything if the value hasn't changed
      if (property === "value" && target[property] === value) {
        return false;
      }

      window.dispatchEvent(
        new CustomEvent("stupidstate", {
          detail: {
            name: "changedValue",
            definition: property,
            oldValue: target[property],
            value: (target[property] = value),
          },
        })
      );

      return true;
    },
  },

  /**
   * Register a value if it does not exist, and return the value.
   *
   * @param {string} definition - the name of the value to register
   * @param {any} value - the value to register
   * @return {any} the registered value
   */
  registerValue(definition, value) {
    if (!this.values[definition]) {
      this.values[definition] = new Proxy({ value }, this.valueHandler);
      window.dispatchEvent(
        new CustomEvent("stupidstate", {
          detail: {
            definition,
            name: "registeredValue",
            value: this.values[definition].value,
          },
        })
      );
    } else {
      console.warn(
        `Value ${definition} already registered - returning cached value.`
      );
    }
    return this.values[definition];
  },

  /**
   * Registers a service if it does not exist, and return the instance.
   *
   * @param {class} service - the service to be registered
   * @return {class} the registered service
   */
  registerService(service) {
    this.validateService(service);
    if (!this.services[service.name]) {
      this.services[service.name] = new Proxy(
        new service(),
        this.serviceHandler
      );
      window.dispatchEvent(
        new CustomEvent("stupidstate", {
          detail: {
            definition: service.name,
            name: "registeredService",
            service: this.services[service.name],
          },
        })
      );
    } else {
      console.warn(
        `Service ${service.name} already registered - returning cached instance.`
      );
    }
    return this.services[service.name];
  },

  validateService(service) {
    if (service.prototype.getData === undefined) {
      throw Error(`Service ${service.name} must have a getData() method!`);
    }
  },
};

window.stupidstate = stupidstate;
