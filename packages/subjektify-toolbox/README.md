# @subjektifylabs/subjektify-toolbox

[![NPM Version](http://img.shields.io/npm/v/@subjektifylabs/subjektify-toolbox.svg?style=flat)](https://www.npmjs.org/package/@subjektifylabs/subjektify-toolbox)

`subjektify-toolbox` is a comprehensive package that includes essential tools and utilities for developing decentralized applications with Subjektify. This package simplifies the development process by providing a suite of commands and configurations that streamline the setup, build, and deployment of your dApps.

## Features

- **Clean**: Remove generated files and artifacts to maintain a clean workspace.
- **Build**: Parse, validate, and compile Subjekt model files.
- **Code Generation**: Generate code based on your Subjekt model.
- **Documentation Generation**: Generate documentation from your Subjekt model.
- **Deployment**: Automate the deployment of your Subjektify projects.

## Installation

You can install `subjektify-toolbox` via npm:

```bash
npm install --save-dev @subjektifylabs/subjektify-toolbox
```

or yarn:

```bash
yarn add --dev @subjektifylabs/subjektify-toolbox
```

## Usage

`subjektify-toolbox` provides several commands that can be used through the Subjektify CLI. Below are some of the primary tasks included in the toolbox.

### Clean

Remove generated files and artifacts:

```bash
npx subjektify clean
```

### Build

Parse, validate, and compile Subjekt model files:

```bash
npx subjektify build
```

### Code Generation

Generate code based on your Subjekt model:

```bash
npx subjektify codegen
```

### Documentation Generation

Generate documentation from your Subjekt model:

```bash
npx subjektify docgen
```

### Deployment

Automate the deployment of your Subjektify projects:

```bash
npx subjektify deploy
```

## Environment Extensions

`subjektify-toolbox` extends the Subjektify runtime environment by providing additional tasks and configuration options. These extensions make it easier to manage various aspects of your dApp development lifecycle, from initial setup to deployment.

### Example Configuration

Here’s a more comprehensive example configuration in `subjektify.config.ts`:

```ts title="subjektify.config.ts"
import { SubjektifyConfig } from 'subjektify';

const config: SubjektifyConfig = {
    namespace: "my.dapp",
    version: "1.0.0",
    license: "MIT",
    clean: {
        paths: ["dist", "build", "artifacts"]
    },
    build: {
        sources: ["subjects"],
        outputDirectory: "artifacts",
        projections: {
            MyProjection: {
                transformations: [
                    {
                        type: "excludeByTrait",
                        args: { traits: ["internal"] }
                    }
                ]
            }
        }
    },
    codegen: [
        {
            target: "client",
            language: "typescript",
            outputDirectory: "src/client"
        },
        {
            target: "contract",
            language: "solidity",
            outputDirectory: "contracts/generated"
        }
    ]
};

export default config;
```

This configuration example shows how to set up various tasks such as cleaning, building, code generation, and more.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
