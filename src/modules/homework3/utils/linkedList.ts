// eslint-disable-next-line max-classes-per-file
import { Nullable } from 'types';

import { LinkedListNode } from './linkedListNode';
import { ILinkedList, ILinkedListNode } from './types';

export class LinkedList<T> implements ILinkedList<T> {
  #first: Nullable<ILinkedListNode<T>> = null;

  #last: Nullable<ILinkedListNode<T>> = null;

  constructor(iterable?: Iterable<T>) {
    if (iterable) {
      for (const item of iterable) {
        this.appendRight(item);
      }
    }
  }

  public appendRight(value: T): void {
    const node = new LinkedListNode(value);
    if (this.#last === null) {
      this.#first = node;
      this.#last = node;
      return;
    }
    node.prev = this.#last;
    this.#last.next = node;
    this.#last = node;
  }

  public appendLeft(value: T): void {
    const node = new LinkedListNode(value);
    if (this.#first === null) {
      this.#first = node;
      this.#last = node;
      return;
    }
    node.next = this.#first;
    this.#first.prev = node;
    this.#first = node;
  }

  public popRight(): Nullable<T> {
    if (this.#last === null) {
      return null;
    }
    const { value } = this.#last;
    if (this.#last === this.#first) {
      this.#first = null;
      this.#last = null;
    } else {
      const { prev } = this.#last;
      if (prev) {
        prev.next = null;
      }
      this.#last = prev;
    }
    return value;
  }

  public popLeft(): Nullable<T> {
    if (this.#first === null) {
      return null;
    }
    const { value } = this.#first;
    if (this.#last === this.#first) {
      this.#first = null;
      this.#last = null;
    } else {
      const { next } = this.#first;
      if (next) {
        next.prev = null;
      }
      this.#first = next;
    }
    return value;
  }

  get first() {
    return this.#first;
  }

  get last() {
    return this.#last;
  }

  *[Symbol.iterator]() {
    let current = this.first;
    while (current !== null) {
      yield current.value;
      current = current.next;
    }
  }
}
