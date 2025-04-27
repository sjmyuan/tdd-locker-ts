import { randomUUID } from 'crypto';

export class Locker {
  private readonly _capacity: number;
  private bags: Map<string, string>;

  constructor(capacity: number) {
    if (capacity <= 0) {
      throw new Error('Capacity must be greater than 0');
    }
    this._capacity = capacity;
    this.bags = new Map();
  }

  /**
   * Get the capacity of the locker
   */
  get capacity(): number {
    return this._capacity;
  }

  /**
   * Store a bag in the locker and return a ticket
   * @param content - The content of the bag
   * @returns A unique ticket string
   */
  store_bag(content: string): string {
    if (this.bags.size >= this._capacity) {
      throw new Error('Locker is full');
    }

    const ticket = randomUUID();
    this.bags.set(ticket, content);
    return ticket;
  }

  /**
   * Retrieve a bag from the locker using a ticket
   * @param ticket - The ticket for the bag
   * @returns The content of the bag
   * @throws Error if the ticket is invalid
   */
  retrieve_bag(ticket: string): string {
    if (!this.bags.has(ticket)) {
      throw new Error('Invalid ticket');
    }

    const bagContent = this.bags.get(ticket)!;
    this.bags.delete(ticket); // Remove the bag to restore capacity
    return bagContent;
  }
}