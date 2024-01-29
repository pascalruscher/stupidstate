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

const service = stupidstate.services["MyComponentService"];

(async () => {
  const data = await service.getData();
  console.log(data);
})();
