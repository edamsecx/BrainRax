import type { afterOptSource } from "../optimization";

export function parseToSafeSource(source: string): afterOptSource {
  return source.split("") as unknown as afterOptSource;
}
