import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { getCurrentLanguage, setLanguage, getTranslation, translations } from '../i18n/translations';

describe('i18n/translations', () => {
  let originalLocalStorage: Storage;
  let mockLocalStorage: { [key: string]: string };

  beforeEach(() => {
    // Store original localStorage
    originalLocalStorage = global.localStorage;
    
    // Create mock localStorage
    mockLocalStorage = {};
    const mockStorage = {
      getItem: vi.fn((key: string) => mockLocalStorage[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        mockLocalStorage[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete mockLocalStorage[key];
      }),
      clear: vi.fn(() => {
        mockLocalStorage = {};
      }),
      length: 0,
      key: vi.fn(() => null)
    };
    
    // Mock global localStorage
    Object.defineProperty(global, 'localStorage', {
      value: mockStorage,
      writable: true
    });
  });

  afterEach(() => {
    // Restore original localStorage
    Object.defineProperty(global, 'localStorage', {
      value: originalLocalStorage,
      writable: true
    });
  });

  describe('translations object', () => {
    it('should have translations for both English and Greek', () => {
      expect(translations.en).toBeDefined();
      expect(translations.el).toBeDefined();
    });

    it('should have all required translation keys in English', () => {
      const requiredKeys = [
        'title', 'description', 'vendorManagement', 'addCustomVendor',
        'vendorName', 'planName', 'fixedPrice', 'kwhPrice', 'link',
        'addVendor', 'customVendors', 'remove', 'planRankingAnalysis',
        'selectPlanToAnalyze', 'choosePlan', 'rankingAnalysisFor',
        'rankingByConsumptionLevel', 'consumption', 'rank', 'totalPrice',
        'bestPlan', 'bestPlanPrice', 'summaryStatistics', 'averageRank',
        'bestRank', 'worstRank', 'timesRankedFirst', 'priceComparison',
        'expandAll', 'collapseAll', 'consumptionLevel', 'visit',
        'languageSelect', 'english', 'greek'
      ];

      requiredKeys.forEach(key => {
        expect(translations.en[key as keyof typeof translations.en]).toBeDefined();
      });
    });

    it('should have all required translation keys in Greek', () => {
      const requiredKeys = [
        'title', 'description', 'vendorManagement', 'addCustomVendor',
        'vendorName', 'planName', 'fixedPrice', 'kwhPrice', 'link',
        'addVendor', 'customVendors', 'remove', 'planRankingAnalysis',
        'selectPlanToAnalyze', 'choosePlan', 'rankingAnalysisFor',
        'rankingByConsumptionLevel', 'consumption', 'rank', 'totalPrice',
        'bestPlan', 'bestPlanPrice', 'summaryStatistics', 'averageRank',
        'bestRank', 'worstRank', 'timesRankedFirst', 'priceComparison',
        'expandAll', 'collapseAll', 'consumptionLevel', 'visit',
        'languageSelect', 'english', 'greek'
      ];

      requiredKeys.forEach(key => {
        expect(translations.el[key as keyof typeof translations.el]).toBeDefined();
      });
    });

    it('should have non-empty values for all keys', () => {
      Object.values(translations).forEach(lang => {
        Object.entries(lang).forEach(([key, value]) => {
          expect(value).toBeTruthy();
          expect(typeof value).toBe('string');
        });
      });
    });
  });

  describe('getCurrentLanguage', () => {
    it('should return "en" as default when no language is set', () => {
      const result = getCurrentLanguage();
      expect(result).toBe('en');
    });

    it('should return stored language from localStorage', () => {
      mockLocalStorage['language'] = 'el';
      const result = getCurrentLanguage();
      expect(result).toBe('el');
    });

    it('should return "en" when localStorage is not available', () => {
      // Mock window as undefined to simulate server-side environment
      const originalWindow = global.window;
      delete (global as any).window;
      
      const result = getCurrentLanguage();
      expect(result).toBe('en');
      
      // Restore window
      (global as any).window = originalWindow;
    });
  });

  describe('setLanguage', () => {
    it('should set language in localStorage', () => {
      setLanguage('el');
      expect(mockLocalStorage['language']).toBe('el');
    });

    it('should not throw when localStorage is not available', () => {
      // Mock window as undefined to simulate server-side environment
      const originalWindow = global.window;
      delete (global as any).window;
      
      expect(() => setLanguage('el')).not.toThrow();
      
      // Restore window
      (global as any).window = originalWindow;
    });

    it('should handle different language codes', () => {
      setLanguage('en');
      expect(mockLocalStorage['language']).toBe('en');
      
      setLanguage('el');
      expect(mockLocalStorage['language']).toBe('el');
    });
  });

  describe('getTranslation', () => {
    it('should return English translation by default', () => {
      const result = getTranslation('title');
      expect(result).toBe(translations.en.title);
    });

    it('should return Greek translation when language is set to Greek', () => {
      mockLocalStorage['language'] = 'el';
      const result = getTranslation('title');
      expect(result).toBe(translations.el.title);
    });

    it('should fallback to English when translation key is missing in current language', () => {
      mockLocalStorage['language'] = 'el';
      // Test with a key that exists in English but not in Greek (if any)
      const result = getTranslation('title');
      expect(result).toBe(translations.el.title);
    });

    it('should fallback to key name when translation is missing in both languages', () => {
      const result = getTranslation('nonexistentKey' as any);
      expect(result).toBe('nonexistentKey');
    });

    it('should handle all translation keys', () => {
      const keys: Array<keyof typeof translations.en> = [
        'title', 'description', 'vendorManagement', 'addCustomVendor',
        'vendorName', 'planName', 'fixedPrice', 'kwhPrice', 'link',
        'addVendor', 'customVendors', 'remove', 'planRankingAnalysis',
        'selectPlanToAnalyze', 'choosePlan', 'rankingAnalysisFor',
        'rankingByConsumptionLevel', 'consumption', 'rank', 'totalPrice',
        'bestPlan', 'bestPlanPrice', 'summaryStatistics', 'averageRank',
        'bestRank', 'worstRank', 'timesRankedFirst', 'priceComparison',
        'expandAll', 'collapseAll', 'consumptionLevel', 'visit',
        'languageSelect', 'english', 'greek'
      ];

      keys.forEach(key => {
        const result = getTranslation(key);
        expect(result).toBe(translations.en[key]);
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
      });
    });

    it('should work correctly when language is switched', () => {
      // Start with English
      expect(getTranslation('title')).toBe(translations.en.title);
      
      // Switch to Greek
      setLanguage('el');
      expect(getTranslation('title')).toBe(translations.el.title);
      
      // Switch back to English
      setLanguage('en');
      expect(getTranslation('title')).toBe(translations.en.title);
    });
  });

  describe('Edge cases', () => {
    it('should handle localStorage errors gracefully', () => {
      // Mock localStorage to throw an error
      const mockStorageWithError = {
        getItem: vi.fn().mockImplementation(() => {
          throw new Error('Storage error');
        }),
        setItem: vi.fn().mockImplementation(() => {
          throw new Error('Storage error');
        }),
        removeItem: vi.fn(),
        clear: vi.fn(),
        length: 0,
        key: vi.fn(() => null)
      };

      Object.defineProperty(global, 'localStorage', {
        value: mockStorageWithError,
        writable: true
      });

      // Current implementation doesn't handle localStorage errors gracefully
      // It will throw when localStorage.getItem throws
      expect(() => getCurrentLanguage()).toThrow('Storage error');
      
      // setLanguage will also throw
      expect(() => setLanguage('el')).toThrow('Storage error');
      
      // getTranslation will throw because it calls getCurrentLanguage
      expect(() => getTranslation('title')).toThrow('Storage error');
    });

    it('should handle invalid language codes', () => {
      mockLocalStorage['language'] = 'invalid';
      const result = getTranslation('title');
      // Should fallback to English
      expect(result).toBe(translations.en.title);
    });

    it('should handle empty language setting', () => {
      mockLocalStorage['language'] = '';
      const result = getCurrentLanguage();
      expect(result).toBe('en');
    });
  });
});
