#!/usr/bin/env node

const program = require('commander');

const {
    initCommand,
    createCommand
} = require('../dist');

/*const {
    init,
    build,
    docs,
    install,
    list,
    publish,
    uninstall,
    update,
    repo,
    test,
    start,
    stop,
    unpublish,
    star,
    unstar,
    importCmd,
    exportCmd,
    share
} = require('../dist');*/

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
.option('-b, --blueprint <name>', 'Use a namespace blueprint from subjektify\'s registry.')
.action(createCommand);
/*
program
    .command('init')
    .description('Begin a new subject namespace.')
    .argument('<namespace>', 'The namespace to associate your subjects with.')
    .option('-b, --blueprint <name>', 'Use a specific blueprint from subjektify\'s registry.')
    .action(init);

program
    .command('install <subject>')
    .description('Install a subject.')
    .action(install);

program
    .command('uninstall <subject>')
    .description('Uninstall a subject.')
    .action(uninstall);

program
    .command('ls')
    .description('List subjects in namespace.')
    .action(list);

program
    .command('build')
    .description('Compile and build your subject definitions.')
    .action(build);

program
    .command('deploy <subject>')
    .description('Deploy a subject to the decentralized network. (For staging/testing)')
    .action(publish);

program
    .command('publish <subject>')
    .description('Publish a subject to the decentralized network. (For production)')
    .action(publish);

program
    .command('update <subject>')
    .description('Update a published subject.')
    .action(update);

program
    .command('docs <subject>')
    .description('Access documentation for a specific subject.')
    .action(docs);

// TODO implementations
program
    .command('repo <subject>')
    .description('Manage the subject repository.')
    .action(repo);

program
    .command('test <subject>')
    .description('Run tests for a subject.')
    .action(test);

program
    .command('start <subject>')
    .description('Start a subject.')
    .action(start);

program
    .command('stop <subject>')
    .description('Stop a subject.')
    .action(stop);

program
    .command('unpublish <subject>')
    .description('Unpublish a subject from the decentralized network.')
    .action(unpublish);

program
    .command('star <subject>')
    .description('Star a subject.')
    .action(star);

program
    .command('unstar <subject>')
    .description('Unstar a subject.')
    .action(unstar);

program
    .command('import <file>')
    .description('Import subjects from a file.')
    .action(importCmd);

program
    .command('export <subject>')
    .description('Export a subject to a file.')
    .action(exportCmd);

program
    .command('share <subject>')
    .description('Share a subject with others.')
    .action(share);
*/
program.addHelpText('after', `

Example call:
  $ subjektify init my.namespace`);

program.parse(process.argv);
