import { existsSync } from "node:fs";
import { rm } from "node:fs/promises";
import { resolve } from "node:path";
import { projectPath } from "../settings.js";

export const clean = (dirToClean = projectPath.distFolder) => {
  return async (done) => {
    const directory = resolve(dirToClean);

    if (existsSync(directory)) {
      await rm(directory, { recursive: true });
    }

    done();
  };
};
