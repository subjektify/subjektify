import "subjektify/dist/types/runtime"
import "@subjektifylabs/subjektify-build/dist/type-extensions"
import "@subjektifylabs/subjektify-codegen/dist/type-extensions"

/*declare module "@subjektifylabs/subjektify-codegen/dist/type-extensions" {
        export interface SubjektifyConfig {
        }
}*/

declare module "subjektify/dist/types/runtime" {

    export interface SubjektifyRuntimeEnvironment {
        model: string;
    }
}
