import { LockerRobotManager } from './lockerRobotManager';

export class LockerRobotDirector {
  private managers: LockerRobotManager[];

  constructor(managers: LockerRobotManager[]) {
    this.managers = managers;
  }

  /**
   * Generate a report of the current status of LockerRobotManagers
   * @returns A string report of the status
   */
  generateReport(): string {
    return this.managers
      .map((manager) => {
        const managerAvailable = manager['lockers'].reduce((sum, locker) => sum + locker['capacity'] - locker['bags'].size, 0) +
          manager['robots'].reduce((sum, robot) => sum + robot['lockers'].reduce((robotSum, locker) => robotSum + locker['capacity'] - locker['bags'].size, 0), 0);

        const managerMax = manager['lockers'].reduce((sum, locker) => sum + locker['capacity'], 0) +
          manager['robots'].reduce((sum, robot) => sum + robot['lockers'].reduce((robotSum, locker) => robotSum + locker['capacity'], 0), 0);

        let report = `M ${managerAvailable} ${managerMax}`;
        
        // Add lockers report only if there are lockers
        if (manager['lockers'].length > 0) {
          const lockersReport = manager['lockers']
            .map((locker) => `    L ${locker['capacity'] - locker['bags'].size} ${locker['capacity']}`)
            .join('\n');
          report += '\n' + lockersReport;
        }
        
        // Add robots report only if there are robots
        if (manager['robots'].length > 0) {
          const robotsReport = manager['robots']
            .map((robot) => {
              const robotAvailable = robot['lockers'].reduce((sum, locker) => sum + locker['capacity'] - locker['bags'].size, 0);
              const robotMax = robot['lockers'].reduce((sum, locker) => sum + locker['capacity'], 0);
              return `    R ${robotAvailable} ${robotMax}`;
            })
            .join('\n');
          report += '\n' + robotsReport;
        }
        
        return report;
      })
      .join('\n') + '\n';
  }
}