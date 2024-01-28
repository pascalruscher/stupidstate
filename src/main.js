const stupidstate = {
  services: {},
  values: {},

  serviceHandler: {
    set(target, name, value) {
      // TODO: Implement

      window.dispatchEvent(
        new CustomEvent("stupidstate", {
          detail: {
            name: "changedService",
          },
        })
      );

      throw Error("not implemented");
    },
  },

  valueHandler: {
    set(target, name, value) {
      // don't do anything if the value hasn't changed
      if (name === "value" && target[name] === value) {
        return false;
      }

      window.dispatchEvent(
        new CustomEvent("stupidstate", {
          detail: {
            name: "changedValue",
            definition: name,
            oldValue: target[name],
            value: (target[name] = value),
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
};

window.stupidstate = stupidstate;
