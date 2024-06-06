import { SubjektModel } from "subjekt";
import "subjektify/dist/types/runtime"

declare module "subjektify/dist/types/runtime" {

    export interface SubjektifyRuntimeEnvironment {
        model: SubjektModel;
    }
}
