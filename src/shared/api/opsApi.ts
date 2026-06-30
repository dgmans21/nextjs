import type {
  AnalysisResponse,
  ChatResponse,
  EventsResponse,
  HealthResponse,
  ReportResponse,
  SimulateResponse,
  StoreEvent,
  TasksResponse,
} from "@/entities/store-event";
import { requestJson } from "./httpClient";

export function fetchHealth() {
  return requestJson<HealthResponse>("/health");
}

export function fetchEvents() {
  return requestJson<EventsResponse>("/events");
}

export function fetchEvent(eventId: string) {
  return requestJson<StoreEvent>(`/events/${eventId}`);
}

export function fetchAnalysis(eventId: string) {
  return requestJson<AnalysisResponse>(`/events/${eventId}/analysis`);
}

export function fetchReport(eventId: string) {
  return requestJson<ReportResponse>(`/events/${eventId}/report`, { method: "POST" });
}

export function fetchTasks(eventId: string) {
  return requestJson<TasksResponse>(`/events/${eventId}/tasks`, { method: "POST" });
}

export function postChat(question: string, eventId?: string) {
  return requestJson<ChatResponse>("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, event_id: eventId }),
  });
}

export function postIngest(body: {
  event_type: string;
  channel: string;
  message?: string;
  severity?: "low" | "medium" | "high";
}) {
  return requestJson<SimulateResponse>("/ingest", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}
