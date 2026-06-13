# EDU:SCOPE

AI 교육 분야의 정책, 시장, 기술, 인재 자료를 출처와 날짜 중심으로 관리하고 GPT로 분석하는 시장조사 웹 서비스입니다.

## 주요 기능

- 출처 기관, 발행일, 확인일, 원문 URL을 포함하는 근거 카드
- 키워드 검색, 분야 필터, 발행일/기관 정렬
- 사용자 자료 추가 및 브라우저 로컬 저장
- 현재 필터 결과 CSV 내보내기
- Netlify Function을 통한 안전한 OpenAI Responses API 호출
- 답변의 각 주장에 근거 번호를 표시하도록 설계된 분석 프롬프트

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
