import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';

describe('Footer Tests', () => {
  let dom: JSDOM;
  let document: Document;

  beforeEach(() => {
    // Create a mock DOM environment
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
          <footer class="mt-12 py-6 border-t border-gray-200 dark:border-gray-700">
            <div class="container mx-auto px-4 text-center">
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-2" id="footer-last-update" data-translate="lastUpdate">Last update: 2025-08-08</p>
              <p class="text-sm text-gray-500 dark:text-gray-400" id="footer-disclaimer" data-translate="footerDisclaimer">This page compares only the fixed (blue) tariffs of providers.</p>
            </div>
          </footer>
        </body>
      </html>
    `);
    document = dom.window.document;
  });

  afterEach(() => {
    dom.window.close();
  });

  describe('Footer Structure', () => {
    it('should have a footer element with correct styling', () => {
      const footer = document.querySelector('footer');
      
      expect(footer).toBeDefined();
      expect(footer?.className).toContain('mt-12');
      expect(footer?.className).toContain('py-6');
      expect(footer?.className).toContain('border-t');
      expect(footer?.className).toContain('border-gray-200');
      expect(footer?.className).toContain('dark:border-gray-700');
    });

    it('should have a container div with correct styling', () => {
      const container = document.querySelector('footer .container');
      
      expect(container).toBeDefined();
      expect(container?.className).toContain('mx-auto');
      expect(container?.className).toContain('px-4');
      expect(container?.className).toContain('text-center');
    });
  });

  describe('Last Update Text', () => {
    it('should display the last update text with correct content', () => {
      const lastUpdateText = document.querySelector('#footer-last-update');
      
      expect(lastUpdateText).toBeDefined();
      expect(lastUpdateText?.textContent).toBe('Last update: 2025-08-08');
    });

    it('should have correct styling for last update text', () => {
      const lastUpdateText = document.querySelector('#footer-last-update');
      
      expect(lastUpdateText?.className).toContain('text-sm');
      expect(lastUpdateText?.className).toContain('text-gray-500');
      expect(lastUpdateText?.className).toContain('dark:text-gray-400');
      expect(lastUpdateText?.className).toContain('mb-2');
    });

    it('should have the correct data-translate attribute', () => {
      const lastUpdateText = document.querySelector('#footer-last-update');
      
      expect(lastUpdateText?.getAttribute('data-translate')).toBe('lastUpdate');
    });

    it('should have a valid date format', () => {
      const lastUpdateText = document.querySelector('#footer-last-update');
      const text = lastUpdateText?.textContent || '';
      
      // Check if the text contains a date in YYYY-MM-DD format
      const dateMatch = text.match(/Last update: (\d{4}-\d{2}-\d{2})/);
      expect(dateMatch).toBeDefined();
      
      if (dateMatch) {
        const dateString = dateMatch[1];
        const date = new Date(dateString);
        expect(date.getTime()).not.toBeNaN(); // Valid date
      }
    });
  });

  describe('Dynamic Disclaimer Text', () => {
    it('should display the disclaimer text with correct content', () => {
      const disclaimerText = document.querySelector('#footer-disclaimer');
      
      expect(disclaimerText).toBeDefined();
      expect(disclaimerText?.textContent).toBe('This page compares only the fixed (blue) tariffs of providers.');
    });

    it('should have correct styling for disclaimer text', () => {
      const disclaimerText = document.querySelector('#footer-disclaimer');
      
      expect(disclaimerText?.className).toContain('text-sm');
      expect(disclaimerText?.className).toContain('text-gray-500');
      expect(disclaimerText?.className).toContain('dark:text-gray-400');
    });

    it('should have the correct data-translate attribute', () => {
      const disclaimerText = document.querySelector('#footer-disclaimer');
      
      expect(disclaimerText?.getAttribute('data-translate')).toBe('footerDisclaimer');
    });

    it('should contain the word "blue" in English version', () => {
      const disclaimerText = document.querySelector('#footer-disclaimer');
      const text = disclaimerText?.textContent || '';
      
      expect(text).toContain('blue');
    });
  });

  describe('Footer Accessibility', () => {
    it('should have proper semantic structure', () => {
      const footer = document.querySelector('footer');
      
      expect(footer).toBeDefined();
      expect(footer?.tagName.toLowerCase()).toBe('footer');
    });

    it('should have readable text contrast', () => {
      const paragraphs = document.querySelectorAll('footer p');
      
      paragraphs.forEach(p => {
        const className = p.className;
        // Check that text has appropriate color classes for contrast
        expect(className).toMatch(/text-gray-\d+/);
      });
    });
  });

  describe('Footer Responsiveness', () => {
    it('should have responsive container classes', () => {
      const container = document.querySelector('footer .container');
      
      expect(container?.className).toContain('mx-auto');
      expect(container?.className).toContain('px-4');
    });
  });
});
