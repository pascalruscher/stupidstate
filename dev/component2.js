console.log("component2 loaded");

const component2 = {
  MyComponentService: class MyComponentService {
    definition = "component2";

    constructor() {
      console.log("MyComponentService constructed");
    }

    getData() {
      return this.definition;
    }
  },
};

window.addEventListener("stupidstate", (e) => {
  console.log("stupidstate: ", e);
});

window.stupidstate.registerService(component2.MyComponentService);

const stateService = window.stupidstate.services["MyComponentService"];
console.log(stateService.getData());

window.stupidstate.registerValue("stateVar", "hello");

window.stupidstate.values["stateVar"].value = "goodbye";

console.log("should be goodbye: ", window.stupidstate.values["stateVar"].value);
