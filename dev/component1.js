console.log("component1 loaded");

class MyComponentService {
  definition = "component1";

  constructor() {
    console.log("MyComponentService constructed");
  }

  getData() {
    return this.definition;
  }
}

window.stupidstate.registerService(MyComponentService);
