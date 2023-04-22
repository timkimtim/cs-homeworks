import { Nullable } from 'types';

export interface ILinkedListNode<T> {
  value: T;
  next: Nullable<ILinkedListNode<T>>;
  prev: Nullable<ILinkedListNode<T>>;
}

export interface ILinkedList<T> {
  get first(): Nullable<ILinkedListNode<T>>;
  get last(): Nullable<ILinkedListNode<T>>;
  appendRight(value: T): void;
  appendLeft(value: T): void;
  popRight(): Nullable<T>;
  popLeft(): Nullable<T>;
}
