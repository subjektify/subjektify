import { SubjektifyConfig, task } from "subjektify";
import "@subjektifylabs/subjektify-build";

const config: SubjektifyConfig = {
    namespace: "testers",
    version: "0.0.1",
    license: "MIT",
    sources: [
        "subjects"
    ]
}

task("test", "Hello, World", async (_, sre) => {
    console.log("Hello, World!");
});

export default config;
