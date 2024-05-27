import { SubjektModel } from "subjekt";
import { SubjektifyContext } from "../base";

export interface BuildContext extends SubjektifyContext {
    model: SubjektModel;
    projections: SubjektModel[];
}

export interface CreateContext extends SubjektifyContext {
    model: SubjektModel;
    projections: SubjektModel[];
}

export interface InitContext extends SubjektifyContext {
    namespace: string;
}
