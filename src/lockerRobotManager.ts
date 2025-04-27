import { Locker } from './locker';
import { PrimaryLockerRobot } from './primaryLockerRobot';
import { SmartLockerRobot } from './smartLockerRobot';

export class LockerRobotManager {
  private lockers: Locker[];
  private robots: (PrimaryLockerRobot | SmartLockerRobot)[];

  constructor(lockers: Locker[], robots: (PrimaryLockerRobot | SmartLockerRobot)[]) {
    this.lockers = lockers;
    this.robots = robots;
  }

  /**
   * Store a bag in a robot if available, otherwise in its own locker
   * @param content - The content of the bag
   * @returns A ticket for retrieving the bag
   * @throws Error if all robots and lockers are full
   */
  store_bag(content: string): string {
    const ticket = this.try_store_in_robots(content) || this.try_store_in_lockers(content);
    if (!ticket) {
      throw new Error('All storage is full');
    }
    return ticket;
  }

  /**
   * Attempt to store a bag in the robots
   * @param content - The content of the bag
   * @returns A ticket if successful, otherwise null
   */
  private try_store_in_robots(content: string): string | null {
    for (const robot of this.robots) {
      try {
        return robot.store_bag(content);
      } catch (error) {
        if ((error as Error).message !== 'All lockers are full') {
          throw error;
        }
      }
    }
    return null;
  }

  /**
   * Attempt to store a bag in the lockers
   * @param content - The content of the bag
   * @returns A ticket if successful, otherwise null
   */
  private try_store_in_lockers(content: string): string | null {
    for (const locker of this.lockers) {
      try {
        return locker.store_bag(content);
      } catch (error) {
        if ((error as Error).message !== 'Locker is full') {
          throw error;
        }
      }
    }
    return null;
  }

  /**
   * Retrieve a bag from a robot or its own locker using a ticket
   * @param ticket - The ticket for the bag
   * @returns The content of the bag
   * @throws Error if the ticket is invalid
   */
  retrieve_bag(ticket: string): string {
    const bag = this.try_retrieve_from_robots(ticket) || this.try_retrieve_from_lockers(ticket);
    if (!bag) {
      throw new Error('Invalid ticket');
    }
    return bag;
  }

  /**
   * Attempt to retrieve a bag from the robots
   * @param ticket - The ticket for the bag
   * @returns The bag content if successful, otherwise null
   */
  private try_retrieve_from_robots(ticket: string): string | null {
    for (const robot of this.robots) {
      try {
        return robot.retrieve_bag(ticket);
      } catch (error) {
        if ((error as Error).message !== 'Invalid ticket') {
          throw error;
        }
      }
    }
    return null;
  }

  /**
   * Attempt to retrieve a bag from the lockers
   * @param ticket - The ticket for the bag
   * @returns The bag content if successful, otherwise null
   */
  private try_retrieve_from_lockers(ticket: string): string | null {
    for (const locker of this.lockers) {
      try {
        return locker.retrieve_bag(ticket);
      } catch (error) {
        if ((error as Error).message !== 'Invalid ticket') {
          throw error;
        }
      }
    }
    return null;
  }
}