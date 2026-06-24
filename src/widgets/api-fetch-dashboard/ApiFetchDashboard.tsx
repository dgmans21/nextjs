"use client";

import { useCallback, useEffect, useState } from "react";

import { fallbackEvents } from "@/entites";
import type { EventsResponse, HealthResponse, StoreEvent } from "@/entites";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export function ApiFetchDashboard() {
  const [events, setEvents] = useState<StoreEvent[]>([]);
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setUsingFallback(false);

    try {
      const [healthRes, eventsRes] = await Promise.all([
        fetch(`${API_BASE}/health`),
        fetch(`${API_BASE}/events`),
      ]);

      if (!healthRes.ok || !eventsRes.ok) {
        throw new Error("API 응답 오류");
      }

      const healthData = (await healthRes.json()) as HealthResponse;
      const eventsData = (await eventsRes.json()) as EventsResponse;

      setHealth(healthData);
      setEvents(eventsData.events);
      setSelectedId(eventsData.events[0]?.event_id ?? null);
    } catch {
      setHealth(null);
      setEvents(fallbackEvents);
      setSelectedId(fallbackEvents[0]?.event_id ?? null);
      setUsingFallback(true);
      setError("API 연결 실패 — mock 데이터를 표시합니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const selectedEvent = events.find((event) => event.event_id === selectedId) ?? null;

  return (
    <div className="dashboard">
      <header className="hero">
        <p className="eyebrow">Frontend 01 · API Fetch</p>
        <h1>매장 운영 이벤트 대시보드</h1>
        <p>백엔드 API에서 이벤트를 불러와 표시합니다.</p>
      </header>

      <div className="inlineForm" style={{ marginBottom: 16 }}>
        <button type="button" onClick={() => void loadData()} disabled={loading}>
          {loading ? "불러오는 중…" : "새로고침"}
        </button>
        {error ? <span>{error}</span> : null}
        {usingFallback ? <span>mock 모드</span> : null}
      </div>

      <div className="layout">
        <section className="panel">
          <h2>Health</h2>
          {health ? (
            <pre>{JSON.stringify(health, null, 2)}</pre>
          ) : (
            <p>{loading ? "확인 중…" : "health 정보 없음"}</p>
          )}
        </section>

        <section className="panel">
          <h2>이벤트 ({events.length})</h2>
          {events.map((event) => {
            const severity = event.severity ?? event.severity_hint ?? "low";

            return (
              <button
                key={event.event_id}
                type="button"
                className={`eventButton${selectedId === event.event_id ? " selected" : ""}`}
                onClick={() => setSelectedId(event.event_id)}
              >
                <span>{event.message ?? event.event_type}</span>
                <span className={`badge ${severity}`}>{severity}</span>
                <span>{event.channel}</span>
              </button>
            );
          })}
        </section>

        <section className="panel">
          <h2>선택된 이벤트</h2>
          {selectedEvent ? (
            <pre>{JSON.stringify(selectedEvent, null, 2)}</pre>
          ) : (
            <p>이벤트를 선택하세요.</p>
          )}
        </section>
      </div>
    </div>
  );
}
