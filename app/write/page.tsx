"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import scholarshipsData from "@/data/scholarships.json";
import { Scholarship, UserProfile } from "@/lib/types";

const scholarships = scholarshipsData as Scholarship[];

const FIELD_STYLE: React.CSSProperties = {display:"flex",flexDirection:"column",gap:6};
const LABEL_STYLE: React.CSSProperties = {fontSize:12,fontWeight:600,color:"rgba(245,245,250,0.5)",textTransform:"uppercase",letterSpacing:"0.5px"};
const REQUIRED_DOT = <span style={{color:"#00E5CC",marginLeft:2}}>*</span>;

function WriteContent() {
  const params = useSearchParams();
  const preselectedId = params.get("id") || "";

  const [step, setStep]         = useState(1);
  const [loading, setLoading]   = useState(false);
  const [scholarshipId, setSId] = useState(preselectedId);
  const [result, setResult]     = useState<string|null>(null);
  const [contactEmail, setContactEmail] = useState<string>("");
  const [searchQ, setSearchQ]   = useState("");
  const [copied, setCopied]     = useState(false); // moved to top level

  const [p, setP] = useState<UserProfile>({
    nationality:"",degreeLevel:"",fieldOfStudy:"",currentUniversity:"",
    gpa:"",englishScore:"",keyAchievements:"",researchPublications:"",
    workExperience:"",whyScholarship:"",whyCountry:"",careerGoals:"",
    personalBackground:"",communityLeadership:"",goals:"",financialNeed:false,
  });

  const up = (k: keyof UserProfile, v: string | boolean) =>
    setP(prev => ({ ...prev, [k]: v }));

  const selectedScholarship = scholarships.find(s => s.id === scholarshipId);
  const filteredScholarships = scholarships.filter(s =>
    !searchQ || s.name.toLowerCase().includes(searchQ.toLowerCase()) ||
    s.country.toLowerCase().includes(searchQ.toLowerCase())
  );

  async function handlePay() {
    if (!scholarshipId || !p.nationality || !p.goals) { alert("Please fill all required fields"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/checkout",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"letter",profile:p,scholarshipId})});
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert("Payment error: " + (data.error || "Unknown"));
    } catch { alert("Connection error. Please try again."); }
    finally { setLoading(false); }
  }

  async function handleDemo() {
    if (!scholarshipId || !p.nationality || !p.goals) { alert("Please fill: scholarship, nationality, and career goals"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/letter",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({profile:p,scholarshipId,additionalContext:""})});
      const data = await res.json();
      if (data.letter) { setResult(data.letter); setContactEmail(selectedScholarship?.email || ""); }
      else alert("AI error: " + (data.error || "Unknown"));
    } catch { alert("Error. Please try again."); }
    finally { setLoading(false); }
  }

  function copy() {
    if (!result) return;
    const [letter] = result.split("--- TIPS TO STRENGTHEN THIS APPLICATION ---");
    navigator.clipboard.writeText(letter?.trim() || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Result view
  if (result) {
    const [letter, tips] = result.split("--- TIPS TO STRENGTHEN THIS APPLICATION ---");
    return (
      <div style={{minHeight:"100vh",background:"#050507"}}>
        <nav style={{height:52,borderBottom:"1px solid rgba(255,255,255,0.07)",background:"rgba(5,5,7,0.95)",backdropFilter:"blur(16px)",display:"flex",alignItems:"center",gap:16,padding:"0 24px",position:"sticky",top:0,zIndex:100}}>
          <Link href="/" style={{fontSize:13,color:"rgba(245,245,250,0.5)",textDecoration:"none"}}>← Home</Link>
          <span style={{fontWeight:700,fontSize:15}}>Easy Scholarship</span>
        </nav>
        <div style={{maxWidth:760,margin:"0 auto",padding:"48px 24px"}}>
          <div style={{textAlign:"center",marginBottom:36}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(0,229,204,0.08)",border:"1px solid rgba(0,229,204,0.18)",borderRadius:4,padding:"4px 12px",fontSize:11,color:"#00E5CC",fontWeight:600,letterSpacing:"0.5px",marginBottom:16}}>MOTIVATION LETTER READY</div>
            <h1 style={{fontSize:24,fontWeight:700,letterSpacing:"-0.5px",marginBottom:6}}>{selectedScholarship?.name}</h1>
            <p style={{fontSize:13,color:"rgba(245,245,250,0.45)"}}>{selectedScholarship?.university}</p>
          </div>
          {contactEmail && (
            <div style={{background:"rgba(0,229,204,0.06)",border:"1px solid rgba(0,229,204,0.2)",borderRadius:6,padding:"14px 18px",marginBottom:20,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
              <div><div style={{fontSize:10,color:"#00E5CC",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:4}}>Official Contact Email</div><div style={{fontSize:14,fontWeight:600,color:"#F5F5FA"}}>{contactEmail}</div></div>
              <button onClick={()=>navigator.clipboard.writeText(contactEmail)} style={{background:"rgba(0,229,204,0.1)",border:"1px solid rgba(0,229,204,0.25)",color:"#00E5CC",borderRadius:4,padding:"7px 14px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>Copy Email</button>
            </div>
          )}
          <div style={{background:"rgba(14,14,18,0.6)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:6,padding:28,marginBottom:16,backdropFilter:"blur(12px)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <h3 style={{fontWeight:700,fontSize:15}}>Motivation Letter</h3>
              <button onClick={copy} style={{background:copied?"rgba(0,229,204,0.1)":"rgba(255,255,255,0.06)",border:`1px solid ${copied?"rgba(0,229,204,0.3)":"rgba(255,255,255,0.12)"}`,color:copied?"#00E5CC":"rgba(245,245,250,0.7)",borderRadius:4,padding:"7px 14px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"inherit",transition:"all 0.2s"}}>{copied?"✓ Copied":"Copy Letter"}</button>
            </div>
            <pre style={{whiteSpace:"pre-wrap",fontFamily:"inherit",fontSize:14,lineHeight:1.85,color:"rgba(245,245,250,0.88)",margin:0}}>{letter?.trim()}</pre>
          </div>
          {tips && (
            <div style={{background:"rgba(0,229,204,0.04)",border:"1px solid rgba(0,229,204,0.15)",borderRadius:6,padding:22,marginBottom:20}}>
              <h3 style={{fontWeight:700,fontSize:14,marginBottom:14,color:"#00E5CC"}}>Application Strengthening Tips</h3>
              <pre style={{whiteSpace:"pre-wrap",fontFamily:"inherit",fontSize:13,lineHeight:1.75,color:"rgba(245,245,250,0.6)",margin:0}}>{tips.trim()}</pre>
            </div>
          )}
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>setResult(null)} style={{flex:1,background:"transparent",border:"1px solid rgba(255,255,255,0.12)",color:"rgba(245,245,250,0.7)",borderRadius:4,padding:12,fontWeight:600,fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>Generate Another</button>
            <Link href="/" style={{flex:1,background:"#F5F5FA",color:"#050507",borderRadius:4,padding:12,textAlign:"center",fontWeight:700,fontSize:14,textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center"}}>Browse Scholarships</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{minHeight:"100vh",background:"#050507"}}>
      <nav style={{height:52,borderBottom:"1px solid rgba(255,255,255,0.07)",background:"rgba(5,5,7,0.95)",backdropFilter:"blur(16px)",display:"flex",alignItems:"center",gap:16,padding:"0 24px",position:"sticky",top:0,zIndex:100}}>
        <Link href="/" style={{fontSize:13,color:"rgba(245,245,250,0.5)",textDecoration:"none"}}>← Back</Link>
        <span style={{fontWeight:700,fontSize:15}}>Easy Scholarship</span>
      </nav>
      <div style={{maxWidth:680,margin:"0 auto",padding:"48px 24px"}}>
        <div style={{textAlign:"center",marginBottom:36}}>
          <h1 style={{fontSize:24,fontWeight:700,letterSpacing:"-0.5px",marginBottom:8}}>Write My Motivation Letter</h1>
          <p style={{fontSize:14,color:"rgba(245,245,250,0.5)",lineHeight:1.65}}>AI writes a persuasive, personalized letter for your chosen scholarship. $12 one-time.</p>
        </div>
        <div style={{display:"flex",gap:4,marginBottom:36}}>{[1,2,3,4].map(s=>(<div key={s} style={{flex:1,height:2,borderRadius:1,background:step>=s?"#00E5CC":"rgba(255,255,255,0.1)",transition:"background 0.3s"}}/>))}</div>

        {step===1 && (
          <div className="animate-fade-up">
            <h2 style={{fontSize:16,fontWeight:700,marginBottom:18}}>Step 1 of 4 — Choose Your Scholarship</h2>
            <input type="text" placeholder="Search scholarships..." value={searchQ} onChange={e=>setSearchQ(e.target.value)} style={{marginBottom:10}}/>
            <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:20,maxHeight:360,overflowY:"auto"}}>
              {filteredScholarships.map(s=>(
                <div key={s.id} onClick={()=>setSId(s.id)} style={{padding:"12px 14px",border:`1px solid ${scholarshipId===s.id?"#00E5CC":"rgba(255,255,255,0.1)"}`,borderRadius:4,cursor:"pointer",background:scholarshipId===s.id?"rgba(0,229,204,0.06)":"rgba(255,255,255,0.02)",display:"flex",justifyContent:"space-between",alignItems:"center",transition:"all 0.15s"}}>
                  <div><div style={{fontSize:13,fontWeight:600,color:"#F5F5FA"}}>{s.name}</div><div style={{fontSize:11,color:"rgba(245,245,250,0.4)"}}>{s.country} · {s.amount}</div></div>
                  {scholarshipId===s.id && <span style={{color:"#00E5CC",fontSize:14}}>✓</span>}
                </div>
              ))}
            </div>
            <button onClick={()=>setStep(2)} disabled={!scholarshipId} style={{width:"100%",background:scholarshipId?"#F5F5FA":"rgba(255,255,255,0.08)",color:scholarshipId?"#050507":"rgba(245,245,250,0.35)",border:"none",borderRadius:4,padding:13,fontWeight:700,fontSize:15,cursor:scholarshipId?"pointer":"not-allowed",fontFamily:"inherit"}}>Continue →</button>
          </div>
        )}

        {step===2 && (
          <div className="animate-fade-up">
            <h2 style={{fontSize:16,fontWeight:700,marginBottom:18}}>Step 2 of 4 — Your Profile</h2>
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div style={FIELD_STYLE}><label style={LABEL_STYLE}>Nationality / Country of Origin {REQUIRED_DOT}</label><input type="text" placeholder="e.g. Turkish, Brazilian..." value={p.nationality} onChange={e=>up("nationality",e.target.value)}/></div>
              <div style={FIELD_STYLE}><label style={LABEL_STYLE}>Degree Level {REQUIRED_DOT}</label><select value={p.degreeLevel} onChange={e=>up("degreeLevel",e.target.value)}><option value="">Select...</option><option>Bachelor&apos;s</option><option>Master&apos;s</option><option>PhD</option><option>Research / Postdoc</option></select></div>
              <div style={FIELD_STYLE}><label style={LABEL_STYLE}>Field of Study {REQUIRED_DOT}</label><input type="text" placeholder="e.g. Environmental Engineering..." value={p.fieldOfStudy} onChange={e=>up("fieldOfStudy",e.target.value)}/></div>
              <div style={FIELD_STYLE}><label style={LABEL_STYLE}>Current / Most Recent University</label><input type="text" placeholder="e.g. Istanbul Technical University" value={p.currentUniversity} onChange={e=>up("currentUniversity",e.target.value)}/></div>
              <div style={{display:"flex",gap:10}}>
                <div style={{...FIELD_STYLE,flex:1}}><label style={LABEL_STYLE}>GPA</label><input type="text" placeholder="e.g. 3.8/4.0" value={p.gpa} onChange={e=>up("gpa",e.target.value)}/></div>
                <div style={{...FIELD_STYLE,flex:1}}><label style={LABEL_STYLE}>English Proficiency</label><input type="text" placeholder="e.g. IELTS 7.5" value={p.englishScore} onChange={e=>up("englishScore",e.target.value)}/></div>
              </div>
              <div style={{display:"flex",gap:8,marginTop:4}}>
                <button onClick={()=>setStep(1)} style={{flex:1,background:"transparent",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(245,245,250,0.6)",borderRadius:4,padding:12,fontWeight:600,fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>← Back</button>
                <button onClick={()=>setStep(3)} disabled={!p.nationality||!p.degreeLevel||!p.fieldOfStudy} style={{flex:2,background:(p.nationality&&p.degreeLevel&&p.fieldOfStudy)?"#F5F5FA":"rgba(255,255,255,0.08)",color:(p.nationality&&p.degreeLevel&&p.fieldOfStudy)?"#050507":"rgba(245,245,250,0.35)",border:"none",borderRadius:4,padding:12,fontWeight:700,fontSize:14,cursor:(p.nationality&&p.degreeLevel&&p.fieldOfStudy)?"pointer":"not-allowed",fontFamily:"inherit"}}>Continue →</button>
              </div>
            </div>
          </div>
        )}

        {step===3 && (
          <div className="animate-fade-up">
            <h2 style={{fontSize:16,fontWeight:700,marginBottom:6}}>Step 3 of 4 — Achievements & Motivation</h2>
            <p style={{fontSize:12,color:"rgba(245,245,250,0.4)",marginBottom:20,lineHeight:1.65}}>The more specific you are here, the more persuasive your letter will be.</p>
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div style={FIELD_STYLE}><label style={LABEL_STYLE}>Key Achievements, Awards & Honors</label><textarea rows={3} placeholder="e.g. Top 3% of class, Dean's List 3 years, Won national competition..." value={p.keyAchievements} onChange={e=>up("keyAchievements",e.target.value)}/></div>
              <div style={FIELD_STYLE}><label style={LABEL_STYLE}>Research, Publications & Projects</label><textarea rows={3} placeholder="e.g. Published paper in Journal of X, Research assistant at MIT lab..." value={p.researchPublications} onChange={e=>up("researchPublications",e.target.value)}/></div>
              <div style={FIELD_STYLE}><label style={LABEL_STYLE}>Work & Professional Experience</label><textarea rows={3} placeholder="e.g. 3 years as environmental consultant at NGO X, Led team of 12 engineers..." value={p.workExperience} onChange={e=>up("workExperience",e.target.value)}/></div>
              <div style={FIELD_STYLE}><label style={LABEL_STYLE}>Community Involvement & Leadership</label><textarea rows={2} placeholder="e.g. President of student club (200 members), Founded youth coding bootcamp..." value={p.communityLeadership} onChange={e=>up("communityLeadership",e.target.value)}/></div>
              <div style={{display:"flex",gap:8,marginTop:4}}>
                <button onClick={()=>setStep(2)} style={{flex:1,background:"transparent",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(245,245,250,0.6)",borderRadius:4,padding:12,fontWeight:600,fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>← Back</button>
                <button onClick={()=>setStep(4)} style={{flex:2,background:"#F5F5FA",color:"#050507",border:"none",borderRadius:4,padding:12,fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"inherit"}}>Continue →</button>
              </div>
            </div>
          </div>
        )}

        {step===4 && (
          <div className="animate-fade-up">
            <h2 style={{fontSize:16,fontWeight:700,marginBottom:6}}>Step 4 of 4 — Your Story & Goals</h2>
            <p style={{fontSize:12,color:"rgba(245,245,250,0.4)",marginBottom:20,lineHeight:1.65}}>This is where your letter becomes unforgettable. Be real and specific.</p>
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div style={FIELD_STYLE}><label style={LABEL_STYLE}>Why THIS Scholarship Specifically? {REQUIRED_DOT}</label><textarea rows={3} placeholder={`e.g. "The ${selectedScholarship?.name} aligns with my goal of X because..."`} value={p.whyScholarship} onChange={e=>up("whyScholarship",e.target.value)}/></div>
              <div style={FIELD_STYLE}><label style={LABEL_STYLE}>Why This Country / Institution?</label><textarea rows={2} placeholder={`e.g. "${selectedScholarship?.country} is the global leader in X..."`} value={p.whyCountry} onChange={e=>up("whyCountry",e.target.value)}/></div>
              <div style={FIELD_STYLE}><label style={LABEL_STYLE}>Your 5-10 Year Career Goals {REQUIRED_DOT}</label><textarea rows={3} placeholder="e.g. After completing my PhD, I plan to return and establish the country's first renewable energy policy think tank..." value={p.careerGoals} onChange={e=>{up("careerGoals",e.target.value);up("goals",e.target.value);}}/></div>
              <div style={FIELD_STYLE}><label style={LABEL_STYLE}>Personal Background / Story</label><textarea rows={3} placeholder="e.g. Growing up in a village with no clean water, I watched my community spend 3 hours daily fetching water..." value={p.personalBackground} onChange={e=>up("personalBackground",e.target.value)}/></div>

              <div style={{background:"rgba(0,229,204,0.04)",border:"1px solid rgba(0,229,204,0.15)",borderRadius:6,padding:20,marginTop:8}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}><h3 style={{fontWeight:700,fontSize:15}}>AI Motivation Letter</h3><span style={{fontSize:22,fontWeight:800,color:"#F5F5FA"}}>$12</span></div>
                {selectedScholarship && <div style={{fontSize:12,color:"rgba(245,245,250,0.45)",marginBottom:12}}>For: <strong style={{color:"#F5F5FA"}}>{selectedScholarship.name}</strong></div>}
                <ul style={{listStyle:"none",padding:0,margin:"0 0 16px"}}>{["550-650 word deeply personalized letter","Tailored to this scholarship's exact values and mission","Official contact email included","4-6 application strengthening tips"].map(item=>(<li key={item} style={{fontSize:12,padding:"3px 0",color:"rgba(245,245,250,0.5)",display:"flex",gap:8}}><span style={{color:"#00E5CC"}}>✓</span> {item}</li>))}</ul>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  <button onClick={handlePay} disabled={loading} style={{background:"#F5F5FA",color:"#050507",border:"none",borderRadius:4,padding:13,fontWeight:700,fontSize:15,cursor:loading?"wait":"pointer",fontFamily:"inherit"}}>{loading?"Processing...":"Pay $12 & Get My Letter →"}</button>
                  <button onClick={handleDemo} disabled={loading} style={{background:"rgba(255,255,255,0.04)",color:"rgba(245,245,250,0.5)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:4,padding:11,fontWeight:500,fontSize:12,cursor:loading?"wait":"pointer",fontFamily:"inherit"}}>{loading?"Writing letter...":"Test with Demo (no payment)"}</button>
                  <p style={{fontSize:10,color:"rgba(245,245,250,0.25)",textAlign:"center"}}>One-time payment via Lemon Squeezy</p>
                </div>
              </div>
              <button onClick={()=>setStep(3)} style={{background:"transparent",border:"1px solid rgba(255,255,255,0.08)",color:"rgba(245,245,250,0.4)",borderRadius:4,padding:10,fontWeight:500,fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>← Back</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function WritePage() {
  return (
    <Suspense fallback={<div style={{minHeight:"100vh",background:"#050507",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(245,245,250,0.4)"}}>Loading...</div>}>
      <WriteContent />
    </Suspense>
  );
}
