import scholarshipsData from "@/data/scholarships.json";
import type { Scholarship } from "@/lib/types";
import { notFound } from "next/navigation";
import { ScholarshipDetail } from "./ScholarshipDetail";

const scholarships = scholarshipsData as Scholarship[];

export function generateStaticParams() {
  return scholarships.map(s => ({ id: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const s = scholarships.find(x => x.id === id);
  if (!s) return { title: "Not Found — Easy Scholarship" };
  return {
    title: `${s.name} — Easy Scholarship`,
    description: `${s.description.slice(0, 155)}...`,
    openGraph: {
      title: s.name,
      description: s.description.slice(0, 155),
      type: "article",
    },
  };
}

export default async function ScholarshipPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const s = scholarships.find(x => x.id === id);
  if (!s) notFound();
  return <ScholarshipDetail scholarship={s} />;
}
