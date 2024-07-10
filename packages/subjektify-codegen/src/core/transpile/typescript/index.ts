import path from "path";
import { SubjektifyModel } from "@subjektifylabs/subjektify-build";
import { CodeTranspiler } from "../base";
import { Log } from "subjektify";

export class TypescriptTranspiler extends CodeTranspiler {

    extension(): string {
        return 'ts';
    }

    async transpile(model: SubjektifyModel) {
        const generator = this.generator;
        const outputDir = generator.outputDirectory();
        
        // Create tsconfig.json
        const tsconfig = generator.eta.render('tsconfig.json.eta', {});
        generator.write(path.join(outputDir, 'tsconfig.json'), tsconfig);

        // Create src directory
        generator.mkdir(path.join(outputDir, 'src'));

        // Create index file
        const indexFile = generator.eta.render('index.eta', {
            model: model
        });
        generator.write(path.join(outputDir, 'src', `index.${this.extension()}`), indexFile);

        // Transpile the model
        this._transpile(model);
    }

    private _transpile(model: SubjektifyModel) {
        const shapes = model.semantic.shapes || {};
        const generator = this.generator;

        const types: { [key: string]: string } = {};

        for (const shapeId of Object.keys(shapes)) {
            const shape = shapes[shapeId];
            const shapeType = shape.type;
            const shapeName = this._shapeName(shapeId);

            Log.debug(`Transpiling shape: ${shapeName} of type: ${shapeType}`);

            if (this._isSimpleShape(shapeType)) {
                types[shapeName] = shapeType;
            } else if (this._isAggregateShape(shapeType)) {
                types[shapeName] = shapeType;
            }
        }

        // Write the types
        const typesFile = generator.eta.render('types.eta', {
            types
        });
        Log.verbose(`Writing types file:\n${typesFile}`);
        generator.write(path.join(generator.outputDirectory(), 'src', `types.${this.extension()}`), typesFile);

    }

    private _isSimpleShape(shapeType: string): boolean {
        return ['address', 'blob', 'boolean', 'bytes', 'document', 'double', 'int', 'integer', 'string', 'timestamp', 'uint'].includes(shapeType);
    }

    private _isAggregateShape(shapeType: string): boolean {
        return ['enum', 'list', 'map', 'structure', 'union'].includes(shapeType);
    }

    private _shapeName(shapeId: string): string {
        const [namespace, identifier] = shapeId.split('#');
        const [identifierStr, memberStr] = identifier.split('$');
        return identifierStr;
    }
}
