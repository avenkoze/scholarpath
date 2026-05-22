// Scholarship photo mapping
// Direct Unsplash CDN URLs — no redirect, no auth, always loads
// Format: https://images.unsplash.com/photo-{ID}?w=800&q=70&auto=format&fit=crop

const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=800&q=70&auto=format&fit=crop`;

export const SCHOLARSHIP_PHOTOS: Record<string, string> = {
  // ── US ──────────────────────────────────────────────────────
  "fulbright-foreign-student":      U("1501594907352-04cda38ebc29"), // Capitol building
  "harvard-financial-aid":          U("1562774053-701939374585-abe8a31fd31e"), // Harvard
  "stanford-knight-hennessy":       U("1541339907198-e08756dedf3f"), // Stanford
  "opendoors-us-scholarships":      U("1449824913935-59a10b8d2000"), // Golden Gate

  // ── Germany ─────────────────────────────────────────────────
  "daad-helmut-schmidt":            U("1560969184-10fe8719e047"), // Berlin
  "daad-development-scholarship":   U("1467269204165-bdbdd2d21ea8"), // Munich
  "humboldt-foundation":            U("1610016302534-6f67f1c968d8"), // university
  "max-planck-imprs":               U("1507003211169-0a1dd7228f2d"), // science

  // ── UK ──────────────────────────────────────────────────────
  "chevening":                      U("1513635269975-59663e0ac1ad"), // London
  "gates-cambridge":                U("1546500840-8e3a76a6e2a1"), // Cambridge
  "oxford-clarendon":               U("1548943487-a2e4e43b4853"), // Oxford
  "rhodes-scholarship":             U("1565689157206-0fddef7589a2"), // Oxford 2
  "commonwealth-scholarship":       U("1529655683826-aba9b3e77383"), // Tower Bridge

  // ── EU / Europe ─────────────────────────────────────────────
  "erasmus-mundus":                 U("1491557345352-5929e343eb89"), // European city
  "eiffel-excellence-france":       U("1502602898657-3e91760cbb34"), // Paris
  "visegrad-scholarship":           U("1541849546-216549ae216d"), // Prague
  "banach-programme-poland":        U("1544985361-8a54f009a2df"), // Krakow
  "norway-quota-scheme":            U("1506905925346-21bda4d32df4"), // Norway fjord
  "finland-aim-scholarship":        U("1538964173425-93884d739596"), // Helsinki

  // ── Switzerland ─────────────────────────────────────────────
  "swiss-government-excellence":    U("1531366936337-7c912a4589a7"), // Matterhorn
  "eth-zurich-excellence":          U("1517373116369-9bdb8cdc9f62"), // Zurich
  "epfl-excellence-fellowship":     U("1527856263669-12957942a823"), // Lausanne lake

  // ── Netherlands ─────────────────────────────────────────────
  "tu-delft-excellence":            U("1558618666-fcd25c85cd64"), // Amsterdam canal
  "leiden-excellence":              U("1547995886-6dc09384c6e6"), // Netherlands
  "wur-scholarship":                U("1416879595882-3373a0480b5b"), // greenhouse
  "nuffic-orange":                  U("1534351590666-13e3e96b5017"), // Amsterdam

  // ── Belgium ─────────────────────────────────────────────────
  "ku-leuven-scholarship":          U("1491557345352-5929e343eb89"), // Belgium gothic

  // ── Italy ───────────────────────────────────────────────────
  "bologna-unibo-scholarship":      U("1555993539-1732b0258235"), // Bologna arches

  // ── Sweden ──────────────────────────────────────────────────
  "swedish-institute":              U("1509356843962-782fa5a10319"), // Stockholm

  // ── Hungary ─────────────────────────────────────────────────
  "stipendium-hungaricum":          U("1551867393-e54e7a3a5438"), // Budapest parliament

  // ── Turkey ──────────────────────────────────────────────────
  "turkiye-burslari":               U("1524231757912-21f4fe3a7200"), // Hagia Sophia

  // ── Japan ───────────────────────────────────────────────────
  "japanese-mext":                  U("1526481280693-3bfa7568e0f3"), // Mt Fuji

  // ── South Korea ─────────────────────────────────────────────
  "korean-gks":                     U("1548115184-bc6544d06a58"), // Seoul
  "global-korea-topik":             U("1517154421773-0855345429cd"), // Seoul night

  // ── China ───────────────────────────────────────────────────
  "chinese-government-csc":         U("1508804185872-d7badad33f7d"), // Great Wall

  // ── Taiwan ──────────────────────────────────────────────────
  "taiwan-icdf":                    U("1470004914212-05527e49370b"), // Taipei 101

  // ── Australia ───────────────────────────────────────────────
  "australia-awards":               U("1506973035872-a4ec16b8e8d6"), // Sydney

  // ── Canada ──────────────────────────────────────────────────
  "vanier-canada":                  U("1476041776947-dd8db10e7a58"), // Toronto CN Tower

  // ── New Zealand ─────────────────────────────────────────────
  "new-zealand-manaaki":            U("1507699622278-c7d9e659e4c8"), // Milford Sound

  // ── Singapore ───────────────────────────────────────────────
  "nus-research-scholarship":       U("1525625293386-ccfb5f3e2b5a"), // Singapore

  // ── Saudi Arabia ────────────────────────────────────────────
  "kaust-fellowship":               U("1586724237569-f3d0c1dee8c6"), // Saudi / modern

  // ── Russia ──────────────────────────────────────────────────
  "russian-government-scholarship": U("1513326738677-b964603b136d"), // Red Square

  // ── Multi / International ────────────────────────────────────
  "mastercard-foundation":          U("1521295121783-8a321d551ad2"), // Africa campus
  "aga-khan":                       U("1557804506-d7a84b4a0f24"), // university
  "rotary-peace-fellowship":        U("1551038247-3d9af20df552"), // UN building
  "isdb-scholarship":               U("1586724237569-f3d0c1dee8c6"), // Jeddah
  "ofid-scholarship":               U("1467269204165-bdbdd2d21ea8"), // Vienna
  "latin-america-oas":              U("1501594907352-04cda38ebc29"), // Washington
  "african-union-scholarship":      U("1580746738099-3dc3f4e18dfc"), // Africa

};

export function getScholarshipImage(id: string, _countryCode: string): string {
  return SCHOLARSHIP_PHOTOS[id] || U("1541339907198-e08756dedf3f"); // fallback: university
}

// Accent gradient colors per tag for fallback backgrounds
export const TAG_GRADIENT: Record<string, string> = {
  green:  "linear-gradient(135deg,#052e16 0%,#0a0a0e 100%)",
  yellow: "linear-gradient(135deg,#1c1007 0%,#0a0a0e 100%)",
  purple: "linear-gradient(135deg,#1e0a2e 0%,#0a0a0e 100%)",
  blue:   "linear-gradient(135deg,#071020 0%,#0a0a0e 100%)",
  red:    "linear-gradient(135deg,#1c0505 0%,#0a0a0e 100%)",
};
