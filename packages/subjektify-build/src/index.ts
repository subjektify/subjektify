import { extendEnvironment, task } from "subjektify";
import { subjektifyBuildTask } from "./build";

import "./type-extensions";

extendEnvironment((sre) => {
    sre.model = {
        ast: {},
        semantic: {},
        projections: {}
    };
});

task("build", "Builds your Subjekt model and adds the artifacts to the runtime environment", async (_, sre) => {
    await subjektifyBuildTask(_, sre);
});

export * from "./type-extensions";
