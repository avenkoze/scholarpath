import { Scholarship, UserProfile } from "./types";

const OPENROUTER_BASE = "https://openrouter.ai/api/v1";
const MODEL_FAST   = "google/gemini-2.0-flash-exp:free";
const MODEL_WRITER = "google/gemma-3-27b-it:free";

async function callAI(prompt: string, model: string, maxTokens = 2500): Promise<string> {
  const res = await fetch(`${OPENROUTER_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "https://easyscho.com",
      "X-Title": "Easy Scholarship",
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!res.ok) { const err = await res.text(); throw new Error(`OpenRouter ${res.status}: ${err}`); }
  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("Empty AI response");
  return content;
}

export async function findMatchingScholarships(profile: UserProfile, scholarships: Scholarship[]): Promise<string> {
  const list = scholarships.map(s =>
    `ID:${s.id}|${s.name}(${s.country})|Level:${s.level.join(",")}|Fields:${s.fields.join(",")}|Amount:${s.amountDetail}|Eligibility:${s.eligibility}|GPA:${s.gpa}`
  ).join("\n");

  const prompt = `You are a scholarship advisor matching students to scholarships.

STUDENT PROFILE:
- Nationality: ${profile.nationality}
- Degree sought: ${profile.degreeLevel}
- Field: ${profile.fieldOfStudy}
- Current university: ${profile.currentUniversity || "Not specified"}
- GPA: ${profile.gpa}
- English: ${profile.englishScore || "Not specified"}
- Experience: ${profile.workExperience || "None"}
- Achievements: ${profile.keyAchievements || "Not specified"}
- Goals: ${profile.goals}
- Financial need: ${profile.financialNeed ? "Yes" : "No"}

SCHOLARSHIPS:
${list}

Return ONLY valid JSON (no markdown fences):
{"matches":[{"id":"scholarship-id","matchScore":95,"whyMatch":"2-3 specific sentences","tips":["tip 1","tip 2"]}],"summary":"2-3 sentence assessment"}

Top 8 matches ranked by score. Only include scholarships the student genuinely qualifies for.`;

  return callAI(prompt, MODEL_FAST, 2000);
}

export async function writeMotivationLetter(profile: UserProfile, scholarship: Scholarship, additionalContext: string): Promise<string> {
  const profileSections = [
    `Name/Nationality: ${profile.nationality}`,
    `Current University: ${profile.currentUniversity || "Not specified"}`,
    `Degree Level: ${profile.degreeLevel}`,
    `Field of Study: ${profile.fieldOfStudy}`,
    `GPA: ${profile.gpa}`,
    `English Proficiency: ${profile.englishScore || "Not specified"}`,
    `Work/Research Experience: ${profile.workExperience || "None"}`,
    `Key Achievements/Awards: ${profile.keyAchievements || "Not specified"}`,
    `Research/Publications: ${profile.researchPublications || "None"}`,
    `Why THIS scholarship: ${profile.whyScholarship || "Not specified"}`,
    `Why this country/institution: ${profile.whyCountry || "Not specified"}`,
    `Career Goals (5-10 years): ${profile.careerGoals || profile.goals}`,
    `Personal Background/Story: ${profile.personalBackground || "Not specified"}`,
    `Community/Leadership: ${profile.communityLeadership || "Not specified"}`,
    `Additional context: ${additionalContext || "None"}`,
  ].join("\n");

  const prompt = `You are a world-class scholarship essay writer.

Write a HIGHLY PERSUASIVE, deeply personalized motivation letter.

SCHOLARSHIP:
- Name: ${scholarship.name}
- Institution: ${scholarship.university}
- Country: ${scholarship.country}
- What they look for: ${scholarship.eligibility}
- Key requirements: ${scholarship.requirements.join(", ")}

APPLICANT:
${profileSections}

RULES: Open with a memorable hook. Show don't tell. Concrete examples. 550-650 words.

Write the complete letter. After it, write exactly:
--- TIPS TO STRENGTHEN THIS APPLICATION ---
Then 4-6 specific actionable tips.`;

  return callAI(prompt, MODEL_WRITER, 2000);
}
