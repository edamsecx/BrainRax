import { test, expect, mock } from "bun:test";
import { OptReset } from ".";
import type { afterOptSource } from "../../optimization";

const exSource = `.><<++><[----][+++]`;
const parsedExSource = `.><<++><[-][+]`;

const optMock = mock(() =>
  OptReset(exSource.split("") as unknown as afterOptSource),
);

test("opt reset", () => {
  const value = optMock();

  expect(value).toEqual(parsedExSource.split("") as unknown as afterOptSource);
  expect(optMock).toHaveBeenCalled();
  expect(optMock).toHaveBeenCalledTimes(1);
});
