/**
 * Flugdaten — konvertiert aus skyahs-php/flights.php und erweitert (123 Verbindungen).
 * Preise = Economy-Basispreis pro Person in EUR, inkl. Steuern und Gebühren.
 * Klassen-Multiplikatoren: siehe src/config/company.ts (1× / 1.6× / 2.5× / 4.2×).
 */
export interface Flight {
  airline: string;
  flight: string;
  from: string;
  to: string;
  depart: string;
  arrive: string;
  duration: string;
  stops: 0 | 1;
  basePrice: number;
}

export const flights: Flight[] = [
  { airline: 'Lufthansa', flight: 'LH1001', from: 'HAM', to: 'FRA', depart: '06:30', arrive: '07:35', duration: '1h 05m', stops: 0, basePrice: 189 },
  { airline: 'Lufthansa', flight: 'LH1005', from: 'HAM', to: 'FRA', depart: '09:15', arrive: '10:20', duration: '1h 05m', stops: 0, basePrice: 219 },
  { airline: 'Lufthansa', flight: 'LH1009', from: 'HAM', to: 'FRA', depart: '12:45', arrive: '13:50', duration: '1h 05m', stops: 0, basePrice: 199 },
  { airline: 'Lufthansa', flight: 'LH1013', from: 'HAM', to: 'FRA', depart: '15:30', arrive: '16:35', duration: '1h 05m', stops: 1, basePrice: 158 },
  { airline: 'Lufthansa', flight: 'LH1017', from: 'HAM', to: 'FRA', depart: '18:20', arrive: '19:25', duration: '1h 05m', stops: 0, basePrice: 159 },
  { airline: 'Lufthansa', flight: 'LH2021', from: 'HAM', to: 'MUC', depart: '07:00', arrive: '08:15', duration: '1h 15m', stops: 0, basePrice: 209 },
  { airline: 'Lufthansa', flight: 'LH2025', from: 'HAM', to: 'MUC', depart: '10:30', arrive: '11:45', duration: '1h 15m', stops: 0, basePrice: 239 },
  { airline: 'Lufthansa', flight: 'LH2029', from: 'HAM', to: 'MUC', depart: '14:00', arrive: '15:15', duration: '1h 15m', stops: 0, basePrice: 189 },
  { airline: 'Eurowings', flight: 'EW7171', from: 'HAM', to: 'MUC', depart: '06:15', arrive: '07:30', duration: '1h 15m', stops: 0, basePrice: 89 },
  { airline: 'Eurowings', flight: 'EW7173', from: 'HAM', to: 'MUC', depart: '12:30', arrive: '13:45', duration: '1h 15m', stops: 0, basePrice: 99 },
  { airline: 'Lufthansa', flight: 'LH1701', from: 'HAM', to: 'DUS', depart: '08:00', arrive: '08:55', duration: '55m', stops: 1, basePrice: 219 },
  { airline: 'Lufthansa', flight: 'LH1705', from: 'HAM', to: 'DUS', depart: '16:30', arrive: '17:25', duration: '55m', stops: 0, basePrice: 229 },
  { airline: 'Lufthansa', flight: 'LH1801', from: 'HAM', to: 'BER', depart: '07:30', arrive: '08:25', duration: '55m', stops: 0, basePrice: 149 },
  { airline: 'EasyJet', flight: 'U55601', from: 'HAM', to: 'BER', depart: '11:45', arrive: '12:40', duration: '55m', stops: 0, basePrice: 49 },
  { airline: 'Lufthansa', flight: 'LH3001', from: 'FRA', to: 'CDG', depart: '07:45', arrive: '09:05', duration: '1h 20m', stops: 0, basePrice: 269 },
  { airline: 'Air France', flight: 'AF1011', from: 'FRA', to: 'CDG', depart: '10:30', arrive: '11:50', duration: '1h 20m', stops: 0, basePrice: 249 },
  { airline: 'Air France', flight: 'AF1015', from: 'FRA', to: 'CDG', depart: '14:15', arrive: '15:35', duration: '1h 20m', stops: 0, basePrice: 229 },
  { airline: 'Lufthansa', flight: 'LH4001', from: 'FRA', to: 'LHR', depart: '08:20', arrive: '09:20', duration: '2h 00m', stops: 1, basePrice: 263 },
  { airline: 'British Airways', flight: 'BA903', from: 'FRA', to: 'LHR', depart: '12:00', arrive: '13:00', duration: '2h 00m', stops: 0, basePrice: 279 },
  { airline: 'British Airways', flight: 'BA907', from: 'FRA', to: 'LHR', depart: '16:45', arrive: '17:45', duration: '2h 00m', stops: 0, basePrice: 259 },
  { airline: 'Lufthansa', flight: 'LH5001', from: 'FRA', to: 'FCO', depart: '09:00', arrive: '10:45', duration: '1h 45m', stops: 0, basePrice: 329 },
  { airline: 'ITA Airways', flight: 'AZ400', from: 'FRA', to: 'FCO', depart: '13:30', arrive: '15:15', duration: '1h 45m', stops: 0, basePrice: 289 },
  { airline: 'Lufthansa', flight: 'LH6001', from: 'FRA', to: 'MAD', depart: '10:15', arrive: '12:45', duration: '2h 30m', stops: 0, basePrice: 349 },
  { airline: 'Iberia', flight: 'IB3120', from: 'FRA', to: 'MAD', depart: '14:30', arrive: '17:00', duration: '2h 30m', stops: 0, basePrice: 319 },
  { airline: 'Lufthansa', flight: 'LH7001', from: 'FRA', to: 'AMS', depart: '07:00', arrive: '08:15', duration: '1h 15m', stops: 1, basePrice: 175 },
  { airline: 'KLM', flight: 'KL1771', from: 'FRA', to: 'AMS', depart: '11:30', arrive: '12:45', duration: '1h 15m', stops: 0, basePrice: 189 },
  { airline: 'Lufthansa', flight: 'LH8001', from: 'FRA', to: 'VIE', depart: '08:45', arrive: '09:55', duration: '1h 10m', stops: 0, basePrice: 219 },
  { airline: 'Austrian', flight: 'OS401', from: 'FRA', to: 'VIE', depart: '14:20', arrive: '15:30', duration: '1h 10m', stops: 0, basePrice: 199 },
  { airline: 'Lufthansa', flight: 'LH9001', from: 'FRA', to: 'ZRH', depart: '07:15', arrive: '08:10', duration: '55m', stops: 0, basePrice: 249 },
  { airline: 'Swiss', flight: 'LX1067', from: 'FRA', to: 'ZRH', depart: '12:45', arrive: '13:40', duration: '55m', stops: 0, basePrice: 239 },
  { airline: 'Lufthansa', flight: 'LH1101', from: 'BER', to: 'CDG', depart: '07:00', arrive: '09:00', duration: '2h 00m', stops: 0, basePrice: 239 },
  { airline: 'EasyJet', flight: 'U25001', from: 'BER', to: 'CDG', depart: '10:30', arrive: '12:30', duration: '2h 00m', stops: 1, basePrice: 61 },
  { airline: 'Ryanair', flight: 'FR1145', from: 'BER', to: 'STN', depart: '06:30', arrive: '07:40', duration: '2h 10m', stops: 0, basePrice: 39 },
  { airline: 'British Airways', flight: 'BA983', from: 'BER', to: 'LHR', depart: '11:15', arrive: '12:40', duration: '2h 25m', stops: 0, basePrice: 259 },
  { airline: 'Ryanair', flight: 'FR2521', from: 'BER', to: 'FCO', depart: '07:00', arrive: '09:15', duration: '2h 15m', stops: 0, basePrice: 49 },
  { airline: 'ITA Airways', flight: 'AZ420', from: 'BER', to: 'FCO', depart: '15:00', arrive: '17:15', duration: '2h 15m', stops: 0, basePrice: 229 },
  { airline: 'Ryanair', flight: 'FR2523', from: 'BER', to: 'MAD', depart: '08:30', arrive: '11:30', duration: '3h 00m', stops: 0, basePrice: 59 },
  { airline: 'Iberia', flight: 'IB3142', from: 'BER', to: 'MAD', depart: '13:45', arrive: '16:45', duration: '3h 00m', stops: 0, basePrice: 269 },
  { airline: 'KLM', flight: 'KL1830', from: 'BER', to: 'AMS', depart: '06:45', arrive: '08:15', duration: '1h 30m', stops: 1, basePrice: 166 },
  { airline: 'EasyJet', flight: 'U25501', from: 'BER', to: 'AMS', depart: '10:00', arrive: '11:30', duration: '1h 30m', stops: 0, basePrice: 59 },
  { airline: 'Lufthansa', flight: 'LH2220', from: 'MUC', to: 'CDG', depart: '07:30', arrive: '09:20', duration: '1h 50m', stops: 0, basePrice: 259 },
  { airline: 'Air France', flight: 'AF1123', from: 'MUC', to: 'CDG', depart: '12:00', arrive: '13:50', duration: '1h 50m', stops: 0, basePrice: 239 },
  { airline: 'Lufthansa', flight: 'LH3220', from: 'MUC', to: 'LHR', depart: '08:15', arrive: '09:30', duration: '2h 15m', stops: 0, basePrice: 289 },
  { airline: 'British Airways', flight: 'BA947', from: 'MUC', to: 'LHR', depart: '14:00', arrive: '15:15', duration: '2h 15m', stops: 0, basePrice: 269 },
  { airline: 'Lufthansa', flight: 'LH4220', from: 'MUC', to: 'FCO', depart: '09:30', arrive: '11:00', duration: '1h 30m', stops: 0, basePrice: 299 },
  { airline: 'ITA Airways', flight: 'AZ430', from: 'MUC', to: 'FCO', depart: '16:30', arrive: '18:00', duration: '1h 30m', stops: 1, basePrice: 237 },
  { airline: 'Lufthansa', flight: 'LH400', from: 'FRA', to: 'JFK', depart: '10:45', arrive: '13:50', duration: '9h 05m', stops: 0, basePrice: 649 },
  { airline: 'Lufthansa', flight: 'LH452', from: 'MUC', to: 'LAX', depart: '11:40', arrive: '14:30', duration: '11h 50m', stops: 0, basePrice: 749 },
  { airline: 'Lufthansa', flight: 'LH456', from: 'FRA', to: 'LAX', depart: '10:15', arrive: '13:00', duration: '11h 45m', stops: 0, basePrice: 719 },
  { airline: 'Emirates', flight: 'EK047', from: 'FRA', to: 'DXB', depart: '15:20', arrive: '00:05+1', duration: '6h 45m', stops: 0, basePrice: 549 },
  { airline: 'Emirates', flight: 'EK049', from: 'MUC', to: 'DXB', depart: '14:45', arrive: '23:30', duration: '6h 45m', stops: 0, basePrice: 529 },
  { airline: 'Qatar Airways', flight: 'QR068', from: 'FRA', to: 'DOH', depart: '16:00', arrive: '23:55', duration: '6h 55m', stops: 0, basePrice: 579 },
  { airline: 'Turkish Airlines', flight: 'TK1590', from: 'HAM', to: 'IST', depart: '11:30', arrive: '16:25', duration: '2h 55m', stops: 1, basePrice: 263 },
  { airline: 'Turkish Airlines', flight: 'TK1592', from: 'BER', to: 'IST', depart: '14:15', arrive: '19:10', duration: '2h 55m', stops: 0, basePrice: 279 },
  { airline: 'British Airways', flight: 'BA305', from: 'LHR', to: 'CDG', depart: '08:00', arrive: '10:20', duration: '1h 20m', stops: 0, basePrice: 219 },
  { airline: 'EasyJet', flight: 'U28215', from: 'LGW', to: 'CDG', depart: '11:30', arrive: '13:50', duration: '1h 20m', stops: 0, basePrice: 59 },
  { airline: 'British Airways', flight: 'BA609', from: 'LHR', to: 'FCO', depart: '09:45', arrive: '13:10', duration: '2h 25m', stops: 0, basePrice: 299 },
  { airline: 'Ryanair', flight: 'FR3013', from: 'STN', to: 'FCO', depart: '06:00', arrive: '09:30', duration: '2h 30m', stops: 0, basePrice: 39 },
  { airline: 'British Airways', flight: 'BA461', from: 'LHR', to: 'MAD', depart: '10:30', arrive: '14:00', duration: '2h 30m', stops: 0, basePrice: 319 },
  { airline: 'Iberia', flight: 'IB3162', from: 'LGW', to: 'MAD', depart: '13:15', arrive: '16:45', duration: '2h 30m', stops: 1, basePrice: 175 },
  { airline: 'KLM', flight: 'KL1000', from: 'LHR', to: 'AMS', depart: '07:30', arrive: '09:50', duration: '1h 20m', stops: 0, basePrice: 179 },
  { airline: 'EasyJet', flight: 'U28601', from: 'LGW', to: 'AMS', depart: '12:00', arrive: '14:20', duration: '1h 20m', stops: 0, basePrice: 49 },
  { airline: 'KLM', flight: 'KL1221', from: 'AMS', to: 'CDG', depart: '07:15', arrive: '08:35', duration: '1h 20m', stops: 0, basePrice: 189 },
  { airline: 'Air France', flight: 'AF1241', from: 'AMS', to: 'CDG', depart: '11:30', arrive: '12:50', duration: '1h 20m', stops: 0, basePrice: 179 },
  { airline: 'KLM', flight: 'KL1601', from: 'AMS', to: 'FCO', depart: '10:00', arrive: '12:30', duration: '2h 30m', stops: 0, basePrice: 249 },
  { airline: 'EasyJet', flight: 'U27801', from: 'AMS', to: 'FCO', depart: '14:15', arrive: '16:45', duration: '2h 30m', stops: 0, basePrice: 69 },
  { airline: 'KLM', flight: 'KL1701', from: 'AMS', to: 'MAD', depart: '09:30', arrive: '12:15', duration: '2h 45m', stops: 1, basePrice: 237 },
  { airline: 'KLM', flight: 'KL1835', from: 'AMS', to: 'BER', depart: '08:00', arrive: '09:20', duration: '1h 20m', stops: 0, basePrice: 169 },
  { airline: 'KLM', flight: 'KL1781', from: 'AMS', to: 'HAM', depart: '14:30', arrive: '15:40', duration: '1h 10m', stops: 0, basePrice: 149 },
  { airline: 'Air France', flight: 'AF1621', from: 'CDG', to: 'FRA', depart: '09:00', arrive: '10:20', duration: '1h 20m', stops: 0, basePrice: 249 },
  { airline: 'Lufthansa', flight: 'LH1023', from: 'CDG', to: 'FRA', depart: '14:30', arrive: '15:50', duration: '1h 20m', stops: 0, basePrice: 269 },
  { airline: 'Air France', flight: 'AF1660', from: 'CDG', to: 'FCO', depart: '10:15', arrive: '12:30', duration: '2h 15m', stops: 0, basePrice: 279 },
  { airline: 'EasyJet', flight: 'U24153', from: 'CDG', to: 'FCO', depart: '15:00', arrive: '17:15', duration: '2h 15m', stops: 0, basePrice: 59 },
  { airline: 'Air France', flight: 'AF1800', from: 'CDG', to: 'MAD', depart: '11:45', arrive: '14:00', duration: '2h 15m', stops: 1, basePrice: 263 },
  { airline: 'Air France', flight: 'AF1741', from: 'CDG', to: 'LHR', depart: '08:30', arrive: '08:50', duration: '1h 20m', stops: 0, basePrice: 239 },
  { airline: 'British Airways', flight: 'BA305', from: 'CDG', to: 'LHR', depart: '13:00', arrive: '13:20', duration: '1h 20m', stops: 0, basePrice: 229 },
  { airline: 'Lufthansa', flight: 'LH1027', from: 'HAM', to: 'CDG', depart: '07:10', arrive: '08:50', duration: '1h 40m', stops: 0, basePrice: 219 },
  { airline: 'Air France', flight: 'AF1411', from: 'HAM', to: 'CDG', depart: '11:40', arrive: '13:20', duration: '1h 40m', stops: 0, basePrice: 199 },
  { airline: 'Eurowings', flight: 'EW7210', from: 'HAM', to: 'CDG', depart: '17:25', arrive: '19:05', duration: '1h 40m', stops: 0, basePrice: 109 },
  { airline: 'Emirates', flight: 'EK061', from: 'HAM', to: 'DXB', depart: '14:35', arrive: '23:59', duration: '6h 24m', stops: 0, basePrice: 489 },
  { airline: 'Emirates', flight: 'EK063', from: 'HAM', to: 'DXB', depart: '21:05', arrive: '06:30+1', duration: '6h 25m', stops: 0, basePrice: 519 },
  { airline: 'Eurowings', flight: 'EW7580', from: 'HAM', to: 'PMI', depart: '06:10', arrive: '08:50', duration: '2h 40m', stops: 0, basePrice: 89 },
  { airline: 'Ryanair', flight: 'FR4521', from: 'HAM', to: 'PMI', depart: '10:20', arrive: '13:00', duration: '2h 40m', stops: 0, basePrice: 59 },
  { airline: 'Lufthansa', flight: 'LH2660', from: 'HAM', to: 'PMI', depart: '14:45', arrive: '17:25', duration: '2h 40m', stops: 0, basePrice: 179 },
  { airline: 'Lufthansa', flight: 'LH2012', from: 'HAM', to: 'LHR', depart: '07:55', arrive: '08:45', duration: '1h 50m', stops: 0, basePrice: 189 },
  { airline: 'British Airways', flight: 'BA965', from: 'HAM', to: 'LHR', depart: '18:10', arrive: '19:00', duration: '1h 50m', stops: 0, basePrice: 209 },
  { airline: 'KLM', flight: 'KL1776', from: 'HAM', to: 'AMS', depart: '06:45', arrive: '07:50', duration: '1h 05m', stops: 0, basePrice: 159 },
  { airline: 'Eurowings', flight: 'EW7110', from: 'HAM', to: 'AMS', depart: '13:15', arrive: '14:20', duration: '1h 05m', stops: 0, basePrice: 99 },
  { airline: 'Swiss', flight: 'LX1057', from: 'HAM', to: 'ZRH', depart: '09:30', arrive: '10:55', duration: '1h 25m', stops: 0, basePrice: 229 },
  { airline: 'Lufthansa', flight: 'LH1190', from: 'HAM', to: 'ZRH', depart: '16:05', arrive: '17:30', duration: '1h 25m', stops: 0, basePrice: 249 },
  { airline: 'Austrian', flight: 'OS172', from: 'HAM', to: 'VIE', depart: '08:20', arrive: '09:40', duration: '1h 20m', stops: 0, basePrice: 189 },
  { airline: 'Eurowings', flight: 'EW7360', from: 'HAM', to: 'VIE', depart: '15:35', arrive: '16:55', duration: '1h 20m', stops: 0, basePrice: 119 },
  { airline: 'SAS', flight: 'SK1648', from: 'HAM', to: 'CPH', depart: '08:50', arrive: '09:45', duration: '55m', stops: 0, basePrice: 139 },
  { airline: 'SAS', flight: 'SK1652', from: 'HAM', to: 'CPH', depart: '17:40', arrive: '18:35', duration: '55m', stops: 0, basePrice: 159 },
  { airline: 'Iberia', flight: 'IB3271', from: 'HAM', to: 'MAD', depart: '11:05', arrive: '14:10', duration: '3h 05m', stops: 0, basePrice: 229 },
  { airline: 'Eurowings', flight: 'EW7530', from: 'HAM', to: 'MAD', depart: '16:50', arrive: '19:55', duration: '3h 05m', stops: 0, basePrice: 149 },
  { airline: 'Lufthansa', flight: 'LH1900', from: 'HAM', to: 'FCO', depart: '10:15', arrive: '12:15', duration: '2h 00m', stops: 0, basePrice: 259 },
  { airline: 'ITA Airways', flight: 'AZ415', from: 'HAM', to: 'FCO', depart: '17:55', arrive: '19:55', duration: '2h 00m', stops: 0, basePrice: 239 },
  { airline: 'Vueling', flight: 'VY1821', from: 'HAM', to: 'BCN', depart: '12:25', arrive: '14:55', duration: '2h 30m', stops: 0, basePrice: 129 },
  { airline: 'Eurowings', flight: 'EW7520', from: 'HAM', to: 'BCN', depart: '18:40', arrive: '21:10', duration: '2h 30m', stops: 0, basePrice: 139 },
  { airline: 'Lufthansa', flight: 'LH402', from: 'HAM', to: 'JFK', depart: '11:05', arrive: '14:35', duration: '8h 30m', stops: 0, basePrice: 489 },
  { airline: 'United', flight: 'UA051', from: 'HAM', to: 'JFK', depart: '09:40', arrive: '12:50', duration: '8h 10m', stops: 0, basePrice: 529 },
  { airline: 'Qatar Airways', flight: 'QR090', from: 'HAM', to: 'DOH', depart: '17:10', arrive: '23:55', duration: '5h 45m', stops: 0, basePrice: 499 },
  { airline: 'Turkish Airlines', flight: 'TK1663', from: 'HAM', to: 'AYT', depart: '13:20', arrive: '18:05', duration: '3h 45m', stops: 0, basePrice: 259 },
  { airline: 'Eurowings', flight: 'EW7760', from: 'HAM', to: 'AGP', depart: '07:35', arrive: '11:05', duration: '3h 30m', stops: 0, basePrice: 159 },
  { airline: 'TAP Portugal', flight: 'TP561', from: 'HAM', to: 'LIS', depart: '10:55', arrive: '13:20', duration: '3h 25m', stops: 0, basePrice: 219 },
  { airline: 'Aegean', flight: 'A3501', from: 'HAM', to: 'ATH', depart: '11:45', arrive: '15:35', duration: '2h 50m', stops: 0, basePrice: 249 },
  { airline: 'LOT Polish', flight: 'LO402', from: 'HAM', to: 'WAW', depart: '12:10', arrive: '13:35', duration: '1h 25m', stops: 0, basePrice: 169 },
  { airline: 'Czech Airlines', flight: 'OK771', from: 'HAM', to: 'PRG', depart: '14:25', arrive: '15:40', duration: '1h 15m', stops: 0, basePrice: 149 },
  { airline: 'Lufthansa', flight: 'LH410', from: 'MUC', to: 'JFK', depart: '12:10', arrive: '15:35', duration: '8h 25m', stops: 0, basePrice: 659 },
  { airline: 'Emirates', flight: 'EK052', from: 'BER', to: 'DXB', depart: '15:40', arrive: '00:20+1', duration: '6h 40m', stops: 0, basePrice: 539 },
  { airline: 'Condor', flight: 'DE2201', from: 'DUS', to: 'DXB', depart: '13:55', arrive: '23:45', duration: '6h 50m', stops: 0, basePrice: 469 },
  { airline: 'Lufthansa', flight: 'LH716', from: 'FRA', to: 'BKK', depart: '22:05', arrive: '14:50+1', duration: '10h 45m', stops: 0, basePrice: 749 },
  { airline: 'Singapore Airlines', flight: 'SQ331', from: 'MUC', to: 'SIN', depart: '12:35', arrive: '07:10+1', duration: '12h 35m', stops: 0, basePrice: 829 },
  { airline: 'Lufthansa', flight: 'LH760', from: 'FRA', to: 'DEL', depart: '13:10', arrive: '00:45+1', duration: '7h 35m', stops: 0, basePrice: 589 },
  { airline: 'KLM', flight: 'KL601', from: 'AMS', to: 'LAX', depart: '10:20', arrive: '12:35', duration: '11h 15m', stops: 0, basePrice: 689 },
  { airline: 'Air France', flight: 'AF066', from: 'CDG', to: 'LAX', depart: '10:10', arrive: '12:50', duration: '11h 40m', stops: 0, basePrice: 719 },
  { airline: 'British Airways', flight: 'BA249', from: 'LHR', to: 'JFK', depart: '13:05', arrive: '16:25', duration: '8h 20m', stops: 0, basePrice: 549 },
  { airline: 'Lufthansa', flight: 'LH572', from: 'FRA', to: 'CPT', depart: '22:20', arrive: '11:05+1', duration: '11h 45m', stops: 0, basePrice: 899 },
  { airline: 'Turkish Airlines', flight: 'TK1761', from: 'IST', to: 'BKK', depart: '19:30', arrive: '08:15+1', duration: '9h 45m', stops: 0, basePrice: 599 },
  { airline: 'Eurowings', flight: 'EW9614', from: 'DUS', to: 'PMI', depart: '06:25', arrive: '08:55', duration: '2h 30m', stops: 0, basePrice: 99 },
  { airline: 'Ryanair', flight: 'FR2148', from: 'CGN', to: 'PMI', depart: '09:15', arrive: '11:45', duration: '2h 30m', stops: 0, basePrice: 69 },
  { airline: 'Lufthansa', flight: 'LH1150', from: 'STR', to: 'PMI', depart: '13:40', arrive: '15:55', duration: '2h 15m', stops: 0, basePrice: 189 },
];

/** "8h 30m" -> Minuten (für Sortierung) */
export function durationToMinutes(duration: string): number {
  const m = duration.match(/(\d+)h/)?.[1];
  const s = duration.match(/(\d+)m/)?.[1];
  return (m ? parseInt(m, 10) * 60 : 0) + (s ? parseInt(s, 10) : 0);
}

/** "06:30" -> Minuten seit Mitternacht (für Tageszeit-Filter) */
export function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map((x) => parseInt(x, 10));
  return h * 60 + (m || 0);
}

export function findFlights(from: string, to: string): Flight[] {
  const f = from.toUpperCase();
  const t = to.toUpperCase();
  return flights.filter((fl) => fl.from === f && fl.to === t);
}
