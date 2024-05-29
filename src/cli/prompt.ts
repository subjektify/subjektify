import { confirm, input, select } from '@inquirer/prompts';

/**
 * A utility class for prompting the user for input.
 * Based on the inquirer prompts library.
 */
export class Prompt {

    static async confirm(message: string): Promise<boolean> {
        const answer = await confirm({
            message
        });
        return answer;
    }

    static async input(message: string): Promise<string> {
        const answer = await input({
            message
        });
        return answer;
    }

    static async select(message: string, choices: string[]): Promise<string> {
        const mappedChoices = choices.map((choice: any) => ({ value: choice }));
        const answer = await select({
            message,
            choices: mappedChoices
        });
        return answer;
    }
}
