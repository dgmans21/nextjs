export type Severity = "low" | "medium" | "high";

export type StoreEvent = {
  event_id: string;
  event_type: string;
  channel: string;
  message?: string;
  severity?: Severity;
  severity_hint?: Severity;
  status: string;
  requires_response: boolean;
};

export type EventsResponse = { count: number; events: StoreEvent[] };
export type HealthResponse = { status: string; events_count: number; docs_count?: number; llm_provider?: string; kafka_topic?: string };
