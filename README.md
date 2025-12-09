# Booking Setup Application

A modern Next.js application for managing business bookings, business hours, and availability settings. Built with React, TypeScript, and Tailwind CSS.

## Features

- **Sidebar Navigation**: Hierarchical menu system with collapsible submenus and active state management
- **Bookings Setup Wizard**: Multi-step wizard for configuring business details and availability
- **Business Hours Management**: Interactive day-by-day business hours configuration with time selection
- **Calendar Integration**: Visual calendar component for date selection and management
- **Blackout Dates**: Manage dates and times when services are unavailable
- **Partial Availability**: Set specific time blocks for availability on selected days
- **Custom Icon System**: Support for both custom SVG icons and Lucide React icons
- **Reusable Components**: Modular UI components for consistent design patterns

## Tech Stack

- **Framework**: Next.js 16.0.8
- **React**: 19.2.1
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React + Custom SVG icons
- **Form Handling**: React Hook Form with Zod validation
- **Code Quality**: Biome (linting & formatting)

## Project Structure

```
booking-setup/
├── app/                    # Next.js app directory
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── components/
│   ├── custom-ui/          # Custom reusable components
│   │   ├── icon.tsx        # Icon component (SVG/Lucide compatible)
│   │   └── button-pair.tsx # Paired button component
│   ├── ui/                 # Base UI components (Radix UI)
│   ├── sidebar.tsx         # Sidebar navigation component
│   ├── calendar.tsx        # Calendar component
│   └── bookings-setup-wizard.tsx  # Main wizard component
├── public/
│   └── business-assets/
│       ├── icons/          # Custom SVG icons
│       └── logo.png        # Business logo
└── lib/
    └── utils.ts            # Utility functions
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone https://github.com/bablukpik/booking-setup/
cd booking-setup
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Custom Components

### Icon Component

A flexible icon component that supports both custom SVG paths and Lucide React icons.

**Location**: `components/custom-ui/icon.tsx`

**Usage**:

```tsx
import { Icon } from "@/components/custom-ui/icon";

// Using custom SVG
<Icon icon="/business-assets/icons/home.svg" alt="Home" />;

// Using Lucide React icon
import { Home } from "lucide-react";
<Icon icon={Home} alt="Home" />;
```

**Props**:

- `icon`: `string | ComponentType` - SVG path or Lucide icon component
- `alt`: `string` - Accessibility label
- `className?`: `string` - Optional CSS classes

### ButtonPair Component

A reusable component for displaying two buttons side-by-side (typically Cancel/Next or Cancel/Save).

**Location**: `components/custom-ui/button-pair.tsx`

**Usage**:

```tsx
import { ButtonPair } from "@/components/custom-ui/button-pair";

<ButtonPair
  primaryLabel="Next"
  secondaryLabel="Cancel"
  onPrimary={() => handleNext()}
  onSecondary={() => handleCancel()}
/>;
```

**Props**:

- `primaryLabel`: `string` - Text for the primary button
- `secondaryLabel`: `string` - Text for the secondary button
- `onPrimary?`: `() => void` - Primary button click handler
- `onSecondary?`: `() => void` - Secondary button click handler
- `primaryIcon?`: `ReactNode` - Custom icon for primary button (defaults to ChevronRight)
- `className?`: `string` - Container CSS classes
- `primaryClassName?`: `string` - Primary button CSS classes
- `secondaryClassName?`: `string` - Secondary button CSS classes

## Main Components

### Sidebar

Navigation sidebar with hierarchical menu structure and active state management.

**Features**:

- Collapsible submenus
- Active item highlighting
- Custom icon support
- Responsive design

**Menu Items Structure**:

```tsx
{
  icon: string | ComponentType,
  label: string,
  id: string,
  href?: string,
  hasCollapse?: boolean,
  subItems?: Array<MenuItem>
}
```

### Bookings Setup Wizard

Multi-step wizard for configuring business booking settings.

**Steps**:

1. Business Details - Service type selection
2. Business Hours - Day-by-day availability configuration
3. Blackout Dates - Unavailable dates and times

**Features**:

- Interactive day selection
- Time picker with 30-minute intervals
- Calendar integration
- Partial availability settings

### Calendar

Custom calendar component for date selection and visualization.

**Props**:

- `month`: `number` - Current month (0-11)
- `year`: `number` - Current year
- `selectedDate`: `number` - Selected day
- `todayDate`: `number` - Today's date for highlighting
- `onDateSelect`: `(date: number) => void` - Date selection handler
- `onMonthChange`: `(month: number) => void` - Month change handler
- `onYearChange`: `(year: number) => void` - Year change handler

## Custom Icons

Custom SVG icons are located in `public/business-assets/icons/`:

- `home.svg`
- `sell.svg`
- `products.svg`
- `experiences.svg`
- `services.svg`
- `bookings.svg`
- `memberships.svg`
- `bundles.svg`
- `custom-offers.svg`
- `customers.svg`
- `payouts.svg`
- `analytics.svg`
- `settings.svg`
- `signout.svg`

## Styling

The project uses Tailwind CSS with custom color palette:

- Primary Blue: `#072AC8`
- Background: `#F9FAFC`
- Text Primary: `#2D3035`
- Text Secondary: `#626974`
- Border: `#D1D4D7`, `#F0F1F2`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run Biome linter
- `npm run format` - Format code with Biome

## Code Quality

This project uses [Biome](https://biomejs.dev/) for linting and formatting:

- Fast, zero-config linting
- Opinionated code formatting
- TypeScript support

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com)
- [Lucide Icons](https://lucide.dev)
