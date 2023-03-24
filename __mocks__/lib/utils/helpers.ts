const waitTimeout = (timer: number, resolve: (value: boolean) => void) =>
  setTimeout(() => {
    resolve(true);
  }, timer);

export const futureTimeout = async (fn: () => void, timer: number) => {
  return new Promise((resolve) => waitTimeout(timer, resolve)).then(
    async (_) => {
      fn();
    }
  );
};
