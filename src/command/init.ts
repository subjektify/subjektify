import { CommandOptions } from "../types";

export interface InitOptions extends CommandOptions {
    blueprint?: string;
}

export const initCommand = (name: string, options?: InitOptions) => {
}
