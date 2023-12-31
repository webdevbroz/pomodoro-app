import { cleanPercentage } from '@/components/pomodoro/circular-progress';

describe('cleanPercentage', () => {
  it('should return a number if the input is a within the values of 0-100', () => {
    expect(cleanPercentage(50)).toBe(50);
  });

  it('should return 0 for negative values', () => {
    // When given a negative value
    expect(cleanPercentage(-15)).toBe(0);
  });

  it('should return 100 for values greater than 100', () => {
    // When given a value
    expect(cleanPercentage(110)).toBe(100);
  });

  it('should return 0 for special numeric values', () => {
    expect(cleanPercentage(NaN)).toBe(0);
    expect(cleanPercentage(Infinity)).toBe(0);
    expect(cleanPercentage(-Infinity)).toBe(0);
  });

  describe('edge cases', () => {
    it('return 0 when given 0', () => {
      expect(cleanPercentage(0)).toBe(0);
    });

    it('return 100 when given 100', () => {
      expect(cleanPercentage(100)).toBe(100);
    });

    it('return 100 when given a super duper pumper to the maxMaxMax number', () => {
      expect(cleanPercentage(Number.MAX_VALUE)).toBe(100);
    });
  });
});
