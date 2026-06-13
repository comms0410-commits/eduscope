const json=(statusCode,body)=>({statusCode,headers:{"Content-Type":"application/json; charset=utf-8","Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"Content-Type, X-OpenAI-API-Key, X-OpenAI-Model","Cache-Control":"no-store"},body:JSON.stringify(body)});

export async function handler(event){
  if(event.httpMethod==="OPTIONS")return json(200,{});
  if(event.httpMethod!=="POST")return json(405,{error:"POST 요청만 지원합니다."});
  try{
    const browserKey=event.headers?.["x-openai-api-key"]?.trim();
    const apiKey=process.env.OPENAI_API_KEY||browserKey;
    if(!apiKey)return json(503,{error:"OpenAI API 키를 웹의 API 설정에서 입력해 주세요."});
    if(apiKey.length>300)return json(400,{error:"API 키 형식이 올바르지 않습니다."});
    const requestedModel=event.headers?.["x-openai-model"]?.trim();
    const model=process.env.OPENAI_MODEL||requestedModel||"gpt-5-mini";
    if(!/^[a-zA-Z0-9._-]{1,80}$/.test(model))return json(400,{error:"모델 이름 형식이 올바르지 않습니다."});
    const {question,sources=[],context=""}=JSON.parse(event.body||"{}");
    if(!question?.trim())return json(400,{error:"리서치 질문을 입력해 주세요."});
    const compact=Array.isArray(sources)&&sources.length?sources.slice(0,30).map((item,index)=>`[${index+1}] ${item.title}\n기관: ${item.source}\n발행일: ${item.publishedAt}\nURL: ${item.url}\n요약: ${item.summary}`).join("\n\n"):String(context).trim().slice(0,12000);
    if(!compact)return json(400,{error:"분석할 시장 자료를 입력해 주세요."});
    const response=await fetch("https://api.openai.com/v1/responses",{method:"POST",headers:{"Authorization":`Bearer ${apiKey}`,"Content-Type":"application/json"},body:JSON.stringify({model,instructions:"당신은 B2B 시장조사 전문 리서처입니다. 제공된 자료를 우선 근거로 사용하세요. 사실, 해석, 가설을 구분하고 자료에 없는 내용은 추정이라고 명시하세요. 핵심 인사이트, 검증할 가설, 권장 응답자 조건, 다음 조사 질문, 정보 공백 순서로 한국어로 답하세요.",input:`리서치 질문: ${question.trim()}\n\n시장 자료:\n${compact}`,max_output_tokens:1800})});
    const data=await response.json();
    if(!response.ok)throw new Error(data.error?.message||"OpenAI API 요청에 실패했습니다.");
    const answer=data.output_text||data.output?.flatMap(item=>item.content||[]).filter(item=>item.type==="output_text").map(item=>item.text).join("\n");
    return json(200,{answer:answer||"응답 텍스트를 찾지 못했습니다."});
  }catch(error){console.error(error);return json(500,{error:error.message||"분석 중 오류가 발생했습니다."})}
}
