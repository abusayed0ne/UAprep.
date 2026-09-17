export function isAnswerReviewReleased(status: string): boolean {
  return status === "RELEASED";
}
export function canReleaseAnswerReview(status: string): boolean {
  return status === "SCORED" || status === "RESCORE_PENDING";
}
