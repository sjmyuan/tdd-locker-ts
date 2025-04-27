import { describe, it, expect } from 'vitest';
import { Locker } from '../src/locker';
import { PrimaryLockerRobot } from '../src/primaryLockerRobot';
import { LockerRobotManager } from '../src/lockerRobotManager';
import { LockerRobotDirector } from '../src/lockerRobotDirector';

describe('LockerRobotDirector', () => {
  describe('generateReport', () => {
    it('should generate a report for a single manager with lockers and robots', () => {
      const locker1 = new Locker(5);
      const locker2 = new Locker(10);
      const robot = new PrimaryLockerRobot([locker1]);
      const manager = new LockerRobotManager([locker2], [robot]);
      const director = new LockerRobotDirector([manager]);

      const report = director.generateReport();
      expect(report).toBe(
        `M 15 15\n` +
        `    L 10 10\n` +
        `    R 5 5\n`
      );
    });

    it('should generate a report for multiple managers', () => {
      const locker1 = new Locker(5);
      const locker2 = new Locker(10);
      const robot1 = new PrimaryLockerRobot([locker1]);
      const manager1 = new LockerRobotManager([locker2], [robot1]);

      const locker3 = new Locker(8);
      const robot2 = new PrimaryLockerRobot([locker3]);
      const manager2 = new LockerRobotManager([], [robot2]);

      const director = new LockerRobotDirector([manager1, manager2]);

      const report = director.generateReport();
      expect(report).toBe(
        `M 15 15\n` +
        `    L 10 10\n` +
        `    R 5 5\n` +
        `M 8 8\n` +
        `    R 8 8\n`
      );
    });
  });
});