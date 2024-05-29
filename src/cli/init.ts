import { Log } from "@subjektifylabs/subjektify-core";
import { Prompt } from "./prompt";

export const init = async (args: any): Promise<void> => {
    Log.verbose("Initializing a new namespace.");
    const { answer, namespace } = await promptUser();

    switch (answer) {
        case "javascript":
            return createJavascriptNamespace(namespace);
        case "typescript":
            return createTypescriptNamespace(namespace);
        case "empty":
            return createEmptyConfig(namespace);
    }
}

const promptUser = async () => {
    const choices = [
        { message: "Create a Javascript namespace", name: "javascript" },
        { message: "Create a Typescript namespace", name: "typescript" },
        { message: "Create an empty subjektify.config.js", name: "empty" }
    ]

    const answer = await Prompt.select("What do you want to do?", choices);
    const namespace = await Prompt.input("Enter a name for the new namespace:") || "my-namespace";
    Log.verbose(`User answered: ${answer} with namespace: ${namespace}`);

    return { answer, namespace };
}

const createJavascriptNamespace = async (namespace: string) => {
    Log.verbose("Creating a new Javascript namespace.");
    // Create a new namespace with a default configuration
}

const createTypescriptNamespace = async (namespace: string) => {
    Log.verbose("Creating a new Typescript namespace.");
    // Create a new namespace with a default configuration
}

const createEmptyConfig = async (namespace: string) => {
    Log.verbose("Creating an empty configuration file.");
    // Create an empty configuration file
}
