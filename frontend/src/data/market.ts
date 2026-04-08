import { MarketSegment } from '../../../shared/types';

export const TAM = {
  current: '$220B',
  currentYear: 2024,
  projected: '$470B+',
  projectedYear: 2030,
  domesticTrips: '2.5B/year',
  outboundTrips: '27M (→ 50M by 2030)',
  onlineBooking: '73-75%',
  genZShare: '9/10 international trips',
};

export const MARKET_SEGMENTS: MarketSegment[] = [
  {
    name: 'Flights',
    marketSize2025: '$25-51B',
    projection2030: '$38-124B',
    topPlayers: ['MakeMyTrip (60%)', 'EaseMyTrip', 'Ixigo'],
    atlysPresent: false,
  },
  {
    name: 'Hotels',
    marketSize2025: '$8.95B',
    projection2030: '$14.58B',
    topPlayers: ['MakeMyTrip (60%)', 'OYO', 'Booking.com', 'Agoda'],
    atlysPresent: false,
  },
  {
    name: 'Activities/Experiences',
    marketSize2025: '$300B+ (global)',
    projection2030: 'Growing fast',
    topPlayers: ['Klook ($417M)', 'GetYourGuide (€1B+)', 'Headout', 'Viator ($840M)'],
    atlysPresent: false,
  },
  {
    name: 'Ground Transport',
    marketSize2025: '$1.9B',
    projection2030: 'Growing 21%',
    topPlayers: ['RedBus (75%)', 'Ixigo', 'Ola/Uber'],
    atlysPresent: false,
  },
  {
    name: 'Travel Insurance',
    marketSize2025: '$1.17-1.33B',
    projection2030: '$3.76B',
    topPlayers: ['Policybazaar', 'Direct insurers'],
    atlysPresent: false,
  },
  {
    name: 'Visas',
    marketSize2025: '$34.26M (India e-visa)',
    projection2030: '$8.7B (global, 2031)',
    topPlayers: ['Atlys', 'iVisa', 'VFS Global'],
    atlysPresent: true,
  },
  {
    name: 'Food/Dining',
    marketSize2025: '50%+ of trip spend motivation',
    projection2030: '—',
    topPlayers: ['Zomato', 'TripAdvisor', 'Google Maps'],
    atlysPresent: false,
  },
];
