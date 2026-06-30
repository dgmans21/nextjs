import { create } from "zustand";
import {
  fallbackEvents,
  type AnalysisResult,
  type HealthResponse,
  type StoreEvent,
} from "@/entities/store-event";
import {
  fetchAnalysis,
  fetchEvents,
  fetchHealth,
  fetchReport,
  fetchTasks,
  postChat,
  postIngest,
} from "@/shared/api/opsApi";

type OpsState = {
  events: StoreEvent[];
  selectedEventId: string;
  health: HealthResponse | null;
  analysis: AnalysisResult | null;
  loading: boolean;
  analysisLoading: boolean;
  reportLoading: boolean;
  tasksLoading: boolean;
  chatLoading: boolean;
  ingestLoading: boolean;
  error: string;
  report: string;
  tasks: string;
  chatAnswer: string;
  chatSources: string[];
  loadEvents: () => Promise<void>;
  loadAnalysis: (eventId: string) => Promise<void>;
  loadReport: (eventId: string) => Promise<void>;
  loadTasks: (eventId: string) => Promise<void>;
  askChat: (question: string, eventId?: string) => Promise<void>;
  ingestEvent: (body: {
    event_type: string;
    channel: string;
    message?: string;
    severity?: "low" | "medium" | "high";
  }) => Promise<void>;
  selectEvent: (eventId: string) => void;
  clearSelection: () => void;
};

export const useOpsStore = create<OpsState>((set, get) => ({
  events: fallbackEvents,
  selectedEventId: fallbackEvents[0].event_id,
  health: null,
  analysis: null,
  loading: false,
  analysisLoading: false,
  reportLoading: false,
  tasksLoading: false,
  chatLoading: false,
  ingestLoading: false,
  error: "",
  report: "",
  tasks: "",
  chatAnswer: "",
  chatSources: [],
  async loadEvents() {
    set({ loading: true, error: "" });
    try {
      const [healthResult, eventsResult] = await Promise.all([fetchHealth(), fetchEvents()]);
      const selectedEventId = get().selectedEventId;
      const hasSelection = eventsResult.events.some((event) => event.event_id === selectedEventId);
      const nextSelectedId = hasSelection
        ? selectedEventId
        : eventsResult.events[0]?.event_id || fallbackEvents[0].event_id;

      set({
        health: healthResult,
        events: eventsResult.events,
        selectedEventId: nextSelectedId,
      });

      if (nextSelectedId) {
        await get().loadAnalysis(nextSelectedId);
      }
    } catch {
      set({
        health: null,
        events: fallbackEvents,
        selectedEventId: fallbackEvents[0].event_id,
        analysis: null,
        error: "API 연결 실패: mock 사건을 표시합니다.",
      });
    } finally {
      set({ loading: false });
    }
  },
  async loadAnalysis(eventId) {
    set({ analysisLoading: true, error: "" });
    try {
      const data = await fetchAnalysis(eventId);
      set((state) => ({
        analysis: data.analysis,
        events: state.events.map((event) => (event.event_id === eventId ? data.event : event)),
      }));
    } catch {
      set({ analysis: null, error: "AI 분석을 불러오지 못했습니다." });
    } finally {
      set({ analysisLoading: false });
    }
  },
  async loadReport(eventId) {
    set({ reportLoading: true, error: "" });
    try {
      const data = await fetchReport(eventId);
      set({ report: data.result });
    } catch {
      set({ report: "", error: "운영 보고서를 생성하지 못했습니다." });
    } finally {
      set({ reportLoading: false });
    }
  },
  async loadTasks(eventId) {
    set({ tasksLoading: true, error: "" });
    try {
      const data = await fetchTasks(eventId);
      set({ tasks: data.result });
    } catch {
      set({ tasks: "", error: "체크리스트를 생성하지 못했습니다." });
    } finally {
      set({ tasksLoading: false });
    }
  },
  async askChat(question, eventId) {
    set({ chatLoading: true, error: "" });
    try {
      const data = await postChat(question, eventId);
      set({
        chatAnswer: data.answer || "답변을 받지 못했습니다.",
        chatSources: data.sources || [],
      });
    } catch {
      set({
        chatAnswer: "",
        chatSources: [],
        error: "챗봇 응답을 받지 못했습니다.",
      });
    } finally {
      set({ chatLoading: false });
    }
  },
  async ingestEvent(body) {
    set({ ingestLoading: true, error: "" });
    try {
      await postIngest(body);
      await get().loadEvents();
    } catch {
      set({ error: "사건 접수에 실패했습니다." });
    } finally {
      set({ ingestLoading: false });
    }
  },
  selectEvent(eventId) {
    set({ selectedEventId: eventId, report: "", tasks: "", chatAnswer: "", chatSources: [], analysis: null });
    void get().loadAnalysis(eventId);
  },
  clearSelection() {
    set({ selectedEventId: "", analysis: null, report: "", tasks: "", chatAnswer: "", chatSources: [] });
  },
}));
