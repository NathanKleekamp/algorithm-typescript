import {
  assertEquals,
} from "https://deno.land/std@0.53.0/testing/asserts.ts";

class Stack<T> {
  #array: T[] = [];

  push(item: T) {
    this.#array.push(item);
    return this.#array;
  }

  pop() {
    return this.#array.pop();
  }

  count() {
    return this.#array.length;
  }

  isEmpty() {
    return this.#array.length === 0;
  }

  peek() {
    return this.#array[this.#array.length - 1];
  }

  first() {
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
