export interface Translations {
  title: string;
  description: string;
  vendorManagement: string;
  addCustomVendor: string;
  hideNonCustomVendors: string;
  vendorName: string;
  planName: string;
  fixedPrice: string;
  kwhPrice: string;
  link: string;
  addVendor: string;
  customVendors: string;
  remove: string;
  massImportVendors: string;
  downloadExampleJson: string;
  importVendors: string;
  invalidJson: string;
  importSuccess: string;
  importTextareaPlaceholder: string;
  planRankingAnalysis: string;
  selectPlanToAnalyze: string;
  choosePlan: string;
  rankingAnalysisFor: string;
  rankingByConsumptionLevel: string;
  consumption: string;
  rank: string;
  totalPrice: string;
  bestPlan: string;
  bestPlanPrice: string;
  summaryStatistics: string;
  averageRank: string;
  bestRank: string;
  worstRank: string;
  timesRankedFirst: string;
  priceComparison: string;
  expandAll: string;
  collapseAll: string;
  consumptionLevel: string;
  visit: string;
  languageSelect: string;
  english: string;
  greek: string;
  footerDisclaimer: string;
  lastUpdate: string;
  vendor: string;
  plan: string;
}

export const translations: Record<string, Translations> = {
  en: {
    title: "Energy Price Comparison",
    description: "Compare electricity prices across different vendors and consumption levels",
    vendorManagement: "Vendor Management",
    addCustomVendor: "Add Custom Vendor",
    hideNonCustomVendors: "Hide all non-custom vendors",
    vendorName: "Vendor Name",
    planName: "Plan Name",
    fixedPrice: "Fixed Price (€)",
    kwhPrice: "kWh Price (€)",
    link: "Link (optional)",
    addVendor: "Add Vendor",
    customVendors: "Custom Vendors",
    remove: "Remove",
    massImportVendors: "Mass import custom vendors",
    downloadExampleJson: "Download example JSON",
    importVendors: "Import",
    invalidJson: "Invalid JSON. Please paste an array of vendor objects.",
    importSuccess: "Vendors imported successfully!",
    importTextareaPlaceholder: "Please download the JSON template below, edit, and paste in your final JSON here to import.",
    planRankingAnalysis: "Plan Analysis",
    selectPlanToAnalyze: "Select a plan to analyze its ranking across consumption levels:",
    choosePlan: "Choose a plan...",
    rankingAnalysisFor: "Ranking Analysis for",
    rankingByConsumptionLevel: "Ranking by Consumption Level",
    consumption: "Consumption (kWh)",
    rank: "Rank",
    totalPrice: "Total Price",
    bestPlan: "Best Plan",
    bestPlanPrice: "Best Plan Price",
    summaryStatistics: "Summary Statistics",
    averageRank: "Average Rank",
    bestRank: "Best Rank",
    worstRank: "Worst Rank",
    timesRankedFirst: "Times Ranked #1",
    priceComparison: "Price Comparison",
    expandAll: "Expand All",
    collapseAll: "Collapse All",
    consumptionLevel: "kWh",
    visit: "Visit",
    languageSelect: "Language",
    english: "English",
    greek: "Greek",
    footerDisclaimer: "This page compares only the fixed (blue) tariffs of providers.",
    lastUpdate: "Last update: 2025-08-08",
    vendor: "Vendor",
    plan: "Plan"
  },
  el: {
    title: "Σύγκριση Τιμών Ενέργειας",
    description: "Συγκρίνετε τις τιμές ηλεκτρικής ενέργειας μεταξύ διαφορετικών παρόχων και επιπέδων κατανάλωσης",
    vendorManagement: "Διαχείριση Παρόχων",
    addCustomVendor: "Προσθήκη Προσαρμοσμένου Παρόχου",
    hideNonCustomVendors: "Απόκρυψη όλων των μη προσαρμοσμένων παρόχων",
    vendorName: "Όνομα Παρόχου",
    planName: "Όνομα Προγράμματος",
    fixedPrice: "Πάγιο (€)",
    kwhPrice: "Τιμή kWh (€)",
    link: "Σύνδεσμος (προαιρετικό)",
    addVendor: "Προσθήκη Παρόχου",
    customVendors: "Προσαρμοσμένοι Πάροχοι",
    remove: "Αφαίρεση",
    massImportVendors: "Μαζική εισαγωγή προσαρμοσμένων παρόχων",
    downloadExampleJson: "Λήψη παράδειγμα JSON",
    importVendors: "Εισαγωγή",
    invalidJson: "Μη έγκυρο JSON. Επικολλήστε έναν πίνακα αντικειμένων παρόχων.",
    importSuccess: "Οι πάροχοι εισήχθησαν με επιτυχία!",
    importTextareaPlaceholder: "Κατεβάστε το πρότυπο JSON παρακάτω, επεξεργαστείτε το και επικολλήστε εδώ το τελικό JSON για εισαγωγή.",
    planRankingAnalysis: "Ανάλυση Προγραμμάτων",
    selectPlanToAnalyze: "Επιλέξτε ένα πρόγραμμα για να αναλύσετε την κατάταξή του σε διαφορετικά επίπεδα κατανάλωσης:",
    choosePlan: "Επιλέξτε πρόγραμμα...",
    rankingAnalysisFor: "Ανάλυση Κατάταξης για",
    rankingByConsumptionLevel: "Κατάταξη ανά Επίπεδο Κατανάλωσης",
    consumption: "Κατανάλωση (kWh)",
    rank: "Κατάταξη",
    totalPrice: "Συνολική Τιμή",
    bestPlan: "Καλύτερο Πρόγραμμα",
    bestPlanPrice: "Τιμή Καλύτερου Προγράμματος",
    summaryStatistics: "Συνοπτικά Στατιστικά",
    averageRank: "Μέση Κατάταξη",
    bestRank: "Καλύτερη Κατάταξη",
    worstRank: "Χειρότερη Κατάταξη",
    timesRankedFirst: "Φορές #1",
    priceComparison: "Σύγκριση Τιμών",
    expandAll: "Επέκταση Όλων",
    collapseAll: "Σύμπτυξη Όλων",
    consumptionLevel: "kWh",
    visit: "Επίσκεψη",
    languageSelect: "Γλώσσα",
    english: "English",
    greek: "Ελληνικά",
    footerDisclaimer: "Αυτή η σελίδα συγκρίνει μόνο τα σταθερά (μπλέ) τιμολόγια παρόχων.",
    lastUpdate: "Τελευταία ενημέρωση: 2025-08-08",
    vendor: "Πάροχος",
    plan: "Πρόγραμμα"
  }
};

export function getCurrentLanguage(): string {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('language') || 'en';
  }
  return 'en';
}

export function setLanguage(language: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', language);
  }
}

export function getTranslation(key: keyof Translations): string {
  const currentLang = getCurrentLanguage();
  return translations[currentLang]?.[key] || translations.en[key] || key;
}
