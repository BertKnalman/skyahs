/**
 * Flughafen-Verzeichnis — konvertiert aus skyahs-php/includes/airports.php
 * (dedupliziert nach IATA-Code, 174 Einträge)
 */
export interface Airport {
  code: string;
  city: string;
  country: string;
  name: string;
}

export const airports: Airport[] = [
  { code: 'HAM', city: 'Hamburg', country: 'Deutschland', name: 'Hamburg' },
  { code: 'FRA', city: 'Frankfurt', country: 'Deutschland', name: 'Frankfurt am Main' },
  { code: 'MUC', city: 'München', country: 'Deutschland', name: 'München' },
  { code: 'BER', city: 'Berlin', country: 'Deutschland', name: 'Berlin Brandenburg' },
  { code: 'DUS', city: 'Düsseldorf', country: 'Deutschland', name: 'Düsseldorf' },
  { code: 'CGN', city: 'Köln', country: 'Deutschland', name: 'Köln/Bonn' },
  { code: 'STR', city: 'Stuttgart', country: 'Deutschland', name: 'Stuttgart' },
  { code: 'NUE', city: 'Nürnberg', country: 'Deutschland', name: 'Nürnberg' },
  { code: 'HAJ', city: 'Hannover', country: 'Deutschland', name: 'Hannover' },
  { code: 'BRE', city: 'Bremen', country: 'Deutschland', name: 'Bremen' },
  { code: 'DTM', city: 'Dortmund', country: 'Deutschland', name: 'Dortmund' },
  { code: 'DRS', city: 'Dresden', country: 'Deutschland', name: 'Dresden' },
  { code: 'LEJ', city: 'Leipzig', country: 'Deutschland', name: 'Leipzig/Halle' },
  { code: 'FMO', city: 'Münster', country: 'Deutschland', name: 'Münster/Osnabrück' },
  { code: 'FDH', city: 'Friedrichshafen', country: 'Deutschland', name: 'Friedrichshafen' },
  { code: 'PAD', city: 'Paderborn', country: 'Deutschland', name: 'Paderborn/Lippstadt' },
  { code: 'RLG', city: 'Rostock', country: 'Deutschland', name: 'Rostock-Laage' },
  { code: 'KSF', city: 'Kassel', country: 'Deutschland', name: 'Kassel' },
  { code: 'HDF', city: 'Heringsdorf', country: 'Deutschland', name: 'Heringsdorf' },
  { code: 'MHG', city: 'Mannheim', country: 'Deutschland', name: 'Mannheim' },
  { code: 'VIE', city: 'Wien', country: 'Österreich', name: 'Wien-Schwechat' },
  { code: 'SZG', city: 'Salzburg', country: 'Österreich', name: 'Salzburg' },
  { code: 'INN', city: 'Innsbruck', country: 'Österreich', name: 'Innsbruck' },
  { code: 'GRZ', city: 'Graz', country: 'Österreich', name: 'Graz' },
  { code: 'KLU', city: 'Klagenfurt', country: 'Österreich', name: 'Klagenfurt' },
  { code: 'LNZ', city: 'Linz', country: 'Österreich', name: 'Linz' },
  { code: 'ZRH', city: 'Zürich', country: 'Schweiz', name: 'Zürich' },
  { code: 'GVA', city: 'Genf', country: 'Schweiz', name: 'Genf' },
  { code: 'BSL', city: 'Basel', country: 'Schweiz', name: 'Basel/Mülhausen' },
  { code: 'BRN', city: 'Bern', country: 'Schweiz', name: 'Bern' },
  { code: 'LUG', city: 'Lugano', country: 'Schweiz', name: 'Lugano' },
  { code: 'AMS', city: 'Amsterdam', country: 'Niederlande', name: 'Amsterdam Schiphol' },
  { code: 'RTM', city: 'Rotterdam', country: 'Niederlande', name: 'Rotterdam' },
  { code: 'EIN', city: 'Eindhoven', country: 'Niederlande', name: 'Eindhoven' },
  { code: 'GRQ', city: 'Groningen', country: 'Niederlande', name: 'Groningen' },
  { code: 'MST', city: 'Maastricht', country: 'Niederlande', name: 'Maastricht' },
  { code: 'BRU', city: 'Brüssel', country: 'Belgien', name: 'Brüssel-Zaventem' },
  { code: 'CRL', city: 'Charleroi', country: 'Belgien', name: 'Brüssel-Charleroi' },
  { code: 'ANR', city: 'Antwerpen', country: 'Belgien', name: 'Antwerpen' },
  { code: 'LGG', city: 'Lüttich', country: 'Belgien', name: 'Lüttich' },
  { code: 'CDG', city: 'Paris', country: 'Frankreich', name: 'Paris Charles de Gaulle' },
  { code: 'ORY', city: 'Paris', country: 'Frankreich', name: 'Paris Orly' },
  { code: 'BVA', city: 'Paris', country: 'Frankreich', name: 'Paris Beauvais' },
  { code: 'NCE', city: 'Nizza', country: 'Frankreich', name: 'Nizza' },
  { code: 'LYS', city: 'Lyon', country: 'Frankreich', name: 'Lyon' },
  { code: 'MRS', city: 'Marseille', country: 'Frankreich', name: 'Marseille' },
  { code: 'TLS', city: 'Toulouse', country: 'Frankreich', name: 'Toulouse' },
  { code: 'BOD', city: 'Bordeaux', country: 'Frankreich', name: 'Bordeaux' },
  { code: 'NTE', city: 'Nantes', country: 'Frankreich', name: 'Nantes' },
  { code: 'LIL', city: 'Lille', country: 'Frankreich', name: 'Lille' },
  { code: 'PPT', city: 'Papeete', country: 'Frankreich', name: 'Tahiti' },
  { code: 'RUN', city: 'Réunion', country: 'Frankreich', name: 'La Réunion' },
  { code: 'AJA', city: 'Ajaccio', country: 'Frankreich', name: 'Ajaccio (Korsika)' },
  { code: 'BIA', city: 'Bastia', country: 'Frankreich', name: 'Bastia (Korsika)' },
  { code: 'LHR', city: 'London', country: 'Vereinigtes Königreich', name: 'London Heathrow' },
  { code: 'LGW', city: 'London', country: 'Vereinigtes Königreich', name: 'London Gatwick' },
  { code: 'STN', city: 'London', country: 'Vereinigtes Königreich', name: 'London Stansted' },
  { code: 'MAN', city: 'Manchester', country: 'Vereinigtes Königreich', name: 'Manchester' },
  { code: 'EDI', city: 'Edinburgh', country: 'Vereinigtes Königreich', name: 'Edinburgh' },
  { code: 'BHX', city: 'Birmingham', country: 'Vereinigtes Königreich', name: 'Birmingham' },
  { code: 'GLA', city: 'Glasgow', country: 'Vereinigtes Königreich', name: 'Glasgow' },
  { code: 'BRS', city: 'Bristol', country: 'Vereinigtes Königreich', name: 'Bristol' },
  { code: 'NCL', city: 'Newcastle', country: 'Vereinigtes Königreich', name: 'Newcastle' },
  { code: 'LPL', city: 'Liverpool', country: 'Vereinigtes Königreich', name: 'Liverpool' },
  { code: 'DUB', city: 'Dublin', country: 'Irland', name: 'Dublin' },
  { code: 'ORK', city: 'Cork', country: 'Irland', name: 'Cork' },
  { code: 'FCO', city: 'Rom', country: 'Italien', name: 'Rom Fiumicino' },
  { code: 'CIA', city: 'Rom', country: 'Italien', name: 'Rom Ciampino' },
  { code: 'MXP', city: 'Mailand', country: 'Italien', name: 'Mailand Malpensa' },
  { code: 'LIN', city: 'Mailand', country: 'Italien', name: 'Mailand Linate' },
  { code: 'VCE', city: 'Venedig', country: 'Italien', name: 'Venedig' },
  { code: 'BLQ', city: 'Bologna', country: 'Italien', name: 'Bologna' },
  { code: 'NAP', city: 'Neapel', country: 'Italien', name: 'Neapel' },
  { code: 'CTA', city: 'Catania', country: 'Italien', name: 'Catania (Sizilien)' },
  { code: 'PMO', city: 'Palermo', country: 'Italien', name: 'Palermo (Sizilien)' },
  { code: 'FLR', city: 'Florenz', country: 'Italien', name: 'Florenz' },
  { code: 'PSA', city: 'Pisa', country: 'Italien', name: 'Pisa' },
  { code: 'BRI', city: 'Bari', country: 'Italien', name: 'Bari' },
  { code: 'MAD', city: 'Madrid', country: 'Spanien', name: 'Madrid Barajas' },
  { code: 'BCN', city: 'Barcelona', country: 'Spanien', name: 'Barcelona' },
  { code: 'AGP', city: 'Málaga', country: 'Spanien', name: 'Málaga' },
  { code: 'ALC', city: 'Alicante', country: 'Spanien', name: 'Alicante' },
  { code: 'PMI', city: 'Palma de Mallorca', country: 'Spanien', name: 'Palma de Mallorca' },
  { code: 'IBZ', city: 'Ibiza', country: 'Spanien', name: 'Ibiza' },
  { code: 'TFS', city: 'Teneriffa', country: 'Spanien', name: 'Teneriffa Süd' },
  { code: 'LPA', city: 'Gran Canaria', country: 'Spanien', name: 'Gran Canaria' },
  { code: 'VLC', city: 'Valencia', country: 'Spanien', name: 'Valencia' },
  { code: 'LIS', city: 'Lissabon', country: 'Portugal', name: 'Lissabon' },
  { code: 'OPO', city: 'Porto', country: 'Portugal', name: 'Porto' },
  { code: 'CPH', city: 'Kopenhagen', country: 'Dänemark', name: 'Kopenhagen' },
  { code: 'BLL', city: 'Billund', country: 'Dänemark', name: 'Billund' },
  { code: 'ARN', city: 'Stockholm', country: 'Schweden', name: 'Stockholm Arlanda' },
  { code: 'GOT', city: 'Göteborg', country: 'Schweden', name: 'Göteborg' },
  { code: 'OSL', city: 'Oslo', country: 'Norwegen', name: 'Oslo' },
  { code: 'BGO', city: 'Bergen', country: 'Norwegen', name: 'Bergen' },
  { code: 'HEL', city: 'Helsinki', country: 'Finnland', name: 'Helsinki' },
  { code: 'RVN', city: 'Rovaniemi', country: 'Finnland', name: 'Rovaniemi' },
  { code: 'KEF', city: 'Reykjavik', country: 'Island', name: 'Keflavik' },
  { code: 'TRD', city: 'Trondheim', country: 'Norwegen', name: 'Trondheim' },
  { code: 'SVG', city: 'Stavanger', country: 'Norwegen', name: 'Stavanger' },
  { code: 'MMX', city: 'Malmö', country: 'Schweden', name: 'Malmö' },
  { code: 'PRG', city: 'Prag', country: 'Tschechien', name: 'Prag' },
  { code: 'WAW', city: 'Warschau', country: 'Polen', name: 'Warschau' },
  { code: 'KRK', city: 'Krakau', country: 'Polen', name: 'Krakau' },
  { code: 'GDN', city: 'Danzig', country: 'Polen', name: 'Danzig' },
  { code: 'BUD', city: 'Budapest', country: 'Ungarn', name: 'Budapest' },
  { code: 'OTP', city: 'Bukarest', country: 'Rumänien', name: 'Bukarest' },
  { code: 'SOF', city: 'Sofia', country: 'Bulgarien', name: 'Sofia' },
  { code: 'ZAG', city: 'Zagreb', country: 'Kroatien', name: 'Zagreb' },
  { code: 'SPU', city: 'Split', country: 'Kroatien', name: 'Split' },
  { code: 'DBV', city: 'Dubrovnik', country: 'Kroatien', name: 'Dubrovnik' },
  { code: 'BEG', city: 'Belgrad', country: 'Serbien', name: 'Belgrad' },
  { code: 'TGD', city: 'Podgorica', country: 'Montenegro', name: 'Podgorica' },
  { code: 'TIA', city: 'Tirana', country: 'Albanien', name: 'Tirana' },
  { code: 'SKP', city: 'Skopje', country: 'Nordmazedonien', name: 'Skopje' },
  { code: 'TLL', city: 'Tallinn', country: 'Estland', name: 'Tallinn' },
  { code: 'RIX', city: 'Riga', country: 'Lettland', name: 'Riga' },
  { code: 'VNO', city: 'Vilnius', country: 'Litauen', name: 'Vilnius' },
  { code: 'ATH', city: 'Athen', country: 'Griechenland', name: 'Athen' },
  { code: 'SKG', city: 'Thessaloniki', country: 'Griechenland', name: 'Thessaloniki' },
  { code: 'HER', city: 'Heraklion', country: 'Griechenland', name: 'Heraklion (Kreta)' },
  { code: 'MLA', city: 'Valletta', country: 'Malta', name: 'Malta' },
  { code: 'LCA', city: 'Larnaka', country: 'Zypern', name: 'Larnaka' },
  { code: 'PFO', city: 'Paphos', country: 'Zypern', name: 'Paphos' },
  { code: 'TLV', city: 'Tel Aviv', country: 'Israel', name: 'Tel Aviv' },
  { code: 'IST', city: 'Istanbul', country: 'Türkei', name: 'Istanbul' },
  { code: 'SAW', city: 'Istanbul', country: 'Türkei', name: 'Istanbul Sabiha' },
  { code: 'AYT', city: 'Antalya', country: 'Türkei', name: 'Antalya' },
  { code: 'DLM', city: 'Dalaman', country: 'Türkei', name: 'Dalaman' },
  { code: 'ESB', city: 'Ankara', country: 'Türkei', name: 'Ankara' },
  { code: 'BJV', city: 'Bodrum', country: 'Türkei', name: 'Bodrum' },
  { code: 'JFK', city: 'New York', country: 'USA', name: 'New York JFK' },
  { code: 'EWR', city: 'New York', country: 'USA', name: 'New York Newark' },
  { code: 'LAX', city: 'Los Angeles', country: 'USA', name: 'Los Angeles' },
  { code: 'MIA', city: 'Miami', country: 'USA', name: 'Miami' },
  { code: 'ORD', city: 'Chicago', country: 'USA', name: 'Chicago' },
  { code: 'SFO', city: 'San Francisco', country: 'USA', name: 'San Francisco' },
  { code: 'LAS', city: 'Las Vegas', country: 'USA', name: 'Las Vegas' },
  { code: 'DXB', city: 'Dubai', country: 'VAE', name: 'Dubai' },
  { code: 'AUH', city: 'Abu Dhabi', country: 'VAE', name: 'Abu Dhabi' },
  { code: 'DOH', city: 'Doha', country: 'Katar', name: 'Doha Hamad' },
  { code: 'RUH', city: 'Riad', country: 'Saudi-Arabien', name: 'Riad' },
  { code: 'JED', city: 'Jeddah', country: 'Saudi-Arabien', name: 'Jeddah' },
  { code: 'BAH', city: 'Manama', country: 'Bahrain', name: 'Bahrain' },
  { code: 'KWI', city: 'Kuwait', country: 'Kuwait', name: 'Kuwait' },
  { code: 'MCT', city: 'Maskat', country: 'Oman', name: 'Maskat' },
  { code: 'AMM', city: 'Amman', country: 'Jordanien', name: 'Amman' },
  { code: 'BEY', city: 'Beirut', country: 'Libanon', name: 'Beirut' },
  { code: 'CAI', city: 'Kairo', country: 'Ägypten', name: 'Kairo' },
  { code: 'HRG', city: 'Hurghada', country: 'Ägypten', name: 'Hurghada' },
  { code: 'SSH', city: 'Sharm el-Sheikh', country: 'Ägypten', name: 'Sharm el-Sheikh' },
  { code: 'NBO', city: 'Nairobi', country: 'Kenia', name: 'Nairobi' },
  { code: 'CPT', city: 'Kapstadt', country: 'Südafrika', name: 'Kapstadt' },
  { code: 'JNB', city: 'Johannesburg', country: 'Südafrika', name: 'Johannesburg' },
  { code: 'BKK', city: 'Bangkok', country: 'Thailand', name: 'Bangkok' },
  { code: 'HKT', city: 'Phuket', country: 'Thailand', name: 'Phuket' },
  { code: 'SIN', city: 'Singapur', country: 'Singapur', name: 'Singapur' },
  { code: 'KUL', city: 'Kuala Lumpur', country: 'Malaysia', name: 'Kuala Lumpur' },
  { code: 'HKG', city: 'Hongkong', country: 'Hongkong', name: 'Hongkong' },
  { code: 'NRT', city: 'Tokio', country: 'Japan', name: 'Tokio Narita' },
  { code: 'HND', city: 'Tokio', country: 'Japan', name: 'Tokio Haneda' },
  { code: 'ICN', city: 'Seoul', country: 'Südkorea', name: 'Seoul Incheon' },
  { code: 'PVG', city: 'Shanghai', country: 'China', name: 'Shanghai Pudong' },
  { code: 'PEK', city: 'Peking', country: 'China', name: 'Peking' },
  { code: 'BOM', city: 'Mumbai', country: 'Indien', name: 'Mumbai' },
  { code: 'DEL', city: 'Delhi', country: 'Indien', name: 'Delhi' },
  { code: 'SYD', city: 'Sydney', country: 'Australien', name: 'Sydney' },
  { code: 'MEL', city: 'Melbourne', country: 'Australien', name: 'Melbourne' },
  { code: 'GRU', city: 'São Paulo', country: 'Brasilien', name: 'São Paulo' },
  { code: 'EZE', city: 'Buenos Aires', country: 'Argentinien', name: 'Buenos Aires' },
  { code: 'SJO', city: 'San José', country: 'Costa Rica', name: 'San José' },
  { code: 'CUN', city: 'Cancún', country: 'Mexiko', name: 'Cancún' },
  { code: 'MEX', city: 'Mexiko-Stadt', country: 'Mexiko', name: 'Mexiko-Stadt' },
  { code: 'SXB', city: 'Straßburg', country: 'Frankreich', name: 'Straßburg' },
];

export const airportByCode: Record<string, Airport> = Object.fromEntries(
  airports.map((a) => [a.code, a]),
);

export function getAirport(code: string): Airport | undefined {
  return airportByCode[code.toUpperCase()];
}

/** Meistgenutzte Abflughäfen — werden im Autocomplete bei Fokus gezeigt */
export const POPULAR_AIRPORT_CODES: string[] = ["HAM", "FRA", "MUC", "BER", "DUS", "CGN", "STR", "HAJ", "VIE", "ZRH", "AMS", "BRU", "CDG", "LHR", "FCO", "MAD", "BCN", "PMI", "CPH", "IST", "DXB", "JFK"];

/** Suche über Stadt, Code, Name und Land (case-insensitive) */
export function searchAirports(query: string, limit = 8): Airport[] {
  const q = query.trim().toLowerCase();
  if (!q) {
    return POPULAR_AIRPORT_CODES.map((c) => airportByCode[c]).filter(Boolean);
  }
  const scored: { a: Airport; s: number }[] = [];
  for (const a of airports) {
    const code = a.code.toLowerCase();
    const city = a.city.toLowerCase();
    const name = a.name.toLowerCase();
    const country = a.country.toLowerCase();
    let s = -1;
    if (code === q) s = 100;
    else if (code.startsWith(q)) s = 90;
    else if (city === q) s = 80;
    else if (city.startsWith(q)) s = 70;
    else if (name.startsWith(q)) s = 60;
    else if (city.includes(q) || name.includes(q)) s = 40;
    else if (country.startsWith(q)) s = 20;
    if (s >= 0) scored.push({ a, s });
  }
  scored.sort((x, y) => y.s - x.s);
  return scored.slice(0, limit).map((x) => x.a);
}
