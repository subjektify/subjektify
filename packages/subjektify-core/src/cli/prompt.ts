import { prompt } from 'enquirer';

export type Choice = { message: string, name: string };

/**
 * A utility class for prompting the user for input.
 * Based on the inquirer prompts library.
 */
export class Prompt {

    static async confirm(message: string): Promise<boolean> {
        const answer: { value: boolean } = await prompt({
            type: 'confirm',
            name: 'value',
            message
        });
        return answer.value;
    }

    static async input(message: string): Promise<string> {
        const answer: { value: string } = await prompt({
            type: 'input',
            name: 'value',
            message
        });
        return answer.value;
    }

    static async select(message: string, choices: Choice[]): Promise<string> {
        const answer: { value: string } = await prompt({
            type: 'select',
            name: 'value',
            message,
            initial: 0,
            choices
        });
        return answer.value;
    }
}
