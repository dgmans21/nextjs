"use client";

import { useEffect } from "react";
import { EventDetail } from "@/features/events/Event-detail/EventDetail";
import { EventList } from "@/features/events/Event-list/EventList";
import { selectCurrentEvent } from "@/store/selectors";
import { useOpsStore } from "@/store/useOpsStore";

export function ZustandDashboard() {
  const store = useOpsStore(); //store의 state와 action을 가져온다
  const selectedEvent = selectCurrentEvent(store.events, store.selectedEventId);

  useEffect(() => { void store.loadEvents(); }, [store.loadEvents]);

  return (
    <main className="dashboard">
      <section className="hero"><p className="eyebrow">Frontend 04</p><h1>Zustand 전역 상태</h1><p>관제센터 상태와 API action을 store로 모읍니다.</p>{store.error && <p className="notice">{store.error}</p>}</section>
      <section className="layout"><EventList events={store.events} selectedEventId={store.selectedEventId} onSelect={store.selectEvent} /><EventDetail event={selectedEvent} /></section>
      <section className="panel"><h2>Zustand와 Redux Toolkit 비교</h2><p>Zustand는 작은 store와 action으로 빠르게 전역 상태를 구성합니다. Redux Toolkit은 더 엄격한 규칙과 큰 팀에 유리합니다.</p></section>
    </main>
  );
}