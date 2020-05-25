import {
  assertEquals,
} from "https://deno.land/std@0.53.0/testing/asserts.ts";

class Stack<T> {
  #array: T[] = [];

  push(item: T): T[] {
    this.#array.push(item);
    return this.#array;
  }

  pop(): T | void {
    return this.#array.pop();
  }

  count(): number {
    return this.#array.length;
  }

  isEmpty(): boolean {
    return this.count() === 0;
  }

  peek(): T {
    return this.#array[this.count() - 1];
  }

  first(): T {
    return this.#array[0];
  }
}

(() => {
  const stack = new Stack<string>();
  const result = stack.push("test");
  assertEquals(["test"], result);
})();


(() => {
  const stack = new Stack<string>();
  assertEquals(0, stack.count());

  stack.push("foo");
  stack.push("bar");
  assertEquals(2, stack.count());
})();

(() => {
  const stack = new Stack<string>();
  assertEquals(true, stack.isEmpty());

  stack.push("foo");
  assertEquals(false, stack.isEmpty());
})();

(() => {
  const stack = new Stack<string>();
  stack.push("foo");
  stack.push("bar");
  assertEquals("bar", stack.peek());
})();

(() => {
  const stack = new Stack<string>();
  stack.push("foo");
  assertEquals("foo", stack.pop());
})();

(() => {
  const stack = new Stack<string>();
  stack.push("foo");
  stack.push("bar");
  assertEquals("foo", stack.first());
})();
