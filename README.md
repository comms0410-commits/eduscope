# EDU:SCOPE Research

B2B 시장조사 의뢰를 위한 반응형 랜딩 페이지입니다. 비즈니스 프로필 기반 응답자 타기팅, 조사 활용 분야, 진행 절차와 문의 접수 흐름을 제공합니다.

## 주요 기능

- 비즈니스 프로필 기반 타기팅 시각화
- 배열 데이터 기반 활용 분야, 진행 절차, 후기, 산업군 렌더링
- 키보드 조작과 자동 재생 일시 정지를 지원하는 후기 슬라이더
- 모바일 햄버거 메뉴와 하단 고정 CTA
- Netlify Forms 기반 소개서 및 견적 문의 접수
- 데스크톱, 태블릿, 모바일 반응형 UI

## 로컬 실행

Node.js 18 이상이 필요합니다.

```bash
npm install
cp .env.example .env
npm run dev
```

`.env`에 실제 `OPENAI_API_KEY`를 입력하면 AI 분석 기능도 로컬에서 동작합니다. 단순 화면 확인은 정적 서버로 `index.html`을 열어도 됩니다.

## Netlify 배포

1. GitHub 저장소를 Netlify의 **Add new site > Import an existing project**에서 연결합니다.
2. 빌드 설정은 `netlify.toml`에서 자동 인식됩니다. 별도 빌드 명령은 필요 없습니다.
3. **Site configuration > Environment variables**에 `OPENAI_API_KEY`를 등록합니다.
4. 선택적으로 `OPENAI_MODEL`을 등록합니다. 기본값은 `gpt-5-mini`입니다.
5. Deploy를 실행합니다.

API 키는 프론트엔드 코드에 넣지 마세요. 서버 측 Netlify 환경 변수로만 관리합니다.

## 데이터 운영 원칙

샘플 자료는 서비스 구조를 보여주기 위한 초기 데이터입니다. 실제 의사결정 전에는 원문 링크에서 최신 내용과 날짜를 다시 확인하세요. 사용자가 추가한 자료는 현재 브라우저의 `localStorage`에 저장되며, 여러 사용자 간 공유가 필요할 경우 Supabase 또는 별도 데이터베이스 연결이 필요합니다.
