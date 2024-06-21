# @subjektifylabs/subjektify-clean

[![NPM Version](http://img.shields.io/npm/v/@subjektifylabs/subjektify-clean.svg?style=flat)](https://www.npmjs.org/package/@subjektifylabs/subjektify-clean)

`subjektify-clean` is a utility package designed to clean and remove generated files and artifacts from your Subjektify project. This helps maintain a tidy workspace and ensures that old or outdated files do not interfere with your development process.

## Features

- **Clean Artifacts**: Remove all generated files and build artifacts to maintain a clean workspace.
- **Customizable**: Specify custom directories or files to be cleaned.
- **Integration**: Seamlessly integrates with the Subjektify CLI for easy use.

## Installation

`subjektify-clean` is already included in the [`subjektify-toolbox`](https://www.npmjs.com/package/@subjektifylabs/subjektify-toolbox) package.

## Tasks

```bash
npx subjektify clean
```

This command will remove all generated files and build artifacts defined in your Subjektify configuration.

## Environment Extensions

No environment extensions.

## Usage

You can customize the cleaning process by specifying paths in your `subjektify.config.ts` file:

```ts title="subjektify.config.ts"
import { SubjektifyConfig } from 'subjektify';
import "@subjektifylabs/subjektify-toolbox";

const config: SubjektifyConfig = {
    namespace: "my.dapp",
    version: "1.0.0",
    license: "MIT",
    clean: {
        paths: ["dist", "build", "artifacts"]
    }
};

export default config;
```

In this example, the `clean` property specifies an array of paths that will be cleaned when you run the `npx subjektify clean` command. This ensures that all generated files and directories are removed, keeping your workspace clean and organized.
