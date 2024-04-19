#!/usr/bin/env node

const program = require('commander');

const {
    initCommand,
    createCommand,
    runCommand
} = require('../dist');

program
    .name("subjektify")
    .description('Building the future of decentralized applications.')
    .usage('<command> [options]')
    .option('-h, --help', 'Show help for a command');

program
    .command('init')
    .description('Intialize a new namespace in an existing project.')
    .argument('<namespace>', 'The namespace to associate your subjects with.')
    .action(initCommand);

program
    .command('create')
    .description('Create a new namespace.')
    .argument('<namespace>', 'The namespace to associate your subjects with.')
    .option('-b, --blueprint <name>', 'Use a blueprint from subjektify\'s registry.')
    .option('-p, --plugin', 'Create the namespace as a subjektify plugin.')
    .action(createCommand);

program
    .command('build')
    .description('Executes build plugins on the Subjekt model to generate clients, contracts, and SDKs.')
    .action(() => runCommand('build'));

program
    .command('compile')
    .description('Compile your built artifacts from the Subjekt model.')
    .action(() => runCommand('deploy'));

program
    .command('deploy')
    .description('Deploy a Subjekt to a decentralized network.')
    .action(() => runCommand('deploy'));

program
    .command('publish')
    .description('Publish your Subjekt based on subjektify.json config. It also runs any plugins that are configured to run on publish.')
    .action(() => runCommand('publish'));
    
program
    .command('run')
    .description('Run your own command.')
    .argument('<command>', 'The command to run.')
    .action(runCommand);

program
    .command('test')
    .description('Run multiple test suites on your namespae.')
    .action(() => runCommand('test'));

program.addHelpText('after', `

Example:
  $ subjektify create my-namespace`);

program.parse(process.argv);
