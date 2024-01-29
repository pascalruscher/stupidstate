console.log("component1 loaded");

class MyComponentService {
  definition = "component1";
  data;

  constructor() {
    console.log("MyComponentService constructed");
  }

  async getData() {
    if (!this.data) {
      this.data = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(`resolved: ${this.definition}`);
        }, 1000);
      });
    }
    return this.data;
  }
}

window.stupidstate.registerService(MyComponentService);
