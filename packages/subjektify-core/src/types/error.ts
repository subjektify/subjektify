export class SubjektifyError extends Error {
    public code: string | undefined;
    constructor(code: string | undefined, message: string | undefined) {
        super(`${code} - ${message}`);
        this.name = 'SubjektifyError';
    }
}
