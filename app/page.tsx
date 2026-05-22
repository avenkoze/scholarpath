"use client";

import { useState, useMemo } from "react";
import scholarshipsData from "@/data/scholarships.json";
import type { Scholarship } from "@/lib/types";
import Link from "next/link";

const scholarships = scholarshipsData as Scholarship[];

// ── Flag emojis ──────────────────────────────────────────────────────────────────────────────
const FLAG: Record<string, string> = {
  us:"🇺🇸",de:"🇩🇪",gb:"🇬🇧",eu:"🇪🇺",tr:"🇹🇷",se:"🇸🇪",
  ch:"🇨🇭",jp:"🇯🇵",kr:"🇰🇷",cn:"🇨🇳",au:"🇦🇺",nl:"🇳🇱",
  ca:"🇨🇦",fr:"🇫🇷",nz:"🇳🇿",dk:"🇩🇰",fi:"🇫🇮",ie:"🇮🇪",
  at:"🇦🇹",my:"🇲🇾",multi:"🌍",hu:"🇭🇺",tw:"🇹🇼",sg:"🇸🇬",
  sa:"🇸🇦",ru:"🇷🇺",pl:"🇵🇱",be:"🇧🇪",it:"🇮🇹",no:"🇳🇴",
};

// ── Unique rich dark gradient per country — pure CSS, zero network requests ──
const COUNTRY_BG: Record<string, string> = {
  us:    "linear-gradient(145deg,#071830 0%,#020c1a 60%,#050507 100%)",
  de:    "linear-gradient(145deg,#121214 0%,#08080a 60%,#050507 100%)",
  gb:    "linear-gradient(145deg,#061026 0%,#030818 60%,#050507 100%)",
  eu:    "linear-gradient(145deg,#04091e 0%,#020610 60%,#050507 100%)",
  tr:    "linear-gradient(145deg,#220609 0%,#110204 60%,#050507 100%)",
  se:    "linear-gradient(145deg,#060e26 0%,#030818 60%,#050507 100%)",
  ch:    "linear-gradient(145deg,#200507 0%,#110203 60%,#050507 100%)",
  jp:    "linear-gradient(145deg,#1e0508 0%,#0f0204 60%,#050507 100%)",
  kr:    "linear-gradient(145deg,#050c1e 0%,#020610 60%,#050507 100%)",
  cn:    "linear-gradient(145deg,#240607 0%,#130203 60%,#050507 100%)",
  au:    "linear-gradient(145deg,#130e04 0%,#090702 60%,#050507 100%)",
  nl:    "linear-gradient(145deg,#1c0e04 0%,#0e0802 60%,#050507 100%)",
  ca:    "linear-gradient(145deg,#1e0505 0%,#0f0202 60%,#050507 100%)",
  fr:    "linear-gradient(145deg,#060e24 0%,#030810 60%,#050507 100%)",
  nz:    "linear-gradient(145deg,#030e07 0%,#020804 60%,#050507 100%)",
  dk:    "linear-gradient(145deg,#1e0507 0%,#110203 60%,#050507 100%)",
  fi:    "linear-gradient(145deg,#040c1e 0%,#020610 60%,#050507 100%)",
  ie:    "linear-gradient(145deg,#031006 0%,#020904 60%,#050507 100%)",
  at:    "linear-gradient(145deg,#1c0507 0%,#0e0203 60%,#050507 100%)",
  my:    "linear-gradient(145deg,#180508 0%,#0c0204 60%,#050507 100%)",
  hu:    "linear-gradient(145deg,#1a0507 0%,#0e0203 60%,#050507 100%)",
  tw:    "linear-gradient(145deg,#04101e 0%,#02080e 60%,#050507 100%)",
  sg:    "linear-gradient(145deg,#1c0506 0%,#0e0203 60%,#050507 100%)",
  sa:    "linear-gradient(145deg,#03100a 0%,#020805 60%,#050507 100%)",
  ru:    "linear-gradient(145deg,#1c0507 0%,#0e0203 60%,#050507 100%)",
  pl:    "linear-gradient(145deg,#1a0506 0%,#0e0203 60%,#050507 100%)",
  be:    "linear-gradient(145deg,#141005 0%,#0a0802 60%,#050507 100%)",
  it:    "linear-gradient(145deg,#031006 0%,#020904 60%,#050507 100%)",
  no:    "linear-gradient(145deg,#1c0408 0%,#0e0203 60%,#050507 100%)",
  multi: "linear-gradient(145deg,#040e12 0%,#020809 60%,#050507 100%)",
};

const ALL_COUNTRIES = [...new Set(scholarships.map(s => s.country))].sort();
const ALL_LEVELS    = ["Bachelor's","Master's","PhD","Research","Postdoc"];
const ALL_TYPES     = [...new Set(scholarships.map(s => s.type))].sort();

export default function HomePage() {
  const [search,setSearch]    = useState("");
  const [filterCountry,setFC] = useState("");
  const [filterLevel,setFL]   = useState("");
  const [filterAmount,setFA]  = useState("");
  const [filterType,setFT]    = useState("");

  const filtered = useMemo(() => scholarships.filter(s => {
    const q = search.toLowerCase();
    const matchQ = !q || s.name.toLowerCase().includes(q) || s.country.toLowerCase().includes(q)
      || s.fields.some(f=>f.toLowerCase().includes(q)) || s.university.toLowerCase().includes(q);
    return matchQ
      && (!filterCountry || s.country===filterCountry)
      && (!filterLevel   || s.level.includes(filterLevel))
      && (!filterAmount  || s.amount===filterAmount)
      && (!filterType    || s.type===filterType);
  }),[search,filterCountry,filterLevel,filterAmount,filterType]);

  const btnPrimary: React.CSSProperties = {
    background:"#F5F5FA",color:"#050507",
    border:"1px solid transparent",borderRadius:4,
    padding:"11px 24px",fontWeight:600,fontSize:14,
    textDecoration:"none",display:"inline-flex",alignItems:"center",gap:6,
    cursor:"pointer",fontFamily:"inherit",
  };
  const btnGhost: React.CSSProperties = {
    background:"transparent",color:"rgba(245,245,250,0.7)",
    border:"1px solid rgba(255,255,255,0.12)",borderRadius:4,
    padding:"11px 24px",fontWeight:500,fontSize:14,
    textDecoration:"none",display:"inline-flex",alignItems:"center",gap:6,
  };

  return (
    <div style={{minHeight:"100vh",background:"#050507"}}>

      {/* ── Maintenance banner — sticky, always visible ── */}
      <div style={{
        position:"sticky",top:0,zIndex:300,
        background:"#1a0f00",
        borderBottom:"1px solid rgba(245,158,11,0.35)",
        padding:"9px 24px",
        textAlign:"center",
        fontSize:13,
        color:"#fbbf24",
        fontWeight:600,
        letterSpacing:"0.05px",
      }}>
        🛠  Under maintenance — some features may be temporarily unavailable.
      </div>

      {/* ── Nav — sticks just below the banner ── */}
      <nav style={{
        position:"sticky",top:38,zIndex:200,height:52,
        borderBottom:"1px solid rgba(255,255,255,0.07)",
        background:"rgba(5,5,7,0.95)",backdropFilter:"blur(16px)",
        display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 24px",
      }}>
        <span style={{fontWeight:700,fontSize:15,letterSpacing:"-0.3px",color:"#F5F5FA"}}>
          Easy Scholarship
        </span>
        <Link href="/find" style={{
          background:"#F5F5FA",color:"#050507",border:"1px solid transparent",borderRadius:4,
          padding:"7px 16px",fontWeight:600,fontSize:13,textDecoration:"none",
        }}>
          AI Match — $7
        </Link>
      </nav>

      <div style={{maxWidth:900,margin:"0 auto",padding:"72px 24px 56px"}}>

        {/* ── Hero ── */}
        <div className="animate-fade-up" style={{textAlign:"center",marginBottom:48}}>
          <div style={{
            display:"inline-flex",alignItems:"center",gap:6,
            background:"rgba(0,229,204,0.08)",border:"1px solid rgba(0,229,204,0.18)",
            borderRadius:4,padding:"3px 10px",fontSize:11,color:"#00E5CC",
            fontWeight:500,letterSpacing:"0.3px",marginBottom:20,
          }}>
            {scholarships.length}+ Scholarships · 25+ Countries
          </div>
          <h1 style={{fontSize:"clamp(2rem,5vw,3.2rem)",fontWeight:700,lineHeight:1.15,letterSpacing:"-1.5px",marginBottom:14}}>
            Find Scholarships That <br />
            <span style={{background:"linear-gradient(135deg,#00E5CC,#60A5FA)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
              Actually Match You
            </span>
          </h1>
          <p style={{fontSize:15,color:"rgba(245,245,250,0.6)",maxWidth:480,margin:"0 auto 36px",lineHeight:1.65}}>
            Browse government, university, and foundation scholarships from 25+ countries.
            Deadlines, amounts, eligibility — all in one place.
          </p>
          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="/find" style={btnPrimary}>AI Finds My Best Matches — $7</Link>
            <a href="#scholarships" style={btnGhost}>Browse Free ↓</a>
          </div>
        </div>

        {/* ── Stats ── */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,marginBottom:48,background:"rgba(255,255,255,0.07)",borderRadius:6,overflow:"hidden"}}>
          {[
            {v:`${scholarships.length}+`,l:"Scholarships"},
            {v:"25+",l:"Countries"},
            {v:`${scholarships.filter(s=>s.amount==="Full Funding").length}`,l:"Full Funding"},
            {v:"$7",l:"AI Match"},
          ].map(({v,l}) => (
            <div key={l} style={{background:"#050507",padding:"20px",textAlign:"center"}}>
              <div style={{fontSize:22,fontWeight:700,color:"#F5F5FA"}}>{v}</div>
              <div style={{fontSize:11,color:"rgba(245,245,250,0.45)",marginTop:3,textTransform:"uppercase",letterSpacing:"0.5px"}}>{l}</div>
            </div>
          ))}
        </div>

        {/* ── Filters ── */}
        <div id="scholarships">
          <input
            type="text"
            placeholder="Search scholarships, countries, fields of study..."
            value={search}
            onChange={e=>setSearch(e.target.value)}
            style={{
              marginBottom:10,fontSize:14,background:"rgba(255,255,255,0.04)",
              border:"1px solid rgba(255,255,255,0.12)",borderRadius:4,
              padding:"11px 16px",color:"#F5F5FA",width:"100%",outline:"none",fontFamily:"inherit",
            }}
          />
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:8}}>
            {[
              {value:filterCountry,setter:setFC,options:ALL_COUNTRIES,placeholder:"All Countries"},
              {value:filterLevel,setter:setFL,options:ALL_LEVELS,placeholder:"All Levels"},
            ].map(({value,setter,options,placeholder})=>(
              <select key={placeholder} value={value} onChange={e=>setter(e.target.value)} style={{
                flex:1,minWidth:130,background:"rgba(255,255,255,0.04)",
                border:"1px solid rgba(255,255,255,0.12)",color:"rgba(245,245,250,0.85)",
                borderRadius:4,padding:"9px 12px",fontSize:13,outline:"none",fontFamily:"inherit",cursor:"pointer",
              }}>
                <option value="">{placeholder}</option>
                {options.map(o=><option key={o}>{o}</option>)}
              </select>
            ))}
            <select value={filterAmount} onChange={e=>setFA(e.target.value)} style={{
              flex:1,minWidth:130,background:"rgba(255,255,255,0.04)",
              border:"1px solid rgba(255,255,255,0.12)",color:"rgba(245,245,250,0.85)",
              borderRadius:4,padding:"9px 12px",fontSize:13,outline:"none",fontFamily:"inherit",cursor:"pointer",
            }}>
              <option value="">Any Funding</option>
              <option value="Full Funding">Full Funding</option>
              <option value="Partial">Partial</option>
              <option value="Need-based">Need-based</option>
            </select>
            <select value={filterType} onChange={e=>setFT(e.target.value)} style={{
              flex:1,minWidth:130,background:"rgba(255,255,255,0.04)",
              border:"1px solid rgba(255,255,255,0.12)",color:"rgba(245,245,250,0.85)",
              borderRadius:4,padding:"9px 12px",fontSize:13,outline:"none",fontFamily:"inherit",cursor:"pointer",
            }}>
              <option value="">All Types</option>
              {ALL_TYPES.map(t=><option key={t}>{t}</option>)}
            </select>
          </div>
          <div style={{fontSize:12,color:"rgba(245,245,250,0.35)",marginBottom:20}}>
            {filtered.length} result{filtered.length!==1?"s":""}
          </div>
        </div>

        {/* ── Card grid ── */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:12}}>
          {filtered.map((s,i) => (
            <div
              key={s.id}
              className="card animate-fade-up"
              style={{
                textAlign:"left",animationDelay:`${Math.min(i*25,300)}ms`,
                display:"flex",flexDirection:"column",overflow:"hidden",padding:0,
              }}
            >
              {/* ── Card header — pure CSS, zero network requests ── */}
              <Link href={`/scholarship/${s.id}`} style={{textDecoration:"none",display:"block"}}>
                <div style={{
                  height:160,
                  position:"relative",
                  overflow:"hidden",
                  background: COUNTRY_BG[s.countryCode] || "linear-gradient(145deg,#0a0a14 0%,#050507 100%)",
                  display:"flex",
                  flexDirection:"column",
                  alignItems:"center",
                  justifyContent:"center",
                  gap:8,
                }}>
                  {/* Subtle radial glow */}
                  <div style={{
                    position:"absolute",inset:0,
                    background:"radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 100%)",
                  }}/>

                  {/* Tag badge — top right */}
                  <div style={{position:"absolute",top:10,right:10,zIndex:1}}>
                    <span className={`tag-${s.tagColor}`} style={{fontSize:10,padding:"2px 8px",borderRadius:3,fontWeight:600}}>
                      {s.tag}
                    </span>
                  </div>

                  {/* Flag emoji — large, centered */}
                  <span style={{
                    fontSize:52,
                    lineHeight:1,
                    filter:"drop-shadow(0 2px 8px rgba(0,0,0,0.5))",
                    zIndex:1,
                    userSelect:"none",
                  }}>
                    {FLAG[s.countryCode] || "🌍"}
                  </span>

                  {/* Country name below flag */}
                  <span style={{
                    fontSize:11,
                    color:"rgba(245,245,250,0.45)",
                    fontWeight:500,
                    letterSpacing:"0.3px",
                    zIndex:1,
                  }}>
                    {s.country}
                  </span>
                </div>
              </Link>

              {/* ── Card body ── */}
              <Link href={`/scholarship/${s.id}`} style={{textDecoration:"none",color:"inherit",flex:1,padding:"16px 16px 12px",display:"block"}}>
                <div style={{fontSize:10,color:"rgba(245,245,250,0.38)",textTransform:"uppercase",letterSpacing:"0.6px",fontWeight:500,marginBottom:4}}>
                  {s.type}
                </div>
                <h3 style={{fontSize:14,fontWeight:600,lineHeight:1.4,color:"#F5F5FA",marginBottom:4}}>
                  {s.name}
                </h3>
                <p style={{fontSize:11,color:"rgba(245,245,250,0.45)",marginBottom:12,lineHeight:1.5}}>
                  {s.university}
                </p>
                <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:12}}>
                  {s.level.slice(0,3).map(l=>(
                    <span key={l} style={{
                      fontSize:10,padding:"2px 7px",borderRadius:3,
                      background:"rgba(255,255,255,0.06)",color:"rgba(245,245,250,0.55)",
                      border:"1px solid rgba(255,255,255,0.1)",
                    }}>{l}</span>
                  ))}
                </div>
                <div style={{borderTop:"1px solid rgba(255,255,255,0.07)",paddingTop:10,display:"flex",justifyContent:"space-between"}}>
                  <div>
                    <div style={{fontSize:10,color:"rgba(245,245,250,0.35)",marginBottom:2,textTransform:"uppercase",letterSpacing:"0.4px"}}>Amount</div>
                    <div style={{fontSize:12,fontWeight:600,color:s.amount==="Full Funding"?"#4ade80":"#F5F5FA"}}>
                      {s.amount==="Full Funding"?"✓ Full Funding":s.amount}
                    </div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:10,color:"rgba(245,245,250,0.35)",marginBottom:2,textTransform:"uppercase",letterSpacing:"0.4px"}}>Deadline</div>
                    <div style={{fontSize:12,color:"rgba(245,245,250,0.7)"}}>
                      {s.deadline.includes("Varies")?s.deadline:new Date(s.deadline).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}
                    </div>
                  </div>
                </div>
              </Link>

              {/* ── Action buttons ── */}
              <div style={{display:"flex",gap:6,padding:"0 16px 16px"}}>
                <a
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e=>e.stopPropagation()}
                  style={{
                    flex:1,background:"rgba(255,255,255,0.05)",
                    border:"1px solid rgba(255,255,255,0.1)",
                    color:"rgba(245,245,250,0.7)",borderRadius:4,
                    padding:"7px 0",textAlign:"center",fontSize:11,
                    fontWeight:500,textDecoration:"none",display:"block",
                  }}
                >
                  Official Site ↗
                </a>
                <Link
                  href={`/write?id=${s.id}`}
                  onClick={e=>e.stopPropagation()}
                  style={{
                    flex:1,background:"#F5F5FA",color:"#050507",
                    borderRadius:4,padding:"7px 0",textAlign:"center",
                    fontSize:11,fontWeight:700,textDecoration:"none",display:"block",
                  }}
                >
                  Write Letter
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filtered.length===0 && (
          <div style={{textAlign:"center",padding:"60px 20px",color:"rgba(245,245,250,0.35)"}}>
            <div style={{fontSize:32,marginBottom:12}}>◌</div>
            <div style={{fontSize:15,fontWeight:600,marginBottom:6}}>No results</div>
            <div style={{fontSize:13}}>Try different filters</div>
          </div>
        )}

        {/* ── CTA banner ── */}
        <div style={{
          marginTop:64,border:"1px solid rgba(0,229,204,0.15)",
          borderRadius:6,padding:"36px 32px",textAlign:"center",
          background:"rgba(0,229,204,0.04)",
        }}>
          <div style={{fontSize:11,color:"#00E5CC",textTransform:"uppercase",letterSpacing:"1px",fontWeight:600,marginBottom:14}}>
            AI-powered
          </div>
          <h2 style={{fontSize:22,fontWeight:700,marginBottom:10,letterSpacing:"-0.5px"}}>
            Not sure where to start?
          </h2>
          <p style={{color:"rgba(245,245,250,0.55)",fontSize:14,marginBottom:28,maxWidth:420,margin:"0 auto 28px",lineHeight:1.65}}>
            Tell us your profile and AI finds your top 8 scholarships with match score and personalized tips.
          </p>
          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
            <Link href="/find" style={btnPrimary}>Find My Scholarships — $7</Link>
            <Link href="/write" style={btnGhost}>Write My Letter — $12</Link>
          </div>
          <p style={{fontSize:11,color:"rgba(245,245,250,0.3)",marginTop:14}}>
            One-time payment · Instant results · No subscription
          </p>
        </div>

        {/* ── Footer ── */}
        <div style={{textAlign:"center",padding:"48px 0 24px",borderTop:"1px solid rgba(255,255,255,0.06)",marginTop:48}}>
          <div style={{fontSize:11,color:"rgba(245,245,250,0.25)",marginBottom:8}}>
            Easy Scholarship — Data sourced from official scholarship and university websites
          </div>
          <div style={{fontSize:10,color:"rgba(245,245,250,0.18)",maxWidth:640,margin:"0 auto",lineHeight:1.8}}>
            Fulbright: foreign.fulbrightonline.org · DAAD: daad.de · Chevening: chevening.org ·
            Gates Cambridge: gatescambridge.org · Rhodes: rhodeshouse.ox.ac.uk · Clarendon: ox.ac.uk/clarendon ·
            Stipendium Hungaricum: stipendiumhungaricum.hu · Türkiye Bursları: turkiyeburslari.gov.tr ·
            ETH Zurich: ethz.ch · EPFL: epfl.ch · NUS: nus.edu.sg · KAUST: kaust.edu.sa ·
            Humboldt: humboldt-foundation.de · Max Planck: mpg.de · Rotary Peace: rotary.org
          </div>
        </div>
      </div>
    </div>
  );
}
