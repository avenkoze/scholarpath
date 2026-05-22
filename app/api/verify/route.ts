import { NextRequest, NextResponse } from "next/server";
import { findMatchingScholarships, writeMotivationLetter } from "@/lib/claude";
import scholarships from "@/data/scholarships.json";
import { Scholarship, UserProfile } from "@/lib/types";

async function getLemonOrder(orderId: string) {
  const res = await fetch(`https://api.lemonsqueezy.com/v1/orders/${orderId}`, {
    headers: { Accept: "application/vnd.api+json", Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}` },
  });
  if (!res.ok) throw new Error(`Order fetch failed: ${res.status}`);
  return res.json();
}

export async function GET(req: NextRequest) {
  const orderId = req.nextUrl.searchParams.get("order_id");
  if (!orderId) return NextResponse.json({ error: "No order_id" }, { status: 400 });
  try {
    const order = await getLemonOrder(orderId);
    const status = order?.data?.attributes?.status;
    if (status !== "paid") return NextResponse.json({ error: "Payment not completed" }, { status: 402 });
    const custom = order?.data?.meta?.custom_data || {};
    const type = custom.type;
    const profileStr = custom.profile;
    const scholarshipId = custom.scholarshipId || "";
    if (!type || !profileStr) return NextResponse.json({ error: "Order metadata missing" }, { status: 400 });
    const profile: UserProfile = JSON.parse(profileStr);
    if (type === "match") {
      const result = await findMatchingScholarships(profile, scholarships as Scholarship[]);
      const clean = result.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      let parsed;
      try { parsed = JSON.parse(clean); } catch { return NextResponse.json({ error: "AI parse error" }, { status: 500 }); }
      const enriched = parsed.matches.map((m: { id: string; matchScore: number; whyMatch: string; tips: string[] }) => {
        const s = (scholarships as Scholarship[]).find(x => x.id === m.id);
        return { ...m, scholarship: s };
      }).filter((m: { scholarship: Scholarship | undefined }) => m.scholarship);
      return NextResponse.json({ type: "match", matches: enriched, summary: parsed.summary });
    }
    if (type === "letter") {
      const scholarship = (scholarships as Scholarship[]).find(s => s.id === scholarshipId);
      if (!scholarship) return NextResponse.json({ error: "Scholarship not found" }, { status: 404 });
      const letter = await writeMotivationLetter(profile, scholarship, "");
      return NextResponse.json({ type: "letter", letter, scholarshipName: scholarship.name });
    }
    return NextResponse.json({ error: "Unknown type" }, { status: 400 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
