import { Shape, SubjektModel, SimpleShapeType } from "subjekt";

export type ParsedModel = {
    simpleShapes: Shape[];
    aggregateShapes: Shape[];
    subjectShapes: Shape[];
}

export function parse(model: SubjektModel): ParsedModel {
    const shapes = model.shapes || {};
    const simpleShapes: Shape[] = []
    const aggregateShapes: Shape[] = [];
    const subjectShapes: Shape[] = [];

    for (const shapeID in Object.keys(shapes)) {
        const shape = shapes[shapeID];
        const shapeType = shape.type;
        if (shapeType === 'subject' || shapeType === 'state' || shapeType === 'behavior' || shapeType === 'event' || shapeType === 'input' || shapeType === 'output' || shapeType === 'composition') {
            subjectShapes.push(shape);
        } else if (shape.type === 'enum' || shape.type === 'list' || shape.type === 'map' || shape.type === 'structure' || shape.type === 'union') {
            aggregateShapes.push(shape);
        } else if (shape.type === 'address' || shape.type === 'blob' || shape.type === 'boolean' || shape.type === 'bytes' || shape.type === 'document' || shape.type === 'double' || shape.type === 'int' || shape.type === 'integer' || shape.type === 'string' || shape.type === 'timestamp' || shape.type === 'uint') {
            simpleShapes.push(shape);
        }
    }

    return {
        simpleShapes,
        aggregateShapes,
        subjectShapes
    }
}

