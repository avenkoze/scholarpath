// Scholarship photo mapping
// Uses picsum.photos with deterministic seeds — always loads, no auth, no CORS
// Same seed = same image every time

const PX = (seed: string) =>
  `https://picsum.photos/seed/${seed}/800/450`;

export const SCHOLARSHIP_PHOTOS: Record<string, string> = {
  // ── US ──────────────────────────────────────────────────────
  "fulbright-foreign-student":   PX("washington-dc-capitol"),
  "harvard-financial-aid":       PX("harvard-cambridge-ivy"),
  "stanford-knight-hennessy":    PX("stanford-california-sun"),
  "opendoors-us-scholarships":   PX("golden-gate-bridge"),

  // ── Germany ─────────────────────────────────────────────────
  "daad-helmut-schmidt":         PX("berlin-germany-city"),
  "daad-development-scholarship":PX("munich-germany-castle"),
  "humboldt-foundation":         PX("humboldt-berlin-uni"),
  "max-planck-imprs":            PX("max-planck-science"),

  // ── UK ──────────────────────────────────────────────────────
  "chevening":                   PX("london-parliament"),
  "gates-cambridge":             PX("cambridge-kings-college"),
  "oxford-clarendon":            PX("oxford-radcliffe"),
  "rhodes-scholarship":          PX("oxford-bodleian"),
  "commonwealth-scholarship":    PX("london-tower-bridge"),

  // ── EU / Europe ─────────────────────────────────────────────
  "erasmus-mundus":              PX("european-parliament-strasbourg"),
  "eiffel-excellence-france":    PX("paris-eiffel-tower"),
  "visegrad-scholarship":        PX("prague-castle-view"),
  "banach-programme-poland":     PX("krakow-main-square"),
  "norway-quota-scheme":         PX("norway-fjord-geiranger"),
  "finland-aim-scholarship":     PX("helsinki-cathedral-square"),

  // ── Switzerland ─────────────────────────────────────────────
  "swiss-government-excellence": PX("switzerland-matterhorn"),
  "eth-zurich-excellence":       PX("zurich-eth-main"),
  "epfl-excellence-fellowship":  PX("lausanne-epfl-campus"),

  // ── Netherlands ─────────────────────────────────────────────
  "tu-delft-excellence":         PX("delft-netherlands-canal"),
  "leiden-excellence":           PX("leiden-university-old"),
  "wur-scholarship":             PX("wageningen-greenhouses"),
  "nuffic-orange":               PX("amsterdam-herengracht"),

  // ── Belgium ─────────────────────────────────────────────────
  "ku-leuven-scholarship":       PX("leuven-belgium-gothic"),

  // ── Italy ───────────────────────────────────────────────────
  "bologna-unibo-scholarship":   PX("bologna-italy-arches"),

  // ── Sweden ──────────────────────────────────────────────────
  "swedish-institute":           PX("stockholm-city-hall"),

  // ── Hungary ─────────────────────────────────────────────────
  "stipendium-hungaricum":       PX("budapest-parliament"),

  // ── Turkey ──────────────────────────────────────────────────
  "turkiye-burslari":            PX("istanbul-hagia-sophia"),

  // ── Japan ───────────────────────────────────────────────────
  "japanese-mext":               PX("japan-mount-fuji"),

  // ── South Korea ─────────────────────────────────────────────
  "korean-gks":                  PX("seoul-gyeongbokgung"),
  "global-korea-topik":          PX("seoul-namsan-tower"),

  // ── China ───────────────────────────────────────────────────
  "chinese-government-csc":      PX("china-great-wall"),

  // ── Taiwan ──────────────────────────────────────────────────
  "taiwan-icdf":                 PX("taipei-101-skyline"),

  // ── Australia ───────────────────────────────────────────────
  "australia-awards":            PX("sydney-opera-house"),

  // ── Canada ──────────────────────────────────────────────────
  "vanier-canada":               PX("toronto-skyline-cn"),

  // ── New Zealand ─────────────────────────────────────────────
  "new-zealand-manaaki":         PX("milford-sound-nz"),

  // ── Singapore ───────────────────────────────────────────────
  "nus-research-scholarship":    PX("singapore-marina-bay"),

  // ── Saudi Arabia ────────────────────────────────────────────
  "kaust-fellowship":            PX("kaust-saudi-campus"),

  // ── Russia ──────────────────────────────────────────────────
  "russian-government-scholarship": PX("moscow-red-square"),

  // ── Multi / International ────────────────────────────────────
  "mastercard-foundation":       PX("africa-makerere-campus"),
  "aga-khan":                    PX("aga-khan-university"),
  "rotary-peace-fellowship":     PX("united-nations-nyc"),
  "isdb-scholarship":            PX("jeddah-islamic-bank"),
  "ofid-scholarship":            PX("vienna-international"),
  "latin-america-oas":           PX("washington-oas-building"),
  "african-union-scholarship":   PX("addis-ababa-au-center"),
};

export function getScholarshipImage(id: string, _countryCode: string): string {
  return SCHOLARSHIP_PHOTOS[id] || PX(id);
}

// Accent gradient colors per tag for fallback backgrounds
export const TAG_GRADIENT: Record<string, string> = {
  green:  "linear-gradient(135deg,#052e16 0%,#0a0a0e 100%)",
  yellow: "linear-gradient(135deg,#1c1007 0%,#0a0a0e 100%)",
  purple: "linear-gradient(135deg,#1e0a2e 0%,#0a0a0e 100%)",
  blue:   "linear-gradient(135deg,#071020 0%,#0a0a0e 100%)",
  red:    "linear-gradient(135deg,#1c0505 0%,#0a0a0e 100%)",
};
