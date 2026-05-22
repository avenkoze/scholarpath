"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function LetterContent() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [letter, setLetter] = useState<string | null>(null);
  const [scholarshipName, setScholarshipName] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!sessionId) { setError("No session ID found. Please complete payment first."); setLoading(false); return; }
    fetch(`/api/verify?session_id=${sessionId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else if (data.type === "letter") { setLetter(data.letter); setScholarshipName(data.scholarshipName || ""); }
        else setError("Unexpected response type");
      })
      .catch(() => setError("Failed to load your letter. Please contact support."))
      .finally(() => setLoading(false));
  }, [sessionId]);

  function handleCopy() {
    if (letter) {
      const [text] = letter.split("--- TIPS TO STRENGTHEN THIS APPLICATION ---");
      navigator.clipboard.writeText(text?.trim() || letter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  if (loading) return <div style={{minHeight:"100vh",background:"var(--bg)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:20}}><div style={{fontSize:48}}>✍️</div><div style={{fontSize:20,fontWeight:700}}>Writing your motivation letter...</div></div>;
  if (error) return <div style={{minHeight:"100vh",background:"var(--bg)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,padding:24}}><div style={{fontSize:48}}>⚠️</div><div style={{fontSize:20,fontWeight:700}}>Something went wrong</div><div style={{color:"var(--muted)",fontSize:14,textAlign:"center",maxWidth:400}}>{error}</div><Link href="/" style={{background:"var(--accent)",color:"white",borderRadius:10,padding:"12px 24px",fontWeight:700,textDecoration:"none",marginTop:8}}>← Back to Home</Link></div>;

  const [letterText, tips] = (letter || "").split("--- TIPS TO STRENGTHEN THIS APPLICATION ---");

  return (
    <div style={{minHeight:"100vh",background:"var(--bg)"}}>
      <nav style={{borderBottom:"1px solid var(--border)",padding:"0 24px",display:"flex",alignItems:"center",gap:16,height:60,background:"rgba(12,15,23,0.95)",backdropFilter:"blur(12px)",position:"sticky",top:0,zIndex:100}}>
        <Link href="/" style={{color:"var(--muted)",textDecoration:"none",fontSize:14}}>← Home</Link>
        <span style={{fontWeight:700,fontSize:16}}>🎓 Easy Scholarship</span>
      </nav>
      <div style={{maxWidth:760,margin:"0 auto",padding:"48px 24px"}}>
        <div className="animate-fade-up" style={{textAlign:"center",marginBottom:32}}>
          <div style={{fontSize:48,marginBottom:12}}>✉️</div>
          <h1 style={{fontSize:28,fontWeight:800,marginBottom:8}}>Your Motivation Letter</h1>
          {scholarshipName && <p style={{color:"var(--muted)",fontSize:14}}>For: <strong style={{color:"var(--text)}"}}>{scholarshipName}</strong></p>}
        </div>
        <div className="card animate-fade-up" style={{padding:28,marginBottom:20}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
            <h3 style={{fontWeight:700,fontSize:16}}>Motivation Letter</h3>
            <button onClick={handleCopy} style={{background:copied?"rgba(34,197,94,0.12)":"var(--surface2)",border:`1px solid ${copied?"rgba(34,197,94,0.3)":"var(--border)"}`,color:copied?"#4ade80":"var(--text)",borderRadius:8,padding:"7px 14px",fontSize:13,fontWeight:600,cursor:"pointer",transition:"all 0.2s"}}>{copied?"✓ Copied!":"Copy Letter"}</button>
          </div>
          <pre style={{whiteSpace:"pre-wrap",fontFamily:"inherit",fontSize:14,lineHeight:1.85,color:"var(--text)",margin:0}}>{letterText?.trim()}</pre>
        </div>
        {tips && (<div className="animate-fade-up" style={{background:"rgba(79,142,247,0.08)",border:"1px solid rgba(79,142,247,0.2)",borderRadius:12,padding:22,marginBottom:24}}><h3 style={{fontWeight:700,marginBottom:14,fontSize:15}}>💡 Tips to Strengthen Your Application</h3><pre style={{whiteSpace:"pre-wrap",fontFamily:"inherit",fontSize:13,lineHeight:1.75,color:"var(--muted)",margin:0}}>{tips.trim()}</pre></div>)}
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <Link href="/write" style={{flex:1,background:"var(--surface2)",border:"1px solid var(--border)",color:"var(--text)",borderRadius:10,padding:"12px",textAlign:"center",fontWeight:600,fontSize:14,textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center"}}>✍️ Write Another Letter</Link>
          <Link href="/" style={{flex:1,background:"var(--accent)",color:"white",borderRadius:10,padding:"12px",textAlign:"center",fontWeight:700,fontSize:14,textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center"}}>Browse All Scholarships</Link>
        </div>
      </div>
    </div>
  );
}

export default function LetterResultPage() {
  return (
    <Suspense fallback={<div style={{minHeight:"100vh",background:"var(--bg)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--muted)"}}>Loading...</div>}>
      <LetterContent />
    </Suspense>
  );
}
