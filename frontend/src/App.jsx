import { useState, useEffect } from "react";

// ─── MOCK DATA (replace with real API calls once backend is running) ──────────
const MOCK_EMPLOYEES = [
  {
    id: "1", firstName: "Amara", lastName: "Osei", email: "amara@ambience.studio",
    phone: "+1 (555) 010-2030", role: "Photographer",
    bio: "Award-winning photographer with 8 years capturing weddings and editorial spreads across three continents. Known for luminous natural-light portraits and candid storytelling.",
    specialties: ["Weddings", "Portraits", "Editorial"],
    coverUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
    avatarUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80",
    visiblePublic: true, status: "active", joinDate: "2016-03-15",
    salary: { base: 5800, allowances: 600, deductions: 420, cycle: "monthly" },
    payslips: [
      { id: "p1", period: "Jan 2025", pdfUrl: "#" },
      { id: "p2", period: "Feb 2025", pdfUrl: "#" },
    ],
    tasks: [
      { id: "t1", title: "Chen-Williams Wedding", type: "booking", date: "2025-04-12", status: "confirmed", priority: "high" },
      { id: "t2", title: "Spring Lookbook Shoot", type: "event", date: "2025-04-28", status: "pending", priority: "normal" },
    ],
    portfolio: [
      { id: "pi1", title: "Golden Hour Ceremony", mediaUrl: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80", visibility: "public" },
      { id: "pi2", title: "Candid Reception", mediaUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80", visibility: "public" },
      { id: "pi3", title: "Studio Portrait Series", mediaUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80", visibility: "public" },
      { id: "pi4", title: "Editorial Fashion", mediaUrl: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80", visibility: "private" },
    ]
  },
  {
    id: "2", firstName: "Luca", lastName: "Ferrante", email: "luca@ambience.studio",
    phone: "+1 (555) 021-3041", role: "Editor",
    bio: "Meticulous post-production artist specialising in color grading and cinematic retouching. Brings a painterly quality to every image that leaves the studio.",
    specialties: ["Color Grading", "Retouching", "Video Edit"],
    coverUrl: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80",
    avatarUrl: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&q=80",
    visiblePublic: true, status: "active", joinDate: "2018-07-01",
    salary: { base: 4900, allowances: 400, deductions: 310, cycle: "monthly" },
    payslips: [{ id: "p3", period: "Jan 2025", pdfUrl: "#" }],
    tasks: [
      { id: "t3", title: "Wedding Album — March Batch", type: "ops", date: "2025-04-05", status: "in-progress", priority: "high" },
    ],
    portfolio: [
      { id: "pi5", title: "Cinematic Retouch", mediaUrl: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&q=80", visibility: "public" },
      { id: "pi6", title: "Color Story — Teal & Orange", mediaUrl: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&q=80", visibility: "public" },
    ]
  },
  {
    id: "3", firstName: "Zara", lastName: "Khoury", email: "zara@ambience.studio",
    phone: "+1 (555) 032-4052", role: "Photographer",
    bio: "Documentary-style photographer who captures the raw emotion in every frame. Specialises in intimate elopements and adventure sessions in remote locations.",
    specialties: ["Elopements", "Adventure", "Documentary"],
    coverUrl: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    visiblePublic: true, status: "active", joinDate: "2019-11-20",
    salary: { base: 5200, allowances: 500, deductions: 380, cycle: "monthly" },
    payslips: [{ id: "p4", period: "Jan 2025", pdfUrl: "#" }],
    tasks: [
      { id: "t4", title: "Mountain Elopement — Rockies", type: "booking", date: "2025-05-03", status: "confirmed", priority: "high" },
    ],
    portfolio: [
      { id: "pi7", title: "Sunrise Elopement", mediaUrl: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80", visibility: "public" },
      { id: "pi8", title: "Rainy Day Romance", mediaUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80", visibility: "public" },
      { id: "pi9", title: "Golden Fields Session", mediaUrl: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80", visibility: "public" },
    ]
  },
  {
    id: "4", firstName: "Marcus", lastName: "Webb", email: "marcus@ambience.studio",
    phone: "+1 (555) 043-5063", role: "Assistant",
    bio: "Energetic second shooter and studio assistant with a keen eye for detail. Currently building a portfolio in event photography while supporting our senior photographers.",
    specialties: ["Second Shoot", "Studio Setup", "Events"],
    coverUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    visiblePublic: true, status: "active", joinDate: "2022-02-14",
    salary: { base: 3200, allowances: 250, deductions: 220, cycle: "monthly" },
    payslips: [{ id: "p5", period: "Jan 2025", pdfUrl: "#" }],
    tasks: [
      { id: "t5", title: "Assist — Chen Wedding", type: "booking", date: "2025-04-12", status: "confirmed", priority: "normal" },
    ],
    portfolio: [
      { id: "pi10", title: "Event Candids", mediaUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80", visibility: "public" },
    ]
  },
  {
    id: "5", firstName: "Priya", lastName: "Nair", email: "priya@ambience.studio",
    phone: "+1 (555) 054-6074", role: "Editor",
    bio: "Visual storyteller who transforms raw captures into polished narratives. Expert in album design and client gallery curation with a background in fine art.",
    specialties: ["Album Design", "Gallery Curation", "Fine Art"],
    coverUrl: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80",
    avatarUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&q=80",
    visiblePublic: false, status: "active", joinDate: "2020-09-01",
    salary: { base: 4600, allowances: 350, deductions: 290, cycle: "monthly" },
    payslips: [],
    tasks: [],
    portfolio: [
      { id: "pi11", title: "Fine Art Album", mediaUrl: "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&q=80", visibility: "public" },
    ]
  },
];

// ─── STYLES ───────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Outfit:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --ink: #0D1117; --ink2: #1C2333; --fog: #F7F6F3; --fog2: #EEECEA;
    --gold: #C8A96E; --gold2: #E8C98E; --mint: #3ECBA0; --rose: #E87B6E;
    --sky: #5FA8D3; --border: rgba(0,0,0,0.08); --shadow: 0 2px 20px rgba(0,0,0,0.07);
    --shadow-lg: 0 8px 40px rgba(0,0,0,0.12);
  }
  html { scroll-behavior: smooth; }
  body { font-family: 'Outfit', sans-serif; background: var(--fog); color: var(--ink); }
  .serif { font-family: 'Cormorant Garamond', serif; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  @keyframes slideIn { from{transform:translateX(100%);opacity:0} to{transform:translateX(0);opacity:1} }
  @keyframes scaleIn { from{transform:scale(.95);opacity:0} to{transform:scale(1);opacity:1} }
  .fade-up{animation:fadeUp .5s ease both} .fade-up-1{animation:fadeUp .5s .1s ease both}
  .fade-up-2{animation:fadeUp .5s .2s ease both} .fade-up-3{animation:fadeUp .5s .3s ease both}
  ::-webkit-scrollbar{width:6px} ::-webkit-scrollbar-track{background:transparent}
  ::-webkit-scrollbar-thumb{background:var(--fog2);border-radius:3px}
  input,select,textarea{font-family:'Outfit',sans-serif;outline:none;transition:border .2s,box-shadow .2s}
  input:focus,select:focus,textarea:focus{border-color:var(--gold)!important;box-shadow:0 0 0 3px rgba(200,169,110,.15)!important}
  button{font-family:'Outfit',sans-serif;cursor:pointer;transition:all .2s}
  button:active{transform:scale(.97)}
  .emp-card{transition:transform .25s,box-shadow .25s}
  .emp-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg)!important}
  .port-img{transition:transform .4s} .port-img:hover{transform:scale(1.04)}
  .nav-link{position:relative;transition:color .2s}
  .nav-link::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1.5px;background:var(--gold);transition:width .25s}
  .nav-link:hover::after,.nav-link.active::after{width:100%}
`;

const roleColor = { Photographer: "#3ECBA0", Editor: "#5FA8D3", Assistant: "#C8A96E" };
const roleBg    = { Photographer: "rgba(62,203,160,.12)", Editor: "rgba(95,168,211,.12)", Assistant: "rgba(200,169,110,.12)" };
const statusColor = { confirmed: "#3ECBA0", pending: "#C8A96E", "in-progress": "#5FA8D3" };
const priorityColor = { high: "#E87B6E", normal: "#5FA8D3" };

// ─── SHARED UI ────────────────────────────────────────────────────────────────
function Badge({ label, color, bg }) {
  return <span style={{ fontSize:11,fontWeight:600,letterSpacing:".04em",textTransform:"uppercase",color,background:bg||color+"20",padding:"3px 10px",borderRadius:20 }}>{label}</span>;
}
function Avatar({ src, name, size=40 }) {
  const initials = name?.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
  return src
    ? <img src={src} alt={name} style={{ width:size,height:size,borderRadius:"50%",objectFit:"cover",border:"2px solid white",boxShadow:"0 2px 8px rgba(0,0,0,.15)" }} onError={e=>e.target.style.display='none'} />
    : <div style={{ width:size,height:size,borderRadius:"50%",background:"var(--gold)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*.38,fontWeight:700,color:"white",border:"2px solid white" }}>{initials}</div>;
}
function Toast({ msg, onDone }) {
  useEffect(()=>{ const t=setTimeout(onDone,2600); return()=>clearTimeout(t); },[]);
  return <div style={{ position:"fixed",bottom:28,right:28,zIndex:9999,background:"var(--ink)",color:"white",padding:"14px 22px",borderRadius:12,fontSize:14,fontWeight:500,boxShadow:"0 4px 24px rgba(0,0,0,.25)",animation:"scaleIn .3s ease",display:"flex",alignItems:"center",gap:10 }}><span style={{ color:"var(--mint)",fontSize:18 }}>✓</span>{msg}</div>;
}
function Modal({ title, children, onClose }) {
  return (
    <div style={{ position:"fixed",inset:0,zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,.45)",backdropFilter:"blur(4px)",animation:"fadeIn .2s" }} onClick={onClose}>
      <div style={{ background:"white",borderRadius:20,padding:"32px",width:"100%",maxWidth:520,maxHeight:"90vh",overflowY:"auto",boxShadow:"var(--shadow-lg)",animation:"scaleIn .25s" }} onClick={e=>e.stopPropagation()}>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24 }}>
          <h3 style={{ fontSize:20,fontWeight:700 }}>{title}</h3>
          <button onClick={onClose} style={{ background:"var(--fog2)",border:"none",width:32,height:32,borderRadius:"50%",fontSize:16,color:"#666",display:"flex",alignItems:"center",justifyContent:"center" }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}
function Input({ label, value, onChange, type="text", placeholder, readOnly, maxLength }) {
  return (
    <div style={{ marginBottom:16 }}>
      <label style={{ display:"block",fontSize:12,fontWeight:600,color:"#666",marginBottom:6,textTransform:"uppercase",letterSpacing:".05em" }}>{label}</label>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} readOnly={readOnly} maxLength={maxLength}
        style={{ width:"100%",padding:"11px 14px",border:"1.5px solid var(--border)",borderRadius:10,fontSize:14,background:readOnly?"var(--fog)":"white",color:"var(--ink)" }} />
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav({ view, setView, user, setUser }) {
  const links = user?.role==="admin"
    ? [["directory","Directory"],["admin","Admin Console"]]
    : user ? [["directory","Directory"],["staff","My Dashboard"]]
    : [["directory","Directory"]];
  return (
    <nav style={{ background:"var(--ink)",borderBottom:"1px solid rgba(255,255,255,.06)",position:"sticky",top:0,zIndex:100 }}>
      <div style={{ maxWidth:1200,margin:"0 auto",padding:"0 24px",display:"flex",alignItems:"center",height:64,gap:8 }}>
        <div onClick={()=>setView("directory")} style={{ cursor:"pointer",display:"flex",alignItems:"center",gap:10,marginRight:36 }}>
          <div style={{ width:32,height:32,background:"var(--gold)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16 }}>◈</div>
          <span style={{ fontFamily:"Cormorant Garamond,serif",fontSize:22,fontWeight:600,color:"white",letterSpacing:".04em" }}>Ambience</span>
        </div>
        <div style={{ display:"flex",gap:28,flex:1 }}>
          {links.map(([v,l])=>(
            <button key={v} onClick={()=>setView(v)} className={`nav-link ${view===v?"active":""}`}
              style={{ background:"none",border:"none",color:view===v?"var(--gold)":"rgba(255,255,255,.6)",fontSize:14,fontWeight:500,padding:"4px 0" }}>{l}</button>
          ))}
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:12 }}>
          {user ? (
            <>
              <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                <Avatar src={user.avatarUrl} name={user.firstName+" "+user.lastName} size={34} />
                <div style={{ lineHeight:1.3 }}>
                  <div style={{ fontSize:13,fontWeight:600,color:"white" }}>{user.firstName}</div>
                  <div style={{ fontSize:11,color:"rgba(255,255,255,.45)",textTransform:"uppercase",letterSpacing:".05em" }}>{user.role}</div>
                </div>
              </div>
              <button onClick={()=>{ setUser(null); setView("directory"); }}
                style={{ background:"rgba(255,255,255,.08)",border:"none",color:"rgba(255,255,255,.6)",fontSize:13,padding:"7px 16px",borderRadius:8 }}>Sign out</button>
            </>
          ) : (
            <button onClick={()=>setView("login")}
              style={{ background:"var(--gold)",border:"none",color:"var(--ink)",fontSize:13,fontWeight:700,padding:"9px 20px",borderRadius:10 }}>Sign In</button>
          )}
        </div>
      </div>
    </nav>
  );
}

// ─── PUBLIC DIRECTORY ─────────────────────────────────────────────────────────
function DirectoryPage({ employees, setView, setSelectedEmployee }) {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const visible = employees.filter(e=>
    e.visiblePublic && e.status==="active" &&
    (!role||e.role===role) &&
    (!search||`${e.firstName} ${e.lastName} ${e.specialties.join(" ")} ${e.role}`.toLowerCase().includes(search.toLowerCase()))
  );
  return (
    <div style={{ minHeight:"100vh" }}>
      <div style={{ background:"var(--ink)",padding:"72px 24px 80px",textAlign:"center",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",inset:0,backgroundImage:"radial-gradient(ellipse 80% 60% at 50% 100%, rgba(200,169,110,.12) 0%, transparent 70%)",pointerEvents:"none" }} />
        <p className="fade-up" style={{ fontFamily:"Cormorant Garamond,serif",fontSize:13,letterSpacing:".25em",textTransform:"uppercase",color:"var(--gold)",marginBottom:16 }}>Meet the Team</p>
        <h1 className="fade-up-1 serif" style={{ fontSize:"clamp(40px,6vw,68px)",fontWeight:600,color:"white",lineHeight:1.1,marginBottom:18 }}>
          The People Behind<br /><em style={{ color:"var(--gold)" }}>Every Perfect Shot</em>
        </h1>
        <p className="fade-up-2" style={{ color:"rgba(255,255,255,.5)",fontSize:16,maxWidth:480,margin:"0 auto 40px" }}>
          Ambience Studio is built on talent, passion, and an obsession with storytelling through imagery.
        </p>
        <div className="fade-up-3" style={{ maxWidth:580,margin:"0 auto",display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center" }}>
          <div style={{ flex:1,minWidth:280,position:"relative" }}>
            <span style={{ position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:"#888",fontSize:16 }}>⌕</span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name, role, specialty…"
              style={{ width:"100%",padding:"13px 14px 13px 40px",border:"1.5px solid rgba(255,255,255,.12)",borderRadius:12,background:"rgba(255,255,255,.07)",color:"white",fontSize:14 }} />
          </div>
          {["","Photographer","Editor","Assistant"].map(r=>(
            <button key={r} onClick={()=>setRole(r)}
              style={{ padding:"12px 20px",borderRadius:10,border:`1.5px solid ${role===r?"var(--gold)":"rgba(255,255,255,.15)"}`,background:role===r?"var(--gold)":"transparent",color:role===r?"var(--ink)":"rgba(255,255,255,.7)",fontSize:13,fontWeight:600 }}>
              {r||"All"}
            </button>
          ))}
        </div>
      </div>
      <div style={{ maxWidth:1200,margin:"0 auto",padding:"60px 24px" }}>
        <p style={{ fontSize:13,color:"#999",marginBottom:32 }}>{visible.length} team member{visible.length!==1?"s":""}</p>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(300px,1fr))",gap:28 }}>
          {visible.map((emp,i)=>(
            <div key={emp.id} className="emp-card fade-up" style={{ animationDelay:`${i*.08}s`,background:"white",borderRadius:18,overflow:"hidden",boxShadow:"var(--shadow)",cursor:"pointer" }}
              onClick={()=>{ setSelectedEmployee(emp); setView("profile"); }}>
              <div style={{ height:200,overflow:"hidden",position:"relative" }}>
                <img src={emp.coverUrl} alt={emp.firstName} className="port-img" style={{ width:"100%",height:"100%",objectFit:"cover" }} />
                <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top, rgba(0,0,0,.4) 0%, transparent 60%)" }} />
                <div style={{ position:"absolute",top:14,right:14 }}>
                  <Badge label={emp.role} color={roleColor[emp.role]} bg={roleBg[emp.role]} />
                </div>
              </div>
              <div style={{ padding:"20px 22px" }}>
                <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:12 }}>
                  <div style={{ marginTop:-40,position:"relative",zIndex:1 }}>
                    <Avatar src={emp.avatarUrl} name={emp.firstName+" "+emp.lastName} size={52} />
                  </div>
                  <div>
                    <h3 style={{ fontSize:17,fontWeight:700,color:"var(--ink)" }}>{emp.firstName} {emp.lastName}</h3>
                    <p style={{ fontSize:12,color:"#888" }}>Since {new Date(emp.joinDate).getFullYear()}</p>
                  </div>
                </div>
                <p style={{ fontSize:13.5,color:"#555",lineHeight:1.65,marginBottom:14,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden" }}>{emp.bio}</p>
                <div style={{ display:"flex",flexWrap:"wrap",gap:6,marginBottom:18 }}>
                  {emp.specialties.map(s=><span key={s} style={{ fontSize:11,background:"var(--fog2)",color:"#666",padding:"4px 10px",borderRadius:20,fontWeight:500 }}>{s}</span>)}
                </div>
                <button style={{ width:"100%",padding:"11px",borderRadius:10,border:"1.5px solid var(--gold)",background:"transparent",color:"var(--gold)",fontSize:13,fontWeight:700,letterSpacing:".04em" }}>
                  View Profile →
                </button>
              </div>
            </div>
          ))}
        </div>
        {visible.length===0&&<div style={{ textAlign:"center",padding:"80px 0",color:"#aaa" }}><div style={{ fontSize:48,marginBottom:16 }}>🔍</div><p>No team members match your search.</p></div>}
      </div>
    </div>
  );
}

// ─── PUBLIC PROFILE ───────────────────────────────────────────────────────────
function ProfilePage({ employee, setView }) {
  if (!employee) return null;
  const pub = employee.portfolio.filter(p=>p.visibility==="public");
  return (
    <div style={{ minHeight:"100vh",background:"var(--fog)" }}>
      <div style={{ height:340,position:"relative",overflow:"hidden" }}>
        <img src={employee.coverUrl} alt="" style={{ width:"100%",height:"100%",objectFit:"cover" }} />
        <div style={{ position:"absolute",inset:0,background:"linear-gradient(to bottom, transparent 30%, rgba(13,17,23,.85) 100%)" }} />
        <button onClick={()=>setView("directory")} style={{ position:"absolute",top:24,left:24,background:"rgba(255,255,255,.15)",backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,.2)",color:"white",padding:"9px 18px",borderRadius:10,fontSize:13,fontWeight:600 }}>
          ← Back
        </button>
      </div>
      <div style={{ maxWidth:900,margin:"-80px auto 0",padding:"0 24px 80px",position:"relative" }}>
        <div className="fade-up" style={{ background:"white",borderRadius:20,padding:"32px",boxShadow:"var(--shadow-lg)",marginBottom:28 }}>
          <div style={{ display:"flex",alignItems:"flex-end",gap:20,flexWrap:"wrap" }}>
            <Avatar src={employee.avatarUrl} name={employee.firstName+" "+employee.lastName} size={88} />
            <div style={{ flex:1 }}>
              <div style={{ display:"flex",gap:8,marginBottom:8 }}>
                <Badge label={employee.role} color={roleColor[employee.role]} bg={roleBg[employee.role]} />
                <Badge label={`${new Date().getFullYear()-new Date(employee.joinDate).getFullYear()} yrs exp`} color="#888" bg="var(--fog2)" />
              </div>
              <h1 className="serif" style={{ fontSize:34,fontWeight:600 }}>{employee.firstName} {employee.lastName}</h1>
            </div>
            <button style={{ background:"var(--gold)",border:"none",color:"var(--ink)",padding:"12px 24px",borderRadius:12,fontSize:14,fontWeight:700 }}>Request Booking →</button>
          </div>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 300px",gap:24,alignItems:"start" }}>
          <div>
            <div className="fade-up-1" style={{ background:"white",borderRadius:18,padding:"28px",boxShadow:"var(--shadow)",marginBottom:24 }}>
              <h2 style={{ fontSize:13,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"var(--gold)",marginBottom:14 }}>About</h2>
              <p style={{ fontSize:15,lineHeight:1.8,color:"#444" }}>{employee.bio}</p>
            </div>
            <div className="fade-up-2" style={{ background:"white",borderRadius:18,padding:"28px",boxShadow:"var(--shadow)" }}>
              <h2 style={{ fontSize:13,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"var(--gold)",marginBottom:18 }}>Portfolio</h2>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(180px,1fr))",gap:12 }}>
                {pub.map(item=>(
                  <div key={item.id} style={{ borderRadius:12,overflow:"hidden",aspectRatio:"1",cursor:"pointer",boxShadow:"0 2px 12px rgba(0,0,0,.1)" }}>
                    <img src={item.mediaUrl} alt={item.title} className="port-img" style={{ width:"100%",height:"100%",objectFit:"cover" }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="fade-up-1" style={{ background:"white",borderRadius:18,padding:"24px",boxShadow:"var(--shadow)",marginBottom:16 }}>
              <h2 style={{ fontSize:13,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"var(--gold)",marginBottom:16 }}>Specialties</h2>
              <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
                {employee.specialties.map(s=><span key={s} style={{ background:"var(--fog)",border:"1px solid var(--border)",fontSize:13,padding:"6px 14px",borderRadius:20,color:"#555",fontWeight:500 }}>{s}</span>)}
              </div>
            </div>
            <div style={{ background:"linear-gradient(135deg, var(--ink) 0%, #1a2540 100%)",borderRadius:18,padding:"24px",color:"white" }}>
              <p style={{ fontFamily:"Cormorant Garamond,serif",fontSize:18,fontStyle:"italic",marginBottom:16,lineHeight:1.5,color:"rgba(255,255,255,.8)" }}>
                "Interested in booking {employee.firstName} for your special day?"
              </p>
              <button style={{ width:"100%",background:"var(--gold)",border:"none",color:"var(--ink)",padding:"12px",borderRadius:10,fontSize:14,fontWeight:700 }}>Start a Booking Request</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function LoginPage({ employees, setUser, setView }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const demos = [
    { label:"Admin/Owner", email:"admin@ambience.studio", password:"admin123", role:"admin", firstName:"Studio", lastName:"Admin", avatarUrl:"" },
    ...employees.slice(0,2).map(e=>({ label:e.role, email:e.email, password:"staff123", role:"staff", ...e }))
  ];
  const handleLogin = () => {
    setLoading(true); setError("");
    setTimeout(()=>{
      const demo = demos.find(d=>d.email===email);
      if (demo && password===demo.password) { setUser(demo); setView(demo.role==="admin"?"admin":"staff"); }
      else setError("Invalid credentials. Use a demo account below.");
      setLoading(false);
    }, 700);
  };
  return (
    <div style={{ minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"var(--ink)",padding:24,position:"relative",overflow:"hidden" }}>
      <div style={{ position:"absolute",inset:0,backgroundImage:"radial-gradient(ellipse 60% 50% at 30% 60%, rgba(200,169,110,.08) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 70% 30%, rgba(62,203,160,.06) 0%, transparent 60%)" }} />
      <div className="fade-up" style={{ background:"white",borderRadius:24,padding:"44px 40px",width:"100%",maxWidth:440,boxShadow:"0 24px 80px rgba(0,0,0,.4)",position:"relative" }}>
        <div style={{ textAlign:"center",marginBottom:32 }}>
          <div style={{ width:52,height:52,background:"var(--gold)",borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,margin:"0 auto 16px" }}>◈</div>
          <h1 className="serif" style={{ fontSize:28,fontWeight:600 }}>Welcome back</h1>
          <p style={{ color:"#888",fontSize:14,marginTop:6 }}>Sign in to your Ambience account</p>
        </div>
        <Input label="Email" value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="your@ambience.studio" />
        <Input label="Password" value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="••••••••" />
        {error&&<p style={{ color:"var(--rose)",fontSize:13,marginBottom:16,background:"rgba(232,123,110,.08)",padding:"10px 14px",borderRadius:8 }}>{error}</p>}
        <button onClick={handleLogin} disabled={loading}
          style={{ width:"100%",background:"var(--ink)",color:"white",border:"none",padding:"14px",borderRadius:12,fontSize:15,fontWeight:700,marginBottom:24,opacity:loading?.7:1 }}>
          {loading?"Signing in…":"Sign In →"}
        </button>
        <div style={{ borderTop:"1px solid var(--border)",paddingTop:20 }}>
          <p style={{ fontSize:11,fontWeight:700,color:"#aaa",letterSpacing:".08em",textTransform:"uppercase",marginBottom:12 }}>Demo Accounts</p>
          {demos.map(d=>(
            <button key={d.email} onClick={()=>{ setEmail(d.email); setPassword(d.password); }}
              style={{ display:"flex",justifyContent:"space-between",width:"100%",padding:"10px 14px",borderRadius:10,border:"1.5px solid var(--border)",background:"var(--fog)",fontSize:13,color:"var(--ink)",fontWeight:500,marginBottom:8 }}>
              <span><strong>{d.label}</strong> — {d.email}</span><span style={{ color:"var(--gold)" }}>Use →</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── STAFF DASHBOARD ──────────────────────────────────────────────────────────
function StaffDashboard({ user, employees, setEmployees, toast }) {
  const [tab, setTab] = useState(0);
  const emp = employees.find(e=>e.id===user.id)||employees[0];
  const [form, setForm] = useState({ bio:emp.bio, phone:emp.phone, specialties:emp.specialties.join(", ") });
  const [newPort, setNewPort] = useState({ title:"", mediaUrl:"", visibility:"public" });
  const [showAddPort, setShowAddPort] = useState(false);

  const saveProfile = () => {
    setEmployees(prev=>prev.map(e=>e.id===emp.id?{ ...e, bio:form.bio, phone:form.phone, specialties:form.specialties.split(",").map(s=>s.trim()).filter(Boolean) }:e));
    toast("Profile updated successfully.");
  };
  const addPortfolio = () => {
    if (!newPort.title||!newPort.mediaUrl) return;
    setEmployees(prev=>prev.map(e=>e.id===emp.id?{ ...e, portfolio:[...e.portfolio,{ id:"pi"+Date.now(),...newPort }] }:e));
    setNewPort({ title:"",mediaUrl:"",visibility:"public" }); setShowAddPort(false); toast("Portfolio item added.");
  };
  const deletePort = (id) => {
    setEmployees(prev=>prev.map(e=>e.id===emp.id?{ ...e, portfolio:e.portfolio.filter(p=>p.id!==id) }:e));
    toast("Portfolio item removed.");
  };
  const tabs = ["My Profile","Portfolio","Assignments","Salary"];
  return (
    <div style={{ minHeight:"100vh",background:"var(--fog)" }}>
      <div style={{ background:"var(--ink)",padding:"36px 24px 0" }}>
        <div style={{ maxWidth:960,margin:"0 auto" }}>
          <div style={{ display:"flex",alignItems:"center",gap:18,marginBottom:28 }}>
            <Avatar src={emp.avatarUrl} name={emp.firstName+" "+emp.lastName} size={64} />
            <div>
              <p style={{ fontSize:12,color:"var(--gold)",fontWeight:600,letterSpacing:".08em",textTransform:"uppercase",marginBottom:4 }}>Staff Portal · Ambience</p>
              <h1 className="serif" style={{ fontSize:28,color:"white",fontWeight:600 }}>Hello, {emp.firstName} ✦</h1>
              <p style={{ color:"rgba(255,255,255,.4)",fontSize:13 }}>{emp.role} · Joined {new Date(emp.joinDate).getFullYear()}</p>
            </div>
          </div>
          <div style={{ display:"flex",gap:2 }}>
            {tabs.map((t,i)=>(
              <button key={t} onClick={()=>setTab(i)}
                style={{ padding:"12px 22px",border:"none",borderRadius:"10px 10px 0 0",background:tab===i?"var(--fog)":"transparent",color:tab===i?"var(--ink)":"rgba(255,255,255,.5)",fontSize:14,fontWeight:600 }}>{t}</button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ maxWidth:960,margin:"0 auto",padding:"32px 24px" }}>
        {tab===0&&(
          <div className="fade-up" style={{ background:"white",borderRadius:18,padding:"32px",boxShadow:"var(--shadow)" }}>
            <h2 style={{ fontSize:20,fontWeight:700,marginBottom:24 }}>Edit My Profile</h2>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
              <Input label="First Name" value={emp.firstName} readOnly />
              <Input label="Last Name" value={emp.lastName} readOnly />
              <Input label="Email" value={emp.email} readOnly />
              <Input label="Role" value={emp.role} readOnly />
              <Input label="Phone" value={form.phone||""} onChange={e=>setForm(p=>({ ...p,phone:e.target.value }))} />
              <Input label="Join Date" value={emp.joinDate} readOnly />
            </div>
            <div style={{ marginBottom:16 }}>
              <label style={{ display:"block",fontSize:12,fontWeight:600,color:"#666",marginBottom:6,textTransform:"uppercase",letterSpacing:".05em" }}>Bio (max 800 chars)</label>
              <textarea value={form.bio} onChange={e=>setForm(p=>({ ...p,bio:e.target.value }))} maxLength={800} rows={4}
                style={{ width:"100%",padding:"12px 14px",border:"1.5px solid var(--border)",borderRadius:10,fontSize:14,resize:"vertical",fontFamily:"Outfit,sans-serif" }} />
            </div>
            <Input label="Specialties (comma-separated)" value={form.specialties} onChange={e=>setForm(p=>({ ...p,specialties:e.target.value }))} />
            <div style={{ background:"rgba(200,169,110,.1)",border:"1px solid rgba(200,169,110,.3)",borderRadius:10,padding:"12px 16px",marginBottom:20,fontSize:13,color:"#8a6a30" }}>
              ℹ︎ Your public visibility is managed by the admin only.
            </div>
            <button onClick={saveProfile} style={{ background:"var(--ink)",color:"white",border:"none",padding:"13px 28px",borderRadius:12,fontSize:14,fontWeight:700 }}>Save Changes</button>
          </div>
        )}
        {tab===1&&(
          <div className="fade-up">
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20 }}>
              <h2 style={{ fontSize:20,fontWeight:700 }}>My Portfolio</h2>
              <button onClick={()=>setShowAddPort(true)} style={{ background:"var(--gold)",border:"none",color:"var(--ink)",padding:"11px 22px",borderRadius:10,fontSize:14,fontWeight:700 }}>+ Add Item</button>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(220px,1fr))",gap:18 }}>
              {emp.portfolio.map(item=>(
                <div key={item.id} style={{ background:"white",borderRadius:14,overflow:"hidden",boxShadow:"var(--shadow)" }}>
                  <div style={{ height:180,overflow:"hidden" }}>
                    <img src={item.mediaUrl} alt={item.title} className="port-img" style={{ width:"100%",height:"100%",objectFit:"cover" }} />
                  </div>
                  <div style={{ padding:"14px 16px" }}>
                    <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10 }}>
                      <p style={{ fontSize:14,fontWeight:600 }}>{item.title}</p>
                      <Badge label={item.visibility} color={item.visibility==="public"?"#3ECBA0":"#C8A96E"} />
                    </div>
                    <button onClick={()=>deletePort(item.id)} style={{ width:"100%",background:"rgba(232,123,110,.1)",border:"none",color:"var(--rose)",fontSize:12,fontWeight:600,padding:"8px",borderRadius:8 }}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            {showAddPort&&(
              <Modal title="Add Portfolio Item" onClose={()=>setShowAddPort(false)}>
                <Input label="Title" value={newPort.title} onChange={e=>setNewPort(p=>({ ...p,title:e.target.value }))} />
                <Input label="Image URL" value={newPort.mediaUrl} onChange={e=>setNewPort(p=>({ ...p,mediaUrl:e.target.value }))} placeholder="https://…" />
                <div style={{ marginBottom:16 }}>
                  <label style={{ display:"block",fontSize:12,fontWeight:600,color:"#666",marginBottom:6,textTransform:"uppercase",letterSpacing:".05em" }}>Visibility</label>
                  <select value={newPort.visibility} onChange={e=>setNewPort(p=>({ ...p,visibility:e.target.value }))}
                    style={{ width:"100%",padding:"11px 14px",border:"1.5px solid var(--border)",borderRadius:10,fontSize:14 }}>
                    <option value="public">Public</option><option value="private">Private</option>
                  </select>
                </div>
                <button onClick={addPortfolio} style={{ width:"100%",background:"var(--ink)",color:"white",border:"none",padding:"13px",borderRadius:12,fontSize:15,fontWeight:700 }}>Add Item</button>
              </Modal>
            )}
          </div>
        )}
        {tab===2&&(
          <div className="fade-up">
            <h2 style={{ fontSize:20,fontWeight:700,marginBottom:20 }}>My Assignments</h2>
            {emp.tasks.length===0?<div style={{ background:"white",borderRadius:18,padding:"60px",textAlign:"center",color:"#aaa" }}>No assignments yet.</div>:(
              <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
                {emp.tasks.map(task=>(
                  <div key={task.id} style={{ background:"white",borderRadius:14,padding:"20px 24px",boxShadow:"var(--shadow)",display:"flex",alignItems:"center",gap:16 }}>
                    <div style={{ width:44,height:44,borderRadius:12,background:priorityColor[task.priority]+"15",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20 }}>
                      {task.type==="booking"?"📸":task.type==="event"?"🎉":"⚙️"}
                    </div>
                    <div style={{ flex:1 }}>
                      <p style={{ fontWeight:700,fontSize:15 }}>{task.title}</p>
                      <p style={{ fontSize:12,color:"#888",marginTop:2 }}>{new Date(task.date).toLocaleDateString("en-US",{ weekday:"short",year:"numeric",month:"short",day:"numeric" })} · {task.type}</p>
                    </div>
                    <Badge label={task.priority} color={priorityColor[task.priority]} />
                    <Badge label={task.status} color={statusColor[task.status]||"#888"} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {tab===3&&(
          <div className="fade-up">
            <div style={{ background:"rgba(232,123,110,.08)",border:"1px solid rgba(232,123,110,.2)",borderRadius:12,padding:"14px 18px",marginBottom:24,fontSize:14,color:"#c0503f",display:"flex",alignItems:"center",gap:10 }}>
              🔒 <strong>Salary details are private to you and the studio owner only.</strong>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:28 }}>
              {[{ l:"Base Salary",v:emp.salary.base,c:"#3ECBA0",icon:"💰" },{ l:"Allowances",v:emp.salary.allowances,c:"#5FA8D3",icon:"➕" },{ l:"Deductions",v:emp.salary.deductions,c:"#E87B6E",icon:"➖" }].map(({ l,v,c,icon })=>(
                <div key={l} style={{ background:"white",borderRadius:16,padding:"24px",boxShadow:"var(--shadow)",textAlign:"center" }}>
                  <p style={{ fontSize:22,marginBottom:8 }}>{icon}</p>
                  <p style={{ fontSize:28,fontWeight:800,color:c }}>${v.toLocaleString()}</p>
                  <p style={{ fontSize:12,color:"#999",marginTop:4,textTransform:"uppercase",letterSpacing:".06em" }}>{l}</p>
                </div>
              ))}
            </div>
            <div style={{ background:"white",borderRadius:16,padding:"24px",boxShadow:"var(--shadow)" }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18 }}>
                <p style={{ fontWeight:700,fontSize:16 }}>Net Monthly Pay</p>
                <p style={{ fontSize:24,fontWeight:800 }}>${(emp.salary.base+emp.salary.allowances-emp.salary.deductions).toLocaleString()}<span style={{ fontSize:14,color:"#aaa",fontWeight:400 }}>/mo</span></p>
              </div>
              <h3 style={{ fontSize:13,fontWeight:700,color:"#888",textTransform:"uppercase",letterSpacing:".08em",marginBottom:14 }}>Pay Slips</h3>
              {emp.payslips.length===0?<p style={{ color:"#bbb",fontSize:14 }}>No payslips yet.</p>:(
                <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                  {emp.payslips.map(slip=>(
                    <div key={slip.id} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",background:"var(--fog)",borderRadius:10 }}>
                      <span style={{ fontSize:14,fontWeight:500 }}>📄 {slip.period}</span>
                      <button style={{ background:"none",border:"1.5px solid var(--gold)",color:"var(--gold)",fontSize:12,fontWeight:700,padding:"6px 16px",borderRadius:8 }}>Download</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ADMIN DASHBOARD ──────────────────────────────────────────────────────────
function AdminDashboard({ employees, setEmployees, toast }) {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const [drawerEmp, setDrawerEmp] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskForm, setTaskForm] = useState({ assigneeId:"",title:"",type:"booking",date:"",priority:"normal",note:"" });

  const filtered = employees.filter(e=>!search||`${e.firstName} ${e.lastName} ${e.role} ${e.email}`.toLowerCase().includes(search.toLowerCase()));
  const openEdit = (emp)=>{ setDrawerEmp({ ...emp }); setShowDrawer(true); };
  const openNew = ()=>{ setDrawerEmp({ id:"",firstName:"",lastName:"",email:"",phone:"",role:"Photographer",bio:"",specialties:[],visiblePublic:false,status:"active",joinDate:new Date().toISOString().split("T")[0],avatarUrl:"",coverUrl:"",salary:{ base:0,allowances:0,deductions:0,cycle:"monthly" },payslips:[],tasks:[],portfolio:[] }); setShowDrawer(true); };
  const saveEmployee = ()=>{
    if (!drawerEmp.firstName||!drawerEmp.email) return;
    if (drawerEmp.id) setEmployees(prev=>prev.map(e=>e.id===drawerEmp.id?{ ...e,...drawerEmp }:e));
    else setEmployees(prev=>[...prev,{ ...drawerEmp,id:String(Date.now()) }]);
    setShowDrawer(false); toast(drawerEmp.id?"Employee updated.":"Employee created.");
  };
  const toggleVisibility = (id)=>{ setEmployees(prev=>prev.map(e=>e.id===id?{ ...e,visiblePublic:!e.visiblePublic }:e)); toast("Visibility updated."); };
  const toggleStatus = (id)=>{ setEmployees(prev=>prev.map(e=>e.id===id?{ ...e,status:e.status==="active"?"inactive":"active" }:e)); toast("Status updated."); };
  const assignTask = ()=>{
    if (!taskForm.assigneeId||!taskForm.title) return;
    const task={ id:"t"+Date.now(),title:taskForm.title,type:taskForm.type,date:taskForm.date,priority:taskForm.priority,status:"pending",note:taskForm.note };
    setEmployees(prev=>prev.map(e=>e.id===taskForm.assigneeId?{ ...e,tasks:[...e.tasks,task] }:e));
    setShowTaskModal(false); setTaskForm({ assigneeId:"",title:"",type:"booking",date:"",priority:"normal",note:"" }); toast("Task assigned.");
  };
  const stats={ total:employees.length, active:employees.filter(e=>e.status==="active").length, public:employees.filter(e=>e.visiblePublic).length, tasks:employees.reduce((a,e)=>a+e.tasks.length,0) };
  const tabs = ["Directory","Salary Overview","Task Assignment"];
  return (
    <div style={{ minHeight:"100vh",background:"var(--fog)" }}>
      <div style={{ background:"var(--ink)",padding:"32px 24px 0" }}>
        <div style={{ maxWidth:1200,margin:"0 auto" }}>
          <div style={{ marginBottom:24 }}>
            <p style={{ fontSize:12,color:"var(--gold)",fontWeight:600,letterSpacing:".1em",textTransform:"uppercase",marginBottom:6 }}>Admin Console · Ambience Studio</p>
            <h1 className="serif" style={{ fontSize:28,color:"white",fontWeight:600 }}>Employee Management</h1>
          </div>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:28 }}>
            {[{ l:"Total Staff",v:stats.total,icon:"👥" },{ l:"Active",v:stats.active,icon:"✅" },{ l:"Public Profiles",v:stats.public,icon:"🌐" },{ l:"Open Tasks",v:stats.tasks,icon:"📋" }].map(({ l,v,icon })=>(
              <div key={l} style={{ background:"rgba(255,255,255,.06)",borderRadius:12,padding:"16px 20px",border:"1px solid rgba(255,255,255,.08)" }}>
                <p style={{ fontSize:20,marginBottom:6 }}>{icon}</p>
                <p style={{ fontSize:24,fontWeight:800,color:"white" }}>{v}</p>
                <p style={{ fontSize:12,color:"rgba(255,255,255,.4)",textTransform:"uppercase",letterSpacing:".06em" }}>{l}</p>
              </div>
            ))}
          </div>
          <div style={{ display:"flex",gap:2 }}>
            {tabs.map((t,i)=>(
              <button key={t} onClick={()=>setTab(i)}
                style={{ padding:"12px 22px",border:"none",borderRadius:"10px 10px 0 0",background:tab===i?"var(--fog)":"transparent",color:tab===i?"var(--ink)":"rgba(255,255,255,.5)",fontSize:14,fontWeight:600 }}>{t}</button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ maxWidth:1200,margin:"0 auto",padding:"28px 24px" }}>
        {tab===0&&(
          <div className="fade-up">
            <div style={{ display:"flex",gap:12,marginBottom:20,alignItems:"center" }}>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search employees…"
                style={{ flex:1,padding:"11px 16px",border:"1.5px solid var(--border)",borderRadius:10,fontSize:14,background:"white" }} />
              <button onClick={openNew} style={{ background:"var(--gold)",border:"none",color:"var(--ink)",padding:"12px 24px",borderRadius:10,fontSize:14,fontWeight:700,whiteSpace:"nowrap" }}>+ Add Employee</button>
            </div>
            <div style={{ background:"white",borderRadius:18,boxShadow:"var(--shadow)",overflow:"hidden" }}>
              <table style={{ width:"100%",borderCollapse:"collapse",fontSize:14 }}>
                <thead>
                  <tr style={{ background:"var(--fog)",borderBottom:"1px solid var(--border)" }}>
                    {["Employee","Role","Visibility","Status","Tasks","Actions"].map(h=>(
                      <th key={h} style={{ padding:"12px 18px",textAlign:"left",fontSize:11,fontWeight:700,color:"#888",textTransform:"uppercase",letterSpacing:".08em" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((emp,i)=>(
                    <tr key={emp.id} style={{ borderBottom:"1px solid var(--border)",background:i%2?"var(--fog)":"white" }}>
                      <td style={{ padding:"14px 18px" }}>
                        <div style={{ display:"flex",alignItems:"center",gap:12 }}>
                          <Avatar src={emp.avatarUrl} name={emp.firstName+" "+emp.lastName} size={36} />
                          <div><p style={{ fontWeight:600 }}>{emp.firstName} {emp.lastName}</p><p style={{ fontSize:12,color:"#999" }}>{emp.email}</p></div>
                        </div>
                      </td>
                      <td style={{ padding:"14px 18px" }}><Badge label={emp.role} color={roleColor[emp.role]} bg={roleBg[emp.role]} /></td>
                      <td style={{ padding:"14px 18px" }}>
                        <button onClick={()=>toggleVisibility(emp.id)} style={{ background:emp.visiblePublic?"rgba(62,203,160,.12)":"var(--fog2)",color:emp.visiblePublic?"#2a9d7e":"#888",border:"none",padding:"5px 14px",borderRadius:20,fontSize:12,fontWeight:700 }}>
                          {emp.visiblePublic?"🌐 Public":"🔒 Hidden"}
                        </button>
                      </td>
                      <td style={{ padding:"14px 18px" }}>
                        <button onClick={()=>toggleStatus(emp.id)} style={{ background:emp.status==="active"?"rgba(95,168,211,.12)":"rgba(232,123,110,.12)",color:emp.status==="active"?"#2a7fa0":"#c04030",border:"none",padding:"5px 14px",borderRadius:20,fontSize:12,fontWeight:700 }}>
                          {emp.status==="active"?"● Active":"○ Inactive"}
                        </button>
                      </td>
                      <td style={{ padding:"14px 18px",color:"#666" }}>{emp.tasks.length}</td>
                      <td style={{ padding:"14px 18px" }}>
                        <button onClick={()=>openEdit(emp)} style={{ background:"var(--fog)",border:"none",color:"var(--ink)",padding:"6px 14px",borderRadius:8,fontSize:12,fontWeight:600 }}>Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {tab===1&&(
          <div className="fade-up">
            <h2 style={{ fontSize:20,fontWeight:700,marginBottom:20 }}>Salary Overview</h2>
            <div style={{ display:"flex",flexDirection:"column",gap:14 }}>
              {employees.map(emp=>(
                <div key={emp.id} style={{ background:"white",borderRadius:16,padding:"20px 24px",boxShadow:"var(--shadow)",display:"flex",alignItems:"center",gap:20,flexWrap:"wrap" }}>
                  <Avatar src={emp.avatarUrl} name={emp.firstName+" "+emp.lastName} size={44} />
                  <div style={{ flex:1 }}><p style={{ fontWeight:700 }}>{emp.firstName} {emp.lastName}</p><p style={{ fontSize:12,color:"#888" }}>{emp.role}</p></div>
                  {["base","allowances","deductions"].map(k=>(
                    <div key={k} style={{ textAlign:"center",minWidth:100 }}>
                      <p style={{ fontSize:18,fontWeight:800,color:k==="deductions"?"var(--rose)":k==="allowances"?"var(--sky)":"var(--ink)" }}>${emp.salary[k].toLocaleString()}</p>
                      <p style={{ fontSize:11,color:"#aaa",textTransform:"uppercase",letterSpacing:".06em" }}>{k}</p>
                    </div>
                  ))}
                  <div style={{ textAlign:"center",minWidth:100,padding:"10px 16px",background:"var(--fog)",borderRadius:10 }}>
                    <p style={{ fontSize:18,fontWeight:800,color:"var(--mint)" }}>${(emp.salary.base+emp.salary.allowances-emp.salary.deductions).toLocaleString()}</p>
                    <p style={{ fontSize:11,color:"#aaa",textTransform:"uppercase",letterSpacing:".06em" }}>Net Pay</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab===2&&(
          <div className="fade-up">
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20 }}>
              <h2 style={{ fontSize:20,fontWeight:700 }}>Task Assignment</h2>
              <button onClick={()=>setShowTaskModal(true)} style={{ background:"var(--gold)",border:"none",color:"var(--ink)",padding:"11px 22px",borderRadius:10,fontSize:14,fontWeight:700 }}>+ Assign Task</button>
            </div>
            <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
              {employees.flatMap(emp=>emp.tasks.map(task=>({ ...task,empName:emp.firstName+" "+emp.lastName,empAvatar:emp.avatarUrl,empRole:emp.role }))).sort((a,b)=>new Date(a.date)-new Date(b.date)).map(task=>(
                <div key={task.id} style={{ background:"white",borderRadius:14,padding:"18px 22px",boxShadow:"var(--shadow)",display:"flex",alignItems:"center",gap:16 }}>
                  <Avatar src={task.empAvatar} name={task.empName} size={40} />
                  <div style={{ flex:1 }}><p style={{ fontWeight:700 }}>{task.title}</p><p style={{ fontSize:12,color:"#888",marginTop:2 }}>Assigned to {task.empName} · {task.empRole}</p></div>
                  <div style={{ fontSize:13,color:"#666" }}>{new Date(task.date).toLocaleDateString("en-US",{ month:"short",day:"numeric" })}</div>
                  <Badge label={task.priority} color={priorityColor[task.priority]} />
                  <Badge label={task.status} color={statusColor[task.status]||"#888"} />
                </div>
              ))}
            </div>
            {showTaskModal&&(
              <Modal title="Assign Task" onClose={()=>setShowTaskModal(false)}>
                <div style={{ marginBottom:16 }}>
                  <label style={{ display:"block",fontSize:12,fontWeight:600,color:"#666",marginBottom:6,textTransform:"uppercase",letterSpacing:".05em" }}>Assign To</label>
                  <select value={taskForm.assigneeId} onChange={e=>setTaskForm(p=>({ ...p,assigneeId:e.target.value }))}
                    style={{ width:"100%",padding:"11px 14px",border:"1.5px solid var(--border)",borderRadius:10,fontSize:14 }}>
                    <option value="">Select employee…</option>
                    {employees.filter(e=>e.status==="active").map(e=><option key={e.id} value={e.id}>{e.firstName} {e.lastName} — {e.role}</option>)}
                  </select>
                </div>
                <Input label="Task Title" value={taskForm.title} onChange={e=>setTaskForm(p=>({ ...p,title:e.target.value }))} />
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
                  <div>
                    <label style={{ display:"block",fontSize:12,fontWeight:600,color:"#666",marginBottom:6,textTransform:"uppercase",letterSpacing:".05em" }}>Type</label>
                    <select value={taskForm.type} onChange={e=>setTaskForm(p=>({ ...p,type:e.target.value }))}
                      style={{ width:"100%",padding:"11px 14px",border:"1.5px solid var(--border)",borderRadius:10,fontSize:14 }}>
                      <option value="booking">Booking</option><option value="event">Event</option><option value="ops">Operations</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display:"block",fontSize:12,fontWeight:600,color:"#666",marginBottom:6,textTransform:"uppercase",letterSpacing:".05em" }}>Priority</label>
                    <select value={taskForm.priority} onChange={e=>setTaskForm(p=>({ ...p,priority:e.target.value }))}
                      style={{ width:"100%",padding:"11px 14px",border:"1.5px solid var(--border)",borderRadius:10,fontSize:14 }}>
                      <option value="normal">Normal</option><option value="high">High</option>
                    </select>
                  </div>
                </div>
                <Input label="Date" value={taskForm.date} onChange={e=>setTaskForm(p=>({ ...p,date:e.target.value }))} type="date" />
                <button onClick={assignTask} style={{ width:"100%",background:"var(--ink)",color:"white",border:"none",padding:"14px",borderRadius:12,fontSize:15,fontWeight:700,marginTop:8 }}>Assign Task</button>
              </Modal>
            )}
          </div>
        )}
      </div>
      {showDrawer&&drawerEmp&&(
        <div style={{ position:"fixed",inset:0,zIndex:500,display:"flex",justifyContent:"flex-end" }} onClick={()=>setShowDrawer(false)}>
          <div style={{ width:"100%",maxWidth:460,background:"white",height:"100%",boxShadow:"-8px 0 40px rgba(0,0,0,.15)",display:"flex",flexDirection:"column",animation:"slideIn .3s ease",overflowY:"auto" }} onClick={e=>e.stopPropagation()}>
            <div style={{ padding:"24px 28px",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center" }}>
              <h3 style={{ fontSize:19,fontWeight:700 }}>{drawerEmp.id?"Edit Employee":"Add Employee"}</h3>
              <button onClick={()=>setShowDrawer(false)} style={{ background:"var(--fog2)",border:"none",width:34,height:34,borderRadius:"50%",fontSize:18,color:"#666",display:"flex",alignItems:"center",justifyContent:"center" }}>×</button>
            </div>
            <div style={{ padding:"24px 28px",flex:1 }}>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12 }}>
                <Input label="First Name" value={drawerEmp.firstName} onChange={e=>setDrawerEmp(p=>({ ...p,firstName:e.target.value }))} />
                <Input label="Last Name" value={drawerEmp.lastName} onChange={e=>setDrawerEmp(p=>({ ...p,lastName:e.target.value }))} />
              </div>
              <Input label="Email" value={drawerEmp.email} onChange={e=>setDrawerEmp(p=>({ ...p,email:e.target.value }))} type="email" />
              <Input label="Phone" value={drawerEmp.phone||""} onChange={e=>setDrawerEmp(p=>({ ...p,phone:e.target.value }))} />
              <div style={{ marginBottom:16 }}>
                <label style={{ display:"block",fontSize:12,fontWeight:600,color:"#666",marginBottom:6,textTransform:"uppercase",letterSpacing:".05em" }}>Role</label>
                <select value={drawerEmp.role} onChange={e=>setDrawerEmp(p=>({ ...p,role:e.target.value }))}
                  style={{ width:"100%",padding:"11px 14px",border:"1.5px solid var(--border)",borderRadius:10,fontSize:14 }}>
                  {["Photographer","Editor","Assistant"].map(r=><option key={r}>{r}</option>)}
                </select>
              </div>
              <div style={{ marginBottom:16 }}>
                <label style={{ display:"block",fontSize:12,fontWeight:600,color:"#666",marginBottom:6,textTransform:"uppercase",letterSpacing:".05em" }}>Bio</label>
                <textarea value={drawerEmp.bio||""} onChange={e=>setDrawerEmp(p=>({ ...p,bio:e.target.value }))} maxLength={800} rows={3}
                  style={{ width:"100%",padding:"11px 14px",border:"1.5px solid var(--border)",borderRadius:10,fontSize:14,resize:"vertical",fontFamily:"Outfit,sans-serif" }} />
              </div>
              <Input label="Join Date" value={drawerEmp.joinDate} onChange={e=>setDrawerEmp(p=>({ ...p,joinDate:e.target.value }))} type="date" />
              <div style={{ display:"flex",gap:20,marginBottom:20 }}>
                <label style={{ display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:14 }}>
                  <input type="checkbox" checked={drawerEmp.visiblePublic} onChange={e=>setDrawerEmp(p=>({ ...p,visiblePublic:e.target.checked }))} style={{ width:16,height:16,accentColor:"var(--gold)" }} />
                  Publicly visible
                </label>
                <label style={{ display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:14 }}>
                  <input type="checkbox" checked={drawerEmp.status==="active"} onChange={e=>setDrawerEmp(p=>({ ...p,status:e.target.checked?"active":"inactive" }))} style={{ width:16,height:16,accentColor:"var(--gold)" }} />
                  Active
                </label>
              </div>
            </div>
            <div style={{ padding:"20px 28px",borderTop:"1px solid var(--border)",display:"flex",gap:12 }}>
              <button onClick={()=>setShowDrawer(false)} style={{ flex:1,padding:"13px",border:"1.5px solid var(--border)",borderRadius:12,background:"white",color:"#555",fontSize:14,fontWeight:600 }}>Cancel</button>
              <button onClick={saveEmployee} style={{ flex:1,padding:"13px",border:"none",borderRadius:12,background:"var(--ink)",color:"white",fontSize:14,fontWeight:700 }}>Save Employee</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("directory");
  const [user, setUser] = useState(null);
  const [employees, setEmployees] = useState(MOCK_EMPLOYEES);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [toastMsg, setToastMsg] = useState("");
  const toast = (msg)=>setToastMsg(msg);
  return (
    <>
      <style>{css}</style>
      {view!=="login"&&<Nav view={view} setView={setView} user={user} setUser={setUser} />}
      {view==="directory"&&<DirectoryPage employees={employees} setView={setView} setSelectedEmployee={setSelectedEmployee} />}
      {view==="profile"&&<ProfilePage employee={selectedEmployee} setView={setView} />}
      {view==="login"&&<LoginPage employees={employees} setUser={setUser} setView={setView} />}
      {view==="staff"&&user&&<StaffDashboard user={user} employees={employees} setEmployees={setEmployees} toast={toast} />}
      {view==="admin"&&<AdminDashboard employees={employees} setEmployees={setEmployees} toast={toast} />}
      {toastMsg&&<Toast msg={toastMsg} onDone={()=>setToastMsg("")} />}
    </>
  );
}
