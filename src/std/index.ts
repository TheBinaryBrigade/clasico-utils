/* eslint-disable @typescript-eslint/no-explicit-any */

import check from "../check";

const isError = (x: any) => {
  return check.isError(x, /*error like = */ false);
};

export class Option<T> {

}

export class Result<
    TReturn,
    E = Error,
    Fn extends (...any: any[]) => TReturn = (...any: any[]) => TReturn,
    FnArgs extends any[] = Parameters<Fn>,
> {
  constructor(
        public fn: Fn,
        public result?: TReturn,
        public error?: E,
        public ran: boolean = false
  ) {
  }

  match(callbacks: {
        onOk: (result: TReturn) => void,
        onError: (error: E) => void,
        /** this will be called when both result and error are undefined */
        debug?: (result?: TReturn, error?: E) => void,
    }): [TReturn | undefined, E | undefined] {

    const isErr = this.isErr();
    const isOk = this.isOk();

    if (isErr === null && isOk === null && callbacks.debug) {
      callbacks.debug(this.result, this.error);
    }

    if (isOk && this.result !== undefined) {
      callbacks.onOk(this.result);
    } else if (isErr && this.error !== undefined) {
      callbacks.onError(this.error);
    } else if (callbacks.debug) {
      callbacks.debug(this.result, this.error);
    }

    return [this.result, this.error];
  }

  run(...args: FnArgs) {
    this.ran = true;

    try {
      const result = this.fn(...args);

      if (isError(result)) {
        // SAFETY: Checking if it is an instanceof Error
        this.error = result as any;
      } else {
        this.result = result;
      }

    } catch (error: any) {
      this.error = error;
    }

    return this;
  }

  isErr(): boolean | null {
    if (!this.ran) {
      return null;
    }

    const noError = this.error === undefined;
    const noResult = this.result === undefined;
    if (noResult && noError) {
      return null;
    }

    if (noResult && !noError) {
      return true;
    }

    return false;
  }

  isOk(): boolean | null {
    if (!this.ran) {
      return null;
    }

    const noError = this.error === undefined;
    const noResult = this.result === undefined;
    if (noResult && noError) {
      return null;
    }

    if (noError) {
      return true;
    }

    return false;
  }
}

const r = new Result<number, Error>(
  (a: number, b: number) => {
    return a + a * b;
  },
);

const [result, error] = r.run(1, 2).match({
  onOk: (a) => {
    //
  },
  onError: (a) => {
    //
  },
});



