#!/usr/bin/env node
import semver from "semver";
import { Log } from "../util";
import { SUPPORTED_NODE_VERSIONS } from "../core";

if (!semver.satisfies(process.version, SUPPORTED_NODE_VERSIONS.join(" || "))) {
    Log.warn(`You are currently using Node.js version ${process.version}. This project requires Node.js versions ${SUPPORTED_NODE_VERSIONS.join(" or ")}.`);
}

require('./cli');
