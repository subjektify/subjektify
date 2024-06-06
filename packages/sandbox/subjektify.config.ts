import { SubjektifyConfig, extendEnvironment, task } from "subjektify";
import "@subjektifylabs/subjektify-build";
import "@subjektifylabs/subjektify-codegen";
import "./src/type-extensions";

const config: SubjektifyConfig = {
    namespace: "testers",
    version: "0.0.1",
    license: "MIT",
    sources: [
        "subjects"
    ]
}

extendEnvironment((sre) => {
    sre.example = "Hello, World!";
});

task("test", "Hello, World", async (_, sre) => {
    console.log(sre.example);
});

export default config;
