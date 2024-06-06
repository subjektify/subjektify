import { SubjektifyConfig, extendEnvironment, task } from "subjektify";
import "@subjektifylabs/subjektify-build";
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
    sre.example = "Hello, Worldfjglkjdshjflk;gjsdl;kfjglk;td!";
    console.log("Environment extended!");
});

task("test", "Hello, World", async (_, sre) => {
    console.log(sre.example);
});

export default config;
