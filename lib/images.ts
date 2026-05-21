// Scholarship photo mapping
// University scholarships → campus/building photos
// Government scholarships → country landmark photos
// All from Wikimedia Commons (stable, free, no auth)
// Format: commons.wikimedia.org/wiki/Special:FilePath/{filename}?width=800

const WC = (filename: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}?width=800`;

export const SCHOLARSHIP_PHOTOS: Record<string, string> = {
  // ── US ──────────────────────────────────────────────────────
  "fulbright-foreign-student":
    WC("Stanford_-_Main_Quad_-_Serra_Mall_2.jpg"),
  "harvard-financial-aid":
    WC("Harvard_University_aerial.jpg"),
  "stanford-knight-hennessy":
    WC("Stanford_Memorial_Church_front.jpg"),
  "opendoors-us-scholarships":
    WC("Golden_Gate_Bridge,_San_Francisco_-_Dec_2015.jpg"),

  // ── Germany ─────────────────────────────────────────────────
  "daad-helmut-schmidt":
    WC("Brandenburger_Tor_abends.jpg"),
  "daad-development-scholarship":
    WC("Neuschwanstein_Castle_from_Marienbrücke_2021.jpg"),
  "humboldt-foundation":
    WC("Humboldt-Universität_zu_Berlin_2015.jpg"),
  "max-planck-imprs":
    WC("Max-Planck-Institut_für_Biochemie,_Martinsried.jpg"),

  // ── UK ──────────────────────────────────────────────────────
  "chevening":
    WC("Clock_Tower_-_Palace_of_Westminster,_London_-_May_2007.jpg"),
  "gates-cambridge":
    WC("King's_College_Chapel,_Cambridge_-_Oct_2006.jpg"),
  "oxford-clarendon":
    WC("Radcliffe_Camera,_Oxford_-_Oct_2006.jpg"),
  "rhodes-scholarship":
    WC("Bodleian_Library_-_Radcliffe_Camera,_Oxford.jpg"),
  "commonwealth-scholarship":
    WC("Tower_Bridge_London_Feb_2006.jpg"),

  // ── EU / Europe ─────────────────────────────────────────────
  "erasmus-mundus":
    WC("European_Parliament_Strasbourg_Hemicycle_-_Diliff.jpg"),
  "eiffel-excellence-france":
    WC("Tour_Eiffel_Wikimedia_Commons.jpg"),
  "visegrad-scholarship":
    WC("Prague_-_Pražský_hrad_-_panoramio.jpg"),
  "banach-programme-poland":
    WC("Krakow_-_Rynek_Glowny.jpg"),
  "norway-quota-scheme":
    WC("Geirangerfjord.jpg"),
  "finland-aim-scholarship":
    WC("Helsinki_Cathedral.jpg"),

  // ── Switzerland ─────────────────────────────────────────────
  "swiss-government-excellence":
    WC("Matterhorn_from_Domhütte_-_2.jpg"),
  "eth-zurich-excellence":
    WC("Hauptgebaeude_der_ETH_Zuerich_im_Abendlicht.jpg"),
  "epfl-excellence-fellowship":
    WC("EPFL_campus_aerial_2007.jpg"),

  // ── Netherlands ─────────────────────────────────────────────
  "tu-delft-excellence":
    WC("Delft_-_TU_Delft_Aula_congrescentrum.jpg"),
  "leiden-excellence":
    WC("Leiden_Academiegebouw.jpg"),
  "wur-scholarship":
    WC("Wageningen_UR_Forumgebouw.jpg"),
  "nuffic-orange":
    WC("Amsterdam_-_Herengracht.jpg"),

  // ── Belgium ─────────────────────────────────────────────────
  "ku-leuven-scholarship":
    WC("Leuven_-_Grote_markt.jpg"),

  // ── Italy ───────────────────────────────────────────────────
  "bologna-unibo-scholarship":
    WC("Bologna_Archiginnasio.jpg"),

  // ── Sweden ──────────────────────────────────────────────────
  "swedish-institute":
    WC("Stockholm_-_Stadshuset.jpg"),

  // ── Hungary ─────────────────────────────────────────────────
  "stipendium-hungaricum":
    WC("Orszaghaz.jpg"),

  // ── Turkey ──────────────────────────────────────────────────
  "turkiye-burslari":
    WC("Hagia_Sophia_Mars_2013.jpg"),

  // ── Japan ───────────────────────────────────────────────────
  "japanese-mext":
    WC("Mount_Fuji_from_Hotel_Mt_Fuji_04bs3200.jpg"),

  // ── South Korea ─────────────────────────────────────────────
  "korean-gks":
    WC("Gyeongbokgung-geunjeongjeon.jpg"),
  "global-korea-topik":
    WC("N_Seoul_Tower_01.jpg"),

  // ── China ───────────────────────────────────────────────────
  "chinese-government-csc":
    WC("Great_Wall_of_China_July_2006.jpg"),

  // ── Taiwan ──────────────────────────────────────────────────
  "taiwan-icdf":
    WC("Taipei_101_from_afar.jpg"),

  // ── Australia ───────────────────────────────────────────────
  "australia-awards":
    WC("Sydney_Opera_House,_botanic_gardens_1.jpg"),

  // ── Canada ──────────────────────────────────────────────────
  "vanier-canada":
    WC("Toronto_-_ON_-_Nathan_Phillips_Square.jpg"),

  // ── New Zealand ─────────────────────────────────────────────
  "new-zealand-manaaki":
    WC("Milford_Sound_Mitre_Peak_1.jpg"),

  // ── Singapore ───────────────────────────────────────────────
  "nus-research-scholarship":
    WC("Marina_Bay_Sands_in_Singapore_-_20101120.jpg"),

  // ── Saudi Arabia ────────────────────────────────────────────
  "kaust-fellowship":
    WC("King_Abdullah_University_of_Science_and_Technology.jpg"),

  // ── Russia ──────────────────────────────────────────────────
  "russian-government-scholarship":
    WC("Moskova_red_square.jpg"),

  // ── Multi / International ────────────────────────────────────
  "mastercard-foundation":
    WC("Makerere_university_main_building.jpg"),
  "aga-khan":
    WC("Aga_Khan_University_Stadium.jpg"),
  "rotary-peace-fellowship":
    WC("United_Nations_Headquarters_in_New_York_City.jpg"),
  "isdb-scholarship":
    WC("Islamic_Development_Bank_Jeddah.jpg"),
  "ofid-scholarship":
    WC("Vienna_International_Centre_2013.jpg"),
  "latin-america-oas":
    WC("OAS_building_Washington.jpg"),
  "african-union-scholarship":
    WC("African_Union_Conference_Center_and_Office_Complex.jpg"),
};

export function getScholarshipImage(id: string, _countryCode: string): string {
  return SCHOLARSHIP_PHOTOS[id] || "";
}

// Accent gradient colors per tag for fallback backgrounds
export const TAG_GRADIENT: Record<string, string> = {
  green:  "linear-gradient(135deg,#052e16 0%,#0a0a0e 100%)",
  yellow: "linear-gradient(135deg,#1c1007 0%,#0a0a0e 100%)",
  purple: "linear-gradient(135deg,#1e0a2e 0%,#0a0a0e 100%)",
  blue:   "linear-gradient(135deg,#071020 0%,#0a0a0e 100%)",
  red:    "linear-gradient(135deg,#1c0505 0%,#0a0a0e 100%)",
};
