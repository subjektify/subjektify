import { SubjektifyConfig, extendEnvironment, task } from "subjektify";
import "@subjektifylabs/subjektify-build";
import "@subjektifylabs/subjektify-codegen";
//import "./type-extensions";
import { CodeGenLanguage, CodeGenTarget } from "@subjektifylabs/subjektify-codegen/dist/type-extensions";

const config: SubjektifyConfig = {
    namespace: "my.namespace",
    version: "0.0.1",
    license: "MIT",
    build: {
        sources: [
            "subjects"
        ]
    },
    codegen: [
        {
            target: CodeGenTarget.Client,
            language: CodeGenLanguage.TypeScript,
        }
    ]
}

extendEnvironment((sre) => {
    //sre.example = "Hello, World!";
});

task("clean", "Hello, World", async (_, sre) => {
    console.log(sre.model.semantic);
});

export default config;
