import check from "../check";

export type BisectArrayOptions<T> = {
    key: (a: T) => number,
    cmp?: (a: T, b: T) => number,
    asReversed: boolean,
    items: T[]
};

export class BisectArray<TData> extends Array<TData> {
  constructor(private opts: BisectArrayOptions<TData>) {
    const items = opts.items;
    super(...items);
    if (this.isValidCmp()) {
      this.sort(this.opts.cmp);
    } else {
      this.sort((a, b) => this.opts.key(a) - this.opts.key(b));
    }

    if (this.opts.asReversed) {
      this.reverse();
    }
  }

  pop(): TData | undefined {
    return this.isReversed() ? super.pop() : super.shift();
  }

  push(...items: TData[]): number {
    for (const item of items) {
      const index = this.binarySearch(item);
      this.splice(index, 0, item);
    }
    return this.length;
  }

  private binarySearch(item: TData): number {
    let left = 0;
    let right = this.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (this.shouldSwap(this[mid], item)) {
        left = mid + 1;
      } else if (this.shouldSwap(item, this[mid])) {
        right = mid - 1;
      } else {
        return mid;
      }
    }

    return left;
  }

  private shouldSwap(a: TData, b: TData): boolean {
    if (this.opts.cmp && this.isValidCmp()) {
      return this.isReversed() ?  this.opts.cmp(b, a) <= 0 : this.opts.cmp(a, b) <= 0;
    }
    const keyA = this.opts.key(a);
    const keyB = this.opts.key(b);
    return (this.isReversed() ? keyB - keyA <= 0 : keyA - keyB <= 0);
  }

  isValidCmp() {
    return this.opts.cmp && check.isFunction(this.opts.cmp);
  }

  public isReversed() {
    return this.opts.asReversed;
  }
}

export class ReverseSortedArray<T> extends BisectArray<T> {
  constructor(
    key: (key: T) => number,
    ...items: T[]
  ) {
    super({key, asReversed: true, items});
  }
}

export class SortedArray<T> extends BisectArray<T> {
  constructor(
    key: (key: T) => number,
    ...items: T[]
  ) {
    super({key, asReversed: false, items});
  }
}

export class ReverseNumberArray extends BisectArray<number> {
  constructor(
    ...items: number[]
  ) {
    super({key: (a) => a, asReversed: true, items});
  }
}

export class SortedNumberArray extends BisectArray<number> {
  constructor(
    ...items: number[]
  ) {
    super({key: (a) => a, asReversed: false, items});
  }
}

export class ReverseStringArray extends BisectArray<string> {
  constructor(
    ...items: string[]
  ) {
    super({key: () => 0, cmp: (a, b) => a.localeCompare(b), asReversed: true, items});
  }
}

export class SortedStringArray extends BisectArray<string> {
  constructor(
    ...items: string[]
  ) {
    super({key: () => 0, cmp: (a, b) => a.localeCompare(b), asReversed: true, items});
  }
}

export class ReverseCompareArray<T> extends BisectArray<T> {
  constructor(
    cmp: (a: T, b: T) => number,
    ...items: T[]
  ) {
    super({key: () => 0, cmp, asReversed: true, items});
  }
}

export class SortedCompareArray<T> extends BisectArray<T> {
  constructor(
    cmp: (a: T, b: T) => number,
    ...items: T[]
  ) {
    super({key: () => 0, cmp, asReversed: true, items});
  }
}