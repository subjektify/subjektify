import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { Log } from "@subjektifylabs/subjektify-core";

async function main() {
    // Parse CLI arguments
    let args = await parseCli();

    // Set global logging level
    args.debug && Log.setDebug(true);
    args.verbose && Log.setVerbose(true);

    console.log(args);
}

function parseCli() {
    return describeCli().parse();
}

function describeCli() {
    return yargs(hideBin(process.argv))
    .usage('Usage: $0 <command> [options]')
    .command('create [name]', 'Create a new namespace', () => { }, () => { })
    .command('build', 'Build the Subjekt model', () => { }, () => { })
    .option('debug', {
        alias: 'd',
        type: 'boolean',
        description: 'Run with debug logging'
    })
    .option('verbose', {
        alias: 'v',
        type: 'boolean',
        description: 'Run with verbose logging'
    })
}

main()
    .then(() => process.exit(process.exitCode))
    .catch((error) => {
        Log.error(error);
        process.exit(1);
    });
