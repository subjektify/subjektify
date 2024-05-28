import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

export function describeCli() {
    return yargs(hideBin(process.argv))
    .usage('Usage: $0 <command> [options]')
    .command('create', 'Create a new namespace', () => { }, () => { })
    .command('codegen', 'Generates contracts, clients, and server stubs after building the project', () => { }, () => { })
    .command('clean', 'Clears the cache and deletes all artifacts', () => { }, () => { })
    .command('build', 'Builds the Subjekt model', () => { }, () => { })
    .command('run', 'Runs user defined tasks after building the project', () => { }, () => { })
    .option('debug', {
        alias: 'd',
        type: 'boolean',
        description: 'Run with debug logging'
    })
    .option('verbose', {
        alias: 'v',
        type: 'boolean',
        description: 'Run with verbose logging'
    });
}