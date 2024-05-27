/**
 * Command options interface that command options can optionally extend and use.
 */
export interface CommandOptions {
}

/**
 * Command interface that all command classes should implement.
 */
export interface Command {
    run(...args: any[]): Promise<void>;
}
