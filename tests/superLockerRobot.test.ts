import { describe, it, expect } from 'vitest';
import { Locker } from '../src/locker';
import { SuperLockerRobot } from '../src/superLockerRobot';

describe('SuperLockerRobot', () => {
  describe('store_bag', () => {
    it('should store a bag in the first locker with same vacancy rate and return a ticket', () => {
      const locker1 = new Locker(2); // Vacancy rate: 1.0 initially
      const locker2 = new Locker(4); // Vacancy rate: 1.0 initially
      const robot = new SuperLockerRobot([locker1, locker2]);

      // Store one bag in locker1 (same vacancy but first in locker array)
      const ticket = robot.store_bag('bag 1');
      expect(typeof ticket).toBe('string');
      expect(locker1.retrieve_bag(ticket)).toBe('bag 1');
    });

    it('should store a bag in the locker with the highest vacancy rate after some bags are stored', () => {
      const locker1 = new Locker(2); // Vacancy rate: 1.0 initially
      const locker2 = new Locker(4); // Vacancy rate: 1.0 initially
      const robot = new SuperLockerRobot([locker1, locker2]);

      // Store one bag in locker1
      robot.store_bag('bag 1');

      // Store one bag in locker2 (vacancy rate becomes higher for locker2)
      const ticket = robot.store_bag('bag 2');
      expect(typeof ticket).toBe('string');
      expect(locker2.retrieve_bag(ticket)).toBe('bag 2');
    });

    it('should throw an error if all lockers are full', () => {
      const locker1 = new Locker(1);
      const locker2 = new Locker(1);
      const robot = new SuperLockerRobot([locker1, locker2]);

      robot.store_bag('bag 1');
      robot.store_bag('bag 2');
      expect(() => robot.store_bag('bag 3')).toThrow('All lockers are full');
    });
  });

  describe('retrieve_bag', () => {
    it('should retrieve a bag from the correct locker using a valid ticket', () => {
      const locker1 = new Locker(2);
      const locker2 = new Locker(2);
      const robot = new SuperLockerRobot([locker1, locker2]);

      const ticket = robot.store_bag('bag 1');
      const retrievedBag = robot.retrieve_bag(ticket);
      expect(retrievedBag).toBe('bag 1');
    });

    it('should throw an error if the ticket is invalid', () => {
      const locker1 = new Locker(2);
      const locker2 = new Locker(2);
      const robot = new SuperLockerRobot([locker1, locker2]);

      expect(() => robot.retrieve_bag('invalid-ticket')).toThrow('Invalid ticket');
    });
  });
});