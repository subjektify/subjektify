import yargs from "yargs";
import { ERRORS, Log, SubjektifyError, SubjektifyConfigLoader, SubjektifyContext } from "@subjektifylabs/subjektify-core";

export const run = async (args: any): Promise<void> => {

    const command = args._[0];
    Log.verbose("Running task: " + command);

    const configLoader = new SubjektifyConfigLoader();

    // If there is no command passed, we branch into two scenarios:
    if (!command) {
        // Prompt the user to create a new namespace if no config exists
        if (!configLoader.configExists()) {
            Log.debug("Prompting user to create a new namespace.");
            return;
        }
        // Or if the user is in a namespace, show the help menu
        else {
            console.log(await yargs.getHelp());
            return;
        }
    }

    // If the command is 'init', initialize a new namespace
    if (command === "init") {
        Log.debug("Initializing new namespace.");
        return;
    }

    // If the user is not in a namespace, show an error
    if (!configLoader.configExists()) {
        return Promise.reject(new SubjektifyError(ERRORS.GENERAL.NOT_IN_NAMESPACE));
    }

    const ctx = SubjektifyContext.create(command, args._.slice(1));
}
