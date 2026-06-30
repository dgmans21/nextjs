"use client";

import { useEffect } from "react";
import { AiAnalysisPanel } from "@/features/ai-analysis/AiAnalysisPanel";
import { ApiHealthPanel } from "@/features/api-health/ApiHealthPanel";
import { ChecklistPanel } from "@/features/checklist/ChecklistPanel";
import { EventDetail } from "@/features/events/Event-detail/EventDetail";
import { EventList } from "@/features/events/Event-list/EventList";
import { IngestForm } from "@/features/ingest/IngestForm";
import { ReportPanel } from "@/features/report/ReportPanel";
import { LocalChatPanel } from "@/features/rag-chat/Localchatpanel";
import { selectCurrentEvent } from "@/store/selectors";
import { useOpsStore } from "@/store/useOpsStore";

export function ZustandDashboard() {
  const store = useOpsStore();
  const selectedEvent = selectCurrentEvent(store.events, store.selectedEventId);

  useEffect(() => {
    void store.loadEvents();
  }, [store.loadEvents]);

  return (
    <main className="dashboard">
      <ApiHealthPanel health={store.health} error={store.error} />
      <section className="toolbar">
        <button type="button" onClick={() => void store.loadEvents()} disabled={store.loading}>
          {store.loading ? "불러오는 중" : "API 새로고침"}
        </button>
      </section>
      <IngestForm loading={store.ingestLoading} onSubmit={(body) => void store.ingestEvent(body)} />
      <section className="layout">
        <EventList events={store.events} selectedEventId={store.selectedEventId} onSelect={store.selectEvent} />
        <div className="detailColumn">
          <EventDetail event={selectedEvent} />
          <AiAnalysisPanel analysis={store.analysis} loading={store.analysisLoading} />
        </div>
      </section>
      <section className="layout">
        <ReportPanel
          report={store.report}
          loading={store.reportLoading}
          disabled={!store.selectedEventId}
          onGenerate={() => void store.loadReport(store.selectedEventId)}
        />
        <ChecklistPanel
          tasks={store.tasks}
          loading={store.tasksLoading}
          disabled={!store.selectedEventId}
          onGenerate={() => void store.loadTasks(store.selectedEventId)}
        />
      </section>
      <LocalChatPanel
        answer={store.chatAnswer}
        sources={store.chatSources}
        loading={store.chatLoading}
        selectedEventId={store.selectedEventId}
        onAsk={(question, eventId) => void store.askChat(question, eventId)}
      />
    </main>
  );
}
