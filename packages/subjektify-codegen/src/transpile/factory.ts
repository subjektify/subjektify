/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import { SubjektifyConfig } from "subjektify";
import { CodeTranspiler } from "./def";
import { JavascriptClientTranspiler, TypescriptClientTranspiler, JavascriptServerTranspiler, TypescriptServerTranspiler, SolidityContractTranspiler } from "./targets";
import { CodeGenConfig } from "../types";

export class CodeTranspilerFactory {
    static transpiler(config: CodeGenConfig, subjektifyConfig: SubjektifyConfig): CodeTranspiler {
        const { target } = config;
        switch (target) {
            case "client":
                return this._clientTranspiler(config, subjektifyConfig);
            case "contract":
                return this._contractTranspiler(config, subjektifyConfig);
            case "server":
                return this._serverTranspiler(config, subjektifyConfig);
            default:
                throw new Error(`Unknown target: ${target}`);
        }
    }

    private static _clientTranspiler(config: CodeGenConfig, subjektifyConfig: SubjektifyConfig): CodeTranspiler {
        const { language } = config;
        switch (language) {
            case "javascript":
                return new JavascriptClientTranspiler(config, subjektifyConfig);
            case "typescript":
                return new TypescriptClientTranspiler(config, subjektifyConfig);
            default:
                throw new Error(`Unknown language: ${language}`);
        }
    }

    private static _contractTranspiler(config: CodeGenConfig, subjektifyConfig: SubjektifyConfig): CodeTranspiler {
        const { language } = config;
        switch (language) {
            case "solidity":
                return new SolidityContractTranspiler(config, subjektifyConfig);
            default:
                throw new Error(`Unknown language: ${language}`);
        }
    }

    private static _serverTranspiler(config: CodeGenConfig, subjektifyConfig: SubjektifyConfig): CodeTranspiler {
        const { language } = config;
        switch (language) {
            case "javascript":
                return new JavascriptServerTranspiler(config, subjektifyConfig);
            case "typescript":
                return new TypescriptServerTranspiler(config, subjektifyConfig);
            default:
                throw new Error(`Unknown language: ${language}`);
        }
    }
}
