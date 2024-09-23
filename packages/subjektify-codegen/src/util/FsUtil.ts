/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import fs from "fs";

export class FsUtil {
  static mkdir(dir: string) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  static writeFile(filePath: string, content: string) {
    fs.writeFileSync(filePath, content);
  }
}
