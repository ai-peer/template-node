import { Service } from "../core/service";

export class DemoService extends Service {
   get() {
      return this.ctx.model.demo.get();
   }
}

export default DemoService;
