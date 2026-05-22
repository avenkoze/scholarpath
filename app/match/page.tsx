"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface MatchResult {
  scholarship: { id:string; name:string; country:string; countryCode:string; amountDetail:string; tag:string; tagColor:string; deadline:string; link:string; };
  matchScore: number; whyMatch: string; tips: string[];
}

const FLAG_EMOJIS: Record<string,string> = {
  us:"🇺🇸",de:"🇩🇪",gb:"🇬🇧",eu:"🇪🇺",tr:"🇹🇷",se:"🇸🇪",
  ch:"🇨🇭",jp:"🇯🇵",kr:"🇰🇷",cn:"🇨🇳",au:"🇦🇺",nl:"🇳🇱",
  ca:"🇨🇦",fr:"🇫🇷",nz:"🇳🇿",dk:"🇩🇰",fi:"🇫🇮",ie:"🇮🇪",
  at:"🇦🇹",my:"🇲🇾",multi:"🌍",
};

function MatchContent() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);
  const [results, setResults] = useState<{matches:MatchResult[];summary:string}|null>(null);

  useEffect(() => {
    if (!sessionId) { setError("No session ID found."); setLoading(false); return; }
    fetch(`/api/verify?session_id=${sessionId}`)
      .then(r=>r.json())
      .then(data=>{ if(data.error) setError(data.error); else if(data.type==="match") setResults({matches:data.matches,summary:data.summary}); else setError("Unexpected response type"); })
      .catch(()=>setError("Failed to load results."))
      .finally(()=>setLoading(false));
  },[sessionId]);

  if (loading) return <div style={{minHeight:"100vh",background:"var(--bg)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:20}}><div style={{fontSize:48}}>🔍</div><div style={{fontSize:20,fontWeight:700}}>Finding your best scholarships...</div></div>;
  if (error) return <div style={{minHeight:"100vh",background:"var(--bg)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,padding:24}}><div style={{fontSize:48}}>⚠️</div><div style={{fontSize:20,fontWeight:700}}>Something went wrong</div><div style={{color:"var(--muted)",fontSize:14,textAlign:"center",maxWidth:400}}>{error}</div><Link href="/" style={{background:"var(--accent)",color:"white",borderRadius:10,padding:"12px 24px",fontWeight:700,textDecoration:"none",marginTop:8}}>← Back to Home</Link></div>;

  return (
    <div style={{minHeight:"100vh",background:"var(--bg)"}}>
      <nav style={{borderBottom:"1px solid var(--border)",padding:"0 24px",display:"flex",alignItems:"center",gap:16,height:60,background:"rgba(12,15,23,0.95)",backdropFilter:"blur(12px)",position:"sticky",top:0,zIndex:100}}>
        <Link href="/" style={{color:"var(--muted)",textDecoration:"none",fontSize:14}}>← Home</Link>
        <span style={{fontWeight:700,fontSize:16}}>🎓 Easy Scholarship</span>
      </nav>
      <div style={{maxWidth:720,margin:"0 auto",padding:"48px 24px"}}>
        <div className="animate-fade-up" style={{textAlign:"center",marginBottom:32}}>
          <div style={{fontSize:48,marginBottom:12}}>🎉</div>
          <h1 style={{fontSize:28,fontWeight:800,marginBottom:10}}>Your Scholarship Matches</h1>
          {results?.summary && (<div style={{background:"rgba(79,142,247,0.08)",border:"1px solid rgba(79,142,247,0.2)",borderRadius:12,padding:"16px 20px",fontSize:14,lineHeight:1.7,color:"var(--text)",textAlign:"left",marginTop:20}}>💡 <strong>AI Summary:</strong> {results.summary}</div>)}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          {results?.matches.map((match,i)=>(
            <div key={i} className="card animate-fade-up" style={{padding:22,animationDelay:`${i*60}ms`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                <div style={{display:"flex",gap:12,alignItems:"center"}}>
                  <span style={{fontSize:26}}>{FLAG_EMOJIS[match.scholarship.countryCode]||"🌍"}</span>
                  <div><h3 style={{fontSize:16,fontWeight:700,lineHeight:1.3,marginBottom:3}}>{match.scholarship.name}</h3><p style={{fontSize:12,color:"var(--muted)"}}>{match.scholarship.country} · {match.scholarship.amountDetail}</p></div>
                </div>
                <div style={{background:match.matchScore>=80?"rgba(34,197,94,0.12)":"rgba(79,142,247,0.12)",border:`1px solid ${match.matchScore>=80?"rgba(34,197,94,0.25)":"rgba(79,142,247,0.25)"}`,color:match.matchScore>=80?"#4ade80":"var(--accent)",borderRadius:8,padding:"5px 12px",fontSize:14,fontWeight:800,flexShrink:0}}>{match.matchScore}%</div>
              </div>
              <p style={{fontSize:13,color:"var(--muted)",marginBottom:14,lineHeight:1.7}}>{match.whyMatch}</p>
              <div style={{marginBottom:16}}>
                <div style={{fontSize:11,fontWeight:700,color:"var(--muted)",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.5px"}}>💡 Your Personal Tips</div>
                <div style={{display:"flex",flexDirection:"column",gap:4}}>{match.tips.map((tip,j)=>(<div key={j} style={{fontSize:12,padding:"8px 12px",background:"var(--surface2)",borderRadius:8,color:"var(--text)",display:"flex",gap:8}}><span style={{color:"var(--accent)",flexShrink:0}}>→</span> {tip}</div>))}</div>
              </div>
              <div style={{display:"flex",gap:8}}>
                <a href={match.scholarship.link} target="_blank" rel="noopener noreferrer" style={{flex:1,background:"var(--surface2)",color:"var(--text)",border:"1px solid var(--border)",borderRadius:8,padding:"9px",textAlign:"center",fontSize:13,fontWeight:600,textDecoration:"none"}}>Official Site ↗</a>
                <Link href={`/write?id=${match.scholarship.id}`} style={{flex:1,background:"var(--accent)",color:"white",borderRadius:8,padding:"9px",textAlign:"center",fontSize:13,fontWeight:600,textDecoration:"none"}}>✍️ Write My Letter — $12</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MatchResultPage() {
  return (
    <Suspense fallback={<div style={{minHeight:"100vh",background:"var(--bg)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--muted)"}}>Loading...</div>}>
      <MatchContent />
    </Suspense>
  );
}
