declare class Queue<T> {
  private elements;
  private head;
  private tail;
  enqueue(element: T): void;
  dequeue(): T | undefined;
  peek(): T | undefined;
  get length(): number;
  get isEmpty(): boolean;
}
