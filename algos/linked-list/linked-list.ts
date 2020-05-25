import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.53.0/testing/asserts.ts";
import {
  IndexError,
} from "../../lib/errors.ts";
import {
  assertIsDefined,
} from "../../lib/helpers.ts";

class Node<T> {
  value: T;
  next?: Node<T>;
  previous?: Node<T>;

  constructor(value: T) {
    this.value = value;
  }
}

class LinkedList<T> {
  #head?: Node<T>;
  #tail?: Node<T>;
  #count = 0;

  isEmpty() {
    return this.count() === 0;
  }

  head(): Node<T> | undefined {
    return this.#head;
  }

  tail(): Node<T> | undefined {
    return this.#tail;
  }

  count(): number {
    return this.#count;
  }

  append(value: T): void {
    const node = new Node<T>(value);
    const tail = this.tail();
    if (tail) {
      tail.next = node;
      node.previous = tail;
      this.#tail = node;
    } else {
      this.#head = node;
      this.#tail = node;
    }
    this.#count++;
  }

  insert(value: T): void {
    const node = new Node<T>(value);
    const head = this.head();
    if (head) {
      head.previous = node;
      node.next = head;
      this.#head = node;
    } else {
      this.#head = node;
      this.#tail = node;
    }
    this.#count++;
  }

  insertAt(index: number, value: T) {
    const node = new Node<T>(value);
    const current = this.index(index);
    const previous = current?.previous;
    if (previous) {
      previous.next = node;
      node.previous = previous;
    }
    node.next = current;
    this.#count++;
  }

  index(index: number): Node<T> | undefined {
    if (index < 0) {
      throw new IndexError("IndexError: Index cannot be a negative number.");
    }

    if (this.isEmpty()) {
      throw new IndexError("IndexError: Cannot index an empty list.");
    }

    if (index === 0) {
      return this.head();
    }

    const lastIndex = this.count() - 1;

    if (index > lastIndex) {
      throw new IndexError("IndexError: Index exceeds the number of nodes in the list.");
    }

    if (index === lastIndex) {
      return this.tail();
    }

    let node = this.head();

    for (let i = 0; i !== index; i++) {
      node = node!.next;
    }

    return node;
  }

  clear(): void {
    this.#head = undefined;
    this.#tail = undefined;
    this.#count = 0;
  }

  remove(node: Node<T>) {
    const { previous, next } = node;

    if (previous) {
      previous.next = next;
    } else {
      this.#head = next;
    }

    if (next) {
      next.previous = previous;
    } else {
      this.#tail = previous;
    }

    this.#count--;
  }

  removeFirst() {
    const node = this.head();
    assertIsDefined(node);
    this.remove(node);
  }

  removeLast() {
    const node = this.tail();
    assertIsDefined(node);
    this.remove(node);
  }

  removeAt(index: number) {
    const node = this.index(index);
    assertIsDefined(node);
    this.remove(node);
  }
}

// LinkedList.prototype.head
(() => {
  const list = new LinkedList<string>();
  list.append("foo");
  list.append("bar");
  assertEquals(list.head()!.value, "foo");
})();

// LinkedList.prototype.tail
(() => {
  const list = new LinkedList<string>();
  list.append("foo");
  list.append("bar");
  assertEquals(list.tail()!.value, "bar");
})();

// LinkedList.prototype.isEmpty
(() => {
  const list = new LinkedList<string>();
  assertEquals(list.isEmpty(), true);

  list.append("foo");
  assertEquals(list.isEmpty(), false);
})();

// LinkedList.prototype.append
(() => {
  const list = new LinkedList<string>();

  list.append("foo");
  list.append("bar");

  const head = list.head();
  const tail = list.tail();

  assertEquals(head!.value, "foo");
  assertEquals(head!.next!.value, "bar");
  assertEquals(tail!.value, "bar");
  assertEquals(tail!.previous!.value, "foo");
})();

// LinkedList.prototype.count
(() => {
  const list = new LinkedList<string>();
  list.append("foo");
  assertEquals(list.count(), 1);

  list.append("bar");
  assertEquals(list.count(), 2);
})();

// LinkedList.prototype.index
(() => {
  const list = new LinkedList<string>();

  // Throws when a negative number is passed
  assertThrows(() => list.index(-1));

  // Throws when an index larger than count is passed
  assertThrows(() => list.index(1));

  list.append("foo");
  list.append("bar");
  list.append("baz");

  assertEquals(list.index(0)!.value, "foo");
  assertEquals(list.index(1)!.value, "bar");
  assertEquals(list.index(2)!.value, "baz");
})();

// LinkedList.prototype.insert
(() => {
  const list = new LinkedList<string>();
  list.insert("foo");
  list.insert("bar");
  const head = list.head();
  const tail = list.tail();
  assertEquals(head!.value, "bar");
  assertEquals(tail!.value, "foo");
})();

// LinkedList.prototype.clear
(() => {
  const list = new LinkedList<string>();
  list.append("foo");
  assertEquals(list.count(), 1);

  list.clear()
  assertEquals(list.count(), 0);
  assertEquals(list.head(), undefined);
  assertEquals(list.tail(), undefined);
})();

// LinkedList.prototype.insertAt
(() => {
  const list = new LinkedList<string>();

  // Cannot use LinkedList.prototype.insertAt on an empty list
  assertThrows(() => list.insertAt(0, "foo"));

  // [foo]
  list.insert("foo");

  // Cannot use LinkedList.prototype.insertAt to append to a list
  assertThrows(() => { list.insertAt(1, "bar") });

  // [baz] => [foo]
  list.insert("baz");

  // [baz] => [bar] => [foo]
  list.insertAt(1, "bar");

  assertEquals(list.index(1)!.value, "bar");
  assertEquals(list.index(1)!.previous!.value, "baz");
  assertEquals(list.index(1)!.next!.value, "foo");
})();

// LinkedList.prototype.remove
(() => {
  const list = new LinkedList<string>();
  list.append("foo");
  list.append("bar");
  list.append("baz");

  const head = list.head();
  const bar = list.index(1);
  const tail = list.tail();

  assertIsDefined(bar);
  assertIsDefined(head);
  assertIsDefined(tail);

  list.remove(bar);

  assertEquals(head.next!.value, "baz");
  assertEquals(tail.previous!.value, "foo");

  list.remove(tail);

  assertEquals(head.next, undefined);

  list.remove(head);
  assertEquals(list.isEmpty(), true);
})();

// LinkedList.prototype.removeFirst
(() => {
  const list = new LinkedList<string>();
  assertThrows(() => list.removeFirst());

  list.insert("foo");
  list.insert("bar");
  list.removeFirst();

  assertEquals(list.count(), 1);
  assertEquals(list.head()!.value, "foo");
})();

// LinkedList.prototype.removeLast
(() => {
  const list = new LinkedList<string>();
  assertThrows(() => list.removeLast());

  list.insert("foo");
  list.insert("bar");
  list.removeLast();

  assertEquals(list.count(), 1);
  assertEquals(list.head()!.value, "bar");
})();

// LinkedList.prototype.removeAt
(() => {
  const list = new LinkedList<string>();
  assertThrows(() => list.removeAt(0));

  list.append("foo");
  list.append("bar");
  list.append("baz");
  list.append("qux");
  list.removeAt(2);

  const bar = list.index(1);
  assertIsDefined(bar);

  assertEquals(list.count(), 3);
  assertEquals(bar.value, "bar");
  assertEquals(bar.previous!.value, "foo");
  assertEquals(bar.next!.value, "qux");
})();
