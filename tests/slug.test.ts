import assert from "node:assert/strict";
import test from "node:test";
import { slugify } from "../src/lib/slug";

test("slugifies Latin titles", () => {
  assert.equal(slugify("A Study of Neural Networks"), "a-study-of-neural-networks");
});

test("preserves Devanagari characters", () => {
  assert.equal(slugify("गणित की सुंदरता"), "गणित-की-सुंदरता");
});

test("normalizes Unicode and punctuation", () => {
  assert.equal(slugify("  Hello—World!  "), "hello-world");
});

test("returns empty for punctuation-only input", () => {
  assert.equal(slugify("—…!!!"), "");
});

test("bounds slug length without trailing separator", () => {
  const result = slugify("a ".repeat(100));
  assert.ok(result.length <= 90);
  assert.ok(!result.endsWith("-"));
});