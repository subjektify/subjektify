import { EnvironmentExtender } from "../../types";
import { SubjektifyContext } from "./context";

export function extendEnvironment(extender: EnvironmentExtender) {
  const ctx = SubjektifyContext.get();
  ctx.environmentExtenders.push(extender);
}
