export type TaskIdentifier = string;
export type TaskArguments = string[];

export interface SubjektifyTask {
}

export type TaskMap = {
    [key: TaskIdentifier]: SubjektifyTask;
};
