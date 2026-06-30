import { useMemo, useState } from "react";
import type { StoreEvent } from "@/entities/store-event";

export function useSelectedEvent(events: StoreEvent[]) {
  const [selectedEventId, setSelectedEventId] = useState(events[0]?.event_id || "");
  const selectedEvent = useMemo(() => events.find((event) => event.event_id === selectedEventId), [events, selectedEventId]);

  return { selectedEvent, selectedEventId, setSelectedEventId };
}