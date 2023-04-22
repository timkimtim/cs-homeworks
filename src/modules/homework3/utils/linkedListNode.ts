import { Nullable } from 'types';

import { ILinkedListNode } from './types';

export class LinkedListNode<T> implements ILinkedListNode<T> {
  next: Nullable<ILinkedListNode<T>> = null;

  prev: Nullable<ILinkedListNode<T>> = null;

  value: T;

  constructor(value: T, config?: { next?: LinkedListNode<T>; prev?: LinkedListNode<T> }) {
    this.value = value;
    if (config) {
      const { next, prev } = config;
      if (next) {
        this.next = next;
      }
      if (prev) {
        this.prev = prev;
      }
    }
  }
}
