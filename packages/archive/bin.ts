#!/usr/bin/env node

import { Command } from "commander";
import { CommandRunner } from "./base";

const program = new Command();
const runner = new CommandRunner();

program
    .name("subjektify")
    .description('Building the future of decentralized applications.')
    .usage('<command> [options]')
    .option('-h, --help', 'Show help for a command');

program
    .command('init')
    .description('Intialize a new namespace in an existing project.')
    .argument('[namespace]', 'The namespace to associate your subjects with.')
    .action((namespace, options, command) => runner.run(command.name(), namespace, options));

program
    .command('create')
    .description('Create a new namespace.')
    .argument('[namespace]', 'The namespace to associate your subjects with.')
    .option('-b, --blueprint <name>', 'Use a blueprint from subjektify\'s registry.')
    .option('-i, --install', 'Install the dependencies post creation. Will prompt if not provided.')
    .action((namespace, options, command) => runner.run(command.name(), namespace, options));

program
    .command('build')
    .description('Executes build plugins on the Subjekt model to generate clients, contracts, and SDKs.')
    .action((options, command) => runner.run(command.name(), options));

program
    .command('codegen')
    .description('Generate contracts, clients, and server stubs by simply passing the preferred language.')
    .action((options, command) => runner.run(command.name(), options));

program
    .command('compile')
    .description('Compile your built artifacts from the Subjekt model.')
    .action((options, command) => runner.run(command.name(), options));

program
    .command('deploy')
    .description('Deploy a Subjekt to a decentralized network.')
    .action((options, command) => runner.run(command.name(), options));

program
    .command('publish')
    .description('Publish your Subjekt based on subjektify.json config. It also runs any plugins that are configured to run on publish.')
    .action((options, command) => runner.run(command.name(), options));
    
program
    .command('run')
    .description('Run your own command.')
    .argument('<name>', 'The command to run.')
    .action((name, options, command) => runner.run(command.name(), name, options));

program
    .command('test')
    .description('Run multiple test suites on your namespace.')
    .action((options, command) => runner.run(command.name(), options));

program.addHelpText('after', `

Example:
  $ subjektify create my-namespace`);

program.parse(process.argv);
