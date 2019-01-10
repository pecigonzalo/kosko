import { join } from "path";
import { requireDefault } from "@kosko/require";
import Debug from "debug";

const debug = Debug("kosko:env");

function tryRequire(id: string) {
  try {
    return requireDefault(id);
  } catch (err) {
    if (err.code === "MODULE_NOT_FOUND") {
      debug("Module not found:", id);
      return {};
    }

    throw err;
  }
}

export class Environment {
  public env: string | undefined;

  constructor(public cwd: string) {}

  /**
   * Returns global variables.
   *
   * If env is not set or require failed, returns an empty object.
   */
  public global() {
    const envDir = this.getEnvDir();
    if (!envDir) return {};
    return tryRequire(envDir);
  }

  /**
   * Returns component variables merge with global variables.
   *
   * If env is not set or require failed, returns an empty object.
   *
   * @param name Component name
   */
  public component(name: string) {
    const envDir = this.getEnvDir();
    if (!envDir) return {};

    return {
      ...this.global(),
      ...tryRequire(join(envDir, name))
    };
  }

  private getEnvDir() {
    return this.env && join(this.cwd, "environments", this.env);
  }
}
