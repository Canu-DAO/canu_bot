import { BigNumber } from "ethers";
import JuiceboxReader from "./juicebox_reader";

export function dec2bin(dec: number): string {
  return (dec >>> 0).toString(2);
}

// export function getMethods(obj: Object): unknown[] {
//   let properties = new Set();
//   let currentObj = obj;
//   do {
//     Object.getOwnPropertyNames(currentObj).map((item) => properties.add(item));
//   } while ((currentObj = Object.getPrototypeOf(currentObj)));
//   return [...properties.keys()].filter(
//     (item: string) => typeof obj[item] === "function" && !item.startsWith("__")
//   );
// }

// export function testEveryGetMethod(JBReader: JuiceboxReader,projectId: number): void {
//   const methods = getMethods(JBReader).filter((method: string) =>method.startsWith("get"));
//   console.debug(`- Test every method from JuiceboxReader Object`)
//   console.debug(`+ Juicebox Project ID: ${projectId}`);
//   console.debug(`+ provider host: ${process.env.INFURA_KEY}`)
//   console.debug(`+ number of methods: ${methods.length}`)
//   console.debug("Starting...");

//   methods.forEach((method: string, index: number) => {
//     try {
//         JBReader[method](projectId).then((result) => {
//           console.debug("=".repeat(20));
//           console.debug(
//             `[${index+1}/${methods.length}] method: ${method} returns type:${typeof result}`,
//             result
//           );
//         });
//     } catch (error) {
//         console.error(`Error testing '${method}' method`, error);
//     }
//   });
// }
