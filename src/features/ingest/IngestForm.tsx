"use client";

import { useState } from "react";

type IngestFormProps = {
  loading: boolean;
  onSubmit: (body: {
    event_type: string;
    channel: string;
    message: string;
    severity: "low" | "medium" | "high";
  }) => void;
};

export function IngestForm({ loading, onSubmit }: IngestFormProps) {
  const [eventType, setEventType] = useState("refund");
  const [channel, setChannel] = useState("counter");
  const [message, setMessage] = useState("환불 문의");
  const [severity, setSeverity] = useState<"low" | "medium" | "high">("medium");

  return (
    <section className="panel">
      <h2>사건 접수</h2>
      <div className="inlineForm">
        <input value={eventType} onChange={(e) => setEventType(e.target.value)} placeholder="event_type" />
        <input value={channel} onChange={(e) => setChannel(e.target.value)} placeholder="channel" />
        <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="message" />
        <select value={severity} onChange={(e) => setSeverity(e.target.value as "low" | "medium" | "high")}>
          <option value="low">low</option>
          <option value="medium">medium</option>
          <option value="high">high</option>
        </select>
        <button
          type="button"
          disabled={loading}
          onClick={() => onSubmit({ event_type: eventType, channel, message, severity })}
        >
          {loading ? "접수 중…" : "POST /ingest"}
        </button>
      </div>
    </section>
  );
}
