// Scholarship photo mapping - verified direct upload.wikimedia.org URLs
// Thumbnail format: /thumb/{hash1}/{hash2}/{filename}/{width}px-{filename}

const WP = (path: string, filename: string, w = 800) =>
  `https://upload.wikimedia.org/wikipedia/commons/thumb/${path}/${w}px-${filename}`;

// Picsum fallback for unverified ones - consistent beautiful photos
const PX = (seed: string) =>
  `https://picsum.photos/seed/${seed}/800/450`;

export const SCHOLARSHIP_PHOTOS: Record<string, string> = {

  // ── United States ────────────────────────────────────────────
  "fulbright-foreign-student":
    WP("b/bf/Golden_Gate_Bridge_as_seen_from_Battery_East.jpg",
       "Golden_Gate_Bridge_as_seen_from_Battery_East.jpg"),
  "harvard-financial-aid":
    PX("harvard-campus"),
  "stanford-knight-hennessy":
    PX("stanford-campus"),
  "opendoors-us-scholarships":
    WP("b/bf/Golden_Gate_Bridge_as_seen_from_Battery_East.jpg",
       "Golden_Gate_Bridge_as_seen_from_Battery_East.jpg"),

  // ── Germany ──────────────────────────────────────────────────
  "daad-helmut-schmidt":
    WP("4/48/Berlin_Brandenburg_Gate.JPG",
       "Berlin_Brandenburg_Gate.JPG"),
  "daad-development-scholarship":
    WP("4/48/Berlin_Brandenburg_Gate.JPG",
       "Berlin_Brandenburg_Gate.JPG"),
  "humboldt-foundation":
    PX("humboldt-berlin"),
  "max-planck-imprs":
    PX("max-planck-munich"),

  // ── United Kingdom ───────────────────────────────────────────
  "chevening":
    PX("london-parliament"),
  "gates-cambridge":
    WP("b/be/Kings_College_Chapel%2C_Cambridge%2C_July_2010_%2803%29.JPG",
       "Kings_College_Chapel%2C_Cambridge%2C_July_2010_%2803%29.JPG"),
  "oxford-clarendon":
    WP("2/2b/Radcliffe_Camera%2C_Oxford_-_Oct_2006.jpg",
       "Radcliffe_Camera%2C_Oxford_-_Oct_2006.jpg"),
  "rhodes-scholarship":
    WP("2/2b/Radcliffe_Camera%2C_Oxford_-_Oct_2006.jpg",
       "Radcliffe_Camera%2C_Oxford_-_Oct_2006.jpg"),
  "commonwealth-scholarship":
    PX("london-tower-bridge"),

  // ── Europe / EU ──────────────────────────────────────────────
  "erasmus-mundus":
    PX("european-parliament"),
  "eiffel-excellence-france":
    WP("a/a8/Tour_Eiffel_Wikimedia_Commons.jpg",
       "Tour_Eiffel_Wikimedia_Commons.jpg"),
  "visegrad-scholarship":
    PX("prague-castle"),
  "banach-programme-poland":
    PX("krakow-poland"),
  "norway-quota-scheme":
    PX("norway-fjord"),
  "finland-aim-scholarship":
    PX("helsinki-finland"),

  // ── Switzerland ──────────────────────────────────────────────
  "swiss-government-excellence":
    PX("matterhorn-swiss"),
  "eth-zurich-excellence":
    WP("8/84/Eidgen%C3%B6ssische_Technische_Hochschule_%28ETH%29%2C_main_building_Z%C3%BCrich%2C_2006.jpg",
       "Eidgen%C3%B6ssische_Technische_Hochschule_%28ETH%29%2C_main_building_Z%C3%BCrich%2C_2006.jpg"),
  "epfl-excellence-fellowship":
    PX("epfl-lausanne"),

  // ── Netherlands ──────────────────────────────────────────────
  "tu-delft-excellence":
    PX("delft-netherlands"),
  "leiden-excellence":
    PX("leiden-university"),
  "wur-scholarship":
    PX("wageningen-campus"),
  "nuffic-orange":
    PX("amsterdam-canals"),
  "holland-scholarship":
    PX("amsterdam-canals-2"),

  // ── Belgium ──────────────────────────────────────────────────
  "ku-leuven-scholarship":
    PX("leuven-belgium"),

  // ── Italy ────────────────────────────────────────────────────
  "bologna-unibo-scholarship":
    PX("bologna-italy"),

  // ── Sweden ───────────────────────────────────────────────────
  "swedish-institute":
    PX("stockholm-sweden"),

  // ── Hungary ──────────────────────────────────────────────────
  "stipendium-hungaricum":
    WP("7/7b/Orszaghaz.jpg", "Orszaghaz.jpg"),

  // ── Turkey ───────────────────────────────────────────────────
  "turkiye-burslari":
    WP("2/22/Hagia_Sophia_Mars_2013.jpg",
       "Hagia_Sophia_Mars_2013.jpg"),

  // ── Japan ────────────────────────────────────────────────────
  "japanese-mext":
    WP("d/d2/Mount_Fuji_from_Lake_Kawaguchi_s2.jpg",
       "Mount_Fuji_from_Lake_Kawaguchi_s2.jpg"),

  // ── South Korea ──────────────────────────────────────────────
  "korean-gks":
    PX("gyeongbokgung-seoul"),
  "global-korea-topik":
    PX("kaist-south-korea"),

  // ── China ────────────────────────────────────────────────────
  "chinese-government-csc":
    WP("f/fa/Great_Wall_of_China_July_2006.JPG",
       "Great_Wall_of_China_July_2006.JPG"),

  // ── Taiwan ───────────────────────────────────────────────────
  "taiwan-icdf":
    PX("taipei-taiwan"),

  // ── Australia ────────────────────────────────────────────────
  "australia-awards":
    WP("7/75/Sydney_Opera_House%2C_botanic_gardens_1.jpg",
       "Sydney_Opera_House%2C_botanic_gardens_1.jpg"),
  "australia-endeavour":
    WP("7/75/Sydney_Opera_House%2C_botanic_gardens_1.jpg",
       "Sydney_Opera_House%2C_botanic_gardens_1.jpg"),

  // ── Canada ───────────────────────────────────────────────────
  "vanier-canada":
    PX("toronto-canada"),

  // ── New Zealand ──────────────────────────────────────────────
  "new-zealand-manaaki":
    PX("milford-sound-nz"),
  "manaaki-new-zealand":
    PX("new-zealand-landscape"),

  // ── Singapore ────────────────────────────────────────────────
  "nus-research-scholarship":
    PX("marina-bay-singapore"),

  // ── Saudi Arabia ─────────────────────────────────────────────
  "kaust-fellowship":
    PX("kaust-red-sea"),

  // ── Russia ───────────────────────────────────────────────────
  "russian-government-scholarship":
    PX("moscow-russia"),

  // ── Poland ───────────────────────────────────────────────────
  "banach-programme-poland":
    PX("krakow-old-town"),

  // ── Norway ───────────────────────────────────────────────────
  "norway-quota-scheme":
    PX("geiranger-fjord"),

  // ── Finland ──────────────────────────────────────────────────
  "finland-aim-scholarship":
    PX("helsinki-finland"),

  // ── Ireland ──────────────────────────────────────────────────
  "ireland-government":
    PX("dublin-ireland"),

  // ── Multi / International ────────────────────────────────────
  "mastercard-foundation":
    PX("africa-university"),
  "aga-khan":
    PX("aga-khan-campus"),
  "rotary-peace-fellowship":
    PX("united-nations-ny"),
  "isdb-scholarship":
    PX("jeddah-saudi"),
  "ofid-scholarship":
    PX("vienna-international"),
  "latin-america-oas":
    PX("latin-america-oas"),
  "african-union-scholarship":
    PX("addis-ababa-africa"),
  "visegrad-scholarship":
    PX("visegrad-central-europe"),
};

export function getScholarshipImage(id: string, _countryCode: string): string {
  return SCHOLARSHIP_PHOTOS[id] || PX(id);
}

export const TAG_GRADIENT: Record<string, string> = {
  green:  "linear-gradient(135deg,#052e16 0%,#0a0a0e 100%)",
  yellow: "linear-gradient(135deg,#1c1007 0%,#0a0a0e 100%)",
  purple: "linear-gradient(135deg,#1e0a2e 0%,#0a0a0e 100%)",
  blue:   "linear-gradient(135deg,#071020 0%,#0a0a0e 100%)",
  red:    "linear-gradient(135deg,#1c0505 0%,#0a0a0e 100%)",
};
