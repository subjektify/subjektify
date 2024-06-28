import { Shape, SubjektModel } from "subjekt";

export type ParsedModel = {
    simpleShapes: Shape[];
    aggregateShapes: Shape[];
    subjectShapes: Shape[];
}

export function parse(model: SubjektModel): ParsedModel {
    const shapes = model.shapes;
    const simpleShapes: Shape[] = [];
    const aggregateShapes: Shape[] = [];
    const subjectShapes: Shape[] = [];

    return {
        simpleShapes,
        aggregateShapes,
        subjectShapes
    }
}

