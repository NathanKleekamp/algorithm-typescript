import {
  assertEquals,
} from "https://deno.land/std@0.53.0/testing/asserts.ts";

const serialize = <T>(str: string, node: Node<T>): string => {
  if (!node.children.length) {
    return str + node.value;
  }
  return `${node.value}: { ${node.children.map((child: Node<T>) => {
    return serialize(str, child);
  }).join(", ")} }`;
};

class Node<T> {
  value: T;
  parent: Node<T> | undefined;
  children: Node<T>[] = [];

  constructor(value: T) {
    this.value = value;
  }

  appendChild(child: Node<T>) {
    child.parent = this;
    this.children.push(child);
  }

  search(value: T): Node<T> | undefined {
    if (value === this.value) {
      return this;
    }

    for (let child of this.children) {
      const found = child.search(value);
      if (found) return found;
    }

    return;
  }

  pprint(): string {
    return `{ ${serialize("", this)} }`;
  }
}

(() => {
  const treeNode = new Node<string>("foo");
  const treeNodeChild = new Node<string>("bar");
  treeNode.appendChild(treeNodeChild);
  assertEquals(treeNode.children, [treeNodeChild]);
})();

(() => {
  const dogNode = new Node<string>("dog");
  const sighthoundNode = new Node<string>("sighthounds");
  const mastiffNode = new Node<string>("mastiff");
  sighthoundNode.appendChild(new Node<string>("grayhound"));
  sighthoundNode.appendChild(new Node<string>("whippet"));
  sighthoundNode.appendChild(new Node<string>("borzoi"));
  mastiffNode.appendChild(new Node<string>("neapolitan"));
  mastiffNode.appendChild(new Node<string>("tibetan"));
  mastiffNode.appendChild(new Node<string>("bullmastiff"));
  mastiffNode.appendChild(new Node<string>("spanish"));
  dogNode.appendChild(sighthoundNode);
  dogNode.appendChild(mastiffNode);
  const expected = "{ dog: { sighthounds: { grayhound, whippet, borzoi }, mastiff: { neapolitan, tibetan, bullmastiff, spanish } } }";
  assertEquals(dogNode.pprint(), expected);
})();

(() => {
  const dogNode = new Node<string>("dog");
  const sighthoundNode = new Node<string>("sighthounds");
  const mastiffNode = new Node<string>("mastiff");
  const grayhound = new Node<string>("grayhound");
  const spanish = new Node<string>("spanish");
  sighthoundNode.appendChild(grayhound);
  sighthoundNode.appendChild(new Node<string>("whippet"));
  sighthoundNode.appendChild(new Node<string>("borzoi"));
  mastiffNode.appendChild(new Node<string>("neapolitan"));
  mastiffNode.appendChild(new Node<string>("tibetan"));
  mastiffNode.appendChild(new Node<string>("bullmastiff"));
  mastiffNode.appendChild(spanish);
  dogNode.appendChild(sighthoundNode);
  dogNode.appendChild(mastiffNode);
  assertEquals(dogNode.search("grayhound")!.value, grayhound.value);
  assertEquals(dogNode.search("spanish")!.value, spanish.value);
})();
