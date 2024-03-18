import { test, expect, mock } from "bun:test";
import { RemoveOffsetStructions } from ".";
import type { afterOptSource } from "../../optimization";

const exSource = `.>><<++----++<<>>.++.--+++.++.--`;
const parsedExSource = `..++.+.++.--`;

const removeMock = mock(() =>
  RemoveOffsetStructions(exSource.split("") as unknown as afterOptSource),
);

test("remove offset structions", () => {
  const value = removeMock();

  expect(value).toEqual(parsedExSource.split("") as unknown as afterOptSource);
  expect(removeMock).toHaveBeenCalled();
  expect(removeMock).toHaveBeenCalledTimes(1);
});
