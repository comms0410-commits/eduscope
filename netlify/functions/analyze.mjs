const json=(statusCode,body)=>({statusCode,headers:{"Content-Type":"application/json; charset=utf-8","Access-Control-Allow-Origin":"*"},body:JSON.stringify(body)});

export async function handler(event){
  if(event.httpMethod==="OPTIONS")return json(200,{});
  if(event.httpMethod!=="POST")return json(405,{error:"POST 요청만 지원합니다."});
  if(!process.env.OPENAI_API_KEY)return json(503,{error:"Netlify 환경 변수 OPENAI_API_KEY가 설정되지 않았습니다."});
  try{
    const {question,sources=[]}=JSON.parse(event.body||"{}");
    if(!question?.trim())return json(400,{error:"리서치 질문을 입력해 주세요."});
    if(!Array.isArray(sources)||sources.length===0)return json(400,{error:"분석할 자료가 없습니다."});
    const compact=sources.slice(0,30).map((item,index)=>`[${index+1}] ${item.title}\n기관: ${item.source}\n발행일: ${item.publishedAt}\nURL: ${item.url}\n요약: ${item.summary}`).join("\n\n");
    const response=await fetch("https://api.openai.com/v1/responses",{method:"POST",headers:{"Authorization":`Bearer ${process.env.OPENAI_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({model:process.env.OPENAI_MODEL||"gpt-5-mini",instructions:"당신은 AI 교육 시장 전문 리서처입니다. 제공된 자료만 근거로 사용하세요. 각 핵심 주장 뒤에 [번호] 형태로 근거를 표시하세요. 자료에 없는 사실은 추정이라고 명시하고, 답변 끝에 '추가 조사 필요' 항목을 포함하세요. 한국어로 간결하고 구조적으로 답하세요.",input:`질문: ${question.trim()}\n\n검증 자료:\n${compact}`,max_output_tokens:1800})});
    const data=await response.json();
    if(!response.ok)throw new Error(data.error?.message||"OpenAI API 요청에 실패했습니다.");
    const answer=data.output_text||data.output?.flatMap(item=>item.content||[]).filter(item=>item.type==="output_text").map(item=>item.text).join("\n");
    return json(200,{answer:answer||"응답 텍스트를 찾지 못했습니다."});
  }catch(error){console.error(error);return json(500,{error:error.message||"분석 중 오류가 발생했습니다."})}
}
