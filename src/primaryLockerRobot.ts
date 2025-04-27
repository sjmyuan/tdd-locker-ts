import { Locker } from './locker';

export class PrimaryLockerRobot {
  private lockers: Locker[];

  constructor(lockers: Locker[]) {
    this.lockers = lockers;
  }

  /**
   * Store a bag in the first locker with available capacity
   * @param content - The content of the bag
   * @returns A ticket for retrieving the bag
   * @throws Error if all lockers are full
   */
  store_bag(content: string): string {
    for (const locker of this.lockers) {
      try {
        return locker.store_bag(content);
      } catch (error) {
        if (error.message !== 'Locker is full') {
          throw error;
        }
      }
    }
    throw new Error('All lockers are full');
  }

  /**
   * Retrieve a bag using a ticket
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