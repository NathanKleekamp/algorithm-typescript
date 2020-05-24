import {
  assertEquals,
} from "https://deno.land/std@0.53.0/testing/asserts.ts";

// A simple (but inefficient) queue implementation. Even though insertion is O(1), dequeueing is an O(n) operation
// because it uses the array's shift method, which shifts all array elements in memory

class Queue<T> {
  #array: T[] = [];

  isEmpty(): boolean {
    return this.#array.length === 0;
  }

  count(): number {
    return this.#array.length;
  }

  peek(): T | void {
    return this.#array[0];
  }

  enqueue(item: T): T {
    this.#array.push(item);
    return item;
  }

  dequeue(): T | void {
    return this.#array.shift();
  }
}

// Tests
(() => {
  const queue = new Queue<string>();
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
  const result = queue.dequeue();
  assertEquals(result, "foo");
})();
