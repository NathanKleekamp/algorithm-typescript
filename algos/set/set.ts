import {
  assertEquals,
} from "https://deno.land/std@0.53.0/testing/asserts.ts";

class HashSet<T> {
  #map: Map<T, boolean>;

  constructor() {
    this.#map = new Map();
  }

  insert(value: T): void {
    this.#map.set(value, true);
  }

  remove(value: T): void {
    this.#map.delete(value);
  }

  count(): number {
    return this.#map.size;
  }

  entries() {
    return this.#map.keys();
  }

  contains(value: T): boolean {
    return this.#map.has(value);
  }

  isEmpty(): boolean {
    return this.count() === 0;
  }

  union(s: HashSet<T>): HashSet<T> {
  }

  intersect(s: HashSet<T>): HashSet<T> {
  }

  diff(s: HashSet<T>): HashSet<T> {
  }

  pprint(): string {
    const r: T[] = Array.from(this.entries());
    return `HashSet: { ${r.join(", ")} }`;
  }
}

(() => {
  const set = new HashSet();
  assertEquals(set.isEmpty(), true);
})();

(() => {
  const set = new HashSet();
  set.insert("foo");
  assertEquals(set.count(), 1);
  set.remove("foo");
  assertEquals(set.count(), 0);
})();

(() => {
  const set = new HashSet();
  set.insert("foo");
  set.insert("foo");
  set.insert("bar");
  assertEquals(set.count(), 2);
  assertEquals(set.pprint(), "HashSet: { foo, bar }");
})();

(() => {
  const set = new HashSet();
  set.insert("foo");
  set.insert("bar");
  assertEquals(set.contains("bar"), true);
  assertEquals(set.contains("baz"), false);
})();
