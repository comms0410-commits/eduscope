const seedSources = [
  {id:"unesco-genai",category:"정책",title:"생성형 AI의 교육·연구 활용 가이드",source:"UNESCO",publishedAt:"2023-09-07",checkedAt:"2026-06-13",url:"https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research",summary:"교육기관이 생성형 AI를 인간 중심적으로 도입할 수 있도록 데이터 보호, 연령 제한, 윤리적 검증과 정책 프레임워크를 제안한다.",tags:["생성형 AI","윤리","거버넌스"]},
  {id:"wef-jobs",category:"인재",title:"Future of Jobs Report 2025",source:"World Economic Forum",publishedAt:"2025-01-07",checkedAt:"2026-06-13",url:"https://www.weforum.org/publications/the-future-of-jobs-report-2025/",summary:"기술 변화와 AI 확산에 따른 직무 및 핵심 역량 변화를 분석하며, 재교육과 역량 전환 수요를 글로벌 고용주 조사로 제시한다.",tags:["직무 변화","업스킬링","글로벌"]},
  {id:"oecd-digital",category:"시장",title:"Digital Education Outlook 2023",source:"OECD",publishedAt:"2023-12-13",checkedAt:"2026-06-13",url:"https://www.oecd.org/en/publications/oecd-digital-education-outlook-2023_c74f03de-en.html",summary:"디지털 교육 생태계의 거버넌스와 데이터 활용 구조를 비교하고, 효과적인 디지털 전환에 필요한 공공 인프라와 정책 방향을 다룬다.",tags:["디지털 전환","데이터","공교육"]},
  {id:"stanford-ai",category:"기술",title:"AI Index Report 2025",source:"Stanford HAI",publishedAt:"2025-04-07",checkedAt:"2026-06-13",url:"https://hai.stanford.edu/ai-index/2025-ai-index-report",summary:"AI 성능, 투자, 도입, 정책과 교육을 아우르는 지표를 제공해 기술 발전 속도와 산업 확산의 맥락을 비교할 수 있다.",tags:["AI 지표","투자","기술 동향"]},
  {id:"unesco-gem",category:"정책",title:"2023 GEM Report: Technology in education",source:"UNESCO GEM Report",publishedAt:"2023-07-26",checkedAt:"2026-06-13",url:"https://www.unesco.org/gem-report/en/technology",summary:"교육 기술은 학습 목표와 형평성을 중심으로 평가되어야 하며 접근성, 거버넌스, 교사 준비도라는 조건이 함께 충족되어야 한다고 강조한다.",tags:["에듀테크","형평성","교사"]},
  {id:"ec-ai-act",category:"정책",title:"AI Act: 교육 분야 고위험 시스템 규정",source:"European Commission",publishedAt:"2024-08-01",checkedAt:"2026-06-13",url:"https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",summary:"교육 접근이나 평가에 사용되는 일부 AI 시스템을 고위험 범주로 다루며 투명성, 위험관리, 인간 감독 의무의 시장 영향을 보여준다.",tags:["AI 규제","유럽","위험관리"]}
];

const key="eduscope-custom-sources";
let sources=[...seedSources,...JSON.parse(localStorage.getItem(key)||"[]")];
let visibleSources=[];
const $=selector=>document.querySelector(selector);
const grid=$("#sourceGrid");
const formatDate=value=>new Intl.DateTimeFormat("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(`${value}T00:00:00`));
const escapeHtml=value=>String(value).replace(/[&<>'"]/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));

function render(){
  const term=$("#searchInput").value.trim().toLowerCase();
  const category=$("#categoryFilter").value;
  const sort=$("#sortFilter").value;
  visibleSources=sources.filter(item=>category==="all"||item.category===category).filter(item=>[item.title,item.source,item.summary,...item.tags].join(" ").toLowerCase().includes(term));
  visibleSources.sort((a,b)=>sort==="source"?a.source.localeCompare(b.source,"ko"):sort==="oldest"?a.publishedAt.localeCompare(b.publishedAt):b.publishedAt.localeCompare(a.publishedAt));
  grid.innerHTML=visibleSources.map((item,index)=>`<article class="source-card"><div class="card-top"><span class="category">${escapeHtml(item.category)} · REF ${String(index+1).padStart(2,"0")}</span><span class="date">${formatDate(item.publishedAt)}</span></div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.summary)}</p><div class="tags">${item.tags.map(tag=>`<span>${escapeHtml(tag)}</span>`).join("")}</div><div class="citation"><div><small>SOURCE · CHECKED ${formatDate(item.checkedAt)}</small><strong>${escapeHtml(item.source)}</strong></div><a href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(item.title)} 원문 열기">↗</a></div></article>`).join("");
  $("#emptyState").hidden=visibleSources.length>0;
  $("#totalCount").textContent=sources.length;
  $("#sourceCount").textContent=new Set(sources.map(item=>item.source)).size;
  $("#latestDate").textContent=sources.reduce((max,item)=>item.publishedAt>max?item.publishedAt:max,"-").slice(0,7).replace("-",".");
  $("#contextCount").textContent=visibleSources.length;
}

[$("#searchInput"),$("#categoryFilter"),$("#sortFilter")].forEach(el=>el.addEventListener(el.tagName==="INPUT"?"input":"change",render));
document.querySelectorAll("[data-prompt]").forEach(button=>button.addEventListener("click",()=>{$("#question").value=button.dataset.prompt;$("#question").focus()}));

const modal=$("#addModal");
$("#openAddModal").addEventListener("click",()=>modal.showModal());
$("#closeModal").addEventListener("click",()=>modal.close());
$("#sourceForm").addEventListener("submit",event=>{
  event.preventDefault();
  const data=Object.fromEntries(new FormData(event.currentTarget));
  const custom=JSON.parse(localStorage.getItem(key)||"[]");
  custom.unshift({...data,id:crypto.randomUUID(),checkedAt:new Date().toISOString().slice(0,10),tags:data.tags.split(",").map(tag=>tag.trim()).filter(Boolean)});
  localStorage.setItem(key,JSON.stringify(custom));
  sources=[...seedSources,...custom];event.currentTarget.reset();modal.close();render();
});

$("#exportCsv").addEventListener("click",()=>{
  const columns=["title","source","category","publishedAt","checkedAt","url","summary","tags"];
  const csv=[columns.join(","),...visibleSources.map(item=>columns.map(column=>`"${String(column==="tags"?item.tags.join("|"):item[column]).replaceAll('"','""')}"`).join(","))].join("\n");
  const link=document.createElement("a");link.href=URL.createObjectURL(new Blob(["\ufeff",csv],{type:"text/csv;charset=utf-8"}));link.download=`eduscope-${new Date().toISOString().slice(0,10)}.csv`;link.click();URL.revokeObjectURL(link.href);
});

$("#analysisForm").addEventListener("submit",async event=>{
  event.preventDefault();const button=event.currentTarget.querySelector("button[type=submit]");const answer=$("#answer");
  answer.hidden=false;answer.className="answer";answer.textContent="근거를 연결해 분석하고 있습니다...";button.disabled=true;
  try{
    const response=await fetch("/.netlify/functions/analyze",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:$("#question").value,sources:visibleSources})});
    const data=await response.json();if(!response.ok)throw new Error(data.error||"분석 요청에 실패했습니다.");answer.textContent=data.answer;
  }catch(error){answer.classList.add("error");answer.textContent=error.message.includes("Failed to fetch")?"로컬 정적 서버에서는 AI 함수를 호출할 수 없습니다. Netlify 배포 후 OPENAI_API_KEY를 설정하거나 Netlify Dev로 실행하세요.":error.message}
  finally{button.disabled=false}
});
render();
