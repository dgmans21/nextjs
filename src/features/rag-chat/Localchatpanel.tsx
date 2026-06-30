import { useState } from "react";

export function LocalChatPanel() {
  const [question, setQuestion] = useState("환불 요청 고객에게 먼저 확인할 것은?");
  const [answer, setAnswer] = useState("아직 질문하지 않았습니다.");

  return (
    <section className="panel">
      <h2>문서 챗봇</h2>
      <div className="inlineForm">
        <input value={question} onChange={(event) => setQuestion(event.target.value)} />
        <button onClick={() => setAnswer(`mock 답변: "${question}" 질문은 운영 매뉴얼 확인이 필요합니다.`)}>질문</button>
      </div>
      <pre>{answer}</pre>
    </section>
  );
}