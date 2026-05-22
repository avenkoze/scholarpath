export interface Scholarship {
  id: string;
  name: string;
  university: string;
  country: string;
  countryCode: string;
  type: "Government" | "University" | "Foundation" | "EU Programme" | "Private";
  level: string[];
  fields: string[];
  amount: "Full Funding" | "Partial" | "Need-based";
  amountDetail: string;
  deadline: string;
  duration: string;
  eligibility: string;
  description: string;
  benefits: string[];
  requirements: string[];
  link: string;
  tag: string;
  tagColor: "green" | "yellow" | "blue" | "purple" | "red";
  applicants: string;
  gpa: string;
  englishReq: string;
  email: string;
  imageUrl?: string;
  source: string;
}

export interface UserProfile {
  nationality: string;
  degreeLevel: string;
  fieldOfStudy: string;
  currentUniversity: string;
  gpa: string;
  englishScore: string;
  keyAchievements: string;
  researchPublications: string;
  workExperience: string;
  whyScholarship: string;
  whyCountry: string;
  careerGoals: string;
  personalBackground: string;
  communityLeadership: string;
  goals: string;
  financialNeed: boolean;
}

export interface AIMatchResult {
  scholarships: Array<{
    scholarship: Scholarship;
    matchScore: number;
    whyMatch: string;
    tips: string[];
  }>;
  summary: string;
}
