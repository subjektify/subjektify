# @subjektifylabs/subjektify-codegen

[![NPM Version](http://img.shields.io/npm/v/@subjektifylabs/subjektify-codegen.svg?style=flat)](https://www.npmjs.org/package/@subjektifylabs/subjektify-codegen)

`subjektify-codegen` is a core package of the Subjektify toolkit, designed to facilitate code generation from the Subjekt model. This package provides tools and utilities to generate client, server, and smart contract code from Subjekt model files, ensuring a seamless and efficient development workflow.

## Features

- **Code Generation**: Generate client, server, and smart contract code from Subjekt model files (.subjekt or JSON).
- **Customizable Output**: Support for various output formats and customization options to fit your project's needs.
- **Integration with Build Tools**: Easily integrates with common build tools and CI/CD pipelines to automate the code generation process.

## Installation

`subjektify-codegen` is already included in the [`subjektify`](https://www.npmjs.com/package/subjektify) package.

## Tasks

```bash
npx subjektify codegen
```

## Environment Extensions

The plugin adds a `model` object to the Subjektify Runtime Environment, containing both the AST model and the semantic model for the Subjekt files configured.

## Usage

`subjektify-codegen` is configurable from the `subjektify.config.(js|ts)`. Here’s a basic example of how to use `subjektify-codegen` to generate code from a Subjekt model:

```ts title="subjektify.config.ts"
import { SubjektifyConfig, CodeGenTarget, CodeGenLanguage } from "subjektify";

const config: SubjektifyConfig = {
  namespace: "my.namespace",
  version: "0.1.0",
  license: "MIT",
  codegen: [
    {
      target: CodeGenTarget.Client,
      language: CodeGenLanguage.TypeScript,
      outputDirectory: "generated/client",
    },
    {
      target: CodeGenTarget.Server,
      language: CodeGenLanguage.TypeScript,
      outputDirectory: "generated/server",
    },
    {
      target: CodeGenTarget.Contract,
      language: CodeGenLanguage.Solidity,
      outputDirectory: "generated/contracts",
    },
  ],
};

export default config;
```

## How it Works

1. **Configuration Parsing**: The code generation process begins by reading the `subjektify.config.(js|ts)` file to determine the specified code generation targets and settings.
2. **Model Loading**: The Subjekt model is loaded and parsed from the configured sources.
3. **Code Generation**: Based on the target and language specified in the configuration, the appropriate code generation strategy is applied:
   - **Client Code**: Generates client-side code (e.g., TypeScript or JavaScript).
   - **Server Code**: Generates server-side code (e.g., TypeScript or JavaScript with frameworks like Express).
   - **Smart Contract Code**: Generates smart contract code (e.g., Solidity).
4. **Output**: The generated code is written to the specified `outputDirectory`, organized by target and language.
