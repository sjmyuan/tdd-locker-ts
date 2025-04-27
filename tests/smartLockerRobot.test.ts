import { describe, it, expect } from 'vitest';
import { Locker } from '../src/locker';
import { SmartLockerRobot } from '../src/smartLockerRobot';

describe('SmartLockerRobot', () => {
  describe('store_bag', () => {
    it('should store a bag in the locker with the maximum available capacity and return a ticket', () => {
      const locker1 = new Locker(2);
      const locker2 = new Locker(3);
      const robot = new SmartLockerRobot([locker1, locker2]);

      const ticket = robot.store_bag('bag 1');
      expect(typeof ticket).toBe('string');
      expect(locker2.retrieve_bag(ticket)).toBe('bag 1');
    });

    it('should store a bag in the first locker if both have the same available capacity', () => {
      const locker1 = new Locker(2);
      const locker2 = new Locker(2);
      const robot = new SmartLockerRobot([locker1, locker2]);

      const ticket = robot.store_bag('bag 1');
      expect(typeof ticket).toBe('string');
      expect(locker1.retrieve_bag(ticket)).toBe('bag 1');
    });

    it('should throw an error if all lockers are full', () => {
      const locker1 = new Locker(1);
      const locker2 = new Locker(1);
      const robot = new SmartLockerRobot([locker1, locker2]);

      robot.store_bag('bag 1');
      robot.store_bag('bag 2');
      expect(() => robot.store_bag('bag 3')).toThrow('All lockers are full');
    });
  });

  describe('retrieve_bag', () => {
    it('should retrieve a bag from the correct locker using a valid ticket', () => {
      const locker1 = new Locker(2);
      const locker2 = new Locker(2);
      const robot = new SmartLockerRobot([locker1, locker2]);

      const ticket = robot.store_bag('bag 1');
      const retrievedBag = robot.retrieve_bag(ticket);
      expect(retrievedBag).toBe('bag 1');
    });

    it('should throw an error if the ticket is invalid', () => {
      const locker1 = new Locker(2);
      const locker2 = new Locker(2);
      const robot = new SmartLockerRobot([locker1, locker2]);

      expect(() => robot.retrieve_bag('invalid-ticket')).toThrow('Invalid ticket');
    });
  });
});