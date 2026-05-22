import { NextRequest, NextResponse } from "next/server";
import { writeMotivationLetter } from "@/lib/claude";
import scholarships from "@/data/scholarships.json";
import { Scholarship, UserProfile } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const { profile, scholarshipId, additionalContext }: { profile: UserProfile; scholarshipId: string; additionalContext: string } = await req.json();
    const scholarship = (scholarships as Scholarship[]).find((s) => s.id === scholarshipId);
    if (!scholarship) return NextResponse.json({ error: "Scholarship not found" }, { status: 404 });
    const letter = await writeMotivationLetter(profile, scholarship, additionalContext || "");
    return NextResponse.json({ letter });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
