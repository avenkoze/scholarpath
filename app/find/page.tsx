"use client";

import { useState } from "react";
import Link from "next/link";
import { UserProfile } from "@/lib/types";

export default function FindPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    nationality:"",degreeLevel:"",fieldOfStudy:"",currentUniversity:"",
    gpa:"",englishScore:"",keyAchievements:"",researchPublications:"",
    workExperience:"",whyScholarship:"",whyCountry:"",careerGoals:"",
    personalBackground:"",communityLeadership:"",goals:"",financialNeed:false,
  });
  const [paid, setPaid] = useState(false);
  const [results, setResults] = useState<{matches:Array<{scholarship:{id:string;name:string;country:string;countryCode:string;amountDetail:string;tag:string;tagColor:string;deadline:string;link:string};matchScore:number;whyMatch:string;tips:string[]}>;summary:string}|null>(null);

  const FLAG_EMOJIS: Record<string,string> = {us:"🇺🇸",de:"🇩🇪",gb:"🇬🇧",eu:"🇪🇺",tr:"🇹🇷",se:"🇸🇪",ch:"🇨🇭",jp:"🇯🇵",kr:"🇰🇷",cn:"🇨🇳",au:"🇦🇺",nl:"🇳🇱",ca:"🇨🇦",fr:"🇫🇷",nz:"🇳🇿",dk:"🇩🇰",fi:"🇫🇮",ie:"🇮🇪",at:"🇦🇹",my:"🇲🇾",multi:"🌍"};

  const isStep1Valid = profile.nationality && profile.degreeLevel && profile.fieldOfStudy;
  const isStep2Valid = profile.gpa && profile.goals;

  async function handlePay() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"match",profile})});
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert("Payment setup error. Please try again.");
    } catch { alert("Error connecting to payment."); }
    finally { setLoading(false); }
  }

  async function handleDemoRun() {
    setLoading(true);
    try {
      const res = await fetch("/api/match",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(profile)});
      const data = await res.json();
      if (data.matches) { setResults(data); setPaid(true); }
      else alert("AI error: " + (data.error || "Unknown error"));
    } catch { alert("Error. Please try again."); }
    finally { setLoading(false); }
  }

  return (
    <div style={{minHeight:"100vh",background:"var(--bg)"}}>
      <nav style={{borderBottom:"1px solid var(--border)",padding:"0 24px",display:"flex",alignItems:"center",gap:16,height:60,background:"rgba(12,15,23,0.95)",backdropFilter:"blur(12px)",position:"sticky",top:0,zIndex:100}}>
        <Link href="/" style={{color:"var(--muted)",textDecoration:"none",fontSize:14}}>← Back</Link>
        <span style={{fontWeight:700,fontSize:16}}>🎓 Easy Scholarship</span>
      </nav>
      <div style={{maxWidth:640,margin:"0 auto",padding:"48px 24px"}}>
        {!paid ? (
          <>
            <div style={{textAlign:"center",marginBottom:40}}>
              <h1 style={{fontSize:28,fontWeight:800,marginBottom:10}}>✨ Find Your Best Scholarships</h1>
              <p style={{color:"var(--muted)",fontSize:15}}>AI analyzes your profile and finds your top 8 matching scholarships.</p>
            </div>
            <div style={{display:"flex",gap:8,marginBottom:32}}>{[1,2,3].map(s=>(<div key={s} style={{flex:1,height:4,borderRadius:2,background:step>=s?"var(--accent)":"var(--border)",transition:"background 0.3s"}}/>))}</div>

            {step===1 && (
              <div className="animate-fade-up">
                <h2 style={{fontSize:18,fontWeight:700,marginBottom:20}}>Step 1: Your Background</h2>
                <div style={{display:"flex",flexDirection:"column",gap:14}}>
                  <div><label style={{display:"block",fontSize:13,fontWeight:600,marginBottom:6,color:"var(--muted)"}}>Nationality / Country of Origin *</label><input type="text" placeholder="e.g. Turkey, Brazil, Nigeria..." value={profile.nationality} onChange={e=>setProfile({...profile,nationality:e.target.value})}/></div>
                  <div><label style={{display:"block",fontSize:13,fontWeight:600,marginBottom:6,color:"var(--muted)"}}>Degree Level *</label><select value={profile.degreeLevel} onChange={e=>setProfile({...profile,degreeLevel:e.target.value})}><option value="">Select level</option><option>Bachelor&apos;s</option><option>Master&apos;s</option><option>PhD</option><option>Research / Postdoc</option></select></div>
                  <div><label style={{display:"block",fontSize:13,fontWeight:600,marginBottom:6,color:"var(--muted)"}}>Field of Study *</label><input type="text" placeholder="e.g. Computer Science, Public Policy..." value={profile.fieldOfStudy} onChange={e=>setProfile({...profile,fieldOfStudy:e.target.value})}/></div>
                  <button onClick={()=>setStep(2)} disabled={!isStep1Valid} style={{background:isStep1Valid?"var(--accent)":"var(--surface2)",color:isStep1Valid?"white":"var(--muted)",border:"none",borderRadius:10,padding:"13px",fontWeight:700,fontSize:15,cursor:isStep1Valid?"pointer":"not-allowed",marginTop:6}}>Continue →</button>
                </div>
              </div>
            )}

            {step===2 && (
              <div className="animate-fade-up">
                <h2 style={{fontSize:18,fontWeight:700,marginBottom:20}}>Step 2: Academic Profile</h2>
                <div style={{display:"flex",flexDirection:"column",gap:14}}>
                  <div><label style={{display:"block",fontSize:13,fontWeight:600,marginBottom:6,color:"var(--muted)"}}>GPA / Academic Score *</label><input type="text" placeholder="e.g. 3.8/4.0, 85%, First Class Honours..." value={profile.gpa} onChange={e=>setProfile({...profile,gpa:e.target.value})}/></div>
                  <div><label style={{display:"block",fontSize:13,fontWeight:600,marginBottom:6,color:"var(--muted)"}}>English Proficiency</label><input type="text" placeholder="e.g. IELTS 7.0, TOEFL 105, Native, None yet..." value={profile.englishScore} onChange={e=>setProfile({...profile,englishScore:e.target.value})}/></div>
                  <div><label style={{display:"block",fontSize:13,fontWeight:600,marginBottom:6,color:"var(--muted)"}}>Work / Research Experience</label><input type="text" placeholder="e.g. 2 years in NGO, Research Assistant, None..." value={profile.workExperience} onChange={e=>setProfile({...profile,workExperience:e.target.value})}/></div>
                  <div><label style={{display:"block",fontSize:13,fontWeight:600,marginBottom:6,color:"var(--muted)"}}>Your Goals & Why You Want to Study Abroad *</label><textarea rows={3} placeholder="What do you want to achieve? What's your career plan after graduation?" value={profile.goals} onChange={e=>setProfile({...profile,goals:e.target.value})}/></div>
                  <div style={{display:"flex",alignItems:"center",gap:10}}><input type="checkbox" id="need" checked={profile.financialNeed} onChange={e=>setProfile({...profile,financialNeed:e.target.checked})} style={{width:16,height:16}}/><label htmlFor="need" style={{fontSize:14,cursor:"pointer"}}>I have financial need</label></div>
                  <div style={{display:"flex",gap:8}}><button onClick={()=>setStep(1)} style={{background:"var(--surface2)",color:"var(--text)",border:"1px solid var(--border)",borderRadius:10,padding:"13px",fontWeight:600,fontSize:15,cursor:"pointer",flex:1}}>← Back</button><button onClick={()=>setStep(3)} disabled={!isStep2Valid} style={{background:isStep2Valid?"var(--accent)":"var(--surface2)",color:isStep2Valid?"white":"var(--muted)",border:"none",borderRadius:10,padding:"13px",fontWeight:700,fontSize:15,cursor:isStep2Valid?"pointer":"not-allowed",flex:2}}>Continue →</button></div>
                </div>
              </div>
            )}

            {step===3 && (
              <div className="animate-fade-up">
                <h2 style={{fontSize:18,fontWeight:700,marginBottom:20}}>Step 3: Get Your AI Matches</h2>
                <div className="card" style={{padding:20,marginBottom:20}}>
                  <h3 style={{fontSize:14,fontWeight:700,marginBottom:12,color:"var(--muted)",textTransform:"uppercase",letterSpacing:"0.5px"}}>Your Profile Summary</h3>
                  {[{label:"Nationality",value:profile.nationality},{label:"Level",value:profile.degreeLevel},{label:"Field",value:profile.fieldOfStudy},{label:"GPA",value:profile.gpa},{label:"English",value:profile.englishScore||"Not specified"}].map(item=>(<div key={item.label} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid var(--border)",fontSize:14}}><span style={{color:"var(--muted)"}}>{item.label}</span><span style={{fontWeight:600}}>{item.value}</span></div>))}
                </div>
                <div style={{background:"linear-gradient(135deg,rgba(79,142,247,0.1),rgba(124,58,237,0.1))",border:"1px solid rgba(79,142,247,0.2)",borderRadius:12,padding:"20px",marginBottom:20}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}><h3 style={{fontWeight:700,fontSize:16}}>AI Scholarship Match</h3><span style={{fontSize:22,fontWeight:800,color:"var(--accent)"}}>$7</span></div>
                  <ul style={{listStyle:"none",padding:0,margin:0}}>{["Top 8 scholarships matched to your exact profile","Match score + why you qualify for each","Personalized application tips","Summary of your scholarship prospects"].map(item=>(<li key={item} style={{fontSize:13,padding:"4px 0",color:"var(--muted)",display:"flex",gap:8}}><span style={{color:"#4ade80"}}>✓</span> {item}</li>))}</ul>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  <button onClick={handlePay} disabled={loading} style={{background:"var(--accent)",color:"white",border:"none",borderRadius:10,padding:"14px",fontWeight:700,fontSize:16,cursor:loading?"wait":"pointer"}}>{loading?"Processing...":"Pay $7 & Get My Matches →"}</button>
                  <button onClick={handleDemoRun} disabled={loading} style={{background:"var(--surface)",color:"var(--muted)",border:"1px solid var(--border)",borderRadius:10,padding:"12px",fontWeight:600,fontSize:13,cursor:loading?"wait":"pointer"}}>{loading?"Running AI...":"🔬 Test with Demo (no payment)"}</button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="animate-fade-up">
            <div style={{textAlign:"center",marginBottom:32}}><div style={{fontSize:40,marginBottom:12}}>🎉</div><h1 style={{fontSize:26,fontWeight:800,marginBottom:10}}>Your Scholarship Matches</h1>
              {results?.summary && (<p style={{background:"rgba(79,142,247,0.1)",border:"1px solid rgba(79,142,247,0.2)",borderRadius:10,padding:"14px 18px",fontSize:14,lineHeight:1.6,color:"var(--text)",textAlign:"left"}}>💡 {results.summary}</p>)}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              {results?.matches.map((match,i)=>(
                <div key={i} className="card" style={{padding:20}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                    <div style={{display:"flex",gap:10,alignItems:"center"}}><span style={{fontSize:22}}>{FLAG_EMOJIS[match.scholarship.countryCode]||"🌍"}</span><div><h3 style={{fontSize:15,fontWeight:700,lineHeight:1.3}}>{match.scholarship.name}</h3><p style={{fontSize:12,color:"var(--muted)"}}>{match.scholarship.country}</p></div></div>
                    <div style={{background:match.matchScore>=80?"rgba(34,197,94,0.12)":"rgba(79,142,247,0.12)",border:`1px solid ${match.matchScore>=80?"rgba(34,197,94,0.2)":"rgba(79,142,247,0.2)"}`,color:match.matchScore>=80?"#4ade80":"var(--accent)",borderRadius:8,padding:"4px 10px",fontSize:13,fontWeight:700,flexShrink:0}}>{match.matchScore}% match</div>
                  </div>
                  <p style={{fontSize:13,color:"var(--muted)",marginBottom:12,lineHeight:1.6}}>{match.whyMatch}</p>
                  <div style={{marginBottom:14}}><div style={{fontSize:12,fontWeight:700,color:"var(--muted)",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.5px"}}>💡 Tips for You</div>{match.tips.map((tip,j)=>(<div key={j} style={{fontSize:12,padding:"6px 10px",background:"var(--surface2)",borderRadius:6,marginBottom:4,color:"var(--text)",display:"flex",gap:6}}><span>→</span> {tip}</div>))}</div>
                  <div style={{display:"flex",gap:8}}><a href={match.scholarship.link} target="_blank" rel="noopener noreferrer" style={{flex:1,background:"var(--surface2)",color:"var(--text)",border:"1px solid var(--border)",borderRadius:8,padding:"8px",textAlign:"center",fontSize:13,fontWeight:600,textDecoration:"none"}}>Official Site ↗</a><Link href={`/write?id=${match.scholarship.id}`} style={{flex:1,background:"var(--accent)",color:"white",borderRadius:8,padding:"8px",textAlign:"center",fontSize:13,fontWeight:600,textDecoration:"none"}}>✍️ Write Letter — $12</Link></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
