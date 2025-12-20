import type { Vendor } from '../types/vendor';

export function getDefaultVendors(): Vendor[] {
  return [
    // ΔΕΗ
    {
      vendor: "ΔΕΗ",
      plan: "myHomeEnter",
      fixedPrice: 5,
      kwhPrice: 0.145,
      link: "https://www.dei.gr/el/gia-to-spiti/revma/myhome-enter/",
    },
    {
      vendor: "ΔΕΗ",
      plan: "myHomeEnterTwo",
      fixedPrice: 8,
      kwhPrice: 0.145,
      link: "https://www.dei.gr/el/gia-to-spiti/revma/myhome-entertwo/",
    },
    {
      vendor: "ΔΕΗ",
      plan: "myHomeOnline",
      fixedPrice: 3.5,
      kwhPrice: 0.142,
      link: "https://www.dei.gr/el/gia-to-spiti/revma/myhome-online/",
    },

    // ΖΕΝΙΘ
    {
      vendor: "ΖΕΝΙΘ",
      plan: "Power Home Secure 3",
      fixedPrice: 9.9,
      kwhPrice: 0.106,
      link: "https://zenith.gr/el/for-the-home/electricity/power-home-secure-2-0/",
    },

    // Φυσικό Αέριο
    {
      vendor: "Φυσικό Αέριο",
      plan: "Home Fixed",
      fixedPrice: 9.9,
      kwhPrice: 0.139,
      link: "https://www.fysikoaerioellados.gr/product/reyma-home-fixed/?product-category=household&product-commodity=electric-power",
    },

    // Elpedison
    {
      vendor: "Elpedison",
      plan: "Heatgreen Electricity",
      fixedPrice: 12.9,
      kwhPrice: 0.088,
      link: "https://www.elpedison.gr/el/gia-to-spiti/revma/elpedison-heatgreen-electricity_134116/",
    },
    {
      vendor: "Elpedison",
      plan: "DriveGreen Electricity 2",
      fixedPrice: 9.9,
      kwhPrice: 0.0999,
      link: "https://www.elpedison.gr/el/gia-to-spiti/revma/elpedison-drivegreen-electricity-2_133989/",
    },
    {
      vendor: "Elpedison",
      plan: "Reward Zero Fee",
      fixedPrice: 0,
      kwhPrice: 0.1395,
      link: "https://www.elpedison.gr/el/gia-to-spiti/revma/elpedison-reward-zero-fee_134062/",
    },
    {
      vendor: "Elpedison",
      plan: "Bright Home",
      fixedPrice: 12.9,
      kwhPrice: 0.1299,
      link: "https://www.elpedison.gr/el/gia-to-spiti/revma/elpedison-bright-home_134064/",
    },
    {
      vendor: "Elpedison",
      plan: "Reward Maximum",
      fixedPrice: 12.9,
      kwhPrice: 0.088,
      link: "https://www.elpedison.gr/el/gia-to-spiti/revma/elpedison-reward-maximum_134060/",
    },
    {
      vendor: "Elpedison",
      plan: "Reward Ultra",
      fixedPrice: 9.9,
      kwhPrice: 0.098,
      link: "https://www.elpedison.gr/el/gia-to-spiti/revma/elpedison-reward-ultra_134129/",
    },

    // nrg
    {
      vendor: "nrg",
      plan: "FixedOnTime",
      fixedPrice: 9.9,
      kwhPrice: 0.1078,
      link: "https://www.nrg.gr/el/idiotes/revma/nrg-fixed-on-time",
    },
    {
      vendor: "nrg",
      plan: "FixedOnTimeAdvanced Promo",
      fixedPrice: 9.9,
      kwhPrice: 0.099,
      link: "https://www.nrg.gr/el/idiotes/revma/nrg-fixed-ontime-advanced-promo",
    },
    {
      vendor: "nrg",
      plan: "Fixed4u12M",
      fixedPrice: 14.9,
      kwhPrice: 0.115,
      link: "https://www.nrg.gr/el/idiotes/revma/nrg-fixed-4U-12M",
    },

    // Volton
    {
      vendor: "Volton",
      plan: "Blue12M",
      fixedPrice: 9.9,
      kwhPrice: 0.1089,
      link: "https://volton.gr/services/volton-blue-12m/",
    },

    // ΗΡΩΝ
    {
      vendor: "ΗΡΩΝ",
      plan: "Blue Generous",
      fixedPrice: 9.9,
      kwhPrice: 0.09845,
      link: "https://www.heron.gr/energy/electricity/gia-to-spiti/blue-generous-home/",
    },
    {
      vendor: "ΗΡΩΝ",
      plan: "Blue Generous Max Home",
      fixedPrice: 9.9,
      kwhPrice: 0.0945,
      link: "https://heron.gr/energy/electricity/gia-to-spiti/blue-generous-max-home/",
    },

    // Ελίν
    {
      vendor: "Ελίν",
      plan: "Power On! Blue Now",
      fixedPrice: 9.9,
      kwhPrice: 0.1099,
      link: "https://energy.elin.gr/ilektriki-energeia-new/gia-to-spiti-ilektriko-reyma-on/power-on-bluenow12-18-24/",
    },
    {
      vendor: "Ελίν",
      plan: "Power On! Blue Now +",
      fixedPrice: 15.9,
      kwhPrice: 0.0899,
      link: "https://energy.elin.gr/ilektriki-energeia-new/gia-to-spiti-ilektriko-reyma-on/power-on-blue-12m/",
    },

    // Eunice
    {
      vendor: "Eunice",
      plan: "Home Fair II",
      fixedPrice: 4,
      kwhPrice: 0.16,
      link: "https://eunice-power.gr/hlektrikh-energeia/gia-to-spiti/eunice-home-fair-ii/",
    },
    {
      vendor: "Eunice",
      plan: "Home Edge",
      fixedPrice: 7,
      kwhPrice: 0.098,
      link: "https://eunice-power.gr/hlektrikh-energeia/gia-to-spiti/eunice-home-edge/",
    },

    // Protergia
    {
      vendor: "Protergia",
      plan: "Οικιακό Ρεύμα 1 Value Secure 12M",
      fixedPrice: 9.9,
      kwhPrice: 0.099,
      link: "https://www.protergia.gr/spiti/oikiako-reuma-proionta/protergia-oikiako-value-secure-12m/",
    },
    {
      vendor: "Protergia",
      plan: "Value For Family",
      fixedPrice: 9.9,
      kwhPrice: 0.141,
      link: "https://www.protergia.gr/spiti/oikiako-reuma-proionta/protergia-oikiako-value-4family/",
    },
    {
      vendor: "Protergia",
      plan: "Protergia Οικιακό Value Safe More",
      fixedPrice: 9.9,
      kwhPrice: 0.125,
      link: "https://www.protergia.gr/spiti/oikiako-reuma-proionta/protergia-oikiako-value-safe-more/",
    },
  ];
}

