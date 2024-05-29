export interface IError {
    code: string;
    message: string;
}

export class SubjektifyError extends Error {
    public code: string | undefined;
    constructor(error: IError) {
        super(`${error.code} - ${error.message}`);
        this.code = error.code;
        this.name = 'SubjektifyError';
    }
}

export const GENERAL_ERRORS = {
    NOT_IN_NAMESPACE: {
        code: 'SE001',
        message: "You are not in a Subjektify namespace"
    },
    CONTEXT_ALREADY_CREATED: {
        code: 'SE002',
        message: "Subjektify's context is already created"
    },
}

export const ERRORS = {
    GENERAL: GENERAL_ERRORS
}
