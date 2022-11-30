//? https://xurxodev.com/either-en-typescript/
//? https://www.youtube.com/watch?v=xJ253-u4sXM&t=320s&ab_channel=CodelyTV-Redescubrelaprogramaci%C3%B3n

type Left<L> = { kind: "left"; leftValue: L };
type Right<R> = { kind: "right"; rightValue: R };

type EitherValue<L, R> = Left<L> | Right<R>;

export class Either<L, R> {
  private constructor(private readonly value: EitherValue<L, R>) {}

  static left<L, R>(value: L) {
    return new Either<L, R>({ kind: "left", leftValue: value });
  }

  static right<L, R>(value: R) {
    return new Either<L, R>({ kind: "right", rightValue: value });
  }

  fold<T>(leftFn: (left: L) => T, rightFn: (right: R) => T): T {
    switch (this.value.kind) {
      case "left":
        return leftFn(this.value.leftValue);
      case "right":
        return rightFn(this.value.rightValue);
    }
  }
}