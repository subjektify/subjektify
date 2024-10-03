import { AbstractCodeGenerator } from "../../../core";

export class SolidityContractGenerator extends AbstractCodeGenerator {
    defaultExtension(): string {
        return "sol";
    }
    generate(): Promise<void> {
        return Promise.resolve();
    }
}
