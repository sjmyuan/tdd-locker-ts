import { describe, it, expect, vi } from 'vitest';
import { Locker } from '../src/locker';

describe('Locker', () => {
  // Test for valid constructor with positive capacity
  it('should create a locker with valid capacity', () => {
    const locker = new Locker(5);
    expect(locker).toBeInstanceOf(Locker);
  });

  // Test for invalid constructor with zero capacity
  it('should throw error when capacity is zero', () => {
    expect(() => new Locker(0)).toThrow('Capacity must be greater than 0');
  });

  // Test for invalid constructor with negative capacity
  it('should throw error when capacity is negative', () => {
    expect(() => new Locker(-1)).toThrow('Capacity must be greater than 0');
  });
  
  // Test for capacity getter
  it('should return the correct capacity', () => {
    const capacity = 10;
    const locker = new Locker(capacity);
    expect(locker.capacity).toBe(capacity);
  });

  describe('store_bag', () => {
    it('should return a ticket string when storing a bag', () => {
      const locker = new Locker(1);
      const bagContent = 'laptop and books';
      const ticket = locker.store_bag(bagContent);
      
      expect(typeof ticket).toBe('string');
      expect(ticket.length).toBeGreaterThan(0);
    });
    
    it('should return different tickets for different bags', () => {
      const locker = new Locker(2);
      const ticket1 = locker.store_bag('bag 1');
      const ticket2 = locker.store_bag('bag 2');
      
      expect(ticket1).not.toBe(ticket2);
    });
    
    it('should throw error when locker has no available capacity', () => {
      const locker = new Locker(1);
      locker.store_bag('bag 1');
      
      expect(() => locker.store_bag('bag 2')).toThrow('Locker is full');
    });
  });

  describe('retrieve_bag', () => {
    it('should return the bag content for a valid ticket', () => {
      const locker = new Locker(1);
      const bagContent = 'laptop';
      const ticket = locker.store_bag(bagContent);

      const retrievedBag = locker.retrieve_bag(ticket);
      expect(retrievedBag).toBe(bagContent);
    });

    it('should throw an error for an invalid ticket', () => {
      const locker = new Locker(1);
      expect(() => locker.retrieve_bag('invalid-ticket')).toThrow('Invalid ticket');
    });

    it('should restore capacity after retrieving a bag', () => {
      const locker = new Locker(1);
      const ticket = locker.store_bag('bag 1');

      locker.retrieve_bag(ticket);

      // Should be able to store another bag after retrieving
      const newTicket = locker.store_bag('bag 2');
      expect(typeof newTicket).toBe('string');
    });
  });
});