# @subjektifylabs/subjektify-build

[![NPM Version](http://img.shields.io/npm/v/@subjektifylabs/subjektify-build.svg?style=flat)](https://www.npmjs.org/package/@subjektifylabs/subjektify-build)

`subjektify-build` is a core package of the Subjektify toolkit, designed to facilitate the build process the Subjekt model. This package provides tools and utilities to parse, validate, and compile Subjekt model files, ensuring a seamless and efficient build workflow.

## Features

- **Model Parsing**: Parse Subjekt model files (.subjekt or JSON) to generate an Abstract Syntax Tree (AST) or a SubjektifyModel.
- **Validation**: Validate the structure and semantics of Subjekt models to ensure correctness.
- **Compilation**: Compile Subjekt models into executable code or other target formats.

## Installation

`subjektify-build` is already included in the [`subjektify`](https://www.npmjs.com/package/subjektify) package.

## Tasks

```bash
npx subjektify build
```

## Environment Extensions

The plugin adds a `model` object to the Subjektify Runtime Environment.

This object contains both the AST model and the semantic model for the Subjekt files configured.

## Usage

`subjektify-build` is configurable from the `subjektify.config.(js|ts)`. Here’s a basic example of how to use `subjektify-build` to parse and build a Subjekt model:

```ts title="subjektify.config.ts"
import { SubjektifyConfig } from 'subjektify';

const config: SubjektifyConfig = {
    namespace: "my.namespace",
    version: "0.1.0",
    license: "MIT",
    build: {
        sources: ["subjects"],
        output: "build",
        projections: [
            {
                abstract: false,
                transformations: [
                    {
                        type: "excludeByTrait",
                        args: { traits: ["internal"] }
                    }
                ]
            }
        ]
    }
};

export default config;
```

## How it Works

1. **Model Parsing**: The build process starts by parsing Subjekt model files from the specified `sources`. These files should be in `.subjekt` format.
2. **Validation**: Once parsed, the models are validated to ensure they adhere to the expected syntax and semantics.
3. **Projections and Transformations**: The build configuration allows defining projections and transformations that modify or generate different views of the model. These transformations are applied based on the specified `projections`.
4. **Output**: Finally, the transformed models are  written to the specified `output` directory.

