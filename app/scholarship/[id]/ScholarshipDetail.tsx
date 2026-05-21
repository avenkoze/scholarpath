"use client";

import { useState } from "react";
import Link from "next/link";
import type { Scholarship } from "@/lib/types";
import { getScholarshipImage, TAG_GRADIENT } from "@/lib/images";

const FLAG: Record<string, string> = {
  us:"🇺🇸",de:"🇩🇪",gb:"🇬🇧",eu:"🇪🇺",tr:"🇹🇷",se:"🇸🇪",
  ch:"🇨🇭",jp:"🇯🇵",kr:"🇰🇷",cn:"🇨🇳",au:"🇦🇺",nl:"🇳🇱",
  ca:"🇨🇦",fr:"🇫🇷",nz:"🇳🇿",dk:"🇩🇰",fi:"🇫🇮",ie:"🇮🇪",
  at:"🇦🇹",my:"🇲🇾",multi:"🌍",hu:"🇭🇺",tw:"🇹🇼",sg:"🇸🇬",
  sa:"🇸🇦",ru:"🇷🇺",pl:"🇵🇱",be:"🇧🇪",it:"🇮🇹",no:"🇳🇴",
};

const TAG_STYLE: Record<string, {bg:string;color:string;border:string}> = {
  green:  {bg:"rgba(34,197,94,0.12)", color:"#4ade80",border:"rgba(34,197,94,0.22)"},
  yellow: {bg:"rgba(245,158,11,0.12)",color:"#fbbf24",border:"rgba(245,158,11,0.22)"},
  purple: {bg:"rgba(168,85,247,0.12)",color:"#c084fc",border:"rgba(168,85,247,0.22)"},
  blue:   {bg:"rgba(96,165,250,0.12)",color:"#93c5fd",border:"rgba(96,165,250,0.22)"},
  red:    {bg:"rgba(239,68,68,0.12)", color:"#f87171",border:"rgba(239,68,68,0.22)"},
};

type Tab = "overview" | "funding" | "eligibility" | "apply";

const TABS: {id:Tab; label:string; icon:string}[] = [
  {id:"overview",  label:"Overview",    icon:"📋"},
  {id:"funding",   label:"Funding",     icon:"💰"},
  {id:"eligibility",label:"Eligibility",icon:"✅"},
  {id:"apply",     label:"How to Apply",icon:"🚀"},
];

function Divider() {
  return <div style={{height:1,background:"rgba(255,255,255,0.07)",margin:"16px 0"}} />;
}

function InfoRow({label, value}: {label:string; value:string}) {
  return (
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",
      padding:"10px 0",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
      <span style={{fontSize:12,color:"rgba(245,245,250,0.45)",minWidth:140}}>{label}</span>
      <span style={{fontSize:13,fontWeight:600,color:"#F5F5FA",textAlign:"right",maxWidth:200,lineHeight:1.4}}>{value}</span>
    </div>
  );
}

export function ScholarshipDetail({scholarship: s}: {scholarship: Scholarship}) {
  const [tab, setTab] = useState<Tab>("overview");
  const [imgError, setImgError] = useState(false);

  const imgUrl = getScholarshipImage(s.id, s.countryCode);
  const ts = TAG_STYLE[s.tagColor] || TAG_STYLE.blue;
  const bgGrad = TAG_GRADIENT[s.tagColor] || TAG_GRADIENT.blue;

  return (
    <div style={{minHeight:"100vh",background:"#050507",color:"#F5F5FA",
      fontFamily:"'Geist','Inter',system-ui,sans-serif"}}>

      <nav style={{
        height:52,borderBottom:"1px solid rgba(255,255,255,0.07)",
        background:"rgba(5,5,7,0.95)",backdropFilter:"blur(16px)",
        display:"flex",alignItems:"center",justifyContent:"space-between",
        padding:"0 24px",position:"sticky",top:0,zIndex:100,
      }}>
        <Link href="/" style={{display:"flex",alignItems:"center",gap:8,textDecoration:"none"}}>
          <span style={{color:"rgba(245,245,250,0.45)",fontSize:13}}>←</span>
          <span style={{color:"#F5F5FA",fontWeight:700,fontSize:15}}>Easy Scholarship</span>
        </Link>
        <Link href="/find" style={{
          background:"#F5F5FA",color:"#050507",borderRadius:4,
          padding:"7px 16px",fontWeight:600,fontSize:13,textDecoration:"none",
        }}>
          AI Match — $7
        </Link>
      </nav>

      {/* Hero — full cover photo */}
      <div style={{
        position:"relative",height:300,overflow:"hidden",
        background:bgGrad,
      }}>
        <img
          src={imgUrl || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"}
          alt=""
          aria-hidden
          style={{
            position:"absolute",inset:0,width:"100%",height:"100%",
            objectFit:"cover",objectPosition:"center",
            opacity:imgError ? 0 : 0.6,
            transition:"opacity 0.4s",
          }}
          onError={()=>setImgError(true)}
        />
        <div style={{
          position:"absolute",inset:0,
          background:"linear-gradient(to bottom,rgba(5,5,7,0.2) 0%,rgba(5,5,7,0.88) 100%)",
        }}/>

        <div style={{
          position:"absolute",bottom:0,left:0,right:0,
          padding:"24px",
        }}>
          <div style={{maxWidth:900,margin:"0 auto"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10,flexWrap:"wrap"}}>
              <span style={{fontSize:22}}>{FLAG[s.countryCode]||"🌍"}</span>
              <span style={{fontSize:12,color:"rgba(245,245,250,0.6)"}}>{s.type} · {s.country}</span>
              <span style={{
                fontSize:11,padding:"2px 8px",borderRadius:3,fontWeight:600,
                background:ts.bg,color:ts.color,border:`1px solid ${ts.border}`,
              }}>{s.tag}</span>
            </div>
            <h1 style={{
              fontSize:"clamp(1.4rem,3vw,2rem)",fontWeight:700,
              lineHeight:1.2,letterSpacing:"-0.4px",marginBottom:4,
            }}>
              {s.name}
            </h1>
            <p style={{fontSize:13,color:"rgba(245,245,250,0.5)"}}>{s.university}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        borderBottom:"1px solid rgba(255,255,255,0.08)",
        background:"rgba(5,5,7,0.98)",
        position:"sticky",top:52,zIndex:90,
      }}>
        <div style={{maxWidth:900,margin:"0 auto",padding:"0 24px",display:"flex",gap:0}}>
          {TABS.map(t=>(
            <button
              key={t.id}
              onClick={()=>setTab(t.id)}
              style={{
                background:"none",border:"none",cursor:"pointer",
                padding:"13px 18px",fontSize:13,fontWeight:500,
                fontFamily:"inherit",
                color: tab===t.id ? "#F5F5FA" : "rgba(245,245,250,0.45)",
                borderBottom: tab===t.id ? "2px solid #00E5CC" : "2px solid transparent",
                transition:"all 0.15s",
                display:"flex",alignItems:"center",gap:6,
              }}
            >
              <span style={{fontSize:14}}>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{maxWidth:900,margin:"0 auto",padding:"28px 24px 72px",
        display:"grid",gridTemplateColumns:"1fr 300px",gap:20,alignItems:"start"}}>

        <div>
          {tab==="overview" && (
            <div className="animate-fade-up">
              <div style={{background:"rgba(14,14,18,0.7)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:6,padding:24,marginBottom:14}}>
                <h2 style={{fontSize:13,fontWeight:700,color:"rgba(245,245,250,0.4)",textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:14}}>About This Scholarship</h2>
                <p style={{fontSize:14,lineHeight:1.8,color:"rgba(245,245,250,0.8)"}}>{s.description}</p>
              </div>
              <div style={{background:"rgba(14,14,18,0.7)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:6,padding:24,marginBottom:14}}>
                <h2 style={{fontSize:13,fontWeight:700,color:"rgba(245,245,250,0.4)",textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:14}}>Quick Facts</h2>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  {[
                    {l:"Type",v:s.type},{l:"Country",v:s.country},
                    {l:"Level",v:s.level.join(", ")},{l:"Duration",v:s.duration},
                    {l:"Recipients",v:s.applicants},
                    {l:"Deadline",v:s.deadline.includes("Varies")?s.deadline:new Date(s.deadline).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})},
                  ].map(({l,v})=>(
                    <div key={l} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:4,padding:"12px 14px"}}>
                      <div style={{fontSize:10,color:"rgba(245,245,250,0.35)",marginBottom:5,textTransform:"uppercase",letterSpacing:"0.4px"}}>{l}</div>
                      <div style={{fontSize:13,fontWeight:600,color:"#F5F5FA",lineHeight:1.4}}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{background:"rgba(14,14,18,0.7)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:6,padding:24}}>
                <h2 style={{fontSize:13,fontWeight:700,color:"rgba(245,245,250,0.4)",textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:14}}>Fields of Study</h2>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {s.fields.map(f=>(<span key={f} style={{fontSize:12,padding:"5px 12px",borderRadius:3,background:"rgba(0,229,204,0.08)",color:"#00E5CC",border:"1px solid rgba(0,229,204,0.15)",fontWeight:500}}>{f}</span>))}
                </div>
              </div>
            </div>
          )}

          {tab==="funding" && (
            <div className="animate-fade-up">
              <div style={{background:"rgba(14,14,18,0.7)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:6,padding:24,marginBottom:14}}>
                <h2 style={{fontSize:13,fontWeight:700,color:"rgba(245,245,250,0.4)",textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:16}}>Funding Amount</h2>
                <div style={{background:`linear-gradient(135deg,${ts.bg},rgba(0,0,0,0))`,border:`1px solid ${ts.border}`,borderRadius:6,padding:"18px 20px",marginBottom:16}}>
                  <div style={{fontSize:11,color:ts.color,textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:6,fontWeight:600}}>{s.amount}</div>
                  <div style={{fontSize:18,fontWeight:700,color:"#F5F5FA",lineHeight:1.4}}>{s.amountDetail}</div>
                </div>
                <InfoRow label="Duration" value={s.duration} />
                <InfoRow label="Funding Type" value={s.amount} />
              </div>
              <div style={{background:"rgba(14,14,18,0.7)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:6,padding:24}}>
                <h2 style={{fontSize:13,fontWeight:700,color:"rgba(245,245,250,0.4)",textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:14}}>What&apos;s Covered</h2>
                {s.benefits.map((b,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"10px 0",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
                    <div style={{width:20,height:20,borderRadius:"50%",flexShrink:0,marginTop:1,background:"rgba(34,197,94,0.15)",border:"1px solid rgba(34,197,94,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#4ade80"}}>✓</div>
                    <span style={{fontSize:13,color:"rgba(245,245,250,0.8)",lineHeight:1.5}}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab==="eligibility" && (
            <div className="animate-fade-up">
              <div style={{background:"rgba(14,14,18,0.7)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:6,padding:24,marginBottom:14}}>
                <h2 style={{fontSize:13,fontWeight:700,color:"rgba(245,245,250,0.4)",textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:16}}>Who Can Apply</h2>
                <div style={{background:"rgba(0,229,204,0.05)",border:"1px solid rgba(0,229,204,0.12)",borderRadius:5,padding:"14px 16px",marginBottom:16,fontSize:13,lineHeight:1.7,color:"rgba(245,245,250,0.8)"}}>{s.eligibility}</div>
                <InfoRow label="Academic Level" value={s.level.join(", ")} />
                <InfoRow label="GPA Requirement" value={s.gpa} />
                <InfoRow label="English Requirement" value={s.englishReq} />
              </div>
              <div style={{background:"rgba(14,14,18,0.7)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:6,padding:24}}>
                <h2 style={{fontSize:13,fontWeight:700,color:"rgba(245,245,250,0.4)",textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:14}}>Requirements Checklist</h2>
                {s.requirements.map((r,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"10px 0",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
                    <div style={{width:20,height:20,borderRadius:3,flexShrink:0,marginTop:1,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10}}>→</div>
                    <span style={{fontSize:13,color:"rgba(245,245,250,0.8)",lineHeight:1.5}}>{r}</span>
                  </div>
                ))}
                <div style={{marginTop:18,padding:"14px 16px",background:"rgba(245,158,11,0.06)",border:"1px solid rgba(245,158,11,0.15)",borderRadius:5,fontSize:12,color:"rgba(245,245,250,0.6)",lineHeight:1.6}}>
                  💡 <strong style={{color:"#fbbf24"}}>Tip:</strong> Check the official website for the most up-to-date requirements.
                </div>
              </div>
            </div>
          )}

          {tab==="apply" && (
            <div className="animate-fade-up">
              <div style={{background:"rgba(14,14,18,0.7)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:6,padding:24,marginBottom:14}}>
                <h2 style={{fontSize:13,fontWeight:700,color:"rgba(245,245,250,0.4)",textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:16}}>Application Deadline</h2>
                <div style={{background:"rgba(239,68,68,0.07)",border:"1px solid rgba(239,68,68,0.2)",borderRadius:6,padding:"14px 18px",display:"flex",alignItems:"center",gap:12}}>
                  <span style={{fontSize:24}}>📅</span>
                  <div>
                    <div style={{fontSize:11,color:"rgba(239,68,68,0.8)",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:3}}>Deadline</div>
                    <div style={{fontSize:16,fontWeight:700,color:"#F5F5FA"}}>{s.deadline.includes("Varies")?s.deadline:new Date(s.deadline).toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}</div>
                  </div>
                </div>
              </div>
              <div style={{background:"rgba(14,14,18,0.7)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:6,padding:24,marginBottom:14}}>
                <h2 style={{fontSize:13,fontWeight:700,color:"rgba(245,245,250,0.4)",textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:16}}>Application Steps</h2>
                {[
                  {n:1,title:"Check Eligibility",desc:"Review all requirements. Confirm nationality, age, GPA, and language requirements."},
                  {n:2,title:"Prepare Documents",desc:"Gather transcripts, recommendation letters, CV, and language certificates. Start 2-3 months early."},
                  {n:3,title:"Write Your Motivation Letter",desc:"The most important part. Use our AI to write a persuasive, personalized letter."},
                  {n:4,title:"Submit Application",desc:`Apply through the official portal before ${s.deadline.includes("Varies")?s.deadline:new Date(s.deadline).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}.`},
                  {n:5,title:"Follow Up",desc:`Contact ${s.email||"the scholarship office"} if you haven't heard back within 8-12 weeks.`},
                ].map(step=>(
                  <div key={step.n} style={{display:"flex",gap:14,padding:"12px 0",borderBottom:"1px solid rgba(255,255,255,0.07)"}}>
                    <div style={{width:28,height:28,borderRadius:"50%",flexShrink:0,background:"rgba(0,229,204,0.1)",border:"1px solid rgba(0,229,204,0.25)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:"#00E5CC"}}>{step.n}</div>
                    <div><div style={{fontSize:13,fontWeight:600,color:"#F5F5FA",marginBottom:3}}>{step.title}</div><div style={{fontSize:12,color:"rgba(245,245,250,0.55)",lineHeight:1.6}}>{step.desc}</div></div>
                  </div>
                ))}
              </div>
              {s.email && (
                <div style={{background:"rgba(14,14,18,0.7)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:6,padding:20}}>
                  <h2 style={{fontSize:13,fontWeight:700,color:"rgba(245,245,250,0.4)",textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:12}}>Contact</h2>
                  <div style={{fontSize:11,color:"rgba(245,245,250,0.38)",marginBottom:4}}>Official email</div>
                  <a href={`mailto:${s.email}`} style={{fontSize:14,color:"#00E5CC",textDecoration:"none",fontWeight:500}}>{s.email}</a>
                  <Divider/>
                  <div style={{fontSize:11,color:"rgba(245,245,250,0.35)"}}>Source: <a href={s.source} target="_blank" rel="noopener noreferrer" style={{color:"rgba(0,229,204,0.5)",textDecoration:"none"}}>{s.source}</a></div>
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{position:"sticky",top:110}}>
          <div style={{background:"rgba(14,14,18,0.8)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:6,padding:20,marginBottom:12,backdropFilter:"blur(12px)"}}>
            <div style={{marginBottom:10,padding:"10px 14px",background:ts.bg,border:`1px solid ${ts.border}`,borderRadius:4}}>
              <div style={{fontSize:10,color:ts.color,textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:2,fontWeight:600}}>{s.amount}</div>
              <div style={{fontSize:13,fontWeight:700,color:"#F5F5FA"}}>{s.amountDetail.slice(0,40)}{s.amountDetail.length>40?"...":""}</div>
            </div>
            <a href={s.link} target="_blank" rel="noopener noreferrer" style={{display:"block",width:"100%",background:"#F5F5FA",color:"#050507",borderRadius:4,padding:"12px",textAlign:"center",fontWeight:700,fontSize:14,textDecoration:"none",marginBottom:8}}>Official Application Site ↗</a>
            <Link href={`/write?id=${s.id}`} style={{display:"block",width:"100%",background:"rgba(0,229,204,0.1)",color:"#00E5CC",border:"1px solid rgba(0,229,204,0.25)",borderRadius:4,padding:"12px",textAlign:"center",fontWeight:600,fontSize:13,textDecoration:"none"}}>✍️ Write My Letter — $12</Link>
            {s.email && (<><Divider/><div style={{fontSize:10,color:"rgba(245,245,250,0.35)",textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:5}}>Contact</div><a href={`mailto:${s.email}`} style={{fontSize:12,color:"#00E5CC",textDecoration:"none",wordBreak:"break-all"}}>{s.email}</a></>)}
          </div>
          <div style={{background:"rgba(14,14,18,0.8)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:6,padding:16,marginBottom:12}}>
            {[{l:"Level",v:s.level.join(", ")},{l:"GPA",v:s.gpa},{l:"English",v:s.englishReq},{l:"Duration",v:s.duration}].map(({l,v})=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid rgba(255,255,255,0.06)",fontSize:12}}>
                <span style={{color:"rgba(245,245,250,0.4)"}}>{l}</span>
                <span style={{fontWeight:600,color:"#F5F5FA",textAlign:"right",maxWidth:160,lineHeight:1.4}}>{v}</span>
              </div>
            ))}
          </div>
          <Link href="/" style={{display:"block",textAlign:"center",fontSize:11,color:"rgba(245,245,250,0.3)",textDecoration:"none",padding:"8px"}}>← All scholarships</Link>
        </div>
      </div>
    </div>
  );
}
