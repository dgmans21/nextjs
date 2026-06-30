"use client";

import { useState } from "react";

type LocalChatPanelProps = {
  answer: string;
  sources: string[];
  loading: boolean;
  selectedEventId?: string;
  onAsk: (question: string, eventId?: string) => void;
};

export function LocalChatPanel({ answer, sources, loading, selectedEventId, onAsk }: LocalChatPanelProps) {
  const [question, setQuestion] = useState("환불 요청 고객에게 먼저 확인할 것은?");

  return (
    <section className="panel">
      <h2>문서 챗봇</h2>
      <div className="inlineForm">
        <input value={question} onChange={(event) => setQuestion(event.target.value)} />
        <button type="button" disabled={loading} onClick={() => onAsk(question, selectedEventId)}>
          {loading ? "질문 중…" : "질문"}
        </button>
      </div>
      <pre>{answer || "질문을 입력하고 버튼을 눌러주세요."}</pre>
      {sources.length > 0 ? <p className="chatSources">출처: {sources.join(", ")}</p> : null}
    </section>
  );
}
