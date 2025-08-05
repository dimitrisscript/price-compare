# Energy Price Comparison Tool

A modern web application built with Astro and Tailwind CSS for comparing electricity prices across different vendors and consumption levels.

## Features

- **Price Comparison**: Compare electricity prices for consumption levels from 100kWh to 1500kWh
- **Vendor Management**: Add, remove, and edit custom vendors
- **Persistent Storage**: Custom vendors are saved in browser localStorage
- **Ranked Results**: Vendors are automatically ranked by price (ascending)
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Dark Mode**: Toggle between light and dark themes with persistent preference
- **Accordion Interface**: Collapsible consumption level tables for better organization
- **Expand/Collapse Controls**: Buttons to expand or collapse all sections at once
- **Best Price Highlighting**: Cheapest options are highlighted in green

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Deployment

This app is configured for deployment on Netlify. Simply connect your repository to Netlify and it will automatically build and deploy.

### Manual Deployment

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting provider

## Data Structure

The app uses the following data structure for vendors:

```typescript
interface Vendor {
  vendor: string;
  plan: string;
  fixedPrice: number;
  kwhPrice: number;
  link: string;
}
```

## Default Vendors

The app comes with 24 pre-configured vendors from the Greek electricity market, including:
- ΔΕΗ (DEH)
- ΖΕΝΙΘ (Zenith)
- Elpedison
- nrg
- Volton
- ΗΡΩΝ (Heron)
- Ελίν (Elin)
- Eunice
- Protergia

## User Interface Features

### Dark Mode
- Toggle between light and dark themes using the sun/moon icon
- Theme preference is saved in localStorage
- All UI elements adapt to the selected theme

### Accordion Tables
- All consumption levels start collapsed by default for a clean interface
- Click individual headers to expand/collapse specific sections
- Use "Expand All" button to open all sections at once
- Use "Collapse All" button to close all sections
- Smooth animations and visual feedback with rotating arrow icons
- Proper accessibility with ARIA attributes

### Vendor Management
- Add custom vendors with form validation
- Remove custom vendors with one click
- All changes persist between sessions
- Original vendors cannot be deleted

## Technologies Used

- **Astro**: Modern static site generator
- **Tailwind CSS**: Utility-first CSS framework with dark mode support
- **TypeScript**: Type-safe JavaScript
- **Local Storage**: Browser-based data persistence
