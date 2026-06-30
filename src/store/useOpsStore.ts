import { create } from "zustand";
import { fallbackEvents, type StoreEvent } from "@/entities/store-event";
import { fetchEvents } from "@/shared/api/opsApi";

type OpsState = {
  events: StoreEvent[];
  selectedEventId: string;
  loading: boolean;
  error: string;
  report: string;
  tasks: string;
  chatAnswer: string;
  loadEvents: () => Promise<void>;
  selectEvent: (eventId: string) => void;
  clearSelection: () => void;
};

export const useOpsStore = create<OpsState>((set) => ({
  events: fallbackEvents,
  selectedEventId: fallbackEvents[0].event_id,
  loading: false,
  error: "",
  report: "",
  tasks: "",
  chatAnswer: "",
  async loadEvents() {
    set({ loading: true, error: "" });
    try {
      const result = await fetchEvents();
      set({ events: result.events, selectedEventId: result.events[0]?.event_id || fallbackEvents[0].event_id });
    } catch {
      set({ events: fallbackEvents, selectedEventId: fallbackEvents[0].event_id, error: "API 연결 실패: mock 사건을 표시합니다." });
    } finally {
      set({ loading: false });
    }
  },
  selectEvent(eventId) {
    set({ selectedEventId: eventId });
  },
  clearSelection() {
    set({ selectedEventId: "" });
  }
}));