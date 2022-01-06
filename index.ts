import JuiceboxReader from "./juicebox_reader";
import { testEveryGetMethod } from "./utils";

let JBReader = new JuiceboxReader();
let projectId = 1;

JBReader.getCycleTarget(projectId).then((result) => {
  console.log(result);
});

// Tests
testEveryGetMethod(JBReader, projectId);
