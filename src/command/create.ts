import fs from 'fs';
import path from 'path';
import { Log } from '../core';
import { CommandOptions } from "../types";

export interface CreateOptions extends CommandOptions {
    blueprint?: string;
    plugin?: boolean;
}

export const createCommand = (name: string, options?: CreateOptions) => {
}
