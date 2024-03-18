import { parseToSafeSource } from "../../helper/parseToSafeSource";
import type { afterOptSource } from "../../optimization";

/**
 * Opt for Reset
 * `[---]` => `[-]`
 * `[+++]` => `[+]`
 */

const optMaps = [
    (source: afterOptSource): afterOptSource => {
        let $ = source.join("");

        $ = $.replace(/\[\-+\]/g, "[-]");

        return parseToSafeSource($);
    },
    (source: afterOptSource): afterOptSource => {
        let $ = source.join("");

        $ = $.replace(/\[\++\]/g, "[+]");

        return parseToSafeSource($);
    }
]

export function OptReset(source: afterOptSource): afterOptSource {
  for (let i = 0, optMapsLen = optMaps.length; i < optMapsLen; i++) {
    source = optMaps[i](source);
  }
  return source;
}
