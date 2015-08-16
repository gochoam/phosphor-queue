/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';


/**
 * A generic FIFO queue data structure.
 *
 * #### Notes
 * This queue is implemented internally using a singly linked list and
 * can grow to arbitrary size.
 *
 * #### Example
 * ```typescript
 * var q = new Queue<number>([0, 1, 2]);
 * q.size;      // 3
 * q.empty;     // false
 * q.pop();     // 0
 * q.pop();     // 1
 * q.push(42);  // undefined
 * q.size;      // 2
 * q.pop();     // 2
 * q.pop();     // 42
 * q.pop();     // undefined
 * q.size;      // 0
 * q.empty;     // true
 * ```
 */
export
class Queue<T> {
  /**
   * Construct a new queue.
   *
   * @param items - The initial items for the queue.
   */
  constructor(items?: T[]) {
    if (items) items.forEach(item => this.push(item));
  }

  /**
   * Get the number of elements in the queue.
   *
   * #### Notes
   * This has `O(1)` complexity.
   */
  get size(): number {
    return this._size;
  }

  /**
   * Test whether the queue is empty.
   *
   * #### Notes
   * This has `O(1)` complexity.
   */
  get empty(): boolean {
    return this._size === 0;
  }

  /**
   * Get the value at the front of the queue.
   *
   * #### Notes
   * This has `O(1)` complexity.
   *
   * If the queue is empty, this value will be `undefined`.
   */
  get front(): T {
    return this._front !== null ? this._front.value : void 0;
  }

  /**
   * Get the value at the back of the queue.
   *
   * #### Notes
   * This has `O(1)` complexity.
   *
   * If the queue is empty, this value will be `undefined`.
   */
  get back(): T {
    return this._back !== null ? this._back.value : void 0;
  }

  /**
   * Push a value onto the back of the queue.
   *
   * @param value - The value to add to the queue.
   *
   * #### Notes
   * This has `O(1)` complexity.
   */
  push(value: T): void {
    var link: IQueueLink<T> = { next: null, value: value };
    if (this._back === null) {
      this._front = link;
      this._back = link;
    } else {
      this._back.next = link;
      this._back = link;
    }
    this._size++;
  }

  /**
   * Pop and return the value at the front of the queue.
   *
   * @returns The value at the front of the queue.
   *
   * #### Notes
   * This has `O(1)` complexity.
   *
   * If the queue is empty, the return value will be `undefined`.
   */
  pop(): T {
    var link = this._front;
    if (link === null) {
      return void 0;
    }
    if (link.next === null) {
      this._front = null;
      this._back = null;
    } else {
      this._front = link.next;
    }
    this._size--;
    return link.value;
  }

  /**
   * Remove the first occurrence of a value from the queue.
   *
   * @param value - The value to remove from the queue.
   *
   * @returns `true` on success, `false` otherwise.
   *
   * #### Notes
   * This has `O(N)` complexity.
   */
  remove(value: T): boolean {
    var link = this._front;
    var prev: IQueueLink<T> = null;
    while (link !== null) {
      if (link.value === value) {
        if (prev === null) {
          this._front = link.next;
        } else {
          prev.next = link.next;
        }
        if (link.next === null) {
          this._back = prev;
        }
        this._size--;
        return true;
      }
      prev = link;
      link = link.next;
    }
    return false;
  }

  /**
   * Remove all occurrences of a value from the queue.
   *
   * @param value - The value to remove from the queue.
   *
   * @returns The number of occurrences removed.
   *
   * #### Notes
   * This has `O(N)` complexity.
   */
  removeAll(value: T): number {
    var count = 0;
    var link = this._front;
    var prev: IQueueLink<T> = null;
    while (link !== null) {
      if (link.value === value) {
        count++;
        this._size--;
      } else if (prev === null) {
        this._front = link;
        prev = link;
      } else {
        prev.next = link;
        prev = link
      }
      link = link.next;
    }
    if (!prev) {
      this._front = null;
      this._back = null;
    } else {
      prev.next = null;
      this._back = prev;
    }
    return count;
  }

  /**
   * Remove all values from the queue.
   *
   * #### Notes
   * This has `O(1)` complexity.
   */
  clear(): void {
    this._size = 0;
    this._front = null;
    this._back = null;
  }

  /**
   * Create an array from the values in the queue.
   *
   * @returns An array of all values in the queue.
   *
   * #### Notes
   * This has `O(N)` complexity.
   */
  toArray(): T[] {
    var result = new Array<T>(this._size);
    for (var i = 0, link = this._front; link !== null; link = link.next, ++i) {
      result[i] = link.value;
    }
    return result;
  }

  /**
   * Test whether any value in the queue passes a predicate function.
   *
   * @param pred - The predicate to apply to the values.
   *
   * @returns `true` if any value in the queue passes the predicate,
   *   or `false` otherwise.
   *
   * #### Notes
   * This has `O(N)` complexity.
   *
   * It is **not** safe for the predicate to modify the queue while
   * iterating.
   */
  some(pred: (value: T, index: number) => boolean): boolean {
    for (var i = 0, link = this._front; link !== null; link = link.next, ++i) {
      if (pred(link.value, i)) return true;
    }
    return false;
  }

  /**
   * Test whether all values in the queue pass a predicate function.
   *
   * @param pred - The predicate to apply to the values.
   *
   * @returns `true` if all values in the queue pass the predicate,
   *   or `false` otherwise.
   *
   * #### Notes
   * This has `O(N)` complexity.
   *
   * It is **not** safe for the predicate to modify the queue while
   * iterating.
   */
  every(pred: (value: T, index: number) => boolean): boolean {
    for (var i = 0, link = this._front; link !== null; link = link.next, ++i) {
      if (!pred(link.value, i)) return false;
    }
    return true;
  }

  /**
   * Create an array of the values which pass a predicate function.
   *
   * @param pred - The predicate to apply to the values.
   *
   * @returns The array of values which pass the predicate.
   *
   * #### Notes
   * This has `O(N)` complexity.
   *
   * It is **not** safe for the predicate to modify the queue while
   * iterating.
   */
  filter(pred: (value: T, index: number) => boolean): T[] {
    var result: T[] = [];
    for (var i = 0, link = this._front; link !== null; link = link.next, ++i) {
      if (pred(link.value, i)) result.push(link.value);
    }
    return result;
  }

  /**
   * Create an array of mapped values for the values in the queue.
   *
   * @param callback - The map function to apply to the values.
   *
   * @returns The array of values returned by the map function.
   *
   * #### Notes
   * This has `O(N)` complexity.
   *
   * It is **not** safe for the callback to modify the queue while
   * iterating.
   */
  map<U>(callback: (value: T, index: number) => U): U[] {
    var result = new Array<U>(this._size);
    for (var i = 0, link = this._front; link !== null; link = link.next, ++i) {
      result[i] = callback(link.value, i);
    }
    return result;
  }

  /**
   * Execute a callback for each value in the queue.
   *
   * @param callback - The function to apply to the values.
   *
   * @returns The first value returned by the callback which is not
   *   `undefined`.
   *
   * #### Notes
   * This has `O(N)` complexity.
   *
   * Iteration will terminate immediately if the callback returns any
   * value other than `undefined`.
   *
   * It is **not** safe for the callback to modify the queue while
   * iterating.
   */
  forEach<U>(callback: (value: T, index: number) => U): U {
    for (var i = 0, link = this._front; link !== null; link = link.next, ++i) {
      var result = callback(link.value, i);
      if (result !== void 0) return result;
    }
    return void 0;
  }

  private _size = 0;
  private _front: IQueueLink<T> = null;
  private _back: IQueueLink<T> = null;
}


/**
 * A link node in a queue.
 */
interface IQueueLink<T> {
  /**
   * The next link in the chain.
   */
  next: IQueueLink<T>;

  /**
   * The value for the link.
   */
  value: T;
}
