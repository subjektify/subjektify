# @subjektifylabs/subjektify-watch

[![NPM Version](http://img.shields.io/npm/v/@subjektifylabs/subjektify-watch.svg?style=flat)](https://www.npmjs.org/package/@subjektifylabs/subjektify-watch)

`subjektify-watch` is a utility package designed to enable hot reloading of Subjekt models in your Subjektify project. This helps enhance the development experience by providing real-time updates and feedback as you modify your models.

## Features

- **File Watching**: Automatically detect changes in Subjekt model files and reload them.
- **Real-time Feedback**: Provides instant feedback on model changes to streamline the development process.
- **State Preservation**: Ensures the current state of the application is preserved when models are reloaded.

## Installation

`subjektify-watch` is already included in the [`subjektify-toolbox`](https://www.npmjs.com/package/@subjektifylabs/subjektify-toolbox) package.

## Tasks

```bash
npx subjektify watch
```

This command will start watching for changes in Subjekt model files and automatically reload them as needed.

## Environment Extensions

`subjektify-watch` extends the Subjektify runtime environment by providing additional tasks and configuration options for hot loading.

## Usage

To use `subjektify-watch`, simply run the following command in your project directory:

```bash
npx subjektify watch
```

### Example Configuration

You can customize the file watching process by specifying paths in your `subjektify.config.ts` file:

```ts title="subjektify.config.ts"
import { SubjektifyConfig } from 'subjektify';
import "@subjektifylabs/subjektify-toolbox";

const config: SubjektifyConfig = {
    namespace: "my.dapp",
    version: "1.0.0",
    license: "MIT",
    watch: {
        paths: ["src/models"],
    }
};

export default config;
```

In this example, the `watch` property specifies an array of paths that will be monitored for changes. When changes are detected, the corresponding models will be reloaded automatically, ensuring a seamless development experience.

## How it Works

1. **File Watching**: The package uses a file-watching library to monitor specified directories for changes to Subjekt model files.
2. **Model Parsing and Validation**: When a change is detected, the modified files are re-parsed and validated to ensure correctness.
3. **Dynamic Model Injection**: The updated models are dynamically injected into the running application without requiring a full restart.
4. **State Management**: The current state of the application is preserved and synchronized with the updated models to maintain consistency.
