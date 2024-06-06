import { Log, SubjektifyRuntimeEnvironment, extendEnvironment, task } from "subjektify";

import "./type-extensions";

// TODO: Remove after adding development environment.
Log.setVerbose(true);

extendEnvironment((sre) => {
    sre.model = {};
});

task("codegen", "Builds your Subjekt model and adds the artifacts to the runtime environment", async (_, sre) => {
});
