import { Optimization, type afterOptSource } from "./optimization";
import { OptReset } from "./rules/optReset";
import { RemoveOffsetStructions } from "./rules/removeOffsetStructions";

export class Minifier {
  safeSource: afterOptSource = [];

  constructor(source: string) {
    this.safeSource = Optimization(source.split(""));
  }

  minify(): string {
    let $ = this.safeSource;

    $ = RemoveOffsetStructions($);
    $ = OptReset($);

    return $.join("");
  }
}
