import { describe, expect, it } from "vitest";
import {
  canReleaseAnswerReview,
  isAnswerReviewReleased,
} from "./review-release.js";
describe("answer review release", () => {
  it.each([
    "IN_PROGRESS",
    "SUBMITTED",
    "SCORING",
    "SCORED",
    "RESCORE_PENDING",
    "EXPIRED",
  ])("does not expose keys while status is %s", (status) =>
    expect(isAnswerReviewReleased(status)).toBe(false),
  );
  it("allows review only after explicit release", () =>
    expect(isAnswerReviewReleased("RELEASED")).toBe(true));
  it("permits controlled release only from scored states", () => {
    expect(canReleaseAnswerReview("SCORED")).toBe(true);
    expect(canReleaseAnswerReview("RESCORE_PENDING")).toBe(true);
    expect(canReleaseAnswerReview("IN_PROGRESS")).toBe(false);
  });
});
