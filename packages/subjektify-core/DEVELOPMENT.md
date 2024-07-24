# Development Guide

## Introduction

Welcome to the Subjektify development guide! This document will help you set up your development environment, understand the project's structure, and guide you through the development workflow. Subjektify uses `pnpm` for managing its monorepo, ensuring a consistent and efficient dependency management system.

## Prerequisites

Before you start, ensure you have the following installed:

- **Node.js** (>=18.0)
- **pnpm** (>=7.0)

## Setting Up Your Development Environment

1. **Clone the Repository**

   First, clone the Subjektify repository from GitHub:

   ```bash
   git clone https://github.com/subjektify/subjektify.git
   cd subjektify
   ```

2. **Install Dependencies**

   Use `pnpm` to install all dependencies:

   ```bash
   pnpm install
   ```

3. **Build the Project**

   Build the project including all sub-packages:

   ```bash
   pnpm build
   ```

4. **Running Tests**

   Ensure everything is set up correctly by running the tests:

   ```bash
   pnpm test
   ```

## Project Structure

The Subjektify monorepo is organized into several packages, each responsible for different aspects of the project. Here’s an overview of the main directories and packages:

```
subjektify/
├── packages/
│   ├── subjektify-build/              # Build system and related tools
│   ├── subjektify-clean/              # Delete artifacts
│   ├── subjektify-core/               # Core functionality and utilities
│   ├── subjektify-codegen/            # Code generation tools
│   ├── subjektify-docgen/             # Documentation from model
│   ├── subjektify-toolbox/            # Plugin bundler
│   └── subjektify-watch/              # Model watcher
├── scripts/
│   ├── release/                       # Publish to npm
│   └── test/                          # E2E Test
├── .gitignore
├── package.json
└── pnpm-workspace.yaml
```

## Development Workflow

### Working on a Package

Each package in the monorepo has its own set of scripts defined in its `package.json`. Here’s a common workflow for working on a specific package:

1. **Navigate to the Package**

   Change to the package directory you want to work on:

   ```bash
   cd packages/<package-name>
   ```

2. **Install Package Dependencies**

   Although `pnpm install` in the root directory handles most dependencies, you might need to install specific dependencies for the package:

   ```bash
   pnpm install
   ```

3. **Running Package Scripts**

   Each package may have its own set of scripts for building, testing, and linting. You can run these scripts using `pnpm`:

   ```bash
   pnpm run <script-name>
   ```

### Adding a New Package

To add a new package to the monorepo, follow these steps:

1. **Create the Package Directory**

   Create a new directory for the package under `packages/`:

   ```bash
   mkdir packages/<new-package-name>
   cd packages/<new-package-name>
   ```

2. **Initialize the Package**

   Initialize a new `package.json` file:

   ```bash
   pnpm init
   ```

3. **Add Package Dependencies**

   Install any dependencies required for the new package:

   ```bash
   pnpm install <dependency-name>
   ```

4. **Build and Test the Package**

   Build and test the new package to ensure everything is set up correctly:

   ```bash
   pnpm build
   pnpm test
   ```

## Code Style and Linting

Subjektify follows a consistent code style enforced by ESLint and Prettier. Ensure your code adheres to the style guidelines by running the linters:

```bash
pnpm prettier:check
```

You can also automatically fix styling issues with:

```bash
pnpm prettier
```

## Contributing

We welcome contributions from the community! If you want to contribute:

1. **Fork the Repository**

   Fork the repository on GitHub and clone your fork locally.

2. **Create a Feature Branch**

   Create a new branch for your feature or bug fix:

   ```bash
   git checkout -b feature/my-feature
   ```

3. **Commit Your Changes**

   Make your changes and commit them with a descriptive message:

   ```bash
   git commit -m "Add feature XYZ"
   ```

4. **Push Your Changes**

   Push your changes to your fork:

   ```bash
   git push origin feature/my-feature
   ```

5. **Create a Pull Request**

   Open a pull request on GitHub, describing the changes you’ve made and why they should be merged.

## Getting Help

If you encounter any issues or have questions, feel free to reach out to the team through our [GitHub Issues](https://github.com/subjektify/subjektify/issues).
