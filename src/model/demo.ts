/**
 * 多媒体表
 */
export default class Demo {
   constructor(data?) {}
   name: string;
}

export class SModel {
   constructor() {}
   get(): Demo | null {
      return { name: "go" };
   }
}
