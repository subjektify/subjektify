import { ASTModel, SubjektModel } from "subjekt";
import "subjektify/dist/types/runtime"

export interface SubjektifyModel {
    ast: ASTModel;
    semantic: SubjektModel;
}

declare module "subjektify/dist/types/runtime" {

    export interface SubjektifyRuntimeEnvironment {
        model: SubjektifyModel;
    }
}
