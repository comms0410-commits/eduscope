const navigation = [
  { label: "서비스", href: "#service" },
  { label: "타기팅", href: "#targeting" },
  { label: "활용 분야", href: "#useCases" },
  { label: "진행 절차", href: "#process" },
  { label: "고객 사례", href: "#cases" }
];

const targetFilters = ["근무 지역", "업종", "기업 규모", "직무", "직급", "경력", "소속 부서"];
const targetingFlow = [
  ["전체 패널", "비즈니스 응답자"], ["지역", "수도권"], ["업종", "IT · 통신"],
  ["기업 규모", "300명 이상"], ["직무", "인사 · 총무"], ["직급", "팀장 이상"], ["최종 타깃", "조건 일치 그룹"]
];

const researchCategories = [
  { number: "01", title: "고객·시장 리서치", description: "현재 고객과 잠재 고객의 생각, 행동, 구매 맥락을 파악합니다.", items: ["고객 니즈 조사", "구매·선택 요인", "고객 만족도", "시장 기회 탐색"], graphic: "bars" },
  { number: "02", title: "경쟁·포지셔닝 리서치", description: "시장 안에서 자사와 경쟁사의 위치 및 차별 요소를 확인합니다.", items: ["경쟁사 벤치마킹", "시장 포지셔닝", "경쟁 고객 분석", "브랜드 파워"], graphic: "position" },
  { number: "03", title: "제품·서비스 리서치", description: "새로운 제품과 서비스가 해결할 문제와 시장 가능성을 검증합니다.", items: ["신사업 타당성", "콘셉트 테스트", "가격 수용도", "브랜드 인식"], graphic: "donut" },
  { number: "04", title: "전문가·사용자 인터뷰", description: "설문만으로 발견하기 어려운 현장의 맥락과 깊은 의견을 수집합니다.", items: ["전문가 인터뷰", "사용자 인터뷰", "FGI 좌담회", "사용성 테스트"], graphic: "people" }
];

const processSteps = [
  { number: "01", title: "조건 확인", description: "조사 목적과 활용 방식을 확인하고 적합한 응답자 조건과 방법론을 정합니다." },
  { number: "02", title: "리서치 설계", description: "전문 리서처가 목적에 맞는 문항, 표본 구성, 조사 방식을 구체화합니다." },
  { number: "03", title: "조사 진행", description: "선별된 대상자에게 조사를 전달하고 품질 기준에 맞춰 응답을 수집합니다." },
  { number: "04", title: "분석 및 보고", description: "수집 데이터를 분석하고 의사결정에 바로 활용할 핵심 인사이트를 제공합니다." }
];

const testimonials = [
  { role: "B2B 소프트웨어 기업 · 전략 리드", title: "막연했던 잠재 고객을 구체적인 조건으로 정의할 수 있었습니다.", quote: "산업과 기업 규모, 의사결정 역할을 함께 설정하니 제품 도입 가능성이 높은 그룹의 요구를 선명하게 확인할 수 있었습니다.", tag: "제품 콘셉트 조사" },
  { role: "교육 서비스 기업 · 사업개발 책임자", title: "새 시장에 진입하기 전 확인해야 할 질문이 명확해졌습니다.", quote: "설문 설계 단계부터 함께 가설을 정리해 주어 단순한 선호도 수치가 아니라 실제 사업 판단에 필요한 근거를 얻었습니다.", tag: "시장 진입 조사" },
  { role: "산업 연구기관 · 선임 연구원", title: "접촉하기 어려운 현업 전문가의 목소리를 들었습니다.", quote: "세부 경력과 담당 업무를 기준으로 인터뷰 대상을 구성해, 공개 자료만으로는 알기 어려운 산업의 변화와 맥락을 파악했습니다.", tag: "전문가 인터뷰" },
  { role: "소비재 기업 · 브랜드 매니저", title: "조사 결과가 다음 캠페인의 구체적인 기준이 됐습니다.", quote: "고객군별 인식 차이를 교차 분석해 메시지와 채널 우선순위를 빠르게 합의할 수 있었습니다.", tag: "브랜드 인식 조사" }
];

const clients = ["SOFTWARE", "FINANCE", "MOBILITY", "MANUFACTURING", "EDUCATION", "RETAIL", "CONSULTING", "STARTUP"];

const $ = (selector) => document.querySelector(selector);
const renderNav = (className = "") => navigation.map(item => `<a class="${className}" href="${item.href}">${item.label}</a>`).join("");
$("#desktopNav").innerHTML = renderNav();
$("#mobileNavigation").innerHTML = `${renderNav()}<a class="mobile-contact" href="#contact" data-inquiry="quote">견적 문의하기</a>`;

$("#targetFilters").innerHTML = targetFilters.map((filter, index) => `<div class="filter-chip"><span>${String(index + 1).padStart(2, "0")}</span><b>${filter}</b><i aria-hidden="true">+</i></div>`).join("");
$("#targetingFlow").innerHTML = targetingFlow.map(([label, value], index) => `<div class="flow-step ${index === targetingFlow.length - 1 ? "active" : ""}"><span>${String(index + 1).padStart(2, "0")}</span><small>${label}</small><strong>${value}</strong></div>`).join("");

function categoryGraphic(type) {
  if (type === "bars") return `<div class="graphic-bars"><i></i><i></i><i></i><i></i></div>`;
  if (type === "position") return `<div class="graphic-position"><i></i><i></i><i></i><span></span></div>`;
  if (type === "donut") return `<div class="graphic-donut"><span>68<small>%</small></span></div>`;
  return `<div class="graphic-people"><i>UX</i><i>PM</i><i>EX</i></div>`;
}

$("#categoryGrid").innerHTML = researchCategories.map(category => `<article class="category-card"><div class="category-top"><span>${category.number}</span>${categoryGraphic(category.graphic)}</div><h3>${category.title}</h3><p>${category.description}</p><ul>${category.items.map(item => `<li>${item}</li>`).join("")}</ul></article>`).join("");
$("#processGrid").innerHTML = processSteps.map(step => `<article class="process-step"><span>${step.number}</span><div class="process-icon" aria-hidden="true"><i></i><i></i></div><h3>${step.title}</h3><p>${step.description}</p></article>`).join("");
$("#clientGrid").innerHTML = clients.map((client, index) => `<div><span class="client-symbol symbol-${index % 4}" aria-hidden="true"></span><b>${client}</b></div>`).join("");

const menuToggle = $("#menuToggle");
const mobileNav = $("#mobileNavigation");
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "메뉴 열기" : "메뉴 닫기");
  mobileNav.hidden = isOpen;
  document.body.classList.toggle("menu-open", !isOpen);
});
mobileNav.addEventListener("click", event => {
  if (!event.target.closest("a")) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "메뉴 열기");
  mobileNav.hidden = true;
  document.body.classList.remove("menu-open");
});

const testimonialTrack = $("#testimonialTrack");
const sliderDots = $("#sliderDots");
testimonialTrack.tabIndex = 0;
testimonialTrack.setAttribute("aria-label", "고객 후기 슬라이더. 좌우 방향키로 이동할 수 있습니다.");
let currentSlide = 0;
let sliderPaused = false;
let sliderTimer;
let touchStartX = 0;

testimonialTrack.innerHTML = testimonials.map((item, index) => `<article class="testimonial-card" aria-hidden="${index !== 0}"><div class="quote-mark" aria-hidden="true">“</div><span class="testimonial-tag">${item.tag}</span><h3>${item.title}</h3><blockquote>${item.quote}</blockquote><p>${item.role}</p></article>`).join("");
sliderDots.innerHTML = testimonials.map((_, index) => `<button type="button" aria-label="${index + 1}번째 후기 보기" data-slide="${index}" class="${index === 0 ? "active" : ""}"></button>`).join("");

function showSlide(index) {
  currentSlide = (index + testimonials.length) % testimonials.length;
  testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  testimonialTrack.querySelectorAll(".testimonial-card").forEach((card, cardIndex) => card.setAttribute("aria-hidden", String(cardIndex !== currentSlide)));
  sliderDots.querySelectorAll("button").forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === currentSlide));
}
function restartSlider() { clearInterval(sliderTimer); if (!sliderPaused) sliderTimer = setInterval(() => showSlide(currentSlide + 1), 6000); }
$("#prevTestimonial").addEventListener("click", () => { showSlide(currentSlide - 1); restartSlider(); });
$("#nextTestimonial").addEventListener("click", () => { showSlide(currentSlide + 1); restartSlider(); });
sliderDots.addEventListener("click", event => { const dot = event.target.closest("button"); if (dot) { showSlide(Number(dot.dataset.slide)); restartSlider(); } });
$("#sliderPause").addEventListener("click", event => { sliderPaused = !sliderPaused; event.currentTarget.textContent = sliderPaused ? "재생" : "일시 정지"; event.currentTarget.setAttribute("aria-label", sliderPaused ? "후기 자동 재생 시작" : "후기 자동 재생 일시 정지"); restartSlider(); });
testimonialTrack.addEventListener("keydown", event => { if (event.key === "ArrowLeft") showSlide(currentSlide - 1); if (event.key === "ArrowRight") showSlide(currentSlide + 1); });
testimonialTrack.addEventListener("touchstart", event => { touchStartX = event.changedTouches[0].clientX; }, { passive: true });
testimonialTrack.addEventListener("touchend", event => {
  const distance = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(distance) < 45) return;
  showSlide(currentSlide + (distance < 0 ? 1 : -1));
  restartSlider();
}, { passive: true });
restartSlider();

document.addEventListener("click", event => {
  const trigger = event.target.closest("[data-inquiry]");
  if (!trigger) return;
  const value = trigger.dataset.inquiry === "quote" ? "견적 문의" : "소개서 신청";
  requestAnimationFrame(() => {
    const radio = document.querySelector(`input[name="inquiryType"][value="${value}"]`);
    if (radio) radio.checked = true;
  });
});

const header = $("#header");
window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 24), { passive: true });

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".desktop-nav a")];
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
}), { rootMargin: "-35% 0px -60%", threshold: 0 });
sections.forEach(section => observer.observe(section));
