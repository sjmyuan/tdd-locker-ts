import { Locker } from './locker';

export class SmartLockerRobot {
  private lockers: Locker[];

  constructor(lockers: Locker[]) {
    this.lockers = lockers;
  }

  /**
   * Store a bag in the locker with the maximum available capacity
   * @param content - The content of the bag
   * @returns A ticket for retrieving the bag
   * @throws Error if all lockers are full
   */
  store_bag(content: string): string {
    let targetLocker: Locker | null = null;

    for (const locker of this.lockers) {
      if (!targetLocker || locker.capacity - locker['bags'].size > targetLocker.capacity - targetLocker['bags'].size) {
        targetLocker = locker;
      }
    }

    if (!targetLocker || targetLocker['bags'].size >= targetLocker.capacity) {
      throw new Error('All lockers are full');
    }

    return targetLocker.store_bag(content);
  }

  /**
   * Retrieve a bag from the lockers using a ticket
   * @param ticket - The ticket for the bag
   * @returns The content of the bag
   * @throws Error if the ticket is invalid
   */
  retrieve_bag(ticket: string): string {
    for (const locker of this.lockers) {
      try {
        return locker.retrieve_bag(ticket);
      } catch (error) {
        if (error.message !== 'Invalid ticket') {
          throw error;
        }
      }
    }
    throw new Error('Invalid ticket');
  }
}