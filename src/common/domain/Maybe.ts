type Some<T> = { type: "some"; value: T };
type Nothing = { type: "nothing" };

type MaybeValue<T> = Nothing | Some<T>;

export class Maybe<T> {
  constructor(private value: MaybeValue<T>) {}

  static from<T>(value: T): Maybe<T> {
    if (value === null || value === undefined) return Maybe.nothing();
    return Maybe.some(value);
  }

  static some<T>(value: T): Maybe<T> {
    if (value === null || value === undefined) return Maybe.nothing();
    return new Maybe<T>({ type: "some", value });
  }

  static nothing<T>(): Maybe<T> {
    return new Maybe<T>({ type: "nothing" });
  }

  map<U, R>(fn: (value: T) => U): Maybe<U | R> {
    switch (this.value.type) {
      case "nothing":
        return Maybe.nothing<R>();
      case "some":
        return Maybe.some<U>(fn(this.value.value));
    }
  }

  match<U, R>(props: { some: (value: T) => U; nothing: () => R }): U | R {
    const { nothing, some } = props;
    switch (this.value.type) {
      case "nothing":
        if (!nothing)
          throw new Error("Nothing function in Maybe class do not provided");
        return nothing();
      case "some":
        if (!some)
          throw new Error("Nothing function in Maybe class do not provided");
        return some(this.value.value);
    }
  }
}
