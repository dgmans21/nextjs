import type { EventsResponse, HealthResponse } from "@/entities/store-event";
import { requestJson } from "./httpClient";

export function fetchHealth() {
  return requestJson<HealthResponse>("/health");
}

export function fetchEvents() {
  return requestJson<EventsResponse>("/events");
}