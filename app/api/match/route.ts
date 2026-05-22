import { NextRequest, NextResponse } from "next/server";
import { findMatchingScholarships } from "@/lib/claude";
import scholarships from "@/data/scholarships.json";
import { Scholarship, UserProfile } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const profile: UserProfile = await req.json();
    if (!profile.nationality || !profile.degreeLevel || !profile.fieldOfStudy) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const result = await findMatchingScholarships(profile, scholarships as Scholarship[]);
    let parsed;
    try { parsed = JSON.parse(result); } catch { return NextResponse.json({ error: "AI parse error" }, { status: 500 }); }
    const enrichedMatches = parsed.matches.map((match: { id: string; matchScore: number; whyMatch: string; tips: string[] }) => {
      const scholarship = (scholarships as Scholarship[]).find((s) => s.id === match.id);
      return { ...match, scholarship };
    }).filter((m: { scholarship: Scholarship | undefined }) => m.scholarship);
    return NextResponse.json({ matches: enrichedMatches, summary: parsed.summary });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
