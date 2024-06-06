import { ConfigExtender } from "../../types";
import { SubjektifyContext } from "../runtime";

export function extendConfig(extender: ConfigExtender) {
    const ctx = SubjektifyContext.get();
    ctx.configExtenders.push(extender);
}
