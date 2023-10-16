import { CommandTarget, Context } from ".";

/**
 * Interface for Subjektify plugins.
 */
export interface IPlugin {

    /**
     * Target command to run the plugin.
     */
    target(): CommandTarget;

    /**
     * Function called to run the plugin.
     */
    apply(context: Context): void;
}
