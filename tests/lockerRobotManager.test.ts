import { describe, it, expect } from 'vitest';
import { Locker } from '../src/locker';
import { PrimaryLockerRobot } from '../src/primaryLockerRobot';
import { SmartLockerRobot } from '../src/smartLockerRobot';
import { LockerRobotManager } from '../src/lockerRobotManager';

describe('LockerRobotManager', () => {
  describe('store_bag', () => {
    it('should store a bag in a robot if available and return a ticket', () => {
      const locker1 = new Locker(2);
      const robot = new PrimaryLockerRobot([locker1]);
      const manager = new LockerRobotManager([new Locker(2)], [robot]);

      const ticket = manager.store_bag('bag 1');
      expect(typeof ticket).toBe('string');
      expect(locker1.retrieve_bag(ticket)).toBe('bag 1');
    });

    it('should store a bag in its own locker if all robots are full', () => {
      const locker1 = new Locker(1);
      const robot = new PrimaryLockerRobot([locker1]);
      robot.store_bag('bag 1');

      const managerLocker = new Locker(2);
      const manager = new LockerRobotManager([managerLocker], [robot]);

      const ticket = manager.store_bag('bag 2');
      expect(typeof ticket).toBe('string');
      expect(managerLocker.retrieve_bag(ticket)).toBe('bag 2');
    });

    it('should throw an error if all robots and lockers are full', () => {
      const locker1 = new Locker(1);
      const robot = new PrimaryLockerRobot([locker1]);
      robot.store_bag('bag 1');

      const managerLocker = new Locker(1);
      const manager = new LockerRobotManager([managerLocker], [robot]);
      manager.store_bag('bag 2');

      expect(() => manager.store_bag('bag 3')).toThrow('All storage is full');
    });
  });

  describe('retrieve_bag', () => {
    it('should retrieve a bag from a robot using a valid ticket', () => {
      const locker1 = new Locker(2);
      const robot = new PrimaryLockerRobot([locker1]);
      const manager = new LockerRobotManager([new Locker(2)], [robot]);

      const ticket = manager.store_bag('bag 1');
      const retrievedBag = manager.retrieve_bag(ticket);
      expect(retrievedBag).toBe('bag 1');
    });

    it('should retrieve a bag from its own locker using a valid ticket', () => {
      const locker1 = new Locker(1);
      const robot = new PrimaryLockerRobot([locker1]);
      robot.store_bag('bag 1');

      const managerLocker = new Locker(2);
      const manager = new LockerRobotManager([managerLocker], [robot]);

      const ticket = manager.store_bag('bag 2');
      const retrievedBag = manager.retrieve_bag(ticket);
      expect(retrievedBag).toBe('bag 2');
    });

    it('should throw an error if the ticket is invalid', () => {
      const locker1 = new Locker(2);
      const robot = new PrimaryLockerRobot([locker1]);
      const manager = new LockerRobotManager([new Locker(2)], [robot]);

      expect(() => manager.retrieve_bag('invalid-ticket')).toThrow('Invalid ticket');
    });
  });
});