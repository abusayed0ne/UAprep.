export class InvalidTransitionError<T extends string> extends Error {
  constructor(public readonly from: T, public readonly to: T) {
    super(`Transition ${from} -> ${to} is not allowed`);
    this.name = 'InvalidTransitionError';
  }
}

export function assertTransition<T extends string>(
  transitions: Readonly<Record<T, readonly T[]>>,
  from: T,
  to: T,
): void {
  if (!transitions[from].includes(to)) throw new InvalidTransitionError(from, to);
}
