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

const GENERAL_ERRORS = {
    NOT_IN_NAMESPACE: {
        code: 'SGE001',
        message: "You are not in a Subjektify namespace"
    },
    NAMESPACE_ALREADY_EXISTS: {
        code: 'SGE002',
        message: "Namespace already exists"
    },
    CONTEXT_ALREADY_CREATED: {
        code: 'SGE003',
        message: "Subjektify's context is already created"
    },
    ENVIRONMENT_ALREADY_CREATED: {
        code: 'SGE004',
        message: "Subjektify's environment is already created"
    },
}

export const ERRORS = {
    GENERAL: GENERAL_ERRORS
}
