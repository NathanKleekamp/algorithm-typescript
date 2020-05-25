import {
  assertEquals,
} from "https://deno.land/std@0.53.0/testing/asserts.ts";
import {
  IndexError,
} from "../lib/errors.ts";

const removeFirst = (count: number) => {
  return <T>(arr: T[]): T[] => {
    const len = arr.length;
    if (len < count) {
      throw new IndexError(
        `IndexError: Cannot remove ${count} items from the array because it contains only ${len} items.`
      );
    }
    const result = arr.concat();
    for (let i = 0; i < count; i++) {
      result.shift();
    }
    return result;
  }
};

// A more efficient queue implementation than the simple queue.
// En/dequeing are both O(1) operations because they are array
// indexed. Cleanup only happens once in a while, but when it
// does, it's an O(n) operations.

class Queue<T> {
  #array: T[] = [];
  #head = 0;

  private cleanup(): void {
    this.#array = removeFirst(this.#head)(this.#array);
    this.#head = 0;
  }

  isEmpty(): boolean {
    return this.count() === 0;
  }

  count(): number {
    return this.#array.length - this.#head;
  }

  peek(): T | void {
    return this.#array[0];
  }

  enqueue(item: T): T {
    this.#array.push(item);
    return item;
  }

  dequeue(): T | void {
    if (this.#head >= this.#array.length) return;
    const item = this.#array[this.#head];
    this.#head++;
    const percentage = this.#head / this.count();
    if (this.count() > 50 && percentage > 0.25 || this.isEmpty()) {
      this.cleanup();
    }
    return item;
  }
}

// Tests
(() => {
  const removeFirstFive = removeFirst(5);
  const arr = [
    "foo",
    "bar",
    "baz",
    "qux",
    "quuz",
    "corge",
  ];
  assertEquals(removeFirstFive<string>(arr), ["corge"]);
})();

(() => {
  const queue = new Queue<string>();
  assertEquals(queue.count(), 0);
  queue.enqueue("foo");
  queue.enqueue("bar");
  assertEquals(queue.count(), 2);
})();

(() => {
  const queue = new Queue<string>();
  assertEquals(queue.isEmpty(), true);

  queue.enqueue("foo");
  assertEquals(queue.isEmpty(), false);
})();

(() => {
  const queue = new Queue<number>();
  assertEquals(queue.peek(), undefined);

  queue.enqueue(1);
  queue.enqueue(2);
  assertEquals(queue.peek(), 1);
})();

(() => {
  const queue = new Queue<string>();
  queue.enqueue("foo");
  queue.enqueue("bar");
  const foo = queue.dequeue();
  assertEquals(foo, "foo");
  assertEquals(queue.count(), 1);

  const bar = queue.dequeue();
  assertEquals("bar", bar);
  assertEquals(queue.count(), 0);
})();
