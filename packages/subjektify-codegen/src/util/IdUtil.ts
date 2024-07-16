/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import { nanoid } from "nanoid";

export class IdUtil {
    static id(size?: number) {
        return nanoid(size);
    }
}
